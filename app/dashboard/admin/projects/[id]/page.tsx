'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getProject } from '@/lib/firebase/projects';
import { updateProjectStatus } from '@/lib/firebase/admin';
import { Button } from '@/components/ui/button';
import { Project, ProjectStatus } from '@/types';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AdminProjectStatusBadge } from '@/components/admin/AdminProjectStatusBadge';

export default function AdminProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const projectData = await getProject(params.id as string);
        setProject(projectData);
      } catch (error) {
        toast.error('Failed to load project');
        console.error(error)
        router.push('/dashboard/admin/projects');
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProject();
    }
  }, [params.id, user, router]);

  const handleStatusChange = async (newStatus: ProjectStatus) => {
    if (!project) return;

    try {
      await updateProjectStatus(project.id, newStatus);
      setProject({ ...project, status: newStatus });
      toast.success(`Project ${newStatus === 'active' ? 'approved' : 'rejected'}`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${newStatus === 'active' ? 'approve' : 'reject'} project`);
    }
  };

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
            href="/dashboard/admin/projects"
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text-dark">
              {project.title}
            </h1>
            <p className="text-text-light">Project Review</p>
          </div>
        </div>
        <div className="flex gap-2">
          {project.status === 'pending' && (
            <>
              <Button
                onClick={() => handleStatusChange('active')}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4" />
                Approve Project
              </Button>
              <Button
                onClick={() => handleStatusChange('rejected')}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <XCircle className="h-4 w-4" />
                Reject Project
              </Button>
            </>
          )}
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
                Review project information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Description</h3>
                <p className="text-text-light">{project.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <AdminProjectStatusBadge status={project.status} />
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
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-text-light">
                      {new Date(project.createdAt).toLocaleDateString()}
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
            </CardContent>
          </Card>

          {/* Creator Info */}
          <Card>
            <CardHeader>
              <CardTitle>Creator Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-text-light">{project.creatorName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-text-light">{project.creatorEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
