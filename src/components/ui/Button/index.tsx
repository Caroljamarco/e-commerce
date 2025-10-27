import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import "./button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseClass = "btn";
    const variants = {
      default: "btn--default",
      outline: "btn--outline",
      ghost: "btn--ghost",
      destructive: "btn--destructive"
    };

    const sizes = {
      default: "btn--default-size",
      sm: "btn--sm",
      lg: "btn--lg"
    };

    const classes = [baseClass, variants[variant], sizes[size], className].filter(Boolean).join(" ");
    
    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export type { ButtonProps };