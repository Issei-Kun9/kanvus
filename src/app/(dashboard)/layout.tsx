"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { CommandPalette } from "@/components/command-palette";
import { ShortcutsDialog, useGlobalShortcuts } from "@/components/ui/keyboard-shortcuts";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);
  const [shortcutsOpen, setShortcutsOpen] = React.useState(false);

  // Toggle theme
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  // Register global keyboard shortcuts
  const shortcuts = useGlobalShortcuts({
    onCommandPalette: () => setCommandPaletteOpen(true),
    onGoToDashboard: () => router.push("/dashboard"),
    onGoToProjects: () => router.push("/projects"),
    onGoToTeam: () => router.push("/team"),
    onGoToSettings: () => router.push("/settings"),
    onGoToAI: () => router.push("/ai"),
    onToggleTheme: toggleTheme,
    onToggleSidebar: () => setSidebarCollapsed(!sidebarCollapsed),
    onHelp: () => setShortcutsOpen(true),
  });

  return (
    <SessionProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none gradient-mesh" />

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            transition-transform duration-300 ease-out
          `}
        >
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() =>
              window.innerWidth >= 1024
                ? setSidebarCollapsed(!sidebarCollapsed)
                : setMobileMenuOpen(false)
            }
          />
        </div>

        {/* Main */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <Header
            onMenuClick={() => setMobileMenuOpen(true)}
            onCommandPalette={() => setCommandPaletteOpen(true)}
          />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <div className="animate-in fade-in duration-200">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Command Palette */}
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />

      {/* Shortcuts Dialog */}
      <ShortcutsDialog
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
        shortcuts={shortcuts}
      />
    </SessionProvider>
  );
}
