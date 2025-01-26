"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface DashboardGuardProps {
  children: React.ReactNode;
  allowedRoles: ("student" | "sponsor" | "admin")[];
}

export function DashboardGuard({
  children,
  allowedRoles,
}: DashboardGuardProps) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
        return;
      }

      if (!userRole || !allowedRoles.includes(userRole as any)) {
        if (userRole) {
          router.push(`/dashboard/${userRole}`);
        } else {
          router.push("/login");
        }
      }
    }
  }, [user, userRole, loading, router, allowedRoles]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user || !userRole || !allowedRoles.includes(userRole as any)) {
    return null;
  }

  return <>{children}</>;
}
