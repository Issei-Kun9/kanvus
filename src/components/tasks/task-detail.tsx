"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TASK_STATUS_CONFIG,
  TASK_PRIORITY_CONFIG,
  formatDate,
} from "@/lib/utils";
import {
  Calendar,
  MessageSquare,
  Send,
  Sparkles,
  Tag,
  User,
} from "lucide-react";
import { format } from "date-fns";
import type { Task, TaskStatus, TaskPriority } from "@/types";

interface TaskDetailProps {
  task: Task & {
    assignee?: { id: string; name: string | null; image: string | null } | null;
    creator?: { id: string; name: string | null; image: string | null };
    labels?: { label: { id: string; name: string; color: string } }[];
    comments?: {
      id: string;
      content: string;
      author?: { id: string; name: string | null; image: string | null };
      createdAt: Date | string;
    }[];
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (data: Record<string, unknown>) => void;
  onAddComment: (content: string) => void;
  onAiSuggest?: () => void;
  aiSuggestion?: string;
  teamMembers?: { id: string; name: string | null; image: string | null }[];
}

export function TaskDetail({
  task,
  open,
  onOpenChange,
  onUpdate,
  onAddComment,
  onAiSuggest,
  aiSuggestion,
  teamMembers = [],
}: TaskDetailProps) {
  const [comment, setComment] = React.useState("");
  const [editingTitle, setEditingTitle] = React.useState(false);
  const [title, setTitle] = React.useState(task.title);

  const handleAddComment = () => {
    if (!comment.trim()) return;
    onAddComment(comment.trim());
    setComment("");
  };

  const statusOptions = Object.entries(TASK_STATUS_CONFIG).map(([value, config]) => ({
    value,
    label: config.label,
  }));

  const priorityOptions = Object.entries(TASK_PRIORITY_CONFIG).map(([value, config]) => ({
    value,
    label: config.label,
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div
              className="mt-1 h-3 w-3 rounded-full shrink-0"
              style={{ backgroundColor: TASK_STATUS_CONFIG[task.status as keyof typeof TASK_STATUS_CONFIG].color }}
            />
            <div className="flex-1">
              {editingTitle ? (
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => {
                    if (title.trim() && title !== task.title) {
                      onUpdate({ title: title.trim() });
                    }
                    setEditingTitle(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (title.trim() && title !== task.title) {
                        onUpdate({ title: title.trim() });
                      }
                      setEditingTitle(false);
                    }
                  }}
                  autoFocus
                  className="text-lg font-semibold"
                />
              ) : (
                <DialogTitle
                  className="cursor-pointer hover:bg-muted rounded px-1 -mx-1"
                  onClick={() => setEditingTitle(true)}
                >
                  {task.title}
                </DialogTitle>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-6 mt-4">
          <div className="col-span-2 space-y-6">
            {task.description && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Description
                </h4>
                <p className="text-sm whitespace-pre-wrap">{task.description}</p>
              </div>
            )}

            {aiSuggestion && (
              <div className="rounded-lg border bg-primary/5 p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-primary mb-1">
                  <Sparkles className="h-4 w-4" />
                  AI Priority Suggestion
                </div>
                <p className="text-sm">{aiSuggestion}</p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                Comments ({task.comments?.length || 0})
              </h4>
              <div className="space-y-3">
                {task.comments?.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <Avatar
                      src={c.author?.image}
                      fallback={c.author?.name || "U"}
                      size="sm"
                    />
                    <div className="flex-1 rounded-lg bg-muted p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {c.author?.name || "Unknown"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(c.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm">{c.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                />
                <Button
                  size="icon"
                  onClick={handleAddComment}
                  disabled={!comment.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                  Status
                </label>
                <Select
                  options={statusOptions}
                  value={task.status}
                  onChange={(e) =>
                    onUpdate({ status: e.target.value as TaskStatus })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                  Priority
                </label>
                <Select
                  options={priorityOptions}
                  value={task.priority}
                  onChange={(e) =>
                    onUpdate({ priority: e.target.value as TaskPriority })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                  <User className="h-3 w-3" />
                  Assignee
                </label>
                <Select
                  options={[
                    { value: "", label: "Unassigned" },
                    ...teamMembers.map((m) => ({
                      value: m.id,
                      label: m.name || "Unknown",
                    })),
                  ]}
                  value={task.assigneeId || ""}
                  onChange={(e) =>
                    onUpdate({ assigneeId: e.target.value || null })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                  <Calendar className="h-3 w-3" />
                  Due Date
                </label>
                <Input
                  type="date"
                  value={
                    task.dueDate
                      ? format(new Date(task.dueDate), "yyyy-MM-dd")
                      : ""
                  }
                  onChange={(e) =>
                    onUpdate({
                      dueDate: e.target.value
                        ? new Date(e.target.value).toISOString()
                        : null,
                    })
                  }
                />
              </div>
            </div>

            {task.labels && task.labels.length > 0 && (
              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                  <Tag className="h-3 w-3" />
                  Labels
                </label>
                <div className="flex flex-wrap gap-1">
                  {task.labels.map(({ label }) => (
                    <Badge
                      key={label.id}
                      style={{
                        backgroundColor: label.color + "20",
                        color: label.color,
                        borderColor: label.color + "40",
                      }}
                      variant="outline"
                    >
                      {label.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {onAiSuggest && (
              <Button
                variant="outline"
                className="w-full"
                onClick={onAiSuggest}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Suggest Priority
              </Button>
            )}

            <div className="text-xs text-muted-foreground space-y-1">
              <p>Created: {formatDate(task.createdAt)}</p>
              <p>Updated: {formatDate(task.updatedAt)}</p>
              {task.creator && <p>By: {task.creator.name}</p>}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
