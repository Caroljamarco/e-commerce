import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => {
    const baseClasses = [
      "flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2",
      "text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "transition-colors duration-200",
      className
    ].join(" ");

    return (
      <input
        type={type}
        className={baseClasses}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";