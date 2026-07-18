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
    <header className="flex h-16 items-center justify-between border-b border-border/50 bg-card/80 backdrop-blur-sm px-4 lg:px-6">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="hidden md:flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2 border border-border/50 focus-within:border-primary/30 focus-within:bg-card transition-all">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-7 w-56 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded-md border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative rounded-xl">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#e74c3c] ring-2 ring-background" />
        </Button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-muted/50 transition-all border border-transparent hover:border-border/50"
          >
            <Avatar
              src={session?.user?.image}
              fallback={session?.user?.name || "U"}
              size="sm"
            />
            <span className="hidden md:block text-sm font-medium max-w-[100px] truncate">
              {session?.user?.name || "User"}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-border/50 bg-card p-1.5 shadow-xl shadow-black/5">
                <div className="border-b border-border/50 px-3 py-2.5 mb-1">
                  <p className="text-sm font-semibold">{session?.user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session?.user?.email}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-muted/50 transition-colors">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Profile
                  </button>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-[#e74c3c] hover:bg-[#e74c3c]/5 transition-colors"
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
