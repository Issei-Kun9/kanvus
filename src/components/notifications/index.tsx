"use client";

import * as React from "react";
import {
  Bell, X, Check, CheckCheck, Settings, Trash2,
  MessageSquare, UserPlus, FolderKanban, CreditCard,
  AlertTriangle, Sparkles, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: "message" | "team" | "project" | "billing" | "system" | "ai";
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "team",
    title: "Sarah joined the team",
    description: "Sarah Chen has been added as a designer to Kanvus.",
    time: "2m ago",
    read: false,
  },
  {
    id: "2",
    type: "project",
    title: "Project deployed",
    description: "Kanvus v1.0 has been deployed to production.",
    time: "15m ago",
    read: false,
  },
  {
    id: "3",
    type: "ai",
    title: "AI completed analysis",
    description: "Your project analytics report is ready to view.",
    time: "1h ago",
    read: true,
  },
  {
    id: "4",
    type: "billing",
    title: "Payment successful",
    description: "Your Pro subscription has been renewed.",
    time: "2h ago",
    read: true,
  },
  {
    id: "5",
    type: "message",
    title: "New comment on task",
    description: "Alex commented on 'Implement dark mode': Looks great!",
    time: "3h ago",
    read: true,
  },
];

const ICON_MAP = {
  message: MessageSquare,
  team: UserPlus,
  project: FolderKanban,
  billing: CreditCard,
  system: AlertTriangle,
  ai: Sparkles,
};

const COLOR_MAP = {
  message: "text-[#7DD3FC]",
  team: "text-[#00C896]",
  project: "text-[#14B8A6]",
  billing: "text-[#FBBF24]",
  system: "text-[#EF4444]",
  ai: "text-[#00C896]",
};

export function NotificationCenter() {
  const [open, setOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState(DEMO_NOTIFICATIONS);
  const ref = React.useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="relative h-9 w-9 rounded-[12px] hover:bg-white/[0.04]"
      >
        <Bell className="h-4 w-4 text-white/60" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full gradient-primary text-[10px] font-bold text-white flex items-center justify-center animate-pulse-glow">
            {unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[380px] glass-card rounded-[22px] shadow-2xl shadow-black/40 overflow-hidden border border-white/[0.08] animate-scale-in z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <Badge className="gradient-primary text-white border-0 text-[10px] px-1.5 py-0">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllRead}
                  className="h-7 text-[11px] text-white/40 hover:text-white/60"
                >
                  <CheckCheck className="h-3 w-3 mr-1" />
                  Mark all read
                </Button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-[360px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-12 text-center">
                <Bell className="h-8 w-8 text-white/10 mx-auto mb-3" />
                <p className="text-sm text-white/30">No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = ICON_MAP[notification.type];
                const iconColor = COLOR_MAP[notification.type];
                return (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={cn(
                      "flex gap-3 px-5 py-3.5 cursor-pointer transition-colors border-b border-white/[0.04] last:border-0",
                      notification.read
                        ? "hover:bg-white/[0.02]"
                        : "bg-white/[0.03] hover:bg-white/[0.05]"
                    )}
                  >
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-[8px] bg-white/[0.06] shrink-0", iconColor)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white truncate">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="h-1.5 w-1.5 rounded-full gradient-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-white/40 mt-0.5 line-clamp-2">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Clock className="h-3 w-3 text-white/20" />
                        <span className="text-[11px] text-white/25">{notification.time}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearNotification(notification.id);
                      }}
                      className="h-6 w-6 rounded-[6px] flex items-center justify-center hover:bg-white/[0.06] text-white/20 hover:text-white/40 transition-colors shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-white/[0.06]">
            <Button
              variant="ghost"
              className="w-full h-9 text-xs text-white/40 hover:text-white/60 hover:bg-white/[0.04] rounded-[10px]"
            >
              View all notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
