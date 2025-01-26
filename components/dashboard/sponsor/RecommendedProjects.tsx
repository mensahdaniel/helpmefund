import { useEffect, useState } from "react";
import { getRecommendedProjects } from "@/lib/firebase/projects";
import { ProjectCard } from "@/components/ProjectCard";

export function RecommendedProjects({ userId }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommended() {
      const recommended = await getRecommendedProjects(userId);
      setProjects(recommended);
      setLoading(false);
    }
    fetchRecommended();
  }, [userId]);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-text-dark">
        Recommended Projects
      </h2>
      <div className="space-y-4">
        {loading ? <ProjectsSkeleton /> : (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}
