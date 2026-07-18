"use client";

import { useRouter } from "next/navigation";
import type { Task, TaskStatus } from "@/types";

export function useTasks() {
  const router = useRouter();

  const fetchTasks = async (projectId: string): Promise<Task[]> => {
    const res = await fetch(`/api/tasks?projectId=${projectId}`);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  };

  const createTask = async (data: {
    title: string;
    description?: string;
    projectId: string;
    status?: TaskStatus;
    priority?: string;
    assigneeId?: string;
    dueDate?: string;
    labelIds?: string[];
  }) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create task");
    router.refresh();
    return res.json();
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  };

  const deleteTask = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete task");
    router.refresh();
  };

  return { fetchTasks, createTask, updateTask, deleteTask };
}
