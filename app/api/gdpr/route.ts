import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const gdprInfo = await prisma.gdprInfo.findFirst({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!gdprInfo) {
      return NextResponse.json(
        { error: "GDPR-informasjon ikke funnet" },
        { status: 404 }
      );
    }

    return NextResponse.json(gdprInfo);
  } catch (error) {
    console.error("Error fetching GDPR info:", error);
    return NextResponse.json(
      { error: "Feil ved henting av GDPR-informasjon" },
      { status: 500 }
    );
  }
}
