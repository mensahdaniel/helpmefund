import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "./config";

export async function addActivity({
  type,
  userId,
  projectId,
  description,
}: {
  type: string;
  userId?: string;
  projectId?: string;
  description: string;
}) {
  try {
    if (!auth.currentUser) {
      throw new Error("User must be authenticated to add activity");
    }

    const activitiesRef = collection(db, "activities");

    const activityData = {
      type,
      description,
      createdAt: Timestamp.now(),
      createdBy: auth.currentUser.uid,
      ...(userId && { userId }),
      ...(projectId && { projectId }),
    };

    await addDoc(activitiesRef, activityData);
  } catch (error) {
    console.error("Error adding activity:", error);
    throw error;
  }
}
