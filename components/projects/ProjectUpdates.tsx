"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ProjectUpdate } from "@/types";
import { formatRelativeDate } from "@/lib/utils"; // Updated import

interface ProjectUpdatesProps {
  projectId?: string;
  updates: ProjectUpdate[];
}

export function ProjectUpdates({ updates }: ProjectUpdatesProps) {
  const { user } = useAuth();
  const [showAll, setShowAll] = useState(false);

  const displayedUpdates = showAll ? updates : updates.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-dark">
          Project Updates
        </h2>
        {user && (
          <Button variant="outline" size="sm">
            Add Update
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {displayedUpdates.map((update) => (
          <div
            key={update.id}
            className="rounded-lg border border-border bg-white p-4"
          >
            <p className="text-text-light">{update.content}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-text-light">
              <span>{formatRelativeDate(update.createdAt)}</span>
            </div>
          </div>
        ))}

        {updates.length > 3 && (
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="w-full"
          >
            {showAll ? "Show Less" : `Show All Updates (${updates.length})`}
          </Button>
        )}
      </div>
    </div>
  );
}
