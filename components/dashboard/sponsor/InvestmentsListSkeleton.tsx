export function InvestmentsListSkeleton() {
  return (
    <div className="space-y-4">
      {/* Search and Sort Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-10 w-full max-w-sm animate-pulse rounded-md bg-gray-200" />
        <div className="h-10 w-[180px] animate-pulse rounded-md bg-gray-200" />
      </div>

      {/* Investment Items Skeleton */}
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="rounded-lg border bg-white p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Image Skeleton */}
              <div className="relative h-16 w-16 animate-pulse rounded-lg bg-gray-200" />

              {/* Content Skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
              </div>
            </div>

            {/* Button Skeleton */}
            <div className="h-9 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
