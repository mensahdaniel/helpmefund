'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ImageUpload } from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { getProject, updateProject } from '@/lib/firebase/projects';
import { ProjectFormData } from '@/types';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';




const projectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  category: z.enum([
    'Technology',
    'Health',
    'Agriculture',
    'Education',
    'Environment',
  ]),
  fundingGoal: z.number().min(100, 'Minimum funding goal is $100'),
});

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    async function fetchProject() {
      try {
        const projectData = await getProject(params.id as string);

        // Check if the user owns this project
        if (projectData.createdBy !== user?.uid) {
          toast.error('You do not have permission to edit this project');
          router.push('/dashboard/projects');
          return;
        }

        setImages(projectData.images || []);
        reset({
          title: projectData.title,
          description: projectData.description,
          category: projectData.category,
          fundingGoal: projectData.fundingGoal,
        });
      } catch (error) {
        toast.error('Failed to load project');
        console.error(error);
        router.push('/dashboard/projects');
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchProject();
    }
  }, [params.id, user, router, reset]);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      const updatedData = {
        ...data,
        images,
        id: params.id,
      };

      await updateProject(params.id as string, updatedData);
      toast.success('Project updated successfully');
      router.push('/dashboard/projects');
    } catch (error) {
      toast.error('Failed to update project');
      console.error(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-2 text-text-light">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/projects"
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-dark">Edit Project</h1>
          <p className="text-text-light">Update your project details</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Project Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark">
              Project Title
            </label>
            <Input
              {...register('title')}
              placeholder="Enter your project title"
              className="input-field"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="input-field w-full"
              placeholder="Describe your project..."
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark">
              Category
            </label>
            <select {...register('category')} className="input-field w-full">
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Education">Education</option>
              <option value="Environment">Environment</option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Funding Goal */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark">
              Funding Goal ($)
            </label>
            <Input
              {...register('fundingGoal', { valueAsNumber: true })}
              type="number"
              min="100"
              className="input-field"
              placeholder="Enter funding goal"
            />
            {errors.fundingGoal && (
              <p className="text-sm text-red-500">
                {errors.fundingGoal.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark">
              Project Images
            </label>
            <ImageUpload
              value={images}
              onChange={setImages}
              maxImages={5}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving changes...' : 'Save changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/projects')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
