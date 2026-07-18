"use client";

import { useRouter } from "next/navigation";
import type { Project } from "@/types";

type ProjectWithStats = Project & { taskCount: number; completedTaskCount: number };

export function useProjects() {
  const router = useRouter();

  const fetchProjects = async (workspaceId: string): Promise<ProjectWithStats[]> => {
    const res = await fetch(`/api/projects?workspaceId=${workspaceId}`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  };

  const createProject = async (data: {
    name: string;
    description: string;
    color: string;
    workspaceId: string;
  }) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create project");
    router.refresh();
    return res.json();
  };

  const deleteProject = async (id: string) => {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete project");
    router.refresh();
  };

  return { fetchProjects, createProject, deleteProject };
}
