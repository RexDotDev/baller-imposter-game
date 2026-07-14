interface IdentityBadgeProps {
  name: string;
  subtitle?: string;
  className?: string;
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

export const IdentityBadge = ({ name, subtitle, className = "" }: IdentityBadgeProps) => (
  <div
    className={`flex flex-col items-center justify-center rounded-2xl border-2 border-game-border bg-gradient-to-br from-primary/25 via-secondary to-background text-center shadow-lg ${className}`}
    aria-label={subtitle ? `${name}, ${subtitle}` : name}
  >
    <span className="text-3xl font-black tracking-tight text-primary">{getInitials(name)}</span>
    {subtitle && (
      <span className="mt-2 max-w-[90%] truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {subtitle}
      </span>
    )}
  </div>
);
