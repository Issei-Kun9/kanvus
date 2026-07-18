"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { KanbanBoard } from "@/components/projects/kanban-board";
import { TaskDetail } from "@/components/tasks/task-detail";
import { CreateTaskModal } from "@/components/tasks/create-task-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import type { Task, TaskStatus, TaskPriority } from "@/types";

interface ProjectData {
  id: string;
  name: string;
  description: string | null;
  color: string;
  tasks: (Task & {
    assignee?: { id: string; name: string | null; image: string | null } | null;
    creator?: { id: string; name: string | null; image: string | null };
    labels?: { label: { id: string; name: string; color: string } }[];
    _count?: { comments: number };
  })[];
  labels: { id: string; name: string; color: string }[];
  workspace: {
    members: { user: { id: string; name: string | null; image: string | null } }[];
  };
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = React.useState<ProjectData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [showCreateTask, setShowCreateTask] = React.useState(false);
  const [creating, setCreating] = React.useState(false);
  const [aiSuggestion, setAiSuggestion] = React.useState<string>("");
  const [search, setSearch] = React.useState("");

  const loadProject = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data);
      } else {
        router.push("/projects");
      }
    } catch (err) {
      console.error("Failed to load project:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId, router]);

  React.useEffect(() => {
    loadProject();
  }, [loadProject]);

  const handleTaskMove = async (
    taskId: string,
    newStatus: TaskStatus,
    newOrder: number
  ) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, order: newOrder }),
      });
    } catch (err) {
      console.error("Failed to move task:", err);
      loadProject();
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setAiSuggestion("");
  };

  const handleCreateTask = async (data: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assigneeId?: string;
    dueDate?: string;
  }) => {
    setCreating(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, projectId }),
      });
      if (res.ok) {
        setShowCreateTask(false);
        loadProject();
      }
    } catch (err) {
      console.error("Failed to create task:", err);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateTask = async (data: Partial<Task>) => {
    if (!selectedTask) return;
    try {
      const res = await fetch(`/api/tasks/${selectedTask.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const updated = await res.json();
        setSelectedTask(updated);
        loadProject();
      }
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleAddComment = async (content: string) => {
    if (!selectedTask) return;
    try {
      const res = await fetch(`/api/tasks/${selectedTask.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: content }),
      });
      if (res.ok) {
        loadProject();
      }
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const handleAiSuggest = async () => {
    if (!selectedTask) return;
    setAiSuggestion("Analyzing task priority...");
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Suggest a priority for this task: "${selectedTask.title}" - ${selectedTask.description || "No description"}. Explain briefly why.`,
          workspaceId: project?.workspace ? "default" : "default",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiSuggestion(data.response);
      }
    } catch {
      setAiSuggestion("Failed to get AI suggestion. Please try again.");
    }
  };

  const filteredTasks = search
    ? (project?.tasks || []).filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      )
    : project?.tasks || [];

  const teamMembers =
    project?.workspace?.members?.map((m) => m.user) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: project.color + "20" }}
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: project.color }}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">{project.name}</h1>
            {project.description && (
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Filter tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 h-9"
            />
          </div>
          <Button
            onClick={() => setShowCreateTask(true)}
            className="gap-2"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Labels */}
      {project.labels.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {project.labels.map((label) => (
            <Badge
              key={label.id}
              variant="outline"
              style={{
                borderColor: label.color + "40",
                color: label.color,
              }}
            >
              {label.name}
            </Badge>
          ))}
        </div>
      )}

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <KanbanBoard
          tasks={filteredTasks}
          onTaskMove={handleTaskMove}
          onTaskClick={handleTaskClick}
        />
      </div>

      {/* Modals */}
      <CreateTaskModal
        open={showCreateTask}
        onOpenChange={setShowCreateTask}
        onSubmit={handleCreateTask}
        projectId={projectId}
        teamMembers={teamMembers}
        loading={creating}
      />

      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          open={!!selectedTask}
          onOpenChange={(open) => !open && setSelectedTask(null)}
          onUpdate={handleUpdateTask}
          onAddComment={handleAddComment}
          onAiSuggest={handleAiSuggest}
          aiSuggestion={aiSuggestion}
          teamMembers={teamMembers}
        />
      )}
    </div>
  );
}
