"use client";

import * as React from "react";
import { useWorkspace } from "@/hooks/use-workspace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Settings } from "lucide-react";

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

  const roleColors: Record<string, string> = {
    OWNER: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    ADMIN: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    MEMBER: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  };

  if (wsLoading || loading) {
    return (
      <div className="max-w-3xl space-y-6">
        <div className="h-8 w-32 bg-muted animate-pulse rounded" />
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Loading team members...
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-muted-foreground">
            Manage your workspace members.
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4" />
            Members ({members.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    src={member.image}
                    fallback={member.name || member.email || "U"}
                    size="md"
                  />
                  <div>
                    <p className="text-sm font-medium">{member.name || "Unknown"}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={roleColors[member.role] || ""} variant="secondary">
                    {member.role}
                  </Badge>
                  {member.role !== "OWNER" && (
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
