import { useEffect, useState } from "react";
import { formatRelativeDate } from "@/lib/utils";
import { getRecentActivities } from "@/lib/firebase/admin";
import { LoadingSpinner } from "@/components/ui/loading-spinner";


function RecentActivitiesSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 rounded-lg border p-4">
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-1/4 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RecentActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const data = await getRecentActivities();
        setActivities(data);
      } catch (error) {
        setError("Failed to load activities");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

  if (loading) return <RecentActivitiesSkeleton />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (activities.length === 0) return <div>No recent activities</div>;
