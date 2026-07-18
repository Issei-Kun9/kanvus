"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { TASK_PRIORITY_CONFIG } from "@/lib/utils";
import { Calendar, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import type { Task } from "@/types";

interface TaskCardProps {
  task: Task & { labels?: { label: { id: string; name: string; color: string } }[]; _count?: { comments: number } };
  onClick?: () => void;
  isDragging?: boolean;
}

export function TaskCard({ task, onClick, isDragging }: TaskCardProps) {
  const priorityConfig = TASK_PRIORITY_CONFIG[task.priority];

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-lg border bg-card p-3 cursor-pointer transition-all hover:shadow-md",
        isDragging && "shadow-lg rotate-2",
        "group"
      )}
    >
      <div className="space-y-2">
        {task.labels && task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.labels.map(({ label }) => (
              <div
                key={label.id}
                className="h-1.5 rounded-full"
                style={{ backgroundColor: label.color, width: "40px" }}
              />
            ))}
          </div>
        )}

        <h4 className="text-sm font-medium line-clamp-2">{task.title}</h4>

        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0"
              style={{
                borderColor: priorityConfig.color + "40",
                color: priorityConfig.color,
              }}
            >
              {priorityConfig.label}
            </Badge>
            {task.dueDate && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {format(new Date(task.dueDate), "MMM d")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {task._count && task._count.comments > 0 && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
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
