"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-input  group-[.toaster]:border-opacity-10 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-foreground",

          actionButton:
            "group-[.toast]:bg-foreground group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-foreground group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
