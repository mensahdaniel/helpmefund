import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./config"; // Import auth
import { addActivity } from "./activities"; // Import addActivity function

export async function createUserProfile(userId: string, userData: {
  name: string;
  email: string;
  role?: "student" | "sponsor" | "admin";
}) {
  try {
    // Check if profile already exists
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return;
    }

    // Create new profile
    await setDoc(doc(db, "users", userId), {
      ...userData,
      role: userData.role || "student",
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: auth.currentUser?.emailVerified || false,
      photoURL: auth.currentUser?.photoURL || null,
    });

    // Create activity
    await addActivity({
      type: "user_created",
      userId,
      description: `New ${userData.role || "student"} account created`,
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
}

export async function updateUserProfile(userId: string, data: {
  displayName?: string;
  notifications?: {
    email: boolean;
    push: boolean;
  };
}) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, data);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

export async function getUserRole(userId: string) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return null;
  } catch (error) {
    console.error("Error getting user role:", error);
    throw error;
  }
}

export async function isProfileComplete(userId: string): Promise<boolean> {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.exists() && !!userDoc.data()?.role;
  } catch (error) {
    console.error("Error checking profile completeness:", error);
    return false;
  }
}
