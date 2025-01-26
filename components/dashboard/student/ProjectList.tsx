import { Project } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, ExternalLink } from "lucide-react";

interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{project.title}</h3>
                <Badge variant={getStatusVariant(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {project.description}
              </p>

              {/* Progress Bar */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {Math.round(
                      (project.currentFunding / project.fundingGoal) * 100,
                    )}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${
                        (project.currentFunding / project.fundingGoal) * 100
                      }%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${project.currentFunding.toLocaleString()}</span>
                  <span>of ${project.fundingGoal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href={`/dashboard/projects/${project.id}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/projects/${project.id}`} target="_blank">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects yet</p>
          <Link href="/projects/new">
            <Button className="mt-4">Create Your First Project</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

function getStatusVariant(status: string) {
  switch (status) {
    case "active":
      return "success";
    case "pending":
      return "warning";
    case "rejected":
      return "destructive";
    default:
      return "default";
  }
}
