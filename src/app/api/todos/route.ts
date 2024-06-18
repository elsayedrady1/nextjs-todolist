import { prisma } from "@/constants"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('sessionId')?.value
        if (!sessionId) {
            return NextResponse.json({ message: "Invalid Session provided." }, { status: 400 })
        }
        const todos = await prisma.todo.findMany({ where: { sessionId: sessionId } })
        return NextResponse.json({ data: todos }, { status: 200 })
    } catch (error) {
        console.error("Failed to fetch todos:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const { todo }: { todo: string } = await request.json()
        const sessionId = request.cookies.get('sessionId')?.value
        if (!sessionId) {
            return NextResponse.json({ message: "Invalid Session provided." }, { status: 400 })
        }

        const todoData = await prisma.todo.create({
            data: {
                sessionId: sessionId,
                name: todo
            }
        })
        return NextResponse.json({ data: todoData }, { status: 200 })
    } catch (error) {
        console.error("Failed to create todo:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    const sessionId = request.cookies.get('sessionId')?.value
    
    if (!sessionId) {
        return NextResponse.json({ message: "Invalid Session provided." }, { status: 400 })
    }

    try {
        await prisma.todo.deleteMany({
            where: { sessionId: sessionId }
        })
        return NextResponse.json({ message: "Todo deleted successfully!" }, { status: 200 })

    } catch (error) {
        console.error("Failed to delete todos:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
