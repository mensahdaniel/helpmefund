'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getProject } from '@/lib/firebase/projects';
import { Button } from '@/components/ui/button';
import { Project } from '@/types';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Clock,
  DollarSign,
  Users,
  AlertCircle,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const projectData = await getProject(params.id as string);

        // Check if the user owns this project
        if (projectData.createdBy !== user?.uid) {
          toast.error('You do not have permission to view this project');
          router.push('/dashboard/projects');
          return;
        }

        setProject(projectData);
      } catch (error) {
        toast.error('Failed to load project');
        router.push('/dashboard/projects');
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProject();
    }
  }, [params.id, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-2 text-text-light">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) return null;

  const progress = (project.currentFunding / project.fundingGoal) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/projects"
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text-dark">
              {project.title}
            </h1>
            <p className="text-text-light">Project Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/projects/${project.id}/edit`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit Project
            </Button>
          </Link>
          <Button variant="destructive" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete Project
          </Button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Image */}
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Overview of your project information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Description</h3>
                <p className="text-text-light">{project.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm text-text-light capitalize">
                      {project.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Goal</p>
                    <p className="text-sm text-text-light">
                      ${project.fundingGoal.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <p className="text-sm text-text-light">
                      {project.category}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Images */}
          {project.images.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Project Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {project.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-lg"
                    >
                      <Image
                        src={image}
                        alt={`Project image ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Funding Progress */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Funding Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-text-light">Progress</span>
                  <span className="text-sm font-medium">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">Raised</span>
                  <span className="font-medium">
                    ${project.currentFunding.toLocaleString()}
                  </span>
                </div>
              </div>

              {project.status === 'pending' && (
                <div className="rounded-lg bg-yellow-50 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <h4 className="font-medium text-yellow-800">
                        Pending Approval
                      </h4>
                      <p className="mt-1 text-sm text-yellow-700">
                        Your project is currently under review. We'll notify you
                        once it's approved.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {project.updates && project.updates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.updates.map((update) => (
                    <div
                      key={update.id}
                      className="rounded-lg border p-4"
                    >
                      <p className="text-sm text-text-light">
                        {update.content}
                      </p>
                      <p className="mt-2 text-xs text-text-light">
                        {new Date(update.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
