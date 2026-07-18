"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  CreditCard,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Team",
    href: "/team",
    icon: Users,
  },
  {
    label: "AI Assistant",
    href: "/ai",
    icon: Sparkles,
  },
  {
    label: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col transition-all duration-300 relative overflow-hidden",
        "bg-gradient-to-b from-[#1a1625] via-[#1e1a2e] to-[#2d2640]",
        "text-white/80",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6c5ce7]/10 via-transparent to-[#fdcb6e]/5 pointer-events-none" />

      {/* Logo */}
      <div className="relative flex h-16 items-center border-b border-white/10 px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] shadow-lg shadow-[#6c5ce7]/30">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-tight">Kanvus</span>
              <span className="text-[10px] text-white/40 -mt-0.5 tracking-widest uppercase">Project Hub</span>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] shadow-lg shadow-[#6c5ce7]/30">
              <span className="text-white font-bold text-lg">K</span>
            </div>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/10 text-white shadow-lg shadow-[#6c5ce7]/20"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn(
                "h-5 w-5 shrink-0 transition-colors",
                isActive ? "text-[#a29bfe]" : ""
              )} />
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#a29bfe]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      {!collapsed && (
        <div className="relative mx-3 mb-3 rounded-xl bg-gradient-to-r from-[#6c5ce7]/20 to-[#a29bfe]/10 border border-white/10 p-3">
          <p className="text-xs font-medium text-white/70">Need help?</p>
          <p className="text-[10px] text-white/40 mt-0.5">Check our docs</p>
        </div>
      )}

      {/* Toggle */}
      {onToggle && (
        <div className="relative border-t border-white/10 p-2">
          <button
            onClick={onToggle}
            className="flex w-full items-center justify-center rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white/70 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
    </aside>
  );
}
