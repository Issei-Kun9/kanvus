"use client";

import { ChatAssistant } from "@/components/ai/chat-assistant";

export default function AIPage() {
  return (
    <div className="h-full">
      <ChatAssistant workspaceId="default" />
    </div>
  );
}
