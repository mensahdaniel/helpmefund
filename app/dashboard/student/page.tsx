"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserProjects } from "@/lib/firebase/projects";
import { StudentStats } from "@/components/dashboard/student/StudentStats";
import { ProjectsList } from "@/components/dashboard/student/ProjectsList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/shared/DashboardHeader";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      if (user) {
        try {
          const userProjects = await getUserProjects(user.uid);
          setProjects(userProjects);
        } catch (error) {
          console.error("Error fetching projects:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchProjects();
  }, [user]);

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <p className="text-gray-500">Manage your projects and funding</p>
          </div>
          <Link href="/dashboard/student/projects/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>

        <StudentStats projects={projects} />

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Your Projects</h2>
          <ProjectsList projects={projects} />
        </div>
      </main>
    </div>
  );
}
