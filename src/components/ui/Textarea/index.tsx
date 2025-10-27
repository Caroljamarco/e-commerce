import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import "./textarea.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", error, ...props }, ref) => {
    const classes = ["textarea", error ? "textarea--error" : "", className].filter(Boolean).join(" ");
    return <textarea className={classes} ref={ref} {...props} />;
  }
);

Textarea.displayName = "Textarea";