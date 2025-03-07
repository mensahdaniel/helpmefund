import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { Project } from "@/types";
import {
  approveProject,
  getPendingProjects,
  rejectProject,
} from "@/lib/firebase/admin";

function PendingProjectsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-lg border p-4">
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-96 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PendingProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPendingProjects() {
      const data = await getPendingProjects();
      setProjects(data);
      setLoading(false);
    }
    fetchPendingProjects();
  }, []);

  const handleApprove = async (projectId: string) => {
    await approveProject(projectId);
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  const handleReject = async (projectId: string) => {
    await rejectProject(projectId);
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  if (loading) return <PendingProjectsSkeleton />;

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="rounded-lg border p-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-text-light">{project.description}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-green-600 hover:bg-green-50"
                onClick={() =>
                  handleApprove(project.id)}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:bg-red-50"
                onClick={() =>
                  handleReject(project.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
