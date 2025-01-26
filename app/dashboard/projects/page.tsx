"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserProjects } from "@/lib/firebase/projects";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectsTable } from "@/components/dashboard/ProjectsTable";
import { Plus } from "lucide-react";
import { Project } from "@/types";

export default function UserProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-dark">Your Projects</h1>
          <p className="text-text-light">
            Manage and track your project submissions
          </p>
        </div>
        {
          /* <Link href="/projects/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Project
          </Button>
        </Link> */
        }
      </div>

      {/* Projects Table */}
      <div className="rounded-lg border border-border bg-white">
        <ProjectsTable projects={projects} loading={loading} />
      </div>

      {/* Empty State */}
      {!loading && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-white p-12">
          <div className="text-center">
            <h3 className="mt-2 text-lg font-semibold text-text-dark">
              No projects yet
            </h3>
            <p className="mt-1 text-text-light">
              Get started by creating your first project
            </p>
            <div className="mt-6">
              <Link href="/projects/new">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Project Stats */}
      {projects.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-white p-6">
            <p className="text-sm text-text-light">Total Projects</p>
            <p className="mt-2 text-3xl font-bold text-text-dark">
              {projects.length}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-white p-6">
            <p className="text-sm text-text-light">Active Projects</p>
            <p className="mt-2 text-3xl font-bold text-text-dark">
              {projects.filter((p) => p.status === "active").length}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-white p-6">
            <p className="text-sm text-text-light">Total Funding</p>
            <p className="mt-2 text-3xl font-bold text-text-dark">
              ${projects.reduce((sum, p) => sum + p.currentFunding, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
