import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(date);
}

export const TASK_STATUS_CONFIG = {
  BACKLOG: { label: "Backlog", color: "#6b7280", icon: "circle-dashed" },
  TODO: { label: "To Do", color: "#eab308", icon: "circle" },
  IN_PROGRESS: { label: "In Progress", color: "#3b82f6", icon: "clock" },
  IN_REVIEW: { label: "In Review", color: "#a855f7", icon: "eye" },
  DONE: { label: "Done", color: "#22c55e", icon: "check-circle" },
} as const;

export const TASK_PRIORITY_CONFIG = {
  URGENT: { label: "Urgent", color: "#ef4444", weight: 4 },
  HIGH: { label: "High", color: "#f97316", weight: 3 },
  MEDIUM: { label: "Medium", color: "#eab308", weight: 2 },
  LOW: { label: "Low", color: "#22c55e", weight: 1 },
  NONE: { label: "No priority", color: "#6b7280", weight: 0 },
} as const;
