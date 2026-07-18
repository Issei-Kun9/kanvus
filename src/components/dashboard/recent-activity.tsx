"use client";

import { Avatar } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/lib/utils";
import { CheckCircle2, Plus, MessageSquare, ArrowRight } from "lucide-react";

interface Activity {
  id: string;
  type: "created" | "updated" | "completed" | "commented";
  description: string;
  timestamp: Date;
  user: { name: string | null; image: string | null };
}

interface RecentActivityProps {
  activities: Activity[];
}

const typeConfig = {
  created: { icon: Plus, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950" },
  updated: { icon: ArrowRight, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950" },
  completed: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950" },
  commented: { icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950" },
};

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No recent activity</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const config = typeConfig[activity.type];
        const Icon = config.icon;

        return (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`rounded-lg p-2 ${config.bg}`}>
              <Icon className={`h-4 w-4 ${config.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">{activity.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <Avatar
                  src={activity.user.image}
                  fallback={activity.user.name || "U"}
                  size="sm"
                />
                <span className="text-xs text-muted-foreground">
                  {activity.user.name} · {formatRelativeTime(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
