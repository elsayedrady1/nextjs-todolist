"use client";
import { setCookie } from "@/app/todos/actions";
import { Session } from "@prisma/client";
import { cookies } from "next/headers";
import { createContext, ReactNode } from "react";

const SessionContext = createContext<Session>(null!);

const SessionProvider = ({
  session,
  children,
}: {
  children: ReactNode;
  session: Session;
}) => {
  setCookie("sessionId", session.id);
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider };
