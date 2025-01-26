import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./config";

export interface Comment {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
}

export async function getProjectComments(projectId: string) {
  try {
    const commentsRef = collection(db, "comments");
    const q = query(
      commentsRef,
      where("projectId", "==", projectId),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Comment[];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export async function addComment(comment: Omit<Comment, "id" | "createdAt">) {
  try {
    await addDoc(collection(db, "comments"), {
      ...comment,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}
