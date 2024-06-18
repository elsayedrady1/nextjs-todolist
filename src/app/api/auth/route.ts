import { prisma } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const sessionId = request.cookies.get("sessionId")?.value;
        let session;
        if (sessionId) {
            session = await prisma.session.findUnique({
                where: { id: sessionId },
            });
        }

        if (!session) {
            session = await prisma.session.create({ data: {} });
        }
        return NextResponse.json({ data: session }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

