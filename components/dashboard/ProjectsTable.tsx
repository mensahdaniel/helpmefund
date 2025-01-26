"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project, ProjectStatus as StatusType } from "@/types";

interface ProjectsTableProps {
  projects: Project[];
  loading: boolean;
}

function ProjectStatus({ status }: { status: StatusType }) {
  const statusStyles = {
    draft: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    active: "bg-green-100 text-green-800",
    funded: "bg-blue-100 text-blue-800",
    completed: "bg-purple-100 text-purple-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        statusStyles[status]
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="divide-y divide-border">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 animate-pulse rounded bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-1/4 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsTable({ projects, loading }: ProjectsTableProps) {
  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full">
        <thead className="bg-background">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-light">
              Project
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-light">
              Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-light">
              Funding
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-text-light">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-text-dark">
                      {project.title}
                    </p>
                    <p className="text-sm text-text-light">
                      {project.category}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <ProjectStatus status={project.status} />
              </td>
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium text-text-dark">
                    ${project.currentFunding.toLocaleString()}
                  </p>
                  <p className="text-sm text-text-light">
                    of ${project.fundingGoal.toLocaleString()}
                  </p>
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={`/projects/${project.id}`}>View Project</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/projects/${project.id}/edit`}>
                        Edit Project
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
