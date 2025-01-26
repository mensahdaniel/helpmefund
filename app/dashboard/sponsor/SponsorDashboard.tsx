"use client";

import { useEffect, useState } from "react";
import { getSponsorInvestments } from "@/lib/firebase/investments";
import { InvestmentStats } from "./InvestmentStats";
import { InvestedProjects } from "./InvestedProjects";
import { RecommendedProjects } from "./RecommendedProjects";
import { InvestmentActivity } from "./InvestmentActivity";
import { useAuth } from "@/context/AuthContext";
import { BarChart, DollarSign, TrendingUp, Wallet } from "lucide-react";

export function SponsorDashboard() {
  const { user } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const data = await getSponsorInvestments(user.uid);
        setInvestments(data);
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  const stats = [
    {
      title: "Total Invested",
      value: `$${
        investments.reduce((acc, inv) => acc + inv.amount, 0).toLocaleString()
      }`,
      icon: Wallet,
      trend: {
        value: 8,
        isPositive: true,
        label: "vs last month",
      },
    },
    {
      title: "Projects Funded",
      value: new Set(investments.map((inv) => inv.projectId)).size,
      icon: TrendingUp,
    },
    {
      title: "Average Investment",
      value: `$${
        (investments.reduce((acc, inv) => acc + inv.amount, 0) /
            investments.length || 0).toFixed(2)
      }`,
      icon: BarChart,
    },
    {
      title: "Available Balance",
      value: "$10,000",
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Sponsor Dashboard</h1>
        <p className="text-muted-foreground">
          Track your investments and discover promising projects
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => <StatsCard key={stat.title} {...stat} />)}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <InvestedProjects investments={investments} loading={loading} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <InvestmentActivity investments={investments} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <RecommendedProjects userId={user?.uid} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <InvestmentAnalytics investments={investments} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
