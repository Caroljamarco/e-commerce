import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import "../../../styles/components/Input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  size?: "sm" | "md" | "lg";
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = "", 
    type = "text",
    size = "md",
    error,
    icon,
    iconPosition = "left",
    ...props 
  }, ref) => {
    const containerClasses = [
      'input-container',
      icon && 'input-with-icon',
      icon && `input-with-icon-${iconPosition}`,
      className
    ].filter(Boolean).join(' ');

    const inputClasses = [
      'input',
      `input-${size}`,
      error && 'input-error'
    ].filter(Boolean).join(' ');

    return (
      <div className={containerClasses}>
        <div className="input-wrapper">
          {icon && (
            <span className={`input-icon input-icon-${iconPosition}`}>
              {icon}
            </span>
          )}
          <input
            type={type}
            className={inputClasses}
            ref={ref}
            {...props}
          />
        </div>
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";