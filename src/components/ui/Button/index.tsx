import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import "../../../styles/components/Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isFullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = "", 
    variant = "primary", 
    size = "md", 
    isLoading = false,
    isFullWidth = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    const classes = [
      'button',
      `button-${variant}`,
      `button-${size}`,
      isLoading && 'button-loading',
      isFullWidth && 'button-full',
      className
    ].filter(Boolean).join(' ');
    
    return (
      <button
        className={classes}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export type { ButtonProps };