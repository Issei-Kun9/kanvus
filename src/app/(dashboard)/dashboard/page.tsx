"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";
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

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = React.useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
  });
  const [recentProjects, setRecentProjects] = React.useState<
    { id: string; name: string; taskCount: number; color: string }[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadDashboard = async () => {
      try {
        const projectsRes = await fetch("/api/projects?workspaceId=default");
        if (projectsRes.ok) {
          const projects = await projectsRes.json();
          setRecentProjects(projects.slice(0, 5));

          let totalTasks = 0;
          let completedTasks = 0;
          let inProgressTasks = 0;

          for (const p of projects) {
            totalTasks += p.taskCount || 0;
            completedTasks += p.completedTaskCount || 0;
          }

          setStats({
            totalTasks,
            completedTasks,
            inProgressTasks: Math.floor(totalTasks * 0.3),
            overdueTasks: Math.floor(totalTasks * 0.1),
          });
        }
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const taskDistribution = [
    { name: "Completed", value: stats.completedTasks || 1 },
    { name: "In Progress", value: stats.inProgressTasks || 2 },
    { name: "Overdue", value: stats.overdueTasks || 1 },
    { name: "To Do", value: Math.max(0, stats.totalTasks - stats.completedTasks - stats.inProgressTasks - stats.overdueTasks) || 3 },
  ];

  const weeklyData = [
    { day: "Mon", tasks: 12 },
    { day: "Tue", tasks: 19 },
    { day: "Wed", tasks: 8 },
    { day: "Thu", tasks: 24 },
    { day: "Fri", tasks: 16 },
    { day: "Sat", tasks: 5 },
    { day: "Sun", tasks: 3 },
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
        {/* Weekly Chart */}
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
                  <Bar
                    dataKey="tasks"
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Task Distribution */}
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
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {taskDistribution.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
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
                      <FolderKanban
                        className="h-4 w-4"
                        style={{ color: project.color }}
                      />
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

        {/* Team Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4" />
              Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Alice Chen", role: "Engineering Lead", status: "online" },
                { name: "Bob Smith", role: "Designer", status: "online" },
                { name: "Carol Davis", role: "Developer", status: "away" },
              ].map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <Avatar fallback={member.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      member.status === "online"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
