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

Card.displayName = "Card";

export const CardTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>((props, ref) => (
  <p
    {...props}
    ref={ref}
    className={cn("font-semibold text-lg mb-2", props.className)}
  >
    {props.children}
  </p>
));

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>((props, ref) => (
  <p
    {...props}
    ref={ref}
    className={cn("text-sm text-muted-foreground", props.className)}
  >
    {props.children}
  </p>
));

CardDescription.displayName = "CardDescription";
