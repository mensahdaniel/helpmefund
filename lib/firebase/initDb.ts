import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./config";

export async function initializeDatabase() {
  try {
    // Create a sample project to initialize the collection
    const projectsRef = collection(db, "projects");
    await setDoc(doc(projectsRef, "sample"), {
      title: "Sample Project",
      description: "This is a sample project",
      category: "Technology",
      fundingGoal: 1000,
      currentFunding: 0,
      createdAt: new Date(),
      status: "active",
    });
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}
