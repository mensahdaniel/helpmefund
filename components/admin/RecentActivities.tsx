import { useEffect, useState } from "react";
import { formatRelativeDate } from "@/lib/utils";
import { getRecentActivities } from "@/lib/firebase/admin";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function RecentActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      const data = await getRecentActivities();
      setActivities(data);
      setLoading(false);
    }
    fetchActivities();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex gap-4 rounded-lg border p-4">
          <div className="flex-1">
            <p className="text-sm">{activity.description}</p>
            <p className="text-xs text-text-light">
              {formatRelativeDate(activity.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
