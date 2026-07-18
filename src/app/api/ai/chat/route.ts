import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { chatWithAI } from "@/lib/openai";
import { z } from "zod";

const chatSchema = z.object({
  message: z.string().min(1).max(1000),
  workspaceId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = chatSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten() }, { status: 400 });
    }

    const { message, workspaceId } = validated.data;

    const projects = await db.project.findMany({
      where: { workspaceId },
      include: {
        _count: { select: { tasks: true } },
        tasks: {
          select: { status: true },
          take: 10,
          orderBy: { updatedAt: "desc" },
        },
      },
      take: 5,
    });

    const projectContext = projects.map((p) => ({
      name: p.name,
      taskCount: p._count.tasks,
      completedCount: p.tasks.filter((t) => t.status === "DONE").length,
    }));

    const recentTasks = await db.task.findMany({
      where: {
        project: { workspaceId },
        OR: [
          { assigneeId: session.user.id },
          { creatorId: session.user.id },
        ],
      },
      select: { title: true, status: true, priority: true },
      orderBy: { updatedAt: "desc" },
      take: 10,
    });

    const response = await chatWithAI(message, {
      projects: projectContext,
      recentTasks,
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error("POST /api/ai/chat error:", error);
    return NextResponse.json(
      { error: "AI service unavailable" },
      { status: 500 }
    );
  }
}
