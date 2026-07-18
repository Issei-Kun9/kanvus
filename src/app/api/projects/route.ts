import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  color: z.string().default("#6366f1"),
  workspaceId: z.string(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");

    if (!workspaceId) {
      return NextResponse.json({ error: "Workspace ID required" }, { status: 400 });
    }

    const projects = await db.project.findMany({
      where: {
        workspaceId,
        workspace: {
          members: { some: { userId: session.user.id } },
        },
      },
      include: {
        _count: { select: { tasks: true } },
        tasks: {
          select: { status: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    const projectsWithStats = projects.map((p: (typeof projects)[number]) => ({
      ...p,
      taskCount: p._count.tasks,
      completedTaskCount: p.tasks.filter((t: { status: string }) => t.status === "DONE").length,
      _count: undefined,
      tasks: undefined,
    }));

    return NextResponse.json(projectsWithStats);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = createProjectSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.flatten() }, { status: 400 });
    }

    const { name, description, color, workspaceId } = validated.data;

    const member = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: { userId: session.user.id, workspaceId },
      },
    });

    if (!member) {
      return NextResponse.json({ error: "Not a member of this workspace" }, { status: 403 });
    }

    const project = await db.project.create({
      data: {
        name,
        description,
        color,
        workspaceId,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
