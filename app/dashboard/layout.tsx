"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (!loading && user && userRole) {
      const correctPath = `/dashboard/${userRole}`;
      if (pathname === "/dashboard") {
        router.push(correctPath);
      } else if (!pathname.startsWith(correctPath)) {
        router.push(correctPath);
      }
    }
  }, [user, userRole, loading, router, pathname]);

  if (!user || !userRole) {
    return null;
  }

  return <>{children}</>;
}
