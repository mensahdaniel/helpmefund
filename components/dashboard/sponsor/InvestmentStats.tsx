import { useMemo } from "react";
import { Investment } from "@/types";
import { StatCard as StatsCard } from "@/components/ui/stats-card";
import { BarChart, DollarSign, PieChart, TrendingUp } from "lucide-react";

interface InvestmentStatsProps {
  investments: Investment[];
}

export function InvestmentStats({ investments }: InvestmentStatsProps) {
  const stats = useMemo(() => {
    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const totalProjects = new Set(investments.map((inv) => inv.projectId)).size;
    const averageInvestment = totalInvested / investments.length || 0;

    const monthlyGrowth = calculateMonthlyGrowth(investments);

    return [
      {
        title: "Total Invested",
        value: `$${totalInvested.toLocaleString()}`,
        icon: DollarSign,
        trend: {
          value: monthlyGrowth,
          isPositive: monthlyGrowth > 0,
          label: "vs last month",
        },
      },
      {
        title: "Projects Funded",
        value: totalProjects,
        icon: PieChart,
      },
      {
        title: "Average Investment",
        value: `$${averageInvestment.toLocaleString()}`,
        icon: BarChart,
      },
      {
        title: "Success Rate",
        value: "92%",
        icon: TrendingUp,
      },
    ];
  }, [investments]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => <StatsCard key={stat.title} {...stat} />)}
    </div>
  );
}

function calculateMonthlyGrowth(investments: Investment[]): number {
  // Calculate the growth rate between this month and last month
  const now = new Date();
  const thisMonth = now.getMonth();
  const lastMonth = thisMonth - 1;

  const thisMonthTotal = investments
    .filter(
      (inv) =>
        inv.createdAt.getMonth() === thisMonth &&
        inv.createdAt.getFullYear() === now.getFullYear(),
    )
    .reduce((sum, inv) => sum + inv.amount, 0);

  const lastMonthTotal = investments
    .filter(
      (inv) =>
        inv.createdAt.getMonth() === lastMonth &&
        inv.createdAt.getFullYear() === now.getFullYear(),
    )
    .reduce((sum, inv) => sum + inv.amount, 0);

  if (lastMonthTotal === 0) return 100;
  return Math.round(((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100);
}
