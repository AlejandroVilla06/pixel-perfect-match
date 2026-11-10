import type { ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  to?: LinkProps["to"];
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted-foreground">
        <li>
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3 opacity-60" aria-hidden="true" />
            {c.to && i < items.length - 1 ? (
              <Link to={c.to} className="hover:text-foreground">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground/90">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface PageHeaderProps {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
  className,
  align = "left",
}: PageHeaderProps) {
  return (
    <section className={cn("relative overflow-hidden pb-12 pt-8 md:pb-16 md:pt-12", className)}>
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="glow-violet pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 opacity-60"
      />
      <div className={cn("container-page relative", align === "center" && "text-center")}>
        <Breadcrumbs items={crumbs} className={cn(align === "center" && "flex justify-center")} />
        <div className={cn("mt-10 max-w-3xl animate-fade-up", align === "center" && "mx-auto")}>
          {eyebrow && <p className="text-eyebrow mb-4">{eyebrow}</p>}
          <h1 className="text-h1">{title}</h1>
          {lead && <p className={cn("text-lead mt-5 max-w-2xl", align === "center" && "mx-auto")}>{lead}</p>}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  className,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="text-eyebrow mb-4">{eyebrow}</p>}
        <h2 id={id} className="text-h2">
          {title}
        </h2>
        {lead && <p className="text-lead mt-4">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
