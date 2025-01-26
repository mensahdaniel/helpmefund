import { DashboardGuard } from "@/components/shared/DashboardGuard";
import { DashboardSidebar } from "@/components/shared/Sidebar";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardGuard allowedRoles={["student"]}>
      <div className="h-screen flex bg-background">
        <div className="fixed inset-y-0">
          <DashboardSidebar />
        </div>
        <div className="flex-1 ml-64">
          <main className="h-screen overflow-y-auto p-8">{children}</main>
        </div>
      </div>
    </DashboardGuard>
  );
}
