"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search, FolderKanban, Users, Settings, CreditCard,
  MessageSquare, LayoutDashboard, Plus, Moon,
  Command, ArrowRight, Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: "navigation" | "actions" | "settings" | "recent";
  shortcut?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = React.useMemo(() => [
    {
      id: "dashboard",
      label: "Dashboard",
      description: "View your dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
      action: () => { router.push("/dashboard"); onOpenChange(false); },
      category: "navigation",
      shortcut: "G D",
    },
    {
      id: "projects",
      label: "Projects",
      description: "Manage your projects",
      icon: <FolderKanban className="h-4 w-4" />,
      action: () => { router.push("/projects"); onOpenChange(false); },
      category: "navigation",
      shortcut: "G P",
    },
    {
      id: "team",
      label: "Team",
      description: "View team members",
      icon: <Users className="h-4 w-4" />,
      action: () => { router.push("/team"); onOpenChange(false); },
      category: "navigation",
      shortcut: "G T",
    },
    {
      id: "settings",
      label: "Settings",
      description: "Account settings",
      icon: <Settings className="h-4 w-4" />,
      action: () => { router.push("/settings"); onOpenChange(false); },
      category: "navigation",
      shortcut: "G S",
    },
    {
      id: "billing",
      label: "Billing",
      description: "Manage subscription",
      icon: <CreditCard className="h-4 w-4" />,
      action: () => { router.push("/billing"); onOpenChange(false); },
      category: "navigation",
    },
    {
      id: "ai-chat",
      label: "AI Assistant",
      description: "Chat with AI",
      icon: <MessageSquare className="h-4 w-4" />,
      action: () => { router.push("/ai"); onOpenChange(false); },
      category: "navigation",
      shortcut: "G A",
    },
    {
      id: "new-project",
      label: "Create New Project",
      description: "Start a new project",
      icon: <Plus className="h-4 w-4" />,
      action: () => { router.push("/projects"); onOpenChange(false); },
      category: "actions",
      shortcut: "N P",
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "View notifications",
      icon: <Bell className="h-4 w-4" />,
      action: () => { onOpenChange(false); },
      category: "actions",
      shortcut: "G N",
    },
    {
      id: "theme-toggle",
      label: "Toggle Theme",
      description: "Switch dark/light mode",
      icon: <Moon className="h-4 w-4" />,
      action: () => { document.documentElement.classList.toggle("dark"); onOpenChange(false); },
      category: "settings",
      shortcut: "T T",
    },
  ], [router, onOpenChange]);

  const filteredCommands = React.useMemo(() => {
    if (!query) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.description?.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const groupedCommands = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      filteredCommands[selectedIndex].action();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Command Palette */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-[580px] animate-scale-in">
        <div className="glass-card rounded-[22px] shadow-2xl shadow-black/40 overflow-hidden border border-white/[0.08]">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
            <Search className="h-5 w-5 text-white/30" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white text-[15px] placeholder:text-white/30 outline-none"
            />
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded-[6px] bg-white/[0.06] px-1.5 font-mono text-[11px] text-white/40">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[320px] overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <div className="py-8 text-center text-white/30 text-sm">
                No results found
              </div>
            ) : (
              Object.entries(groupedCommands).map(([category, items]) => (
                <div key={category} className="mb-2">
                  <div className="px-3 py-2 text-[11px] font-medium text-white/30 uppercase tracking-wider">
                    {category}
                  </div>
                  {items.map((cmd) => {
                    const globalIndex = filteredCommands.indexOf(cmd);
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={cn(
                          "flex items-center gap-3 w-full px-3 py-2.5 rounded-[12px] text-left transition-colors",
                          globalIndex === selectedIndex
                            ? "bg-white/[0.06] text-white"
                            : "text-white/60 hover:bg-white/[0.04]"
                        )}
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-white/[0.06]">
                          {cmd.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{cmd.label}</div>
                          {cmd.description && (
                            <div className="text-xs text-white/40 truncate">{cmd.description}</div>
                          )}
                        </div>
                        {cmd.shortcut && (
                          <div className="flex items-center gap-1">
                            {cmd.shortcut.split(" ").map((key, i) => (
                              <kbd
                                key={i}
                                className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-[4px] bg-white/[0.06] px-1 font-mono text-[11px] text-white/40"
                              >
                                {key}
                              </kbd>
                            ))}
                          </div>
                        )}
                        <ArrowRight className="h-4 w-4 text-white/20" />
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06] text-[11px] text-white/30">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="inline-flex h-4 items-center justify-center rounded-[3px] bg-white/[0.06] px-1 font-mono">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="inline-flex h-4 items-center justify-center rounded-[3px] bg-white/[0.06] px-1 font-mono">↵</kbd>
                select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="inline-flex h-4 items-center justify-center rounded-[3px] bg-white/[0.06] px-1 font-mono">esc</kbd>
                close
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Command className="h-3 w-3" />
              <span>K powered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
