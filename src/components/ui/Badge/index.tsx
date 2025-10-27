import type { HTMLAttributes } from "react";
import "./badge.css";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive";
}

export function Badge({ 
  className = "", 
  variant = "default", 
  ...props 
}: BadgeProps) {
  const variants = {
    default: "badge--default",
    secondary: "badge--secondary",
    destructive: "badge--destructive",
  };

  const classes = ["badge", variants[variant], className].filter(Boolean).join(" ");
  return <span className={classes} {...props} />;
}