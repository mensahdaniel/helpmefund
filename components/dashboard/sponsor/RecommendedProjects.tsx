import { useEffect, useState } from "react";
import { getRecommendedProjects } from "@/lib/firebase/projects";
import { ProjectCard, ProjectCardSkeleton } from "@/components/ProjectCard";

export function RecommendedProjectsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => <ProjectCardSkeleton key={i} />)}
    </div>
  );
}

export function RecommendedProjects({ userId }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommended() {
      const data = await getRecommendedProjects(userId);
      setProjects(data);
      setLoading(false);
    }
    fetchRecommended();
  }, [userId]);

  if (loading) return <RecommendedProjectsSkeleton />;

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} recommended />
      ))}
    </div>
  );
}
