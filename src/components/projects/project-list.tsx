"use client";

import { ProjectCard } from "./project-card";
import { FolderKanban, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";

interface ProjectListProps {
  projects: (Project & { taskCount: number; completedTaskCount: number })[];
  onCreateClick?: () => void;
}

export function ProjectList({ projects, onCreateClick }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center glass-card rounded-[22px] p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-[16px] bg-white/[0.05] mb-4">
          <FolderKanban className="h-8 w-8 text-white/30" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
        <p className="text-sm text-white/40 mb-6">
          Create your first project to get started.
        </p>
        {onCreateClick && (
          <Button onClick={onCreateClick} className="gap-2 rounded-[14px] gradient-primary btn-glow">
            <Plus className="h-4 w-4" />
            Create Project
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <div key={project.id} className={`animate-slide-up stagger-${Math.min(i + 1, 8)}`}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
