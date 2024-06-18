import { prisma } from "@/constants"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const sessionId = request.cookies.get('sessionId')?.value
    if (!sessionId) {
        return NextResponse.json({ message: "Invalid Session provided." }, { status: 400 })
    }
    const id = params.id

    try {
        const todo = await prisma.todo.delete({
            where: { sessionId: sessionId, id: id }
        })

        if (!todo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 })
        }
        
        return NextResponse.json({ message: "Todo deleted successfully!" }, { status: 200 })
    } catch (error) {
        console.error("Failed to delete todo:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const sessionId = request.cookies.get('sessionId')?.value
    if (!sessionId) {
        return NextResponse.json({ message: "Invalid Session provided." }, { status: 400 })
    }
    const id = params.id
    const data = await request.json()

    try {
        const updatedTodo = await prisma.todo.update({
            where: { sessionId: sessionId, id: id },
            data: data
        })
        if (!updatedTodo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 })
        }
        return NextResponse.json({ data: updatedTodo }, { status: 200 })
    } catch (error) {
        console.error("Failed to update todo:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}