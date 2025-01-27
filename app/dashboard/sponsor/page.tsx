"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getSponsorInvestments } from "@/lib/firebase/investments";
import { SponsorStats } from "@/components/dashboard/sponsor/SponsorStats";
import { InvestmentsList } from "@/components/dashboard/sponsor/InvestmentsList";
import { RecommendedProjects } from "@/components/dashboard/sponsor/RecommendedProjects";
import { DashboardHeader } from "@/components/shared/DashboardHeader";

export default function SponsorDashboard() {
  const { user } = useAuth();
  const [investments, setInvestments] = useState([]);
  // const [_, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvestments() {
      if (user) {
        try {
          const data = await getSponsorInvestments(user.uid);
          setInvestments(data);
        } catch (error) {
          console.error("Error fetching investments:", error);
        } finally {
          console.log("done");
        }
      }
    }

    fetchInvestments();
  }, [user]);

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Sponsor Dashboard</h1>
          <p className="text-gray-500">
            Track your investments and discover projects
          </p>
        </div>

        <SponsorStats investments={investments} />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Investments</h2>
            <InvestmentsList investments={investments} />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Recommended Projects</h2>
            <RecommendedProjects userId={user?.uid} />
          </div>
        </div>
      </main>
    </div>
  );
}
