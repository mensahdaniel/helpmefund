import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";
import { Activity, Project, ProjectStatus, User } from "@/types";
import { addActivity } from "./activities";

// Get admin statistics
export async function getAdminStats() {
  try {
    const projectsRef = collection(db, "projects");
    const usersRef = collection(db, "users");
    const donationsRef = collection(db, "donations");

    // Get total users
    const usersSnapshot = await getDocs(usersRef);
    const totalUsers = usersSnapshot.size;

    // Get active projects
    const activeProjectsQuery = query(
      projectsRef,
      where("status", "==", "active"),
    );
    const activeProjectsSnapshot = await getDocs(activeProjectsQuery);
    const activeProjects = activeProjectsSnapshot.size;

    // Get total funding
    const donationsSnapshot = await getDocs(donationsRef);
    const totalFunding = donationsSnapshot.docs.reduce(
      (sum, doc) => sum + doc.data().amount,
      0,
    );

    // Calculate growth rate (example: compare with last month)
    const lastMonthQuery = query(
      projectsRef,
      where("createdAt", ">=", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
    );
    const lastMonthSnapshot = await getDocs(lastMonthQuery);
    const growthRate = ((lastMonthSnapshot.size / activeProjects) * 100) - 100;

    return {
      totalUsers,
      activeProjects,
      totalFunding,
      growthRate,
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    throw error;
  }
}

export async function getAllProjects() {
  try {
    const projectsRef = collection(db, "projects");
    const projectsSnapshot = await getDocs(projectsRef);
    const projects = [];

    // Change 'doc' to 'docSnapshot' in the loop to avoid naming conflict
    for (const docSnapshot of projectsSnapshot.docs) {
      const projectData = docSnapshot.data();
      // Get creator name using the imported 'doc' function
      const creatorRef = doc(db, "users", projectData.createdBy);
      const creatorDoc = await getDoc(creatorRef);
      const creatorName = creatorDoc.data()?.name || "Unknown";

      projects.push({
        id: docSnapshot.id,
        ...projectData,
        creatorName,
        createdAt: projectData.createdAt?.toDate(),
      });
    }

    return projects;
  } catch (error) {
    console.error("Error fetching all projects:", error);
    throw error;
  }
}

export async function updateProjectStatus(
  projectId: string,
  status: ProjectStatus,
) {
  try {
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      status,
      updatedAt: serverTimestamp(),
    });

    // Log activity without userId
    await addActivity({
      type: "project_status_updated",
      projectId, // Include projectId
      description: `Project status updated to ${status}`,
    });
  } catch (error) {
    console.error("Error updating project status:", error);
    throw error;
  }
}

// Get pending projects
export async function getPendingProjects(): Promise<Project[]> {
  try {
    const projectsRef = collection(db, "projects");
    const pendingProjectsQuery = query(
      projectsRef,
      where("status", "==", "pending"),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(pendingProjectsQuery);
    const pendingProjects: Project[] = [];

    querySnapshot.forEach((doc) => {
      pendingProjects.push({
        id: doc.id,
        ...doc.data(),
      } as Project);
    });

    return pendingProjects;
  } catch (error) {
    console.error("Error fetching pending projects:", error);
    return [];
  }
}

// Approve project
export async function approveProject(projectId: string) {
  try {
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      status: "active",
      approvedAt: Timestamp.now(),
    });

    await addActivity({
      type: "project_approved",
      projectId,
      description: "Project approved by admin",
    });
  } catch (error) {
    console.error("Error approving project:", error);
    throw error;
  }
}

// Reject project
export async function rejectProject(projectId: string) {
  try {
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      status: "rejected",
      rejectedAt: Timestamp.now(),
    });

    await addActivity({
      type: "project_rejected",
      projectId,
      description: "Project rejected by admin",
    });
  } catch (error) {
    console.error("Error rejecting project:", error);
    throw error;
  }
}

// Get recent activities
export async function getRecentActivities(): Promise<Activity[]> {
  try {
    const activitiesRef = collection(db, "activities");
    const recentActivitiesQuery = query(
      activitiesRef,
      orderBy("createdAt", "desc"),
      limit(10),
    );

    const querySnapshot = await getDocs(recentActivitiesQuery);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const activities: any[] = [];

    querySnapshot.forEach((doc) => {
      activities.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      });
    });

    return activities;
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return [];
  }
}

// Get user management data
export async function getUsers(role?: string): Promise<User[]> {
  try {
    const usersRef = collection(db, "users");
    const usersQuery = role
      ? query(usersRef, where("role", "==", role))
      : query(usersRef);

    const querySnapshot = await getDocs(usersQuery);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const users: any[] = [];

    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      });
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Update user role
export async function updateUserRole(userId: string, role: string) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      role,
      updatedAt: Timestamp.now(),
    });

    await addActivity({
      type: "user_role_updated",
      userId, // Include userId
      description: `User role updated to ${role}`,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
}

// Get admin dashboard data
export async function getAdminDashboardData() {
  try {
    const stats = await getAdminStats();
    const pendingProjects = await getPendingProjects();
    const recentActivities = await getRecentActivities();
    const users = await getUsers();

    return {
      stats,
      pendingProjects,
      recentActivities,
      users,
    };
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    throw error;
  }
}
