"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

interface StatsCardsProps {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
}

export function StatsCards({
  totalTasks,
  completedTasks,
  inProgressTasks,
  overdueTasks,
}: StatsCardsProps) {
  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: TrendingUp,
      gradient: "from-[#6c5ce7] to-[#a29bfe]",
      iconBg: "bg-[#6c5ce7]/10",
      iconColor: "text-[#6c5ce7]",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      gradient: "from-[#00b894] to-[#55efc4]",
      iconBg: "bg-[#00b894]/10",
      iconColor: "text-[#00b894]",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      gradient: "from-[#fdcb6e] to-[#ffeaa7]",
      iconBg: "bg-[#fdcb6e]/10",
      iconColor: "text-[#fdcb6e]",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: AlertTriangle,
      gradient: "from-[#e74c3c] to-[#fd79a8]",
      iconBg: "bg-[#e74c3c]/10",
      iconColor: "text-[#e74c3c]",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300 group">
          {/* Gradient accent line */}
          <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", stat.gradient)} />
          <CardContent className="p-5 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold mt-1.5 tracking-tight">{stat.value}</p>
              </div>
              <div className={cn("rounded-xl p-2.5 transition-transform group-hover:scale-110", stat.iconBg)}>
                <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
