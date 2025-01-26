"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getSponsorInvestments } from "@/lib/firebase/investments";
import { InvestmentStats } from "@/components/dashboard/sponsor/InvestmentStats";
import { InvestedProjects } from "@/components/dashboard/sponsor/InvestedProjects";
import { RecommendedProjects } from "@/components/dashboard/sponsor/RecommendedProjects";

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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Sponsor Dashboard</h1>
        <p className="text-text-light">
          Track your investments and discover promising projects
        </p>
      </div>

      <InvestmentStats investments={investments} />

      <div className="grid gap-8 lg:grid-cols-2">
        <InvestedProjects investments={investments} loading={loading} />
        <RecommendedProjects userId={user?.uid} />
      </div>
    </div>
  );
}
