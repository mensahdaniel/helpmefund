"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type UserRole = "student" | "sponsor" | "admin";

interface DashboardGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
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

      if (!userRole || !allowedRoles.includes(userRole as UserRole)) {
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

  if (!user || !userRole || !allowedRoles.includes(userRole as UserRole)) {
    return null;
  }

  return <>{children}</>;
}
