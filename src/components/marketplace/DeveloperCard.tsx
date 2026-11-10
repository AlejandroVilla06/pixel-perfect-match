import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Developer } from "@/data/developers";
import { specialtyBySlug } from "@/data/specialties";
import { AvailabilityBadge, DeveloperAvatar, TechBadge } from "./bits";
import { CompareButton, FavoriteButton } from "./ActionButtons";
import { cn } from "@/lib/utils";

export function DeveloperCard({
  dev,
  layout = "grid",
  headingLevel = "h3",
  className,
}: {
  dev: Developer;
  layout?: "grid" | "list";
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const specialty = specialtyBySlug(dev.specialty);
  const Heading = headingLevel;
  const skills = dev.skills.slice(0, layout === "list" ? 5 : 4);
  const extra = dev.skills.length - skills.length;

  return (
    <article
      className={cn(
        "surface-card surface-interactive group relative flex h-full p-5 md:p-6",
        layout === "grid" ? "flex-col" : "flex-col gap-5 md:flex-row md:items-center md:gap-8",
        className,
      )}
    >
      <div className={cn("flex items-start gap-4", layout === "list" && "md:w-[34%] md:shrink-0")}>
        <DeveloperAvatar dev={dev} size="md" />
        <div className="min-w-0 flex-1">
          <Heading className="truncate font-display text-lg font-medium tracking-tight">
            {/* Stretched link: the whole card opens this developer's own profile. */}
            <Link
              to="/developers/$slug"
              params={{ slug: dev.slug }}
              className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
            >
              {dev.name}
            </Link>
          </Heading>
          <p className="truncate text-sm text-muted-foreground">{dev.title}</p>
          <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" aria-hidden="true" />
            {dev.location}
          </p>
        </div>
      </div>

      <div className={cn(layout === "grid" ? "mt-5" : "md:flex-1")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
          <span className="text-cyan">{specialty?.short}</span>
          <span aria-hidden="true">·</span>
          <span>{dev.experience} yrs exp</span>
        </div>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Key skills">
          {skills.map((s) => (
            <li key={s}>
              <TechBadge>{s}</TechBadge>
            </li>
          ))}
          {extra > 0 && (
            <li>
              <TechBadge className="text-muted-foreground">+{extra}</TechBadge>
            </li>
          )}
        </ul>
      </div>

      <div
        className={cn(
          "flex items-end justify-between gap-3",
          layout === "grid" ? "mt-auto border-t border-line pt-4 [&]:mt-6" : "md:w-56 md:shrink-0 md:flex-col md:items-end",
        )}
      >
        <div className={cn(layout === "list" && "md:text-right")}>
          <AvailabilityBadge availability={dev.availability} compact />
          <p className="mt-1 font-display text-xl tracking-tight">
            ${dev.hourlyRate}
            <span className="text-sm text-muted-foreground">/hr</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <FavoriteButton dev={dev} />
          <CompareButton dev={dev} />
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-full bg-foreground/[0.04] text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
