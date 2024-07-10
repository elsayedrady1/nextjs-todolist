'use server';

import { Todo, Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export type Callback =
    ({
        status: "success";
        message: string;
        data?: Todo
    }) |
    ({
        status: "failed";
        message: string;

    })

export async function addTodo(data: FormData): Promise<Callback> {
    try {
        const todo = data.get("todo")
        const c = cookies()
        const res = await fetch("http://localhost:3000/api/todos", {
            method: "POST",
            headers: {
                Cookie: c.toString(),
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ todo })
        })
        if (!res.ok) return { status: "failed", message: "Failed to add todo!" }

        revalidateTag('todos')

        return { status: "success", message: "Todo has been added successfully!" }
    } catch (error) {
        return { status: "failed", message: "Failed to add todo!" }
    }
}

export async function getTodos(): Promise<Todo[]> {
    const c = cookies()

    const res = await fetch("http://localhost:3000/api/todos", {
        method: "GET",
        headers: {
            Cookie: c.toString(),
            "Content-Type": "application/json"
        },
        credentials: "include",
        next: { tags: ["todos"] }
    })
    if (!res.ok) return [];

    const { data } = await res.json()
    return data
}

export async function deleteTodo(id: string): Promise<Callback> {
    try {
        const c = cookies()
        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: "DELETE",
            headers: {
                Cookie: c.toString(),
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        if (!res.ok) return { status: "failed", message: "Failed to delete todo!" }
        revalidateTag('todos')
        return { status: "success", message: "Todo has been deleted successfully!" }
    } catch (error) {
        return { status: "failed", message: "Failed to delete todo!" }
    }
}

export async function deleteAll(): Promise<Callback> {
    try {
        const c = cookies()
        const res = await fetch(`http://localhost:3000/api/todos/`, {
            method: "DELETE",

            headers: {
                Cookie: c.toString(),
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        if (!res.ok) return { status: "failed", message: "Failed to delete all todos!" }
        revalidateTag('todos')
        return { status: "success", message: "All Todos has been deleted successfully!" }
    } catch (error) {
        return { status: "failed", message: "Failed to delete all todos!" }
    }
}

export async function updateTodo(id: string, payload: Prisma.TodoUpdateInput): Promise<Callback> {
    try {
        const c = cookies()
        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: "PATCH",
            headers: {
                Cookie: c.toString(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
            credentials: "include",
        })

        if (!res.ok) return {
            status: "failed",
            message: "Failed to update todo!"
        }

        revalidateTag('todos')

        const { data } = await res.json()

        return { status: "success", message: "The todo has been added successfully!", data }

    } catch (error) {
        return { status: "failed", message: "Failed to update todo!" }
    }
}
