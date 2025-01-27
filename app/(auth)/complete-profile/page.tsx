"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserProfile } from "@/lib/firebase/auth";
import { createNotification } from "@/lib/firebase/notifications"; // Add this import
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { auth } from "@/lib/firebase/config";

export default function CompleteProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelection = async (role: "student" | "sponsor") => {
    if (!uid || !auth.currentUser) {
      toast.error("Authentication error");
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      await createUserProfile(uid, {
        role,
        email: auth.currentUser.email!,
        name: auth.currentUser.displayName ||
          auth.currentUser.email!.split("@")[0],
      });

      // Create welcome notification with read property
      await createNotification({
        userId: uid,
        type: "project_update",
        title: "Welcome to HelpMeFund!",
        message: `Your account has been created as a ${role}. Get started by ${
          role === "student"
            ? "creating your first project"
            : "browsing projects"
        }.`,
        read: false,
      });

      toast.success("Profile completed!");
      router.push(`/dashboard/${role}`);
    } catch (error) {
      console.error(error);
      toast.error("Could not complete profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Complete Your Profile</h1>
        <p className="text-muted-foreground">
          Choose your account type to continue
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => handleRoleSelection("student")}
          disabled={isLoading}
          className="h-32"
        >
          <div className="space-y-2">
            <h3 className="font-medium">Student</h3>
            <p className="text-sm text-muted-foreground">
              Create and manage projects
            </p>
          </div>
        </Button>

        <Button
          onClick={() => handleRoleSelection("sponsor")}
          disabled={isLoading}
          className="h-32"
        >
          <div className="space-y-2">
            <h3 className="font-medium">Sponsor</h3>
            <p className="text-sm text-muted-foreground">
              Fund student projects
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
}
