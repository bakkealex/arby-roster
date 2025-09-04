import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types/user";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pendingUsers = await prisma.user.findMany({
      where: {
        role: UserRole.PENDING,
        isApproved: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        gdprConsentDate: true,
        gdprConsentVersion: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(pendingUsers);
  } catch (error) {
    console.error("Error fetching pending users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
