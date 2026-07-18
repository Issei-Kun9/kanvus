"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { FolderKanban, MoreHorizontal } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project & { taskCount: number; completedTaskCount: number };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const progress =
    project.taskCount > 0
      ? Math.round((project.completedTaskCount / project.taskCount) * 100)
      : 0;

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: project.color + "20" }}
              >
                <FolderKanban
                  className="h-5 w-5"
                  style={{ color: project.color }}
                />
              </div>
              <div>
                <CardTitle className="text-base">{project.name}</CardTitle>
                {project.description && (
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
            <button className="rounded-lg p-1 opacity-0 group-hover:opacity-100 hover:bg-muted transition-all">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {project.completedTaskCount}/{project.taskCount} tasks
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <ProgressBar value={progress} className="h-1.5" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Created {formatDate(project.createdAt)}</span>
              <Badge variant="secondary">{project.taskCount} tasks</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
