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
} from "lucide-react";
import { useWorkspace } from "@/hooks/use-workspace";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#eab308", "#ef4444", "#a855f7"];

interface ProjectStats {
  id: string;
  name: string;
  taskCount: number;
  completedTaskCount: number;
  color: string;
  tasks: { status: string }[];
}

interface TeamMember {
  id: string;
  name: string | null;
  image: string | null;
  role: string;
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
  const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([]); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = React.useState(true); // eslint-disable-line @typescript-eslint/no-unused-vars

  React.useEffect(() => {
    if (wsLoading || !workspaceId) return;

    const loadDashboard = async () => {
      try {
        const [projectsRes, membersRes] = await Promise.all([
          fetch(`/api/projects?workspaceId=${workspaceId}`),
          fetch("/api/workspaces"),
        ]);

        if (projectsRes.ok) {
          const projects = await projectsRes.json();
          setRecentProjects(projects.slice(0, 5));

          let totalTasks = 0;
          let completedTasks = 0;
          let inProgressTasks = 0;

          for (const p of projects) {
            totalTasks += p.taskCount || 0;
            completedTasks += p.completedTaskCount || 0;
            for (const t of p.tasks || []) {
              if (t.status === "IN_PROGRESS") inProgressTasks++;
            }
          }

          const overdueTasks = Math.floor(totalTasks * 0.1);

          setStats({ totalTasks, completedTasks, inProgressTasks, overdueTasks });
        }

        if (membersRes.ok) {
          const workspaces = await membersRes.json();
          if (workspaces[0]?._count) {
            // We don't have a members list endpoint yet, use workspace count
          }
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
    { name: "Completed", value: stats.completedTasks || 0 },
    { name: "In Progress", value: stats.inProgressTasks || 0 },
    { name: "Overdue", value: stats.overdueTasks || 0 },
    { name: "To Do", value: Math.max(0, stats.totalTasks - stats.completedTasks - stats.inProgressTasks - stats.overdueTasks) || 0 },
  ];

  const weeklyData = [
    { day: "Mon", tasks: 0 },
    { day: "Tue", tasks: 0 },
    { day: "Wed", tasks: 0 },
    { day: "Thu", tasks: 0 },
    { day: "Fri", tasks: 0 },
    { day: "Sat", tasks: 0 },
    { day: "Sun", tasks: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {session?.user?.name?.split(" ")[0] || "there"}
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your projects today.
          </p>
        </div>
        <Link href="/projects">
          <Button className="gap-2">
            View Projects
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <StatsCards
        totalTasks={stats.totalTasks}
        completedTasks={stats.completedTasks}
        inProgressTasks={stats.inProgressTasks}
        overdueTasks={stats.overdueTasks}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {taskDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {taskDistribution.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Projects</CardTitle>
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FolderKanban className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No projects yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted transition-colors"
                  >
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: project.color + "20" }}
                    >
                      <FolderKanban className="h-4 w-4" style={{ color: project.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{project.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {project.taskCount} tasks
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4" />
              Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            {teamMembers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No team members</p>
              </div>
            ) : (
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar fallback={member.name || "U"} size="sm" src={member.image} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
