import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { toCsv } from "@/lib/csv";

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

    const member = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: { userId: session.user.id, workspaceId },
      },
    });

    if (!member) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const projects = await db.project.findMany({
      where: { workspaceId },
      include: {
        _count: { select: { tasks: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    const csv = toCsv(
      projects.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description ?? "",
        color: project.color,
        icon: project.icon,
        createdAt: project.createdAt.toISOString(),
        taskCount: project._count.tasks,
      }))
    );

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="projects-${workspaceId}.csv"`,
      },
    });
  } catch (error) {
    console.error("GET /api/projects/export error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
