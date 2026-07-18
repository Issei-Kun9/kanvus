"use client";

import * as React from "react";
import {
  GitCommit, FolderKanban, UserPlus, MessageSquare,
  CheckCircle2, Upload, Settings, CreditCard, Zap,
  Clock, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "commit" | "project" | "team" | "message" | "task" | "deploy" | "settings" | "billing" | "ai";
  user: string;
  avatar?: string;
  action: string;
  target: string;
  time: string;
  details?: string;
}

const DEMO_ACTIVITIES: Activity[] = [
  {
    id: "1",
    type: "commit",
    user: "You",
    action: "pushed 3 commits to",
    target: "main",
    time: "2m ago",
    details: "feat: add dark mode toggle, fix: resolve auth redirect bug, chore: update dependencies",
  },
  {
    id: "2",
    type: "project",
    user: "Sarah",
    action: "created project",
    target: "Design System v2",
    time: "15m ago",
  },
  {
    id: "3",
    type: "deploy",
    user: "CI/CD",
    action: "deployed",
    target: "Kanvus v1.0",
    time: "1h ago",
    details: "Production deployment successful",
  },
  {
    id: "4",
    type: "team",
    user: "Alex",
    action: "joined",
    target: "the team",
    time: "2h ago",
  },
  {
    id: "5",
    type: "task",
    user: "You",
    action: "completed",
    target: "Implement command palette",
    time: "3h ago",
  },
  {
    id: "6",
    type: "message",
    user: "Jordan",
    action: "commented on",
    target: "API integration",
    time: "4h ago",
    details: "Looks great! Ready for review.",
  },
  {
    id: "7",
    type: "ai",
    user: "AI Assistant",
    action: "analyzed",
    target: "project metrics",
    time: "5h ago",
    details: "Generated weekly performance report",
  },
  {
    id: "8",
    type: "settings",
    user: "You",
    action: "updated",
    target: "notification preferences",
    time: "6h ago",
  },
];

const ICON_MAP = {
  commit: GitCommit,
  project: FolderKanban,
  team: UserPlus,
  message: MessageSquare,
  task: CheckCircle2,
  deploy: Upload,
  settings: Settings,
  billing: CreditCard,
  ai: Zap,
};

const COLOR_MAP: Record<string, string> = {
  commit: "text-[#00C896]",
  project: "text-[#14B8A6]",
  team: "text-[#7DD3FC]",
  message: "text-[#7DD3FC]",
  task: "text-[#00C896]",
  deploy: "text-[#22C55E]",
  settings: "text-white/40",
  billing: "text-[#FBBF24]",
  ai: "text-[#00C896]",
};

interface ActivityFeedProps {
  activities?: Activity[];
  maxItems?: number;
  showHeader?: boolean;
}

export function ActivityFeed({
  activities = DEMO_ACTIVITIES,
  maxItems = 8,
  showHeader = true,
}: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <div className="glass-card rounded-[16px] overflow-hidden">
      {showHeader && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-white/40" />
            <h3 className="text-sm font-semibold text-white">Activity</h3>
          </div>
          <button className="text-xs text-[#00C896] hover:text-[#14B8A6] transition-colors flex items-center gap-1">
            View all
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}

      <div className="divide-y divide-white/[0.04]">
        {displayActivities.map((activity, index) => {
          const Icon = ICON_MAP[activity.type];
          const iconColor = COLOR_MAP[activity.type];
          return (
            <div
              key={activity.id}
              className="flex gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-[8px] bg-white/[0.04]", iconColor)}>
                  <Icon className="h-4 w-4" />
                </div>
                {index < displayActivities.length - 1 && (
                  <div className="w-px flex-1 bg-white/[0.06] mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-2">
                <p className="text-sm text-white/60">
                  <span className="font-medium text-white">{activity.user}</span>{" "}
                  {activity.action}{" "}
                  <span className="font-medium text-white">{activity.target}</span>
                </p>
                {activity.details && (
                  <p className="text-xs text-white/30 mt-1 truncate">{activity.details}</p>
                )}
                <p className="text-[11px] text-white/20 mt-1.5">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
