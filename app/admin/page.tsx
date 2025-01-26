"use client";

import { useEffect, useState } from "react";
import { getAdminStats } from "@/lib/firebase/admin";
import { AdminStats } from "@/components/admin/AdminStats";
import { PendingProjects } from "@/components/admin/PendingProjects";
import { RecentActivities } from "@/components/admin/RecentActivities";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const data = await getAdminStats();
      setStats(data);
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Admin Dashboard</h1>
        <p className="text-text-light">
          Manage projects, users, and platform statistics
        </p>
      </div>

      <AdminStats stats={stats} loading={loading} />

      <div className="grid gap-8 lg:grid-cols-2">
        <PendingProjects />
        <RecentActivities />
      </div>
    </div>
  );
}
