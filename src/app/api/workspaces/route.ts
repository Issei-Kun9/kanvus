import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const memberships = await db.workspaceMember.findMany({
      where: { userId: session.user.id },
      include: {
        workspace: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            _count: { select: { projects: true, members: true } },
          },
        },
      },
    });

    const workspaces = memberships.map((m) => m.workspace);
    return NextResponse.json(workspaces);
  } catch (error) {
    console.error("GET /api/workspaces error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
