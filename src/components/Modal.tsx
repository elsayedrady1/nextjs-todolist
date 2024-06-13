import { ComponentPropsWithRef, FC, forwardRef, useTransition } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// @ts-expect-error
const Modal: FC<ComponentPropsWithRef<"div">> = forwardRef(
  ({ className, children }, ref) => {
    return (
      <motion.div
        variants={{
          closed: {
            opacity: 0,
          },
          opened: {
            opacity: 1,
          },
        }}
        transition={{
          duration: 0.1,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "center",
        }}
        initial="closed"
        animate="opened"
        exit="closed"
        className="fixed inset-0 h-screen w-screen z-[999] bg-black bg-opacity-10 opacity-0 backdrop-blur-sm  "
      >
        <motion.div
          variants={{
            closed: {
              marginTop: 20,
              opacity: 0,
            },
            opened: {
              marginTop: 0,
              opacity: 1,
            },
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "center",
          }}
          initial="closed"
          animate="opened"
          exit="closed"
          ref={ref}
          className={cn(
            className,
            "relative md:!w-[80vw] lg:w-[40vw] w-[25vw] h-fit rounded-md bg-white antialiased top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border border-black border-opacity-15"
          )}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }
);
Modal.displayName = "PopUp";
export { Modal };
