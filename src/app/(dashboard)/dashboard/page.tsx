"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import {
  FolderKanban,
  ArrowRight,
  TrendingUp,
  Users,
  Plus,
  Sparkles,
  Clock,
} from "lucide-react";
import { useWorkspace } from "@/hooks/use-workspace";
import dynamic from "next/dynamic";

const ActivityBarChart = dynamic(
  () => import("@/components/dashboard/charts").then((m) => m.ActivityBarChart),
  { ssr: false }
);
const TaskPieChart = dynamic(
  () => import("@/components/dashboard/charts").then((m) => m.TaskPieChart),
  { ssr: false }
);

const PIE_COLORS = ["#7C3AED", "#10B981", "#EF4444", "#F59E0B", "#2563EB"];

interface Task {
  status: string;
  dueDate: string | null;
  createdAt: string;
  priority: string;
}

interface ProjectStats {
  id: string;
  name: string;
  taskCount: number;
  completedTaskCount: number;
  color: string;
  tasks: Task[];
}

interface TeamMember {
  id: string;
  name: string | null;
  image: string | null;
  role: string;
}

function getWeeklyData(tasks: Task[]) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const counts = [0, 0, 0, 0, 0, 0, 0];
  for (const t of tasks) {
    const d = new Date(t.createdAt);
    counts[d.getDay()]++;
  }
  return [1, 2, 3, 4, 5, 6, 0].map((i) => ({ day: dayNames[i], tasks: counts[i] }));
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const { workspaceId, loading: wsLoading } = useWorkspace();
  const [stats, setStats] = React.useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
  });
  const [recentProjects, setRecentProjects] = React.useState<ProjectStats[]>([]);
  const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([]);
  const [weeklyData, setWeeklyData] = React.useState<{ day: string; tasks: number }[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (wsLoading || !workspaceId) return;

    const loadDashboard = async () => {
      try {
        const [projectsRes, membersRes] = await Promise.all([
          fetch(`/api/projects?workspaceId=${workspaceId}`),
          fetch(`/api/workspaces/${workspaceId}/members`),
        ]);

        if (projectsRes.ok) {
          const projects: ProjectStats[] = await projectsRes.json();
          setRecentProjects(projects.slice(0, 5));

          let totalTasks = 0;
          let completedTasks = 0;
          let inProgressTasks = 0;
          let overdueTasks = 0;
          const allTasks: Task[] = [];
          const now = new Date();

          for (const p of projects) {
            totalTasks += p.taskCount || 0;
            completedTasks += p.completedTaskCount || 0;
            for (const t of p.tasks || []) {
              allTasks.push(t);
              if (t.status === "IN_PROGRESS") inProgressTasks++;
              if (t.dueDate && new Date(t.dueDate) < now && t.status !== "DONE") {
                overdueTasks++;
              }
            }
          }

          setStats({ totalTasks, completedTasks, inProgressTasks, overdueTasks });
          setWeeklyData(getWeeklyData(allTasks));
        }

        if (membersRes.ok) {
          const members = await membersRes.json();
          if (Array.isArray(members)) setTeamMembers(members.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [workspaceId, wsLoading]);

  const taskDistribution = [
    { name: "Completed", value: stats.completedTasks },
    { name: "In Progress", value: stats.inProgressTasks },
    { name: "Overdue", value: stats.overdueTasks },
    { name: "To Do", value: Math.max(0, stats.totalTasks - stats.completedTasks - stats.inProgressTasks - stats.overdueTasks) },
  ];

  const hasChartData = taskDistribution.some((d) => d.value > 0);

  if (loading || wsLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 skeleton" />
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 skeleton rounded-[22px]" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 h-80 skeleton rounded-[22px]" />
          <div className="h-80 skeleton rounded-[22px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {session?.user?.name?.split(" ")[0] || "there"}
          </h1>
          <p className="text-white/40">
            Here&apos;s what&apos;s happening with your projects today.
          </p>
        </div>
        <Link href="/projects">
          <Button className="gap-2 rounded-[14px] gradient-primary btn-glow">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <StatsCards
        totalTasks={stats.totalTasks}
        completedTasks={stats.completedTasks}
        inProgressTasks={stats.inProgressTasks}
        overdueTasks={stats.overdueTasks}
      />

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3 animate-slide-up stagger-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-[#7C3AED]" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ActivityBarChart data={weeklyData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {hasChartData ? (
              <>
                <div className="h-[200px]">
                  <TaskPieChart data={taskDistribution} />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {taskDistribution.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-2 text-xs">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                      <span className="text-white/40">{item.name}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-white/30">
                <Sparkles className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No tasks yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Projects & Team */}
      <div className="grid gap-6 lg:grid-cols-2 animate-slide-up stagger-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Projects</CardTitle>
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="gap-1 text-white/40 hover:text-white/70">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-white/30">
                <FolderKanban className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No projects yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {recentProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-3 rounded-[14px] p-3 hover:bg-white/[0.04] transition-all duration-200 group"
                  >
                    <div
                      className="h-10 w-10 rounded-[12px] flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: project.color + "20" }}
                    >
                      <FolderKanban className="h-5 w-5" style={{ color: project.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{project.name}</p>
                      <p className="text-xs text-white/40">
                        {project.taskCount} tasks
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-white/40 transition-colors" />
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-[#7C3AED]" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            {teamMembers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-white/30">
                <Users className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No team members</p>
              </div>
            ) : (
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 rounded-[14px] p-3 hover:bg-white/[0.04] transition-all duration-200">
                    <Avatar fallback={member.name || "U"} size="sm" src={member.image} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-white/40 capitalize">{member.role}</p>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card className="animate-slide-up stagger-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4 text-[#F59E0B]" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-white/30">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No upcoming deadlines</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
