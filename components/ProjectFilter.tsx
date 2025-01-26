import { ProjectCategory } from "@/types";
import { Button } from "./ui/button";

interface ProjectFilterProps {
  selectedCategory: ProjectCategory | "all";
  onCategoryChange: (category: ProjectCategory | "all") => void;
}

const categories: (ProjectCategory | "all")[] = [
  "all",
  "Technology",
  "Health",
  "Agriculture",
  "Education",
  "Environment",
];

export function ProjectFilter({
  selectedCategory,
  onCategoryChange,
}: ProjectFilterProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-text-dark">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onCategoryChange(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            className="capitalize"
          >
            {category === "all" ? "All Projects" : category}
          </Button>
        ))}
      </div>
    </div>
  );
}
