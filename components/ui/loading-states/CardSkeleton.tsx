export function CardSkeleton() {
  return (
    <div className="rounded-lg border p-4 shadow animate-pulse">
      <div className="aspect-video bg-gray-200 rounded-lg mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}
