"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  Activity,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  PieChart,
  Plus,
  Settings,
  Users,
} from "lucide-react";

// Define navigation items based on user role
const studentLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "My Projects", icon: FolderOpen },
  { href: "/projects/new", label: "Create Project", icon: Plus },
];

const sponsorLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "/dashboard/sponsor/investments",
    label: "My Investments",
    icon: PieChart,
  },
  {
    href: "/dashboard/sponsor/discover",
    label: "Discover Projects",
    icon: Activity,
  },
];

const adminLinks = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
];

// Common links that appear at the bottom for all users
const commonLinks = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout, userRole = "student" } = useAuth();

  // Select navigation items based on user role
  const navigationLinks = userRole === "admin"
    ? adminLinks
    : userRole === "sponsor"
    ? sponsorLinks
    : studentLinks;

  const isActivePath = (path: string) => {
    if (path === "/dashboard") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const NavLink = ({ href, label, icon: Icon }) => {
    const isActive = isActivePath(href);

    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
          "hover:bg-primary/10 hover:text-primary",
          isActive
            ? "bg-primary text-white hover:bg-primary hover:text-white"
            : "text-text-light",
        )}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 h-screen bg-white/80 border-r border-border backdrop-blur-xl">
      <div className="flex h-full flex-col">
        {/* Logo/Brand */}
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">HelpMeFund</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <div className="space-y-1">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
              />
            ))}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-border p-4">
          {/* Settings and other common links */}
          <div className="space-y-1">
            {commonLinks.map((link) => <NavLink key={link.href} {...link} />)}
          </div>

          {/* User Profile & Logout */}
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2">
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">
                  {user?.displayName || "User"}
                </p>
                <p className="truncate text-xs text-text-light">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
