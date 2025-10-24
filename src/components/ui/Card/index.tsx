import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-card text-card-foreground rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: CardHeaderProps) {
  return <div className={`p-6 pb-4 ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }: CardContentProps) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: CardTitleProps) {
  return (
    <h3
      className={`text-xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardDescription({ className = "", ...props }: CardTitleProps) {
  return (
    <p className={`text-muted-foreground text-base ${className}`} {...props} />
  );
}

export function CardFooter({ className = "", ...props }: CardContentProps) {
  return <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />;
}