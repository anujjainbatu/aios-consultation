import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-surface border border-border rounded-xl p-6 ${
        hover
          ? "transition-all duration-200 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
