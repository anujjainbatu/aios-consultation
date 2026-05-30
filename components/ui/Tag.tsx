interface TagProps {
  children: string;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

export function Tag({ children, className = "", active = false, onClick }: TagProps) {
  const base =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-150";
  const activeStyle = "bg-accent/20 text-accent border border-accent/40";
  const inactiveStyle =
    "bg-surface-2 text-text-secondary border border-border hover:border-accent/30 hover:text-text-primary";

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${base} ${active ? activeStyle : inactiveStyle} cursor-pointer ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <span className={`${base} ${active ? activeStyle : inactiveStyle} ${className}`}>
      {children}
    </span>
  );
}
