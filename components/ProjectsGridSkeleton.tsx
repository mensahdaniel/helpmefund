import { Card } from "./ui/card";

export function ProjectsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-video animate-pulse bg-gray-200" />
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-2 w-full animate-pulse rounded bg-gray-200" />
              <div className="flex justify-between">
                <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
