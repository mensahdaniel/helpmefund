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
