"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getSponsorInvestments } from "@/lib/firebase/investments";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { InvestmentsList } from "@/components/dashboard/sponsor/InvestmentsList";
import { InvestmentStats } from "@/components/dashboard/sponsor/InvestmentStats";
import { InvestmentAnalytics } from "@/components/dashboard/sponsor/InvestmentAnalytics";
import { Card } from "@/components/ui/card";
import { Investment } from "@/types"; // Add this import

export default function InvestmentsPage() {
  const { user } = useAuth();
  const [investments, setInvestments] = useState<Investment[]>([]); // Add type here
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvestments() {
      if (user) {
        try {
          const data = await getSponsorInvestments(user.uid);
          setInvestments(data);
        } catch (error) {
          console.error("Error fetching investments:", error);
        } finally {
          setLoading(false);
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
          <h1 className="text-2xl font-bold">My Investments</h1>
          <p className="text-gray-500">Track and manage your investments</p>
        </div>

        <InvestmentStats investments={investments} />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Investment History</h2>
            <InvestmentsList investments={investments} loading={loading} />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Analytics</h2>
            <InvestmentAnalytics investments={investments} />
          </Card>
        </div>
      </main>
    </div>
  );
}
