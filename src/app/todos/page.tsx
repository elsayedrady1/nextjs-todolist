export const dynamic = "force-dynamic";
import Todos from "@/components/Todos";
import { getTodos } from "./actions";

export default async function TodoPage() {
  const todos = await getTodos();

  return (
    <main className="flex justify-center items-center h-screen w-screen">
      <Todos todos={todos} />
    </main>
  );
}
