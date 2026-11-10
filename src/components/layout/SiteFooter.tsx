import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./Logo";
import { footerColumns } from "./nav-links";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-gradient-night">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:py-20">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            A curated marketplace for companies to discover, compare and connect with specialised
            software developers.
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Social links (placeholders)">
            {[
              { icon: Twitter, label: "STACKORA on X (placeholder)" },
              { icon: Linkedin, label: "STACKORA on LinkedIn (placeholder)" },
              { icon: Github, label: "STACKORA on GitHub (placeholder)" },
            ].map(({ icon: Icon, label }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={label}
                  onClick={(e) => e.preventDefault()}
                  className="grid size-9 place-items-center rounded-full border border-line text-muted-foreground transition-colors hover:border-line-strong hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-eyebrow text-muted-foreground">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} STACKORA. A frontend prototype.</p>
          <p className="font-mono">All developer profiles shown are fictional.</p>
        </div>
      </div>
    </footer>
  );
}
