import { CircleHelp } from "lucide-react";

export const ImpostorReveal = () => {
  return (
    <div
      className="mx-auto flex min-h-[260px] w-full max-w-sm flex-col items-center justify-center rounded-3xl border border-destructive/40 bg-gradient-to-b from-destructive/15 via-card to-card px-6 py-10 text-center shadow-2xl shadow-destructive/10 sm:min-h-[400px]"
      role="status"
      aria-label="You are the impostor"
    >
      <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-destructive/50 bg-destructive/10 shadow-lg shadow-destructive/20">
        <CircleHelp className="h-16 w-16 text-destructive" strokeWidth={1.6} aria-hidden="true" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-destructive">
        Your secret role
      </p>
      <h3 className="impostor-glow mt-3 text-4xl font-black tracking-tight text-destructive sm:text-5xl md:text-6xl">
        IMPOSTOR
      </h3>
      <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground sm:text-base">
        Blend in, listen closely, and avoid being discovered.
      </p>
    </div>
  );
};
