import {
  BrainCircuit,
  ChartScatter,
  Cloud,
  Database,
  Layers,
  PanelsTopLeft,
  Server,
  Shapes,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { SpecialtySlug } from "@/data/specialties";
import { cn } from "@/lib/utils";

export const specialtyIcons: Record<SpecialtySlug, LucideIcon> = {
  frontend: PanelsTopLeft,
  backend: Server,
  "full-stack": Layers,
  "artificial-intelligence": BrainCircuit,
  "machine-learning": ChartScatter,
  mobile: Smartphone,
  "devops-cloud": Cloud,
  cybersecurity: ShieldCheck,
  "data-engineering": Database,
  "creative-development": Shapes,
};

/** Small abstract technical illustration: icon tile over a schematic line pattern. */
export function SpecialtyGlyph({
  slug,
  className,
  size = "md",
}: {
  slug: SpecialtySlug;
  className?: string;
  size?: "md" | "lg";
}) {
  const Icon = specialtyIcons[slug];
  return (
    <div className={cn("relative", size === "lg" ? "size-28" : "size-16", className)} aria-hidden="true">
      <svg viewBox="0 0 64 64" className="absolute inset-0 size-full text-line-strong">
        <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeDasharray="2 4" />
        <circle cx="32" cy="32" r="21" fill="none" stroke="currentColor" opacity="0.6" />
        <circle cx="62" cy="32" r="1.6" fill="var(--cyan)" />
        <circle cx="10" cy="12" r="1.2" fill="var(--violet-soft)" />
      </svg>
      <div className="absolute inset-[22%] grid place-items-center rounded-xl border border-line-strong bg-elevated shadow-card transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]">
        <Icon className={cn("text-violet-soft", size === "lg" ? "size-7" : "size-5")} strokeWidth={1.6} />
      </div>
    </div>
  );
}
