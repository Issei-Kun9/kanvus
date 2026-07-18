"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RouteTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function RouteTransition({ children, className }: RouteTransitionProps) {
  return (
    <div className={cn("animate-in fade-in slide-up duration-300", className)}>
      {children}
    </div>
  );
}

// Page transition wrapper
export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 p-6">
        <div className="h-8 w-48 skeleton" />
        <div className="h-4 w-96 skeleton" />
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="h-32 skeleton" />
          <div className="h-32 skeleton" />
          <div className="h-32 skeleton" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-200">
      {children}
    </div>
  );
}

// Loading bar component
export function LoadingBar({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 h-[2px] z-50 transition-opacity duration-300",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="h-full gradient-primary animate-shimmer" />
    </div>
  );
}

// Skeleton components
export function SkeletonCard() {
  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 skeleton rounded-[10px]" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-32 skeleton" />
          <div className="h-3 w-20 skeleton" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full skeleton" />
        <div className="h-3 w-3/4 skeleton" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex gap-4 py-3 px-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-3 flex-1 skeleton" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-3 px-4 border-t border-white/[0.04]">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 flex-1 skeleton" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonKanban() {
  return (
    <div className="flex gap-4 p-4">
      {Array.from({ length: 3 }).map((_, col) => (
        <div key={col} className="flex-1 space-y-3">
          <div className="h-6 w-24 skeleton" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card p-3 space-y-2">
              <div className="h-4 w-3/4 skeleton" />
              <div className="h-3 w-1/2 skeleton" />
              <div className="flex gap-2 mt-2">
                <div className="h-5 w-16 skeleton rounded-full" />
                <div className="h-5 w-12 skeleton rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <div className="h-8 w-48 skeleton" />
        <div className="h-4 w-64 skeleton" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card p-4 space-y-3">
            <div className="h-4 w-20 skeleton" />
            <div className="h-8 w-16 skeleton" />
            <div className="h-3 w-24 skeleton" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card h-64 skeleton" />
        <div className="glass-card h-64 skeleton" />
      </div>
    </div>
  );
}
