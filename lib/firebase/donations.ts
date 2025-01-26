import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./config";

export async function getDonations(projectIds: string[]) {
  try {
    if (projectIds.length === 0) return [];

    const donationsRef = collection(db, "donations");
    const q = query(
      donationsRef,
      where("projectId", "in", projectIds),
      orderBy("createdAt", "desc"),
      limit(10),
    );

    const querySnapshot = await getDocs(q);
    const donations: any[] = [];

    querySnapshot.forEach((doc) => {
      donations.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      });
    });

    return donations;
  } catch (error) {
    console.error("Error fetching donations:", error);
    throw error;
  }
}
