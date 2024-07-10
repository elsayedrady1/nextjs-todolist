"use client";

import React, {
  ComponentPropsWithRef,
  FC,
  forwardRef,
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import { deleteTodo, updateTodo } from "@/app/todos/actions";
import { Button } from "./ui/button";
import { Todo as ITodo } from "@prisma/client";
import { Checkbox } from "./ui/checkbox";
import { Loader2 } from "lucide-react";
import { FaPen, FaTrash } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { Input } from "./ui/input";
import { useOnClickOutside } from "@/hooks/utils/useOnClickOutside";
import { Modal } from "./Modal";
const Todo = (todo: ITodo) => {
  const [opened, setOpened] = useState(false);
  const [deletePending, startDeleting] = useTransition();
  const [checkPending, startChecking] = useTransition();
  const ref = useRef(null);

  const [optimisticTodo, checkTodo] = useOptimistic(
    todo,
    (todo, checked: boolean) => {
      return { ...todo, checked };
    }
  );

  useOnClickOutside([ref], () => {
    setOpened(false);
  });

  async function handleCheck(checked: boolean) {
    checkTodo(checked);
    await updateTodo(optimisticTodo.id, {
      checked,
    });
  }
  async function handleDelete() {
    await deleteTodo(optimisticTodo.id);
  }
  const date = new Date(optimisticTodo.updatedAt);

  return (
    <div className="p-3.5 rounded-md flex justify-between border-black border border-opacity-10 w-full">
      <div className="flex items-center gap-3 w-full">
        <Checkbox
          disabled={checkPending}
          className="h-5 w-5"
          checked={optimisticTodo.checked}
          onCheckedChange={(checked) =>
            startChecking(async () => await handleCheck(checked as boolean))
          }
        />

        <div className="flex flex-col gap-1 text-sm md:!max-w-[30vw] !max-w-[20vw]">
          <span
            className="text-start break-words data-[checked=true]:line-through data-[checked=true]:text-opacity-70 text-black"
            data-checked={optimisticTodo.checked}
          >
            {optimisticTodo.name}
          </span>
          <span>{date.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Button
          variant="destructive"
          onClick={() =>
            startDeleting(async () => {
              await deleteTodo(optimisticTodo.id);
            })
          }
          disabled={deletePending}
        >
          {deletePending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <FaTrash className="text-lg" />
          )}
        </Button>

        <Button variant="default" onClick={() => setOpened((prev) => !prev)}>
          <FaPen className="text-lg" />
        </Button>
      </div>
      <AnimatePresence>
        {opened && (
          <EditModal
            ref={ref}
            todo={optimisticTodo.name}
            id={optimisticTodo.id}
            opened={opened}
            setOpened={setOpened}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// @ts-expect-error
const EditModal: FC<
  ComponentPropsWithRef<"div"> & {
    opened: boolean;
    todo: string;
    id: string;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = forwardRef(({ setOpened, todo, id }, ref) => {
  const [pending, startTransition] = useTransition();

  return (
    <Modal
      ref={ref}
      className="flex justify-center flex-col items-center gap-2 p-10"
    >
      <h1 className="font-medium">Edit your TODO</h1>

      <form
        action={(formData: FormData) => {
          startTransition(async () => {
            await updateTodo(id, { name: formData.get("todo") as string });
          });
          setOpened(false);
        }}
        className="flex flex-col gap-2 w-full"
      >
        <Input
          autoFocus
          id="todo"
          name="todo"
          defaultValue={todo}
          placeholder="New Todo"
        />

        <Button disabled={pending} type="submit">
          {pending ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Modal>
  );
});
EditModal.displayName = "EditModal";

export { Todo };
