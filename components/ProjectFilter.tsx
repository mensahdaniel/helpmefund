import { Button } from "@/components/ui/button";
import { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

const categories: (ProjectCategory | "all")[] = [
  "all",
  "Technology",
  "Health",
  "Agriculture",
  "Education",
  "Environment",
];

interface ProjectFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function ProjectFilter(
  { selectedCategory, onCategoryChange }: ProjectFilterProps,
) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={cn(
              "transition-all",
              selectedCategory === category
                ? "bg-primary text-white"
                : "hover:bg-primary/10 hover:text-primary",
            )}
            onClick={() => onCategoryChange(category)}
          >
            {category === "all" ? "All Projects" : category}
          </Button>
        ))}
      </div>
    </div>
  );
}
