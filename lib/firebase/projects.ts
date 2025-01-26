import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit, // Add this
  orderBy, // Add this
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./config";
import { Project } from "@/types";
import { addActivity } from "./activities";
import { createNotification } from "./notifications";

// Get User Project function
export async function getUserProjects(userId: string): Promise<Project[]> {
  try {
    const projectsRef = collection(db, "projects");
    const userProjectsQuery = query(
      projectsRef,
      where("createdBy", "==", userId),
    );

    const querySnapshot = await getDocs(userProjectsQuery);
    const userProjects: Project[] = [];

    querySnapshot.forEach((doc) => {
      userProjects.push({
        id: doc.id,
        ...doc.data(),
      } as Project);
    });

    return userProjects;
  } catch (error) {
    console.error("Error fetching user projects:", error);
    throw error;
  }
}

// Create project function
export async function createProject(projectData: Partial<Project>) {
  try {
    const projectsRef = collection(db, "projects");
    // Only store the image URLs in Firestore
    const newProject = {
      ...projectData,
      createdAt: Timestamp.now(),
      currentFunding: 0,
      updates: [],
      status: "pending",
      // Make sure images are URLs
      images: projectData.images || [],
    };

    const docRef = await addDoc(projectsRef, newProject);
    return { id: docRef.id, ...newProject };
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

export async function updateProject(projectId: string, data: Partial<Project>) {
  try {
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      title: data.title,
      description: data.description,
      category: data.category,
      fundingGoal: data.fundingGoal,
      images: data.images,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

export async function getProject(projectId: string) {
  try {
    const docRef = doc(db, "projects", projectId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Project not found");
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
}

export async function fundProject(projectId: string, amount: number) {
  try {
    const projectRef = doc(db, "projects", projectId);
    const investmentsRef = collection(db, "investments");

    // First create the investment document
    await addDoc(investmentsRef, {
      projectId,
      sponsorId: auth.currentUser?.uid,
      amount,
      createdAt: Timestamp.now(),
      status: "completed",
    });

    // Then update the project's funding
    await updateDoc(projectRef, {
      currentFunding: increment(amount),
      sponsors: arrayUnion(auth.currentUser?.uid),
    });

    // Create an activity record
    await addActivity({
      type: "project_funded",
      projectId,
      userId: auth.currentUser?.uid,
      description: `Project received funding of $${amount}`,
    });

    // Create a notification for the project creator
    const projectDoc = await getDoc(projectRef);
    const projectData = projectDoc.data();

    if (projectData?.createdBy) {
      await createNotification({
        userId: projectData.createdBy,
        type: "funding_received",
        title: "New Funding Received",
        message:
          `Your project "${projectData.title}" received $${amount} in funding!`,
      });
    }
  } catch (error) {
    console.error("Error funding project:", error);
    throw error;
  }
}

export async function addProjectUpdate(
  projectId: string,
  update: { content: string; images?: string[] },
) {
  try {
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      updates: arrayUnion({
        id: crypto.randomUUID(),
        ...update,
        createdAt: Timestamp.now(),
      }),
    });
  } catch (error) {
    console.error("Error adding update:", error);
    throw error;
  }
}

// Add this function to get all projects
export async function getProjects(category?: string) {
  try {
    const projectsRef = collection(db, "projects");
    const querySnapshot = await getDocs(
      category && category !== "all"
        ? query(projectsRef, where("category", "==", category))
        : projectsRef,
    );

    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() } as Project);
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export async function getRecommendedProjects(userId: string) {
  if (!userId) return [];

  try {
    const projectsRef = collection(db, "projects");
    const q = query(
      projectsRef,
      where("status", "==", "active"),
      orderBy("createdAt", "desc"),
      limit(3),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    }));
  } catch (error) {
    console.error("Error getting recommended projects:", error);
    return [];
  }
}

export async function getActiveProjects(): Promise<Project[]> {
  try {
    const projectsRef = collection(db, "projects");
    const q = query(
      projectsRef,
      where("status", "==", "active"),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];

    querySnapshot.forEach((doc) => {
      projects.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      } as Project);
    });

    return projects;
  } catch (error) {
    console.error("Error fetching active projects:", error);
    return [];
  }
}
