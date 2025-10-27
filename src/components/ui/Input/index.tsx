import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import "./input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => {
    const classes = ["input", className].filter(Boolean).join(" ");

    return <input type={type} className={classes} ref={ref} {...props} />;
  }
);

Input.displayName = "Input";