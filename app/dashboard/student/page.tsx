"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProjectStats } from "@/components/dashboard/ProjectStats";
import { ProjectsTable } from "@/components/dashboard/ProjectsTable";
import { RecentDonations } from "@/components/dashboard/RecentDonations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getUserProjects } from "@/lib/firebase/projects";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      if (user) {
        const data = await getUserProjects(user.uid);
        setProjects(data);
        setLoading(false);
      }
    }
    fetchProjects();
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your projects and track funding progress
            </p>
          </div>

          <Link href="/projects/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>

        <ProjectStats projects={projects} />

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold">Your Projects</h2>
              <div className="mt-4">
                <ProjectsTable projects={projects} loading={loading} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold">Recent Donations</h2>
              <div className="mt-4">
                <RecentDonations
                  projectIds={projects.map((p) => p.id)}
                />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
