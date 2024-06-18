'use server';

import { Todo, Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addTodo(data: FormData): Promise<void> {
    try {
        const todo = data.get("todo")
        const c = cookies()
        await fetch("http://localhost:3000/api/todos", {
            method: "POST",
            headers: {
                Cookie: c.toString(),
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ todo })
        })
        revalidateTag('todos')
    } catch (error) {
        console.error("Failed to add todo:", error);
        throw error;
    }
}

export async function getTodos(): Promise<Todo[]> {
    try {
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
        if (!res.ok) throw new Error('Failed to fetch todos');
        const { data } = await res.json()
        return data
    } catch (error) {
        console.error("Failed to get todos:", error);
        return [];
    }
}

export async function deleteTodo(id: string): Promise<void> {
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
        if (!res.ok) throw new Error('Failed to delete todo');
        revalidateTag('todos')
    } catch (error) {
        console.error("Failed to delete todo:", error);
        throw error;
    }
}

export async function deleteAll(): Promise<void> {
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
        if (!res.ok) throw new Error('Failed to delete all todos');
        revalidateTag('todos')
    } catch (error) {
        console.error("Failed to delete all todos:", error);
        throw error;
    }
}

export async function updateTodo(id: string, payload: Prisma.TodoUpdateInput): Promise<Todo> {
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
        if (!res.ok) throw new Error('Failed to update todo');
        revalidateTag('todos')
        const { data } = await res.json()
        return data
    } catch (error) {
        console.error("Failed to update todo:", error);
        throw error;
    }
}
