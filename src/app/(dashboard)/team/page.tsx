"use client";

import * as React from "react";
import { useWorkspace } from "@/hooks/use-workspace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Settings, Mail, MoreHorizontal } from "lucide-react";

interface TeamMember {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
}

export default function TeamPage() {
  const { workspaceId, loading: wsLoading } = useWorkspace();
  const [members, setMembers] = React.useState<TeamMember[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!workspaceId) return;
    setLoading(true);
    fetch(`/api/workspaces/${workspaceId}/members`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setMembers(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [workspaceId]);

  const roleConfig: Record<string, { color: string; bg: string }> = {
    OWNER: { color: "#7C3AED", bg: "bg-[#7C3AED]/15" },
    ADMIN: { color: "#2563EB", bg: "bg-[#2563EB]/15" },
    MEMBER: { color: "#6B7280", bg: "bg-white/[0.06]" },
  };

  if (wsLoading || loading) {
    return (
      <div className="max-w-3xl space-y-6">
        <div className="h-8 w-32 skeleton" />
        <div className="glass-card rounded-[22px] p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-10 w-10 skeleton rounded-full" />
                <div className="flex-1">
                  <div className="h-4 w-24 skeleton mb-2" />
                  <div className="h-3 w-32 skeleton" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-white/40">
            Manage your workspace members.
          </p>
        </div>
        <Button className="gap-2 rounded-[14px] gradient-primary btn-glow">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {/* Members */}
      <Card className="animate-slide-up stagger-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4 text-[#7C3AED]" />
            Members ({members.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {members.map((member, i) => {
              const config = roleConfig[member.role] || roleConfig.MEMBER;
              return (
                <div
                  key={member.id}
                  className={`flex items-center justify-between p-3 rounded-[14px] hover:bg-white/[0.04] transition-all duration-200 animate-slide-up stagger-${Math.min(i + 2, 8)}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar
                        src={member.image}
                        fallback={member.name || member.email || "U"}
                        size="md"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#10B981] border-2 border-[#09090B]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name || "Unknown"}</p>
                      <p className="text-xs text-white/35">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="rounded-full text-xs"
                      style={{
                        backgroundColor: config.bg,
                        color: config.color,
                        borderColor: config.color + "30",
                      }}
                    >
                      {member.role}
                    </Badge>
                    {member.role !== "OWNER" && (
                      <Button variant="ghost" size="icon" className="rounded-[10px] h-8 w-8">
                        <MoreHorizontal className="h-4 w-4 text-white/30" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
