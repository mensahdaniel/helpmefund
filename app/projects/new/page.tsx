"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImageUpload } from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { createProject } from "@/lib/firebase/projects";
import { ProjectFormData } from "@/types";

const projectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  category: z.enum([
    "Technology",
    "Health",
    "Agriculture",
    "Education",
    "Environment",
  ]),
  fundingGoal: z.number().min(100, "Minimum funding goal is $100"),
});

export default function NewProjectPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      const projectData = {
        ...data,
        images,
        createdBy: user?.uid,
        status: "pending",
      };

      await createProject(projectData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="card space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-text-dark">
              Create New Project
            </h1>
            <p className="mt-2 text-text-light">
              Share your project details to start raising funds.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Project Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">
                Project Title
              </label>
              <Input
                {...register("title")}
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
                {...register("description")}
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
              <select
                {...register("category")}
                className="input-field w-full"
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Education">Education</option>
                <option value="Environment">Environment</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Funding Goal */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-dark">
                Funding Goal ($)
              </label>
              <Input
                {...register("fundingGoal", { valueAsNumber: true })}
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

            <Button
              type="submit"
              className="btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Project..." : "Create Project"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
