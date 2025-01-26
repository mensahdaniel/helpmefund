"use client";

import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectFilter } from "@/components/ProjectFilter";
import { ProjectsGridSkeleton } from "@/components/ProjectsGridSkeleton";

export default function ProjectsPage() {
  const [category, setCategory] = useState("all");
  const { projects, isLoading, error } = useProjects(category);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-text-dark sm:text-4xl">
              Discover Student Projects
            </h1>
            <p className="max-w-2xl text-text-light">
              Browse through innovative projects from students around the world
            </p>
          </div>

          {/* Filters */}
          <ProjectFilter
            selectedCategory={category}
            onCategoryChange={setCategory}
          />

          {/* Error State */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {isLoading
            ? <ProjectsGridSkeleton />
            : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
