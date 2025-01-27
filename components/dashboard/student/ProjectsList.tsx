import { useMemo, useState } from "react";
import { Project } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Edit,
  ExternalLink,
  Filter,
  MoreVertical,
  Plus,
  Search,
  SortDesc,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectsListProps {
  projects: Project[];
  loading?: boolean;
}

type FilterStatus = "all" | "active" | "pending" | "completed" | "rejected";
type SortOption = "newest" | "oldest" | "funding" | "alphabetical";

export function ProjectsList({ projects, loading = false }: ProjectsListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Memoized filtered and sorted projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch = project.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "all" ||
          project.status === filterStatus;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime();
          case "oldest":
            return new Date(a.createdAt).getTime() -
              new Date(b.createdAt).getTime();
          case "funding":
            return b.currentFunding - a.currentFunding;
          case "alphabetical":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [projects, searchQuery, filterStatus, sortBy]);

  const handleDeleteProject = async (projectId: string) => {
    try {
      setIsDeleting(projectId);
      // Add delete project logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("Project deleted successfully");
      setDeleteConfirm(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(null);
    }
  };

  if (loading) {
    return <ProjectListSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select
            value={filterStatus}
            onValueChange={(value: FilterStatus) => setFilterStatus(value)}
          >
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortBy}
            onValueChange={(value: SortOption) => setSortBy(value)}
          >
            <SelectTrigger className="w-[160px]">
              <SortDesc className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="funding">Most Funded</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col p-6 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {project.title}
                  </h3>
                  <Badge variant={getStatusVariant(project.status)}>
                    {project.status}
                  </Badge>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {project.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">
                      {Math.round(
                        (project.currentFunding / project.fundingGoal) * 100,
                      )}%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <Link href={`/dashboard/student/projects/${project.id}/edit`}>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Project
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    href={`/projects/${project.id}`}
                    target="_blank"
                  >
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Public Page
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => setDeleteConfirm(project.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="rounded-full bg-primary/10 w-12 h-12 mx-auto flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-gray-500 mb-4">
            Create your first project to get started
          </p>
          <Link href="/dashboard/student/projects/new">
            <Button>Create New Project</Button>
          </Link>
        </div>
      )}

      {/* No Results State */}
      {projects.length > 0 && filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No projects match your search criteria
          </p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              disabled={isDeleting === deleteConfirm}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deleteConfirm && handleDeleteProject(deleteConfirm)}
              disabled={isDeleting === deleteConfirm}
            >
              {isDeleting === deleteConfirm ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Skeleton component for loading state
function ProjectListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="h-10 w-full max-w-md animate-pulse bg-gray-200 rounded-md" />
        <div className="flex gap-2">
          <div className="h-10 w-[160px] animate-pulse bg-gray-200 rounded-md" />
          <div className="h-10 w-[160px] animate-pulse bg-gray-200 rounded-md" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg border p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-2 w-full bg-gray-200 rounded animate-pulse" />
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to get badge variant based on status
function getStatusVariant(status: string) {
  switch (status) {
    case "active":
      return "success";
    case "pending":
      return "warning";
    case "rejected":
      return "destructive";
    case "completed":
      return "default";
    default:
      return "secondary";
  }
}
