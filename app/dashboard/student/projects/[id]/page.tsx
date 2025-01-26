'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { getProject, fundProject } from '@/lib/firebase/projects';
import { Button } from '@/components/ui/button';
import { ProjectUpdates } from '@/components/projects/ProjectUpdates';
import { FundingModal } from '@/components/projects/FundingModal';
import { Project } from '@/types';
import { toast } from 'sonner';
import {ProjectsGridSkeleton as ProjectDetailsSkeleton} from '@/components/ProjectsGridSkeleton'

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFundingModal, setShowFundingModal] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const projectData = await getProject(params.id as string);
        setProject(projectData);
      } catch (error) {
        toast.error('Failed to load project');
        router.push('/projects');
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [params.id, router]);

  if (loading) {
    return <ProjectDetailsSkeleton />;
  }

  if (!project) {
    return null;
  }

  const progress = (project.currentFunding / project.fundingGoal) * 100;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Project Images */}
          <div className="space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {project.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={image}
                    alt={`${project.title} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Project Info */}
          <div className="space-y-8">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {project.category}
              </span>
              <h1 className="mt-4 text-3xl font-bold text-text-dark">
                {project.title}
              </h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-text-dark">
                Project Description
              </h2>
              <p className="text-text-light">{project.description}</p>
            </div>

            <div className="space-y-4 rounded-lg bg-background-dark p-6">
              <div className="flex justify-between">
                <span className="text-text-light">Raised</span>
                <span className="font-semibold text-text-dark">
                  ${project.currentFunding.toLocaleString()} of $
                  {project.fundingGoal.toLocaleString()}
                </span>
              </div>
              <div className="h-2 rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <Button
                onClick={() => setShowFundingModal(true)}
                className="w-full"
                disabled={!user}
              >
                {user ? 'Fund This Project' : 'Sign in to Fund'}
              </Button>
            </div>

            {/* Project Updates */}
            <ProjectUpdates projectId={project.id} updates={project.updates} />
          </div>
        </div>
      </div>

      {/* Funding Modal */}
      <FundingModal
        project={project}
        isOpen={showFundingModal}
        onClose={() => setShowFundingModal(false)}
        onFund={fundProject}
      />
    </div>
  );
}
