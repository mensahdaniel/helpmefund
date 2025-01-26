export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  fundingGoal: number;
  currentFunding: number;
  createdBy: string;
  creatorName?: string;
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
  | "pending"
  | "active"
  | "rejected"
  | "completed"
  | "funded";

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

export interface Donation {
  id: string;
  amount: number;
  projectId: string;
  createdAt: Date;
  userId: string;
}

export interface Notification {
  id: string;
  userId: string;
  type:
    | "project_update"
    | "funding_received"
    | "project_approved"
    | "project_rejected"
    | "account_created"; // Add this new type
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  data?: any;
}

export interface Investment {
  id: string;
  sponsorId: string;
  projectId: string;
  amount: number;
  createdAt: Date;
  // Add these properties
  projectTitle?: string;
  projectImage?: string;
  projectDescription?: string;
}
