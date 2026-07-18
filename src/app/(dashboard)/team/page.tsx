"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Settings } from "lucide-react";

export default function TeamPage() {
  const [members] = React.useState([
    { id: "1", name: "You", email: "you@example.com", role: "OWNER", status: "online" },
    { id: "2", name: "Alice Chen", email: "alice@example.com", role: "ADMIN", status: "online" },
    { id: "3", name: "Bob Smith", email: "bob@example.com", role: "MEMBER", status: "online" },
    { id: "4", name: "Carol Davis", email: "carol@example.com", role: "MEMBER", status: "away" },
  ]);

  const roleColors: Record<string, string> = {
    OWNER: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    ADMIN: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    MEMBER: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  };

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
                  <div className="relative">
                    <Avatar fallback={member.name} size="md" />
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                        member.status === "online"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
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
