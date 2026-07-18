"use client";

import * as React from "react";
import { ProjectList } from "@/components/projects/project-list";
import { CreateProjectModal } from "@/components/projects/create-project-modal";
import { Button } from "@/components/ui/button";
import { Plus, Search, FolderKanban } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/hooks/use-workspace";

export default function ProjectsPage() {
  const { workspaceId, loading: wsLoading } = useWorkspace();
  const [projects, setProjects] = React.useState<
    {
      id: string;
      name: string;
      description: string | null;
      color: string;
      icon: string;
      workspaceId: string;
      taskCount: number;
      completedTaskCount: number;
      createdAt: Date;
    }[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [showCreate, setShowCreate] = React.useState(false);
  const [creating, setCreating] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const loadProjects = React.useCallback(async () => {
    if (!workspaceId) return;
    try {
      const res = await fetch(`/api/projects?workspaceId=${workspaceId}`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  React.useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleCreate = async (data: {
    name: string;
    description: string;
    color: string;
    workspaceId: string;
  }) => {
    setCreating(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setShowCreate(false);
        loadProjects();
      }
    } catch (err) {
      console.error("Failed to create project:", err);
    } finally {
      setCreating(false);
    }
  };

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (wsLoading || !workspaceId) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <FolderKanban className="h-8 w-8 animate-pulse" />
          <p className="text-sm">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all your projects.
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <FolderKanban className="h-8 w-8 animate-pulse" />
            <p className="text-sm">Loading projects...</p>
          </div>
        </div>
      ) : (
        <ProjectList
          projects={filtered}
          onCreateClick={() => setShowCreate(true)}
        />
      )}

      <CreateProjectModal
        open={showCreate}
        onOpenChange={setShowCreate}
        onSubmit={handleCreate}
        workspaceId={workspaceId}
        loading={creating}
      />
    </div>
  );
}
