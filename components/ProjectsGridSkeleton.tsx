export function ProjectsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="card animate-pulse space-y-4"
        >
          <div className="aspect-video rounded-lg bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full rounded bg-gray-200" />
            <div className="h-2 w-full rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
