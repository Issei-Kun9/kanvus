"use client";

import { ProjectCard } from "./project-card";
import { FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";

interface ProjectListProps {
  projects: (Project & { taskCount: number; completedTaskCount: number })[];
  onCreateClick?: () => void;
}

export function ProjectList({ projects, onCreateClick }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <FolderKanban className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-1">No projects yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Create your first project to get started.
        </p>
        {onCreateClick && (
          <Button onClick={onCreateClick}>Create Project</Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
