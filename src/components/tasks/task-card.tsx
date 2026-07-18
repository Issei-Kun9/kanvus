"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { TASK_PRIORITY_CONFIG } from "@/lib/utils";
import { Calendar, MessageSquare, Paperclip } from "lucide-react";
import { format } from "date-fns";
import type { Task } from "@/types";

interface TaskCardProps {
  task: Task & { labels?: { label: { id: string; name: string; color: string } }[]; _count?: { comments: number } };
  onClick?: () => void;
  isDragging?: boolean;
}

export function TaskCard({ task, onClick, isDragging }: TaskCardProps) {
  const priorityConfig = TASK_PRIORITY_CONFIG[task.priority as keyof typeof TASK_PRIORITY_CONFIG];

  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card rounded-[14px] p-3.5 cursor-pointer group",
        isDragging && "shadow-xl shadow-black/30 rotate-2 scale-105"
      )}
    >
      <div className="space-y-2.5">
        {/* Labels */}
        {task.labels && task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {task.labels.map(({ label }) => (
              <div
                key={label.id}
                className="h-1 rounded-full"
                style={{ backgroundColor: label.color, width: "40px" }}
              />
            ))}
          </div>
        )}

        {/* Title */}
        <h4 className="text-sm font-medium line-clamp-2 text-white/90 group-hover:text-white transition-colors">
          {task.title}
        </h4>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-white/35 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 rounded-full border-white/10"
              style={{
                color: priorityConfig.color,
                borderColor: priorityConfig.color + "30",
              }}
            >
              {priorityConfig.label}
            </Badge>
            {task.dueDate && (
              <span className="flex items-center gap-1 text-[11px] text-white/30">
                <Calendar className="h-3 w-3" />
                {format(new Date(task.dueDate), "MMM d")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {task._count && task._count.comments > 0 && (
              <span className="flex items-center gap-1 text-[11px] text-white/30">
                <MessageSquare className="h-3 w-3" />
                {task._count.comments}
              </span>
            )}
            {task.assignee && (
              <Avatar
                src={task.assignee.image}
                fallback={task.assignee.name || "U"}
                size="sm"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
