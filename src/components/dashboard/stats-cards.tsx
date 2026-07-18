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
      gradient: "from-[#00C896] to-[#14B8A6]",
      iconBg: "bg-[#00C896]/15",
      iconColor: "text-[#00C896]",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      gradient: "from-[#22C55E] to-[#7DD3FC]",
      iconBg: "bg-[#22C55E]/15",
      iconColor: "text-[#22C55E]",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      gradient: "from-[#FBBF24] to-[#EF4444]",
      iconBg: "bg-[#FBBF24]/15",
      iconColor: "text-[#FBBF24]",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: AlertTriangle,
      gradient: "from-[#EF4444] to-[#FBBF24]",
      iconBg: "bg-[#EF4444]/15",
      iconColor: "text-[#EF4444]",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={stat.title} className={cn("relative overflow-hidden hover-lift animate-slide-up", `stagger-${i + 1}`)}>
          {/* Gradient accent line */}
          <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-80", stat.gradient)} />
          <CardContent className="p-5 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold mt-1.5 tracking-tight animate-count">{stat.value}</p>
              </div>
              <div className={cn(
                "rounded-[14px] p-2.5 transition-all duration-300 group-hover:scale-110",
                stat.iconBg
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
