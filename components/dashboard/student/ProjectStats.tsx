import { Project } from "@/types";
import { StatsCard } from "@/components/ui/stats-card";

export function ProjectStats({ projects }: { projects: Project[] }) {
  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: "LayoutDashboard",
    },
    {
      title: "Active Projects",
      value: projects.filter((p) => p.status === "active").length,
      icon: "TrendingUp",
    },
    {
      title: "Total Funding",
      value: `$${
        projects.reduce((sum, p) => sum + p.currentFunding, 0).toLocaleString()
      }`,
      icon: "DollarSign",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => <StatsCard key={stat.title} {...stat} />)}
    </div>
  );
}
