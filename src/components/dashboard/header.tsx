"use client";

import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NotificationCenter } from "@/components/notifications";
import {
  Menu, Search, LogOut, User, ChevronDown, Command,
} from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
  onCommandPalette?: () => void;
}

export function Header({ onMenuClick, onCommandPalette }: HeaderProps) {
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!showUserMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  return (
    <header className="flex h-16 items-center justify-between bg-[#101010]/60 backdrop-blur-xl border-b border-white/[0.06] px-4 lg:px-6">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden rounded-[10px]">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        {/* Search with Command Palette trigger */}
        <button
          onClick={onCommandPalette}
          className="hidden md:flex items-center gap-2 glass-input rounded-[14px] px-3 py-2 transition-all hover:border-white/[0.12] hover:bg-white/[0.06] cursor-pointer group"
        >
          <Search className="h-4 w-4 text-white/30 group-hover:text-white/50" />
          <span className="text-sm text-white/30 group-hover:text-white/50">Search anything...</span>
          <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded-[6px] bg-white/[0.06] px-1.5 font-mono text-[11px] text-white/40 ml-8">
            <Command className="h-3 w-3" />K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification Center */}
        <NotificationCenter />

        {/* User Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-[14px] p-1.5 hover:bg-white/[0.04] transition-all duration-200 border border-transparent hover:border-white/[0.06] hover-scale"
          >
            <Avatar
              src={session?.user?.image}
              fallback={session?.user?.name || "U"}
              size="sm"
            />
            <span className="hidden md:block text-sm font-medium text-white/60 max-w-[100px] truncate">
              {session?.user?.name || "User"}
            </span>
            <ChevronDown className="h-4 w-4 text-white/30" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 glass-strong rounded-[16px] p-1.5 shadow-xl shadow-black/40 dropdown-enter">
              <div className="border-b border-white/[0.06] px-3 py-2.5 mb-1">
                <p className="text-sm font-semibold text-white">{session?.user?.name}</p>
                <p className="text-xs text-white/40 truncate">
                  {session?.user?.email}
                </p>
              </div>
              <div className="space-y-0.5">
                <button className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2 text-sm text-white/60 hover:bg-white/[0.04] transition-colors">
                  <User className="h-4 w-4 text-white/30" />
                  Profile
                </button>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2 text-sm text-[#EF4444] hover:bg-[#EF4444]/5 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
