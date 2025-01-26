"use client";

import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { DiscoverProjects } from "@/components/dashboard/sponsor/DiscoverProjects";

export default function DiscoverPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <main className="p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Discover Projects</h1>
          <p className="text-gray-500">
            Find and support innovative student projects
          </p>
        </div>
        <DiscoverProjects />
      </main>
    </div>
  );
}
