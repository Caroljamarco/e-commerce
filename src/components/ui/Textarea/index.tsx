import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", error, ...props }, ref) => {
    const baseClasses = [
      "flex min-h-[100px] w-full rounded-lg border border-input bg-background px-4 py-3",
      "text-base ring-offset-background placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "transition-colors duration-200",
      error ? "border-destructive" : "",
      className
    ].join(" ");

    return (
      <textarea
        className={baseClasses}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";