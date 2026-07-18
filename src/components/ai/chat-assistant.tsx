"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Sparkles, Send, Bot, Copy, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AIChatMessage } from "@/types";

interface ChatAssistantProps {
  workspaceId: string;
}

function renderMarkdown(text: string): string {
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  const parts = html.split(/(<pre>[\s\S]*?<\/pre>)/g);
  html = parts.map((part) => {
    if (part.startsWith("<pre>")) return part;
    return part.replace(/\n/g, "<br/>");
  }).join("");

  return html;
}

export function ChatAssistant({ workspaceId }: ChatAssistantProps) {
  const [messages, setMessages] = React.useState<AIChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: AIChatMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, workspaceId }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();

      const assistantMessage: AIChatMessage = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: AIChatMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Prioritize my tasks",
    "Analyze workload",
    "Suggest next sprint",
    "Generate roadmap",
  ];

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col glass-card rounded-[22px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]">
        <div className="flex h-10 w-10 items-center justify-center rounded-[12px] gradient-ai">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-white">AI Assistant</h2>
          <p className="text-xs text-white/40">Powered by Nemotron</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-xs text-white/40">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-[20px] gradient-ai mb-6 animate-float">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Kanvus Assistant</h3>
            <p className="text-sm text-white/40 mb-8 max-w-sm">
              Ask me anything about your projects and tasks. I can help you
              prioritize, analyze progress, and suggest next steps.
            </p>
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className={cn(
                    "glass-card rounded-[14px] p-4 text-left text-sm text-white/60 hover:text-white transition-all hover-lift",
                    `animate-slide-up stagger-${i + 1}`
                  )}
                >
                  <Sparkles className="h-4 w-4 text-[#7DD3FC] mb-2" />
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-3 animate-slide-up",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.role === "assistant" && (
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] gradient-ai shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            <div
              className={cn(
                "rounded-[16px] px-4 py-3 max-w-[80%] text-sm",
                msg.role === "user"
                  ? "gradient-primary text-white"
                  : "glass-card"
              )}
            >
              {msg.role === "assistant" ? (
                <div
                  className="whitespace-pre-wrap text-sm leading-relaxed [&_strong]:font-semibold [&_strong]:text-white [&_em]:italic [&_code]:rounded-md [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[#7DD3FC] [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-black/30 [&_pre]:p-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:py-0.5 [&_p]:mb-2 last:[&_p]:mb-0 [&_a]:text-[#7DD3FC] [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                />
              ) : (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
            {msg.role === "user" && (
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/[0.08] shrink-0">
                <span className="text-xs font-medium text-white/60">U</span>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 animate-slide-up">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] gradient-ai shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="glass-card rounded-[16px] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#7DD3FC] animate-bounce [animation-delay:-0.3s]" />
                <div className="h-2 w-2 rounded-full bg-[#7DD3FC] animate-bounce [animation-delay:-0.15s]" />
                <div className="h-2 w-2 rounded-full bg-[#7DD3FC] animate-bounce" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/[0.06] p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your projects..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
            className="rounded-[14px] glass-input h-12"
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="rounded-[14px] gradient-ai h-12 w-12 btn-glow"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
