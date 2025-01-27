"use client";

import { useMemo } from "react";
import { Investment } from "@/types";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface InvestmentAnalyticsProps {
  investments: Investment[];
}

export function InvestmentAnalytics({ investments }: InvestmentAnalyticsProps) {
  const categoryData = useMemo(() => {
    const categories = investments.reduce((acc, investment) => {
      const category = investment.projectCategory;
      acc[category] = (acc[category] || 0) + investment.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
    }));
  }, [investments]);

  const monthlyData = useMemo(() => {
    const months = investments.reduce((acc, investment) => {
      const date = new Date(investment.createdAt);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      acc[key] = (acc[key] || 0) + investment.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(months)
      .map(([date, amount]) => ({
        date,
        amount,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [investments]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Investment by Category</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) =>
                  `${name}: $${value.toLocaleString()}`}
              >
                {categoryData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Monthly Investment Trend</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
