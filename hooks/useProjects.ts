import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Project } from "@/types";

export function useProjects(category: string = "all") {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let projectsRef = collection(db, "projects");
        let projectsQuery = projectsRef;

        if (category && category !== "all") {
          projectsQuery = query(projectsRef, where("category", "==", category));
        }

        const snapshot = await getDocs(projectsQuery);
        const fetchedProjects: Project[] = [];

        snapshot.forEach((doc) => {
          fetchedProjects.push({
            id: doc.id,
            ...doc.data(),
          } as Project);
        });

        setProjects(fetchedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [category]);

  return { projects, isLoading, error };
}
