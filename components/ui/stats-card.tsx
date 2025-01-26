import { cn } from "@/lib/utils";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-text-light">{title}</p>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <p className="mt-2 text-3xl font-bold text-text-dark">{value}</p>
      {trend && (
        <div className="mt-2 flex items-center gap-1">
          {trend.value > 0
            ? <TrendingUp className="h-4 w-4 text-green-500" />
            : <TrendingDown className="h-4 w-4 text-red-500" />}
          <span
            className={cn(
              "text-sm",
              trend.value > 0 ? "text-green-500" : "text-red-500",
            )}
          >
            {Math.abs(trend.value)}%
          </span>
          <span className="text-sm text-text-light">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
