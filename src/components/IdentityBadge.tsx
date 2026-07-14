import { useEffect, useState } from "react";

interface IdentityBadgeProps {
  name: string;
  subtitle?: string;
  className?: string;
  imageUrl?: string;
  imageClassName?: string;
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

export const IdentityBadge = ({
  name,
  subtitle,
  className = "",
  imageUrl,
  imageClassName = "object-contain",
}: IdentityBadgeProps) => {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-game-border bg-gradient-to-br from-primary/25 via-secondary to-background text-center shadow-lg ${className}`}
      aria-label={subtitle ? `${name}, ${subtitle}` : name}
    >
      {imageUrl && !imageFailed ? (
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          className={`h-full w-full ${imageClassName}`}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <>
          <span className="text-3xl font-black tracking-tight text-primary">{getInitials(name)}</span>
          {subtitle && (
            <span className="mt-2 max-w-[90%] truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {subtitle}
            </span>
          )}
        </>
      )}
    </div>
  );
};
