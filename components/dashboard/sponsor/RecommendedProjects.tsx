import { useEffect, useState } from "react";
import { getRecommendedProjects } from "@/lib/firebase/projects";
import { ProjectCard, ProjectCardSkeleton } from "@/components/ProjectCard";
import { Project } from "@/types";

export function RecommendedProjectsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => <ProjectCardSkeleton key={i} />)}
    </div>
  );
}

interface RecommendedProjectsProps {
  userId: string | undefined;
}

export function RecommendedProjects({ userId }: RecommendedProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommended() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getRecommendedProjects(userId);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching recommended projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommended();
  }, [userId]);

  if (loading) return <RecommendedProjectsSkeleton />;

  if (projects.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">No recommended projects available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} recommended />
      ))}
    </div>
  );
}
