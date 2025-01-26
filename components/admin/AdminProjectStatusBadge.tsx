import { ProjectStatus } from "@/types";
import { Badge } from "@/components/ui/badge";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  active: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
  funded: "bg-purple-100 text-purple-800",
};

export function AdminProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge className={statusStyles[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
