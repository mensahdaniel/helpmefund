"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Add this import
import { getAllProjects, updateProjectStatus } from "@/lib/firebase/admin";
import { Project, ProjectStatus } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MoreVertical, Search } from "lucide-react";
import { AdminProjectStatusBadge } from "@/components/admin/AdminProjectStatusBadge";
import { AdminProjectsTableSkeleton } from "@/components/admin/AdminProjectsTableSkeleton";

export default function AdminProjectsPage() {
  const router = useRouter(); // Add this
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const handleStatusChange = async (
    projectId: string,
    newStatus: ProjectStatus,
  ) => {
    try {
      await updateProjectStatus(projectId, newStatus);
      setProjects(
        projects.map((project) =>
          project.id === projectId ? { ...project, status: newStatus } : project
        ),
      );
      toast.success("Project status updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update project status");
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <AdminProjectsTableSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projects Management</h1>
        <p className="text-muted-foreground">Manage and monitor all projects</p>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Funding</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project: Project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.creatorName}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell>
                  <AdminProjectStatusBadge status={project.status} />
                </TableCell>
                <TableCell>
                  ${project.currentFunding.toLocaleString()}{" "}
                  / ${project.fundingGoal.toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(project.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(project.id, "active")}
                      >
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(project.id, "rejected")}
                      >
                        Reject
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(
                            `/dashboard/admin/projects/${project.id}`,
                          )}
                      >
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
