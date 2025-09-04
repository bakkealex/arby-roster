import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Kun administratorer kan oppdatere GDPR-informasjon" },
        { status: 403 }
      );
    }

    const { title, content, version } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Tittel og innhold er påkrevd" },
        { status: 400 }
      );
    }

    // Deactivate current active GDPR info
    await prisma.gdprInfo.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    // Create new GDPR info
    const newGdprInfo = await prisma.gdprInfo.create({
      data: {
        title,
        content,
        version: version || "1.0",
        isActive: true,
      },
    });

    return NextResponse.json(newGdprInfo);
  } catch (error) {
    console.error("Error updating GDPR info:", error);
    return NextResponse.json(
      { error: "Feil ved oppdatering av GDPR-informasjon" },
      { status: 500 }
    );
  }
}
