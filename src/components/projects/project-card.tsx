"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { FolderKanban, ArrowRight } from "lucide-react";
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
      <Card className="group cursor-pointer hover-lift border-glow">
        {/* Gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-60 rounded-t-[22px]"
          style={{ background: `linear-gradient(to right, ${project.color}, ${project.color}80)` }}
        />
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[12px] transition-transform group-hover:scale-110"
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
                  <p className="text-sm text-white/40 line-clamp-1 mt-0.5">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-white/50 transition-all group-hover:translate-x-1" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/40">
                {project.completedTaskCount}/{project.taskCount} tasks
              </span>
              <span className="font-medium text-white/70">{progress}%</span>
            </div>
            <ProgressBar value={progress} className="h-1.5" />
            <div className="flex items-center justify-between text-xs text-white/30">
              <span>Created {formatDate(project.createdAt)}</span>
              <Badge variant="secondary" className="bg-white/[0.06] text-white/50 border-white/[0.08]">
                {project.taskCount} tasks
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
