import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";


interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
}

export function StatsCard(
  { title, value, icon: Icon, description, trend }: StatsCardProps,
) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
      {trend && (
        <div className="mt-3 flex items-center gap-2">
          {trend.isPositive
            ? <TrendingUp className="h-4 w-4 text-green-500" />
            : <TrendingDown className="h-4 w-4 text-red-500" />}
          <span
            className={cn(
              "text-sm font-medium",
              trend.isPositive ? "text-green-500" : "text-red-500",
            )}
          >
            {trend.value}%
          </span>
          <span className="text-sm text-muted-foreground">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
