"use client";

import * as React from "react";
import { ProjectList } from "@/components/projects/project-list";
import { CreateProjectModal } from "@/components/projects/create-project-modal";
import { Button } from "@/components/ui/button";
import { Download, Plus, Search } from "lucide-react";
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

  const handleExportProjects = async () => {
    try {
      const res = await fetch(`/api/projects/export?workspaceId=${workspaceId}`);
      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `projects-${workspaceId}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to export projects:", err);
    }
  };

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (wsLoading || !workspaceId) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3 text-white/30">
          <div className="h-10 w-10 rounded-full border-2 border-[#00C896] border-t-transparent animate-spin" />
          <p className="text-sm">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-white/40">
            Manage and track all your projects.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExportProjects}
            className="gap-2 rounded-[14px]"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={() => setShowCreate(true)} className="gap-2 rounded-[14px] gradient-primary btn-glow">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 animate-slide-up stagger-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-[14px]"
          />
        </div>
      </div>

      {/* Projects */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 skeleton rounded-[22px]" />
          ))}
        </div>
      ) : (
        <div className="animate-slide-up stagger-2">
          <ProjectList
            projects={filtered}
            onCreateClick={() => setShowCreate(true)}
          />
        </div>
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
