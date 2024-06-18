import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient, Session } from '@prisma/client';
import { cookies } from "next/headers";

// export async function middleware(request: NextRequest) {
//     const sessionId = request.cookies.get("sessionId")?.value;

//     const res = await fetch("http://localhost:3000/api/auth", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     const session: Session = await res.json();
//     const response = NextResponse.next();

//     if (!sessionId) {
//         response.cookies.set("sessionId", session.id);

//     }
//     return response;
// }

export const config = {
    matcher: ["/todos"],
};

export default async function _middleware(request: NextRequest) {
    const c = cookies();
    const oldSessionId = c.get("sessionId")
    const res = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        credentials: "include",
        headers: {
            Cookie: c.toString(),
            "Content-Type": "application/json"
        }
    })
    const { data } = await res.json();

    const response = NextResponse.next();

    if (oldSessionId !== data.id)
        response.cookies.set("sessionId", data.id);


    return response;
}