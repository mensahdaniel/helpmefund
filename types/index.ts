export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  fundingGoal: number;
  currentFunding: number;
  createdBy: string;
  createdAt: Date;
  status: ProjectStatus;
  images: string[];
  updates: ProjectUpdate[];
}

export type ProjectCategory =
  | "Technology"
  | "Health"
  | "Agriculture"
  | "Education"
  | "Environment";

export type ProjectStatus =
  | "draft"
  | "pending"
  | "active"
  | "funded"
  | "completed";

export interface ProjectUpdate {
  id: string;
  content: string;
  createdAt: Date;
  images?: string[];
}

export interface AdminStats {
  totalUsers: number;
  activeProjects: number;
  totalFunding: number;
  growthRate: number;
}

export interface Activity {
  id: string;
  type: string;
  projectId?: string;
  userId?: string;
  description: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "sponsor" | "admin";
  createdAt: Date;
}
