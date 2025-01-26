"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { InvestmentStats } from "@/components/dashboard/sponsor/InvestmentStats";
import { InvestedProjects } from "@/components/dashboard/sponsor/InvestedProjects";
import { RecommendedProjects } from "@/components/dashboard/sponsor/RecommendedProjects";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { getSponsorInvestments } from "@/lib/firebase/investments";

export default function SponsorDashboard() {
  const { user } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvestments() {
      if (user) {
        const data = await getSponsorInvestments(user.uid);
        setInvestments(data);
        setLoading(false);
      }
    }
    fetchInvestments();
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-8 p-8">
        <div>
          <h1 className="text-2xl font-bold">Sponsor Dashboard</h1>
          <p className="text-muted-foreground">
            Track your investments and discover promising projects
          </p>
        </div>

        <InvestmentStats investments={investments} />

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold">Your Investments</h2>
              <div className="mt-4">
                <InvestedProjects
                  investments={investments}
                  loading={loading}
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold">Recommended Projects</h2>
              <div className="mt-4">
                <RecommendedProjects userId={user?.uid} />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
