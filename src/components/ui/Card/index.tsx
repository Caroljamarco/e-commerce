import type { HTMLAttributes } from "react";
import "./card.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export function Card({ className = "", ...props }: CardProps) {
  return <div className={["card", className].filter(Boolean).join(" ")} {...props} />;
}

export function CardHeader({ className = "", ...props }: CardHeaderProps) {
  return <div className={["card--header", className].filter(Boolean).join(" ")} {...props} />;
}

export function CardContent({ className = "", ...props }: CardContentProps) {
  return <div className={["card--content", className].filter(Boolean).join(" ")} {...props} />;
}

export function CardTitle({ className = "", ...props }: CardTitleProps) {
  return <h3 className={["card--title", className].filter(Boolean).join(" ")} {...props} />;
}

export function CardDescription({ className = "", ...props }: CardTitleProps) {
  return <p className={["card--description", className].filter(Boolean).join(" ")} {...props} />;
}

export function CardFooter({ className = "", ...props }: CardContentProps) {
  return <div className={["card--footer", className].filter(Boolean).join(" ")} {...props} />;
}