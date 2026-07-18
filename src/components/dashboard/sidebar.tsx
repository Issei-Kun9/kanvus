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
  HelpCircle,
  MessageSquare,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Team", href: "/team", icon: Users },
  { label: "AI Assistant", href: "/ai", icon: Sparkles },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
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
        "flex flex-col transition-all duration-300 ease-out relative overflow-hidden",
        "bg-[#111113]/80 backdrop-blur-xl border-r border-white/[0.06]",
        collapsed ? "w-[72px]" : "w-[280px]"
      )}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#7C3AED]/[0.08] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-32 h-32 bg-[#06B6D4]/[0.04] rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <div className="relative flex h-16 items-center border-b border-white/[0.06] px-4">
        {!collapsed ? (
          <Link href="/dashboard" className="flex items-center gap-3 hover-scale">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-[12px] gradient-primary shadow-lg shadow-[#7C3AED]/25 overflow-hidden">
              <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                <g stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="10" y1="6" x2="10" y2="26"/>
                  <line x1="10" y1="16" x2="22" y2="6"/>
                  <line x1="10" y1="16" x2="22" y2="26"/>
                </g>
                <circle cx="24" cy="8" r="1.5" fill="white" opacity="0.9"/>
                <circle cx="24" cy="16" r="1.5" fill="white" opacity="0.7"/>
                <circle cx="24" cy="24" r="1.5" fill="white" opacity="0.5"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-tight">Kanvus</span>
              <span className="text-[10px] text-white/30 -mt-0.5 tracking-widest uppercase">Project Hub</span>
            </div>
          </Link>
        ) : (
          <Link href="/dashboard" className="mx-auto hover-scale">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-[12px] gradient-primary shadow-lg shadow-[#7C3AED]/25 overflow-hidden">
              <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                <g stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="10" y1="6" x2="10" y2="26"/>
                  <line x1="10" y1="16" x2="22" y2="6"/>
                  <line x1="10" y1="16" x2="22" y2="26"/>
                </g>
                <circle cx="24" cy="8" r="1.5" fill="white" opacity="0.9"/>
                <circle cx="24" cy="16" r="1.5" fill="white" opacity="0.7"/>
                <circle cx="24" cy="24" r="1.5" fill="white" opacity="0.5"/>
              </svg>
            </div>
          </Link>
        )}
      </div>

      {/* Nav */}
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
                "flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/[0.08] text-white shadow-lg shadow-[#7C3AED]/10 border border-white/[0.06]"
                  : "text-white/40 hover:bg-white/[0.04] hover:text-white/70 border border-transparent",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn(
                "h-5 w-5 shrink-0 transition-colors",
                isActive ? "text-[#7C3AED]" : ""
              )} />
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#7C3AED] shadow-sm shadow-[#7C3AED]/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      {!collapsed && (
        <div className="relative mx-3 mb-3 space-y-2">
          <Link href="#" className="flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-sm text-white/40 hover:bg-white/[0.04] hover:text-white/70 transition-colors">
            <HelpCircle className="h-5 w-5" />
            <span>Help & Support</span>
          </Link>
          <div className="glass-card rounded-[14px] p-4">
            <p className="text-xs font-medium text-white/60 mb-1">Need help?</p>
            <p className="text-[10px] text-white/30">Check our documentation or contact support.</p>
          </div>
        </div>
      )}

      {/* Toggle */}
      {onToggle && (
        <div className="relative border-t border-white/[0.06] p-2">
          <button
            onClick={onToggle}
            className="flex w-full items-center justify-center rounded-[10px] p-2 text-white/30 hover:bg-white/[0.04] hover:text-white/60 transition-all duration-200 hover-scale"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      )}
    </aside>
  );
}
