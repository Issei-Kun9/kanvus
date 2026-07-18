import { TaskStatus, TaskPriority, MemberRole, Plan } from "@prisma/client";

export type { TaskStatus, TaskPriority, MemberRole, Plan };

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  plan: Plan;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  ownerId: string;
  memberCount?: number;
  projectCount?: number;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  color: string;
  icon: string;
  workspaceId: string;
  taskCount?: number;
  completedTaskCount?: number;
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  order: number;
  projectId: string;
  assigneeId: string | null;
  creatorId: string;
  assignee?: User | null;
  creator?: User;
  labels?: { label: Label }[];
  comments?: Comment[];
  _count?: { comments: number };
  createdAt: Date;
  updatedAt: Date;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  projectId: string;
}

export interface Comment {
  id: string;
  content: string;
  taskId: string;
  authorId: string;
  author?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  tasksByPriority: Record<TaskPriority, number>;
  tasksByStatus: Record<TaskStatus, number>;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: "created" | "updated" | "completed" | "commented";
  description: string;
  timestamp: Date;
  user: Pick<User, "name" | "image">;
}

export interface AIChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type SortField = "title" | "createdAt" | "dueDate" | "priority" | "status";
export type SortDirection = "asc" | "desc";

export interface TaskFilters {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assigneeId?: string[];
  search?: string;
  sort?: SortField;
  sortDirection?: SortDirection;
}
