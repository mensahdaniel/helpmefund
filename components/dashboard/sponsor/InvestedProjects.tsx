import { ProjectCard } from "@/components/ProjectCard";

export function InvestedProjects({ investments, loading }) {
  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      {investments.map((investment) => (
        <ProjectCard
          key={investment.projectId}
          project={investment.project}
          investment={investment.amount}
        />
      ))}
    </div>
  );
}
