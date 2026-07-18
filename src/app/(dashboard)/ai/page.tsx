"use client";

import { ChatAssistant } from "@/components/ai/chat-assistant";
import { useWorkspace } from "@/hooks/use-workspace";

export default function AIPage() {
  const { workspaceId, loading } = useWorkspace();

  if (loading || !workspaceId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground text-sm">Loading workspace...</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <ChatAssistant workspaceId={workspaceId} />
    </div>
  );
}
