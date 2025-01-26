import { Card } from "../ui/card";
import { StatsCard } from "../ui/dashboard/stats-card";
import { DollarSign, FileText, TrendingUp, Users } from "lucide-react";

interface AdminStatsProps {
  stats: any;
  loading: boolean;
}

export function AdminStats({ stats, loading }: AdminStatsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-32 animate-pulse" />
        ))}
      </div>
    );
  }

  const statsData = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
    },
    {
      title: "Active Projects",
      value: stats?.activeProjects || 0,
      icon: FileText,
    },
    {
      title: "Total Funding",
      value: `$${(stats?.totalFunding || 0).toLocaleString()}`,
      icon: DollarSign,
    },
    {
      title: "Growth Rate",
      value: `${stats?.growthRate || 0}%`,
      icon: TrendingUp,
      trend: {
        value: stats?.growthRate || 0,
        isPositive: (stats?.growthRate || 0) > 0,
        label: "vs last month",
      },
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => <StatsCard key={stat.title} {...stat} />)}
    </div>
  );
}
