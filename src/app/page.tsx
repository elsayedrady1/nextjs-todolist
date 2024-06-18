import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaDiscord, FaGithub } from "react-icons/fa";
import {
  FaArrowRightLong,
  FaArrowRightToBracket,
  FaArrowRightToCity,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

const Home = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center max-w-[50ch] text-center">
      <h1 className="font-semibold text-[2.2rem]">NextJS modern TODO list</h1>
      <p className="text-[1.1rem] text-black text-opacity-90">
        A modern TODO list app built with Next.js, leveraging server actions and
        Prisma for efficient task management.
      </p>
      <div className="flex items-center justify-center gap-2">
        <Link href="https://github.com/elsayedrady1/nextjs-todolist">
          <Button className="flex gap-2 items-center px-5">
            <FaGithub className="text-lg" /> Github
          </Button>
        </Link>
        <Link href="https://discord.com/users/779536788058013697">
          <Button variant="outline" className="flex gap-2 items-center px-5">
            <FaDiscord className="text-lg" /> Discord
          </Button>
        </Link>
      </div>

      <Link href="/todos" className="flex items-center gap-2 text-lg">
        <FaArrowRightToBracket /> Go to todos
      </Link>
    </div>
  );
};

export default Home;
