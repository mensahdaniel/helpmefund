import { DollarSign, Target, TrendingUp, Users } from "lucide-react";
import { StatCard } from "@/components/ui/stats-card";

export function InvestmentStats({ investments }) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const projectsSupported =
    new Set(investments.map((inv) => inv.projectId)).size;
  const avgInvestment = totalInvested / (investments.length || 1);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Invested"
        value={`$${totalInvested.toLocaleString()}`}
        icon={DollarSign}
      />
      <StatCard
        title="Projects Supported"
        value={projectsSupported}
        icon={Target}
      />
      <StatCard
        title="Total Investments"
        value={investments.length}
        icon={Users}
      />
      <StatCard
        title="Average Investment"
        value={`$${avgInvestment.toFixed(2)}`}
        icon={TrendingUp}
      />
    </div>
  );
}
