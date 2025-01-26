"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AdminStats } from "@/components/admin/AdminStats";
import { PendingProjects } from "@/components/admin/PendingProjects";
import { RecentActivities } from "@/components/admin/RecentActivities";
import { UsersList } from "@/components/admin/UsersList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getAdminDashboardData } from "@/lib/firebase/admin";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const dashboardData = await getAdminDashboardData();
      setData(dashboardData);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-8 p-8">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor platform activity and manage users
          </p>
        </div>

        <AdminStats stats={data?.stats} loading={loading} />

        <Card>
          <CardHeader>
            <CardTitle>Users Management</CardTitle>
            <CardDescription>
              Manage platform users and their roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UsersList />
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold">Pending Projects</h2>
              <div className="mt-4">
                <PendingProjects />
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold">Recent Activities</h2>
              <div className="mt-4">
                <RecentActivities />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
