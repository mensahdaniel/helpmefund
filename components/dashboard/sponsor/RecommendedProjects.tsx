import { useEffect, useState } from "react";
import { getRecommendedProjects } from "@/lib/firebase/projects";
import { ProjectCard } from "@/components/ProjectCard";

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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} recommended />
      ))}
    </div>
  );
}
