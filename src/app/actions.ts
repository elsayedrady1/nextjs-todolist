"use server";

import { prisma } from "@/constants";
import { Todo, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addTodo(data: FormData): Promise<void> {
    const todo = data.get("todo")
    await prisma.todo.create({
        data: {
            name: todo as string
        }
    })
    revalidatePath('/')
}

export async function getTodos(): Promise<Todo[]> {
    const todos = await prisma.todo.findMany()
    return todos
}


export async function deleteTodo(id: string): Promise<void> {
    await prisma.todo.delete({ where: { id: id } })
    revalidatePath('/')
}

export async function deleteAll(): Promise<void> {
    await prisma.todo.deleteMany()
    revalidatePath('/')
}

export async function updateTodo(id: string, payload: Prisma.TodoUpdateInput): Promise<Todo> {
    const todo = await prisma.todo.update({ where: { id: id }, data: { ...payload } })
    revalidatePath('/')
    return todo
}