import { ProjectCard } from "@/components/ProjectCard";

export function InvestedProjects({ investments, loading }) {
  if (loading) {
    return <InvestmentsSkeleton />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-text-dark">
        Your Investments
      </h2>
      <div className="space-y-4">
        {investments.map((investment) => (
          <InvestmentCard key={investment.id} investment={investment} />
        ))}
      </div>
    </div>
  );
}
