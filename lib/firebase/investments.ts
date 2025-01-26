import {
  collection,
  doc, // Add this import
  getDoc, // Add this import
  getDocs,
  query,
  where,
} from "firebase/firestore";
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

    const investments = [];

    for (const docSnapshot of querySnapshot.docs) {
      const investmentData = docSnapshot.data();

      // Get project details
      const projectRef = doc(db, "projects", investmentData.projectId);
      const projectSnap = await getDoc(projectRef);
      const projectData = projectSnap.exists() ? projectSnap.data() : null;

      investments.push({
        id: docSnapshot.id,
        ...investmentData,
        createdAt: investmentData.createdAt?.toDate(),
        projectTitle: projectData?.title || "Unnamed Project",
        projectImage: projectData?.images?.[0] || null,
        projectDescription: projectData?.description || null,
      });
    }

    return investments;
  } catch (error) {
    console.error("Error fetching investments:", error);
    return [];
  }
}
