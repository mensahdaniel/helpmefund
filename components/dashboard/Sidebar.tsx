"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  FolderOpen,
  LayoutDashboard,
  LogOut,
  PieChart,
  Plus,
  Settings,
  Users,
} from "lucide-react";

const studentLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "My Projects", icon: FolderOpen },
  { href: "/projects/new", label: "Create Project", icon: Plus },
];

const sponsorLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/investments", label: "My Investments", icon: PieChart },
  { href: "/projects", label: "Browse Projects", icon: FolderOpen },
];

const adminLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, userRole, logout } = useAuth();

  const links = userRole === "admin"
    ? adminLinks
    : userRole === "sponsor"
    ? sponsorLinks
    : studentLinks;

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r border-border bg-white/80 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <Link href="/" className="text-xl font-bold text-primary">
            HelpMeFund
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === link.href
                    ? "bg-primary text-white"
                    : "text-text-light hover:bg-primary/10 hover:text-primary",
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex-1">
              <p className="text-sm font-medium">{user?.displayName}</p>
              <p className="text-xs text-text-light">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
