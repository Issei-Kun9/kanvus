import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const member = await db.workspaceMember.findUnique({
      where: { userId_workspaceId: { userId: session.user.id, workspaceId: id } },
    });
    if (!member) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const members = await db.workspaceMember.findMany({
      where: { workspaceId: id },
      include: {
        user: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
      orderBy: { role: "asc" },
    });

    const result = members.map((m) => ({
      id: m.user.id,
      name: m.user.name,
      email: m.user.email,
      image: m.user.image,
      role: m.role,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/workspaces/[id]/members error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
