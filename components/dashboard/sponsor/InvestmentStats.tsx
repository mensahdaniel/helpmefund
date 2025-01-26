import { StatsCard } from "@/components/ui/stats-card";
import { DollarSign, PieChart, TrendingUp, Users } from "lucide-react";

export function InvestmentStats({ investments }) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const projectsFunded = new Set(investments.map((inv) => inv.projectId)).size;

  const stats = [
    {
      title: "Total Invested",
      value: `$${totalInvested.toLocaleString()}`,
      icon: DollarSign,
    },
    {
      title: "Projects Funded",
      value: projectsFunded,
      icon: PieChart,
    },
    {
      title: "Success Rate",
      value: "85%",
      icon: TrendingUp,
      trend: {
        value: 5,
        isPositive: true,
        label: "vs last month",
      },
    },
    {
      title: "Impact Score",
      value: "4.8/5",
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => <StatsCard key={stat.title} {...stat} />)}
    </div>
  );
}
