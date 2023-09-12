import { cn } from "@/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "text-card-foreground bg-card rounded-lg border p-4",
          props.className
        )}
      >
        {props.children}
      </div>
    );
  }
);
