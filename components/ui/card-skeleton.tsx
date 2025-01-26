export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-border p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
