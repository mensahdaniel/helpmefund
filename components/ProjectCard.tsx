import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-lg border animate-pulse">
      <div className="aspect-video bg-gray-200" />
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-12 bg-gray-200 rounded" />
          </div>
          <div className="h-2 w-full bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps extends Project {
  recommended?: boolean;
}

export function ProjectCard({
  fundingGoal,
  currentFunding,
  images,
  recommended,
}: ProjectCardProps) {
  const progress = (currentFunding / fundingGoal) * 100;

  return (
    <Link href={`/projects/${id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-video">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {recommended && (
            <Badge className="absolute right-2 top-2">
              Recommended
            </Badge>
          )}
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-text-light line-clamp-2">
              {description}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-light">Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-light">Raised</span>
              <span>${currentFunding.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
