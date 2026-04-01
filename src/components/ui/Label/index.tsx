import { forwardRef } from "react";
import type { LabelHTMLAttributes } from "react";
import "../../../styles/components/Label.css";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: "sm" | "md" | "lg";
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ 
    className = "", 
    size = "md",
    error,
    required,
    disabled,
    icon,
    children,
    ...props 
  }, ref) => {
    const classes = [
      'label',
      `label-${size}`,
      error && 'label-error',
      required && 'label-required',
      disabled && 'label-disabled',
      icon && 'label-with-icon',
      className
    ].filter(Boolean).join(' ');

    return (
      <label
        ref={ref}
        className={classes}
        {...props}
      >
        {icon && <span className="label-icon">{icon}</span>}
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";