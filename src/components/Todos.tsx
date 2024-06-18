"use client";

import { addTodo, deleteAll } from "@/app/todos/actions";
import { Todo } from "@prisma/client";
import {
  ComponentPropsWithRef,
  FC,
  forwardRef,
  useRef,
  useState,
  useTransition,
} from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Todo as TodoComponent } from "./Todo";
import { useFormStatus } from "react-dom";
import { Modal } from "./Modal";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useOnClickOutside } from "@/hooks/utils/useOnClickOutside";

const Todos = ({ todos }: { todos: Todo[] }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  useOnClickOutside([modalRef], () => {
    setOpened(false);
  });
  return (
    <div className="flex flex-col gap-2  md:!w-[80vw] lg:w-[40vw] w-[25vw]">
      <h3>Enter Task</h3>

      <form
        ref={formRef}
        action={async (formData: FormData) => {
          formRef.current?.reset();
          await addTodo(formData);
        }}
        className="flex flex-col gap-1"
      >
        <Input
          autoFocus
          name="todo"
          id="todo"
          placeholder="Type todo"
          required
        />
        <TodoButton />
      </form>

      <Button
        variant="destructive"
        onClick={() => setOpened(true)}
        disabled={todos?.length === 0}
      >
        Delete All
      </Button>

      <ul className="flex flex-col gap-1 max-h-56 overflow-y-auto">
        {todos?.length > 0 ? (
          todos?.map((todo, i) => <TodoComponent key={i} {...todo} />)
        ) : (
          <span className="p-3.5 rounded-md border-black border border-opacity-10 w-full flex justify-center items-center">
            There is no todos at this time
          </span>
        )}
      </ul>

      <AnimatePresence>
        {opened && <DeleteModal ref={modalRef} setOpened={setOpened} />}
      </AnimatePresence>
    </div>
  );
};

const TodoButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? "Adding Todo..." : "Add Todo"}
    </Button>
  );
};

// @ts-expect-error
const DeleteModal: FC<
  ComponentPropsWithRef<"div"> & {
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = forwardRef(({ setOpened }, ref) => {
  const [pending, startTransition] = useTransition();

  return (
    <Modal
      ref={ref}
      className="flex justify-center flex-col items-center gap-2 p-10"
    >
      <h1 className="font-medium">
        Are you sure that you want to delete all todos?
      </h1>

      <form
        action={() => {
          startTransition(async () => {
            await deleteAll();
          });
          setOpened(false);
        }}
        className="flex gap-2 w-full"
      >
        <Button disabled={pending} variant="destructive" type="submit">
          {pending ? <Loader2 className="animate-spin" /> : "Confirm"}
        </Button>

        <Button
          onClick={() => setOpened(false)}
          variant="secondary"
          type="button"
        >
          Cancel
        </Button>
      </form>
    </Modal>
  );
});
DeleteModal.displayName = "DeleteModal";
export default Todos;
