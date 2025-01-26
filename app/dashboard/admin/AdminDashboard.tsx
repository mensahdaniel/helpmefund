"use client";

import { useEffect, useState } from "react";
import { getAdminStats } from "@/lib/firebase/admin";
import { PendingProjects } from "./PendingProjects";
import { UserManagement } from "./UserManagement";
import { SystemStats } from "./SystemStats";
import { RecentActivity } from "./RecentActivity";
import { useAuth } from "@/context/AuthContext";
import { Activity, DollarSign, FileText, Users } from "lucide-react";

export function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getAdminStats();
      setStats(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const dashboardStats = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      trend: {
        value: 12,
        isPositive: true,
        label: "new this week",
      },
    },
    {
      title: "Active Projects",
      value: stats?.activeProjects || 0,
      icon: FileText,
    },
    {
      title: "Total Funding",
      value: `$${(stats?.totalFunding || 0).toLocaleString()}`,
      icon: DollarSign,
    },
    {
      title: "Success Rate",
      value: `${stats?.successRate || 0}%`,
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor and manage platform activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => <StatsCard key={stat.title} {...stat} />)}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <PendingProjects />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <UserManagement />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <SystemStats stats={stats} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
