import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import "../../../styles/components/Textarea.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: "sm" | "md" | "lg";
  error?: string;
  noResize?: boolean;
  fullHeight?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className = "", 
    size = "md",
    error,
    noResize,
    fullHeight,
    ...props 
  }, ref) => {
    const classes = [
      'textarea',
      `textarea-${size}`,
      error && 'textarea-error',
      noResize && 'textarea-no-resize',
      fullHeight && 'textarea-full-height',
      className
    ].filter(Boolean).join(' ');

    return (
      <div className="textarea-container">
        <textarea
          className={classes}
          ref={ref}
          {...props}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";