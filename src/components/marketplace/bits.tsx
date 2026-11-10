import type { Availability, Developer } from "@/data/developers";
import { availabilityLabel } from "@/data/developers";
import { cn } from "@/lib/utils";

const avatarSizes = {
  sm: "size-10 rounded-xl text-sm",
  md: "size-14 rounded-2xl text-lg",
  lg: "size-20 rounded-3xl text-2xl",
  xl: "size-28 rounded-[2rem] text-4xl md:size-36 md:text-5xl",
} as const;

/** Gradient monogram portrait — avoids stock photos of real people for fictional profiles. */
export function DeveloperAvatar({
  dev,
  size = "md",
  className,
}: {
  dev: Pick<Developer, "avatar" | "name" | "id">;
  size?: keyof typeof avatarSizes;
  className?: string;
}) {
  // Vary the gradient angle per developer so monograms feel individual.
  const angle = (parseInt(dev.id.replace(/\D/g, ""), 10) * 47) % 360;
  return (
    <div
      role="img"
      aria-label={`${dev.name} avatar`}
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden bg-elevated font-display font-medium",
        avatarSizes[size],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-90"
        style={{
          background: `conic-gradient(from ${angle}deg at 30% 20%, var(--violet), var(--cyan), var(--elevated), var(--violet))`,
        }}
      />
      <span aria-hidden="true" className="absolute inset-[1.5px] rounded-[inherit] bg-surface/85" />
      <span aria-hidden="true" className="text-gradient relative tracking-tight">
        {dev.avatar}
      </span>
    </div>
  );
}

export function TechBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-foreground/[0.03] px-2 py-0.5 font-mono text-[0.7rem] text-foreground/80",
        className,
      )}
    >
      {children}
    </span>
  );
}

const dotClass: Record<Availability, string> = {
  available: "bg-success animate-pulse-dot",
  limited: "bg-warning",
  unavailable: "bg-muted-foreground/60",
};

export function AvailabilityBadge({
  availability,
  className,
  compact,
}: {
  availability: Availability;
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs text-muted-foreground", className)}>
      <span className={cn("size-2 rounded-full", dotClass[availability])} aria-hidden="true" />
      <span className={cn(availability === "available" && "text-success")}>
        {compact && availability === "available" ? "Available" : availabilityLabel[availability]}
      </span>
    </span>
  );
}
