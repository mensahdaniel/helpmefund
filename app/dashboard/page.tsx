'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserProjects } from '@/lib/firebase/projects';
import { ProjectStats } from '@/components/dashboard/ProjectStats';
import { RecentDonations } from '@/components/dashboard/RecentDonations';
import { ProjectsTable } from '@/components/dashboard/ProjectsTable';
import { Project } from '@/types';

export default function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      if (user) {
        try {
          const userProjects = await getUserProjects(user.uid);
          setProjects(userProjects);
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchProjects();
  }, [user]);

  if (!user) {
    return null; // Or redirect to login
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Dashboard</h1>
        <p className="text-text-light">
          Welcome back, {user?.displayName || "Student"}
        </p>
      </div>

      <ProjectStats projects={projects} />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-text-dark">
            Your Projects
          </h2>
          <ProjectsTable projects={projects} loading={loading} />
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-text-dark">
            Recent Donations
          </h2>
          <RecentDonations projectIds={projects.map((p) => p.id)} />
        </div>
      </div>
    </div>
  );
}
