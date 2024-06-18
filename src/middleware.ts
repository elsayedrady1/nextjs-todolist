import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

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