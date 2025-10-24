import { forwardRef } from "react";
import type { LabelHTMLAttributes } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", error, ...props }, ref) => {
    const baseClasses = [
      "font-medium",
      "leading-none",
      "peer-disabled:cursor-not-allowed",
      "peer-disabled:opacity-70",
      error ? "text-destructive" : "",
      className
    ].join(" ");

    return (
      <label
        ref={ref}
        className={baseClasses}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";