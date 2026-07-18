"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FolderKanban, Users, MessageSquare, BarChart3,
  CheckCircle2, Plus, ArrowRight
} from "lucide-react";

interface EmptyStateProps {
  type: "projects" | "tasks" | "team" | "chat" | "analytics" | "search" | "generic";
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

const Illustrations = {
  projects: () => (
    <svg viewBox="0 0 200 160" className="w-40 h-32" fill="none">
      {/* Desk */}
      <rect x="30" y="100" width="140" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
      {/* Monitor */}
      <rect x="50" y="40" width="100" height="60" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      {/* Screen */}
      <rect x="56" y="46" width="88" height="42" rx="3" fill="rgba(0,200,150,0.08)" />
      {/* Kanban columns */}
      <rect x="60" y="50" width="24" height="34" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <rect x="88" y="50" width="24" height="34" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <rect x="116" y="50" width="24" height="34" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      {/* Cards */}
      <rect x="63" y="54" width="18" height="8" rx="2" fill="rgba(0,200,150,0.3)" />
      <rect x="63" y="65" width="18" height="8" rx="2" fill="rgba(20,184,166,0.3)" />
      <rect x="91" y="54" width="18" height="8" rx="2" fill="rgba(125,211,252,0.3)" />
      {/* Stand */}
      <rect x="95" y="100" width="10" height="12" fill="rgba(255,255,255,0.06)" />
      {/* Plus icon */}
      <circle cx="100" cy="130" r="16" fill="rgba(0,200,150,0.15)" stroke="rgba(0,200,150,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="100" y1="124" x2="100" y2="136" stroke="rgba(0,200,150,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="94" y1="130" x2="106" y2="130" stroke="rgba(0,200,150,0.5)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  tasks: () => (
    <svg viewBox="0 0 200 160" className="w-40 h-32" fill="none">
      {/* Clipboard */}
      <rect x="55" y="25" width="90" height="110" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      <rect x="80" y="20" width="40" height="12" rx="4" fill="rgba(0,200,150,0.2)" stroke="rgba(0,200,150,0.3)" strokeWidth="1" />
      {/* Task items */}
      <rect x="65" y="48" width="12" height="12" rx="3" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <rect x="82" y="50" width="50" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
      <rect x="65" y="70" width="12" height="12" rx="3" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <rect x="82" y="72" width="40" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
      <rect x="65" y="92" width="12" height="12" rx="3" fill="rgba(0,200,150,0.3)" stroke="rgba(0,200,150,0.5)" strokeWidth="1" />
      <rect x="82" y="94" width="55" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
      {/* Checkmark */}
      <circle cx="71" cy="98" r="3" fill="#00C896" />
      <path d="M69 98l1.5 1.5L74 96" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      {/* Empty slots */}
      <rect x="65" y="114" width="12" height="12" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
      {/* Sparkle */}
      <circle cx="150" cy="40" r="3" fill="rgba(0,200,150,0.4)" />
      <circle cx="160" cy="55" r="2" fill="rgba(125,211,252,0.3)" />
      <circle cx="145" cy="60" r="1.5" fill="rgba(20,184,166,0.3)" />
    </svg>
  ),

  team: () => (
    <svg viewBox="0 0 200 160" className="w-40 h-32" fill="none">
      {/* Person 1 */}
      <circle cx="70" cy="65" r="16" fill="rgba(0,200,150,0.15)" stroke="rgba(0,200,150,0.3)" strokeWidth="1.5" />
      <circle cx="70" cy="60" r="6" fill="rgba(0,200,150,0.25)" />
      <path d="M60 75c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="rgba(0,200,150,0.2)" />
      {/* Person 2 */}
      <circle cx="130" cy="65" r="16" fill="rgba(125,211,252,0.15)" stroke="rgba(125,211,252,0.3)" strokeWidth="1.5" />
      <circle cx="130" cy="60" r="6" fill="rgba(125,211,252,0.25)" />
      <path d="M120 75c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="rgba(125,211,252,0.2)" />
      {/* Connection line */}
      <line x1="86" y1="65" x2="114" y2="65" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
      {/* Plus person */}
      <circle cx="100" cy="120" r="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="100" y1="114" x2="100" y2="126" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="94" y1="120" x2="106" y2="120" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Decorative dots */}
      <circle cx="50" cy="40" r="2" fill="rgba(0,200,150,0.3)" />
      <circle cx="150" cy="40" r="2" fill="rgba(125,211,252,0.3)" />
      <circle cx="60" cy="110" r="1.5" fill="rgba(20,184,166,0.3)" />
      <circle cx="140" cy="110" r="1.5" fill="rgba(0,200,150,0.3)" />
    </svg>
  ),

  chat: () => (
    <svg viewBox="0 0 200 160" className="w-40 h-32" fill="none">
      {/* Chat bubble 1 */}
      <rect x="30" y="35" width="90" height="35" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <rect x="40" y="45" width="50" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
      <rect x="40" y="53" width="35" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
      {/* Chat bubble 2 (AI) */}
      <rect x="80" y="80" width="90" height="35" rx="12" fill="rgba(0,200,150,0.1)" stroke="rgba(0,200,150,0.2)" strokeWidth="1" />
      <rect x="90" y="90" width="55" height="4" rx="2" fill="rgba(0,200,150,0.2)" />
      <rect x="90" y="98" width="40" height="4" rx="2" fill="rgba(0,200,150,0.15)" />
      {/* Sparkle icon */}
      <circle cx="175" cy="80" r="8" fill="rgba(0,200,150,0.15)" />
      <path d="M175 76v8M171 80h8" stroke="rgba(0,200,150,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Typing indicator */}
      <circle cx="50" cy="125" r="3" fill="rgba(255,255,255,0.1)" />
      <circle cx="60" cy="125" r="3" fill="rgba(255,255,255,0.1)" />
      <circle cx="70" cy="125" r="3" fill="rgba(255,255,255,0.1)" />
    </svg>
  ),

  analytics: () => (
    <svg viewBox="0 0 200 160" className="w-40 h-32" fill="none">
      {/* Chart background */}
      <rect x="30" y="30" width="140" height="100" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      {/* Bars */}
      <rect x="45" y="90" width="16" height="30" rx="3" fill="rgba(0,200,150,0.4)" />
      <rect x="68" y="70" width="16" height="50" rx="3" fill="rgba(20,184,166,0.4)" />
      <rect x="91" y="50" width="16" height="70" rx="3" fill="rgba(125,211,252,0.4)" />
      <rect x="114" y="60" width="16" height="60" rx="3" fill="rgba(0,200,150,0.4)" />
      <rect x="137" y="40" width="16" height="80" rx="3" fill="rgba(20,184,166,0.4)" />
      {/* Trend line */}
      <path d="M53 85 L76 65 L99 45 L122 55 L145 35" stroke="rgba(0,200,150,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="145" cy="35" r="3" fill="#00C896" />
      {/* Arrow */}
      <path d="M148 32l5-5M153 27l-2-5 5 2" stroke="#00C896" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  search: () => (
    <svg viewBox="0 0 200 160" className="w-40 h-32" fill="none">
      {/* Magnifying glass */}
      <circle cx="85" cy="75" r="35" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      <circle cx="85" cy="75" r="25" fill="rgba(0,200,150,0.06)" stroke="rgba(0,200,150,0.15)" strokeWidth="1.5" />
      <line x1="110" y1="100" x2="140" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="3" strokeLinecap="round" />
      {/* Search results */}
      <rect x="130" y="45" width="50" height="8" rx="3" fill="rgba(0,200,150,0.15)" />
      <rect x="130" y="58" width="40" height="6" rx="2" fill="rgba(255,255,255,0.06)" />
      <rect x="130" y="72" width="45" height="6" rx="2" fill="rgba(255,255,255,0.06)" />
      <rect x="130" y="86" width="35" height="6" rx="2" fill="rgba(255,255,255,0.06)" />
      {/* Sparkles */}
      <circle cx="50" cy="45" r="2" fill="rgba(0,200,150,0.4)" />
      <circle cx="120" cy="40" r="1.5" fill="rgba(125,211,252,0.3)" />
      <circle cx="55" cy="110" r="1.5" fill="rgba(20,184,166,0.3)" />
    </svg>
  ),

  generic: () => (
    <svg viewBox="0 0 200 160" className="w-40 h-32" fill="none">
      {/* Abstract shapes */}
      <circle cx="100" cy="80" r="40" fill="rgba(0,200,150,0.06)" stroke="rgba(0,200,150,0.12)" strokeWidth="1.5" />
      <circle cx="100" cy="80" r="25" fill="rgba(20,184,166,0.06)" stroke="rgba(20,184,166,0.12)" strokeWidth="1" />
      <circle cx="100" cy="80" r="10" fill="rgba(125,211,252,0.1)" />
      {/* Orbiting dots */}
      <circle cx="100" cy="35" r="3" fill="rgba(0,200,150,0.4)" />
      <circle cx="145" cy="80" r="2.5" fill="rgba(20,184,166,0.4)" />
      <circle cx="100" cy="125" r="2" fill="rgba(125,211,252,0.4)" />
      <circle cx="55" cy="80" r="3" fill="rgba(0,200,150,0.4)" />
      {/* Connection lines */}
      <circle cx="100" cy="80" r="55" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" />
    </svg>
  ),
};

export function EmptyState({ type, title, description, action }: EmptyStateProps) {
  const Illustration = Illustrations[type] || Illustrations.generic;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6 animate-float-slow opacity-80">
        <Illustration />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/40 text-center max-w-[280px] mb-6">{description}</p>
      {action && (
        <Button
          onClick={action.onClick}
          className="gradient-primary btn-glow rounded-[14px] text-white"
        >
          {action.icon || <Plus className="h-4 w-4 mr-2" />}
          {action.label}
        </Button>
      )}
    </div>
  );
}
