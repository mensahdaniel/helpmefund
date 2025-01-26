import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";
import { Investment } from "@/types";

export async function getSponsorInvestments(
  userId: string,
): Promise<Investment[]> {
  try {
    if (!userId) return [];

    const investmentsRef = collection(db, "investments");
    const q = query(investmentsRef, where("sponsorId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as Investment[];
  } catch (error) {
    console.error("Error fetching investments:", error);
    return [];
  }
}
