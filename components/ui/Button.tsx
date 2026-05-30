import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface SharedProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface AsButton extends SharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: never;
  external?: never;
}

interface AsLink extends SharedProps {
  href: string;
  external?: boolean;
}

type ButtonProps = AsButton | AsLink;

const variantClasses: Record<Variant, string> = {
  primary: "bg-cta hover:bg-cta-hover text-white",
  secondary: "border border-accent text-accent hover:bg-accent hover:text-white bg-transparent",
  ghost: "text-text-secondary hover:text-text-primary bg-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", children, className = "" } = props;

  const classes = [
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a href={props.href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, className: _c, children: _ch, href: _href, external: _ext, ...buttonProps } = props as AsButton & { href?: never; external?: never };

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
