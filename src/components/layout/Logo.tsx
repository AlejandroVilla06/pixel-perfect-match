import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-7", className)}>
      <defs>
        <linearGradient id="stackora-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--violet)" />
          <stop offset="1" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>
      <path d="M16 3 29 10 16 17 3 10Z" fill="url(#stackora-g)" />
      <path d="M3 16l13 7 13-7" fill="none" stroke="url(#stackora-g)" strokeWidth="2.2" strokeLinejoin="round" opacity="0.8" />
      <path d="M3 22l13 7 13-7" fill="none" stroke="url(#stackora-g)" strokeWidth="2.2" strokeLinejoin="round" opacity="0.45" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("group inline-flex items-center gap-2.5 rounded-lg", className)}
      aria-label="STACKORA home"
    >
      <LogoMark className="transition-transform duration-500 group-hover:-rotate-6" />
      <span className="font-display text-[1.05rem] font-semibold tracking-[0.14em]">STACKORA</span>
    </Link>
  );
}
