import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const task = await db.task.findUnique({
      where: { id },
      include: {
        assignee: { select: { id: true, name: true, image: true } },
        creator: { select: { id: true, name: true, image: true } },
        labels: { include: { label: true } },
        comments: {
          include: { author: { select: { id: true, name: true, image: true } } },
          orderBy: { createdAt: "desc" },
        },
        project: { select: { id: true, workspaceId: true } },
      },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const member = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: session.user.id,
          workspaceId: task.project.workspaceId,
        },
      },
    });

    if (!member) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("GET /api/tasks/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function isTaskMember(taskId: string, userId: string): Promise<boolean> {
  const task = await db.task.findUnique({
    where: { id: taskId },
    select: { project: { select: { workspaceId: true } } },
  });
  if (!task) return false;
  const member = await db.workspaceMember.findUnique({
    where: {
      userId_workspaceId: { userId, workspaceId: task.project.workspaceId },
    },
  });
  return !!member;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await db.task.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const authorized = await isTaskMember(id, session.user.id);
    if (!authorized) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const updated = await db.task.update({
      where: { id },
      data: {
        title: body.title ?? existing.title,
        description: body.description ?? existing.description,
        status: body.status ?? existing.status,
        priority: body.priority ?? existing.priority,
        assigneeId: body.assigneeId !== undefined ? body.assigneeId : existing.assigneeId,
        dueDate: body.dueDate !== undefined ? body.dueDate : existing.dueDate,
        order: body.order ?? existing.order,
      },
      include: {
        assignee: { select: { id: true, name: true, image: true } },
        labels: { include: { label: true } },
      },
    });

    if (body.comment && typeof body.comment === "string" && body.comment.trim()) {
      await db.comment.create({
        data: {
          content: body.comment.trim(),
          taskId: id,
          authorId: session.user.id,
        },
      });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/tasks/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await db.task.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const authorized = await isTaskMember(id, session.user.id);
    if (!authorized) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.task.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/tasks/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
