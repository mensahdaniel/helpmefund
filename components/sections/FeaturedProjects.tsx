'use client'
import { useProjects } from "@/hooks/useProjects";
import { ProjectCard } from "../ProjectCard";

export function FeaturedProjects() {
  const { projects, isLoading } = useProjects("all", { limit: 3 });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-600">Discover innovative student projects</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
