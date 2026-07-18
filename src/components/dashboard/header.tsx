"use client";

import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Bell,
  Search,
  LogOut,
  User,
  ChevronDown,
  Command,
} from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  return (
    <header className="flex h-16 items-center justify-between glass border-b border-white/[0.06] px-4 lg:px-6">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="hidden md:flex items-center gap-2 glass-input rounded-xl px-3 py-2 transition-all focus-within:border-[#a29bfe]/30">
          <Search className="h-4 w-4 text-white/30" />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-7 w-56 bg-transparent text-sm text-white/80 placeholder:text-white/25 focus:outline-none"
          />
          <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-1.5 font-mono text-[10px] font-medium text-white/25">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative rounded-xl">
          <Bell className="h-5 w-5 text-white/50" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#e74c3c] ring-2 ring-[#13111c]" />
        </Button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-white/[0.04] transition-all border border-transparent hover:border-white/[0.06]"
          >
            <Avatar
              src={session?.user?.image}
              fallback={session?.user?.name || "U"}
              size="sm"
            />
            <span className="hidden md:block text-sm font-medium text-white/70 max-w-[100px] truncate">
              {session?.user?.name || "User"}
            </span>
            <ChevronDown className="h-4 w-4 text-white/30" />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-2 w-56 glass-strong rounded-2xl p-1.5 shadow-xl shadow-black/30">
                <div className="border-b border-white/[0.06] px-3 py-2.5 mb-1">
                  <p className="text-sm font-semibold text-white">{session?.user?.name}</p>
                  <p className="text-xs text-white/40 truncate">
                    {session?.user?.email}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-white/60 hover:bg-white/[0.04] transition-colors">
                    <User className="h-4 w-4 text-white/30" />
                    Profile
                  </button>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-[#ff6b6b] hover:bg-[#ff6b6b]/5 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
