export function AdminProjectsTableSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-1/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="rounded-lg border">
        <div className="grid grid-cols-7 gap-4 border-b p-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-4 animate-pulse rounded bg-gray-200" />
          ))}
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-7 gap-4 border-b p-4">
            {[...Array(7)].map((_, j) => (
              <div key={j} className="h-4 animate-pulse rounded bg-gray-100" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
