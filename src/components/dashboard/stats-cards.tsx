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
      glow: "shadow-[#6c5ce7]/20",
      iconBg: "bg-[#6c5ce7]/15",
      iconColor: "text-[#a29bfe]",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      gradient: "from-[#00b894] to-[#55efc4]",
      glow: "shadow-[#00b894]/20",
      iconBg: "bg-[#00b894]/15",
      iconColor: "text-[#55efc4]",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      gradient: "from-[#fdcb6e] to-[#ffeaa7]",
      glow: "shadow-[#fdcb6e]/20",
      iconBg: "bg-[#fdcb6e]/15",
      iconColor: "text-[#fdcb6e]",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: AlertTriangle,
      gradient: "from-[#e74c3c] to-[#fd79a8]",
      glow: "shadow-[#e74c3c]/20",
      iconBg: "bg-[#e74c3c]/15",
      iconColor: "text-[#ff6b6b]",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="glass-card relative overflow-hidden group">
          {/* Gradient accent line */}
          <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-60", stat.gradient)} />
          <CardContent className="p-5 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold mt-1.5 tracking-tight text-white">{stat.value}</p>
              </div>
              <div className={cn(
                "rounded-xl p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                stat.iconBg,
                stat.glow
              )}>
                <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
