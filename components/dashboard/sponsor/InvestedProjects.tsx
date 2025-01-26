import { ProjectCard, ProjectCardSkeleton } from "@/components/ProjectCard";

export function InvestedProjectsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => <ProjectCardSkeleton key={i} />)}
    </div>
  );
}

export function InvestedProjects({ investments, loading }) {
  if (loading) return <InvestedProjectsSkeleton />;

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
