import { AdminSidebar } from "@/components/admin/Sidebar";
import { AdminAuth } from "@/components/admin/AdminAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuth>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1">
          <main className="p-8">{children}</main>
        </div>
      </div>
    </AdminAuth>
  );
}
