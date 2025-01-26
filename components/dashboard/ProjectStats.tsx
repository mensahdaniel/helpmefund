import { Project } from "@/types";
import { StatCard } from "@/components/ui/stats-card";
import { CheckCircle, DollarSign, LayoutGrid, Rocket } from "lucide-react";

interface ProjectStatsProps {
  projects: Project[];
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  const totalFunding = projects.reduce((sum, p) => sum + p.currentFunding, 0);
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter(
    (p) => p.status === "completed",
  ).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Projects"
        value={projects.length}
        icon={LayoutGrid}
      />
      <StatCard
        title="Active Projects"
        value={activeProjects}
        icon={Rocket}
      />
      <StatCard
        title="Completed Projects"
        value={completedProjects}
        icon={CheckCircle}
      />
      <StatCard
        title="Total Funding"
        value={`$${totalFunding.toLocaleString()}`}
        icon={DollarSign}
      />
    </div>
  );
}
