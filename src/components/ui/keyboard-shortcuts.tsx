"use client";

import * as React from "react";

interface Shortcut {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
  category?: string;
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : true;
        const metaMatch = shortcut.meta ? e.metaKey : true;
        const shiftMatch = shortcut.shift ? e.shiftKey : true;
        const altMatch = shortcut.alt ? e.altKey : true;

        if (
          e.key.toLowerCase() === shortcut.key.toLowerCase() &&
          ctrlMatch && metaMatch && shiftMatch && altMatch
        ) {
          // Don't trigger if typing in an input
          const target = e.target as HTMLElement;
          if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
            return;
          }
          e.preventDefault();
          shortcut.action();
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
}

// Global shortcuts that work everywhere
export function useGlobalShortcuts(handlers: {
  onCommandPalette?: () => void;
  onSearch?: () => void;
  onGoToDashboard?: () => void;
  onGoToProjects?: () => void;
  onGoToTeam?: () => void;
  onGoToSettings?: () => void;
  onGoToAI?: () => void;
  onToggleTheme?: () => void;
  onToggleSidebar?: () => void;
  onNotifications?: () => void;
  onNewProject?: () => void;
  onHelp?: () => void;
}) {
  const shortcuts: Shortcut[] = React.useMemo(() => [
    // Command palette
    ...(handlers.onCommandPalette ? [{
      key: "k",
      meta: true,
      action: handlers.onCommandPalette,
      description: "Open command palette",
      category: "Global",
    }] : []),
    // Search
    ...(handlers.onSearch ? [{
      key: "/",
      action: handlers.onSearch,
      description: "Focus search",
      category: "Global",
    }] : []),
    // Navigation
    ...(handlers.onGoToDashboard ? [{
      key: "d",
      ctrl: true,
      shift: true,
      action: handlers.onGoToDashboard,
      description: "Go to Dashboard",
      category: "Navigation",
    }] : []),
    ...(handlers.onGoToProjects ? [{
      key: "p",
      ctrl: true,
      shift: true,
      action: handlers.onGoToProjects,
      description: "Go to Projects",
      category: "Navigation",
    }] : []),
    ...(handlers.onGoToTeam ? [{
      key: "t",
      ctrl: true,
      shift: true,
      action: handlers.onGoToTeam,
      description: "Go to Team",
      category: "Navigation",
    }] : []),
    ...(handlers.onGoToSettings ? [{
      key: "s",
      ctrl: true,
      shift: true,
      action: handlers.onGoToSettings,
      description: "Go to Settings",
      category: "Navigation",
    }] : []),
    ...(handlers.onGoToAI ? [{
      key: "a",
      ctrl: true,
      shift: true,
      action: handlers.onGoToAI,
      description: "Go to AI Assistant",
      category: "Navigation",
    }] : []),
    // Actions
    ...(handlers.onToggleTheme ? [{
      key: "t",
      alt: true,
      action: handlers.onToggleTheme,
      description: "Toggle theme",
      category: "Appearance",
    }] : []),
    ...(handlers.onToggleSidebar ? [{
      key: "b",
      ctrl: true,
      action: handlers.onToggleSidebar,
      description: "Toggle sidebar",
      category: "Appearance",
    }] : []),
    ...(handlers.onNotifications ? [{
      key: "n",
      ctrl: true,
      shift: true,
      action: handlers.onNotifications,
      description: "Open notifications",
      category: "Global",
    }] : []),
    ...(handlers.onNewProject ? [{
      key: "n",
      alt: true,
      action: handlers.onNewProject,
      description: "New project",
      category: "Actions",
    }] : []),
    ...(handlers.onHelp ? [{
      key: "?",
      shift: true,
      action: handlers.onHelp,
      description: "Show keyboard shortcuts",
      category: "Global",
    }] : []),
  ], [handlers]);

  useKeyboardShortcuts(shortcuts);

  return shortcuts;
}

// Keyboard shortcuts help dialog
interface ShortcutsDialogProps {
  open: boolean;
  onClose: () => void;
  shortcuts: Shortcut[];
}

export function ShortcutsDialog({ open, onClose, shortcuts }: ShortcutsDialogProps) {
  if (!open) return null;

  const grouped = shortcuts.reduce((acc, shortcut) => {
    const category = shortcut.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(shortcut);
    return acc;
  }, {} as Record<string, Shortcut[]>);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-[480px] animate-scale-in">
        <div className="glass-card rounded-[22px] shadow-2xl shadow-black/40 overflow-hidden border border-white/[0.08]">
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Keyboard Shortcuts</h3>
          </div>
          <div className="p-5 space-y-5 max-h-[400px] overflow-y-auto">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-[11px] font-medium text-white/30 uppercase tracking-wider mb-2">
                  {category}
                </h4>
                <div className="space-y-1.5">
                  {items.map((shortcut, i) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <span className="text-sm text-white/60">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.ctrl && (
                          <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-[4px] bg-white/[0.06] px-1.5 font-mono text-[11px] text-white/40">
                            Ctrl
                          </kbd>
                        )}
                        {shortcut.meta && (
                          <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-[4px] bg-white/[0.06] px-1.5 font-mono text-[11px] text-white/40">
                            ⌘
                          </kbd>
                        )}
                        {shortcut.shift && (
                          <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-[4px] bg-white/[0.06] px-1.5 font-mono text-[11px] text-white/40">
                            ⇧
                          </kbd>
                        )}
                        {shortcut.alt && (
                          <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-[4px] bg-white/[0.06] px-1.5 font-mono text-[11px] text-white/40">
                            Alt
                          </kbd>
                        )}
                        <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-[4px] bg-white/[0.06] px-1.5 font-mono text-[11px] text-white/40">
                          {shortcut.key.toUpperCase()}
                        </kbd>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-white/[0.06] flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
