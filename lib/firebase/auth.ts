import { doc, setDoc } from "firebase/firestore";
import { db } from "./config";

export async function createUserProfile(userId: string, userData: {
  name: string;
  email: string;
  role?: "student" | "sponsor" | "admin";
}) {
  try {
    await setDoc(doc(db, "users", userId), {
      ...userData,
      role: userData.role || "student",
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
}
