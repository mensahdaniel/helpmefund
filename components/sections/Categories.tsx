import Link from "next/link";
import { ProjectCategory } from "@/types";

export function Categories() {
  const categories: ProjectCategory[] = [
    "Technology",
    "Health",
    "Agriculture",
    "Education",
    "Environment",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Project Categories</h2>
          <p className="text-gray-600">Browse projects by category</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/projects?category=${category.toLowerCase()}`}
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
            >
              <div className="aspect-video p-8">
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <p className="text-gray-600">
                  Discover {category.toLowerCase()} projects
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
