import { AdminStatsProps } from "@/types";
import { StatsCard } from "../ui/dashboard/stats-card";
import { DollarSign, FileText, TrendingUp, Users } from "lucide-react";

export interface AdminStatsProps {
  stats: {
    totalUsers: number;
    activeProjects: number;
    totalFunding: number;
    growthRate: number;
  } | null;
  loading: boolean;
}

export function AdminStatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-lg border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
          </div>
          <div className="mt-2 h-8 w-20 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 flex items-center gap-2">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminStats({ stats, loading }: AdminStatsProps) {
  if (loading) return <AdminStatsSkeleton />;

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
