import { forwardRef } from "react";
import type { LabelHTMLAttributes } from "react";
import "./label.css";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", error, ...props }, ref) => {
    const classes = ["label", error ? "label--error" : "", className].filter(Boolean).join(" ");
    return <label ref={ref} className={classes} {...props} />;
  }
);

Label.displayName = "Label";