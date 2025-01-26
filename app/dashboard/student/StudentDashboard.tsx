use client';

import { useEffect, useState } from 'react';
import { getUserProjects } from '@/lib/firebase/projects';
import { ProjectStats } from './ProjectStats';
import { ProjectsTable } from './ProjectsTable';
import { RecentDonations } from './RecentDonations';
import { ProjectActivity } from './ProjectActivity';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  DollarSign,
} from 'lucide-react';

export function StudentDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const data = await getUserProjects(user.uid);
        setProjects(data);
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  const stats = [
    {
      title: 'Total Projects',
      value: projects.length,
      icon: LayoutDashboard,
    },
    {
      title: 'Active Projects',
      value: projects.filter(p => p.status === 'active').length,
      icon: TrendingUp,
    },
    {
      title: 'Total Sponsors',
      value: projects.reduce((acc, p) => acc + (p.sponsors?.length || 0), 0),
      icon: Users,
    },
    {
      title: 'Total Funding',
      value: `$${projects.reduce((acc, p) => acc + p.currentFunding, 0).toLocaleString()}`,
      icon: DollarSign,
      trend: {
        value: 12,
        isPositive: true,
        label: 'vs last month',
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.displayName}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <ProjectsTableSkeleton />
              ) : (
                <ProjectsTable projects={projects.slice(0, 5)} />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectActivity projectIds={projects.map(p => p.id)} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentDonations projectIds={projects.map(p => p.id)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Funding Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <FundingProgress projects={projects} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
