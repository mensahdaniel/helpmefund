"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function DashboardPage() {
  const { userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && userRole) {
      router.push(`/dashboard/${userRole}`);
    }
  }, [userRole, loading, router]);

  return null;
}
