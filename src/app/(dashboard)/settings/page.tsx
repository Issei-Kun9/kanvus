"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import {
  User,
  CreditCard,
  Palette,
  Shield,
  Bell,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-white/40">
          Your profile, preferences, and billing.
        </p>
      </div>

      {/* Profile */}
      <Card className="animate-slide-up stagger-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4 text-[#00C896]" />
            Profile
          </CardTitle>
          <CardDescription>
            Name, email, and avatar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar
              src={session?.user?.image}
              fallback={session?.user?.name || "U"}
              size="lg"
            />
            <div>
              <p className="font-medium">{session?.user?.name}</p>
              <p className="text-sm text-white/40">
                {session?.user?.email}
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Name</label>
              <Input defaultValue={session?.user?.name || ""} className="rounded-[14px]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Email</label>
              <Input
                defaultValue={session?.user?.email || ""}
                disabled
                className="rounded-[14px] opacity-50"
              />
            </div>
          </div>
          <Button className="gap-2 rounded-[14px] gradient-primary btn-glow">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="animate-slide-up stagger-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Palette className="h-4 w-4 text-[#14B8A6]" />
            Appearance
          </CardTitle>
          <CardDescription>
            Dark and light mode.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-white/40">
                Switch between light and dark mode.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      {/* Plan */}
      <Card className="animate-slide-up stagger-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="h-4 w-4 text-[#22C55E]" />
            Subscription Plan
          </CardTitle>
          <CardDescription>
            Your current plan and billing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-[14px] glass-card">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">Free Plan</p>
                <Badge variant="secondary" className="bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30">
                  Current
                </Badge>
              </div>
              <p className="text-sm text-white/40 mt-1">
                3 workspaces, 5 projects, 10 AI requests/day
              </p>
            </div>
            <Button variant="outline" className="rounded-[14px] border-white/10 hover:bg-white/[0.05]">
              Upgrade to Pro
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="animate-slide-up stagger-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4 text-[#FBBF24]" />
            Security
          </CardTitle>
          <CardDescription>
            Password and 2FA.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-white/40">
                Last changed 30 days ago
              </p>
            </div>
            <Button variant="outline" size="sm" className="rounded-[10px] border-white/10 hover:bg-white/[0.05]">
              Change Password
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-white/40">
                Extra login security via authenticator app.
              </p>
            </div>
            <Button variant="outline" size="sm" className="rounded-[10px] border-white/10 hover:bg-white/[0.05]">
              Enable 2FA
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="animate-slide-up stagger-5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-[#7DD3FC]" />
            Notifications
          </CardTitle>
          <CardDescription>
            What you get notified about.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Task assignments", description: "When someone assigns you a task" },
            { label: "Project updates", description: "When a project you belong to is updated" },
            { label: "AI suggestions", description: "Daily task priority recommendations" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2"
            >
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-white/40">
                  {item.description}
                </p>
              </div>
              <button className="h-5 w-9 rounded-full bg-[#00C896] relative transition-colors hover:bg-[#00A87D]">
                <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform" />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
