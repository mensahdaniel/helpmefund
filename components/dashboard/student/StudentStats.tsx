import { StatsCard } from "@/components/ui/dashboard/stats-card";
import { Clock, DollarSign, LayoutDashboard, TrendingUp } from "lucide-react";
import { Project } from "@/types";

interface StudentStatsProps {
  projects: Project[];
}

export function StudentStats({ projects }: StudentStatsProps) {
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const totalFunding = projects.reduce((sum, p) => sum + p.currentFunding, 0);
  const avgFundingProgress = projects.length > 0
    ? (totalFunding / projects.reduce((sum, p) => sum + p.fundingGoal, 0)) * 100
    : 0;

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: LayoutDashboard,
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: TrendingUp,
      trend: {
        value: activeProjects,
        isPositive: true,
        label: "active",
      },
    },
    {
      title: "Total Funding",
      value: `$${totalFunding.toLocaleString()}`,
      icon: DollarSign,
    },
    {
      title: "Avg. Progress",
      value: `${Math.round(avgFundingProgress)}%`,
      icon: Clock,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => <StatsCard key={stat.title} {...stat} />)}
    </div>
  );
}
