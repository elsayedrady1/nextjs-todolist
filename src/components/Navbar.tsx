"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaCar, FaCheckSquare, FaList } from "react-icons/fa";
import { Button } from "./ui/button";
import { ReactNode } from "react";

interface INavlink {
  label: ReactNode;
  href: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  activeVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
}
const navlinks: INavlink[] = [
  {
    href: "/todos",
    label: (
      <span className="flex items-center gap-2 text-l">
        <FaCheckSquare className="text-lg" />
        Todos
      </span>
    ),
    variant: "default",
    activeVariant: "secondary",
  },
];
const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="w-full fixed top-0 py-5 px-[30%] md:px-[10%] mx-auto inset-x-0">
      <nav className="border border-black border-opacity-5 min-h-[60px] py-2.5 px-3 flex items-center justify-between flex-row bg-slate-50 rounded-[15px] drop-shadow-lg shadow-black">
        <Link className="flex gap-2 items-center justify-center" href="/">
          <FaCheckSquare className="w-5 h-5" />
          <span className="font-semibold">Todos</span>
        </Link>
        <ul className="list-none flex gap-2 items-center justify-center w-fit">
          {navlinks.map(({ href, label, activeVariant, variant }, index) => (
            <Link href={href} key={index}>
              <Button
                className="!rounded-[7px]"
                variant={href === pathname ? activeVariant || variant : variant}
              >
                {label}
              </Button>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};
export { Navbar };
