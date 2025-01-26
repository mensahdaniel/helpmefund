import { StatsCard } from "@/components/ui/dashboard/stats-card";
import { BarChart, DollarSign, TrendingUp, Wallet } from "lucide-react";

interface Investment {
  id: string;
  amount: number;
  projectId: string;
  createdAt: Date;
}

interface SponsorStatsProps {
  investments: Investment[];
}

export function SponsorStats({ investments }: SponsorStatsProps) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const projectsFunded = new Set(investments.map((inv) => inv.projectId)).size;
  const avgInvestment = investments.length > 0
    ? totalInvested / investments.length
    : 0;

  const stats = [
    {
      title: "Total Invested",
      value: `$${totalInvested.toLocaleString()}`,
      icon: Wallet,
      trend: {
        value: 12,
        isPositive: true,
        label: "vs last month",
      },
    },
    {
      title: "Projects Funded",
      value: projectsFunded,
      icon: TrendingUp,
    },
    {
      title: "Avg. Investment",
      value: `$${avgInvestment.toLocaleString()}`,
      icon: BarChart,
    },
    {
      title: "Available Balance",
      value: "$10,000",
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => <StatsCard key={stat.title} {...stat} />)}
    </div>
  );
}
