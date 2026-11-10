import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero3D } from "@/components/visual/Hero3D";
import { Reveal } from "@/components/brand/Reveal";
import { SectionHeading } from "@/components/layout/PageHeader";
import { SpecialtyGlyph } from "@/components/marketplace/SpecialtyGlyph";
import { TechBadge } from "@/components/marketplace/bits";
import { FeaturedCarousel } from "@/components/marketplace/FeaturedCarousel";
import { specialties } from "@/data/specialties";
import { featuredDevelopers, developersBySpecialty } from "@/data/developers";
import { processSteps } from "@/data/process";
import { useHeroEntrance } from "@/hooks/use-hero-entrance";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STACKORA — Exceptional minds. Extraordinary products." },
      {
        name: "description",
        content:
          "Discover specialised developers, AI engineers and creative technologists ready to bring ambitious digital products to life.",
      },
      { property: "og:title", content: "STACKORA — Exceptional minds. Extraordinary products." },
      {
        property: "og:description",
        content: "A premium marketplace to discover, compare and connect with specialised software developers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Specialties />
      <FeaturedTalent />
      <ProcessPreview />
      <FinalCta />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  useHeroEntrance(ref);
  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative -mt-16 overflow-hidden pt-16 md:-mt-[4.5rem] md:pt-[4.5rem]">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="container-page relative grid min-h-[calc(100svh-4.5rem)] items-center gap-6 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
        <div className="relative z-10 max-w-2xl">
          <p data-hero className="hero-pending text-eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-success animate-pulse-dot" aria-hidden="true" />
            Developer marketplace · 10 specialties
          </p>
          <h1 id="hero-title" className="text-display mt-7">
            <span data-hero className="hero-pending block">Exceptional minds.</span>
            <span data-hero className="hero-pending block text-gradient pb-2">Extraordinary products.</span>
          </h1>
          <p data-hero className="hero-pending text-lead mt-6 max-w-xl">
            Discover specialised developers, AI engineers and creative technologists ready to bring
            ambitious digital products to life.
          </p>
          <div data-hero className="hero-pending mt-9 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/developers">
                Explore Talent <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
        <div data-hero className="hero-pending relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-none">
          <Hero3D />
        </div>
      </div>
    </section>
  );
}

function Specialties() {
  const featured = specialties.filter((s) => s.featured);
  return (
    <section aria-labelledby="specialties-title" className="section-y relative">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="specialties-title"
            eyebrow="Specialties"
            title="Find the expertise your vision needs."
            action={
              <Button asChild variant="link">
                <Link to="/specialties">
                  Explore all specialties <ArrowRight />
                </Link>
              </Button>
            }
          />
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-6 md:gap-5">
          {featured.map((s, i) => {
            const count = developersBySpecialty(s.slug).length;
            const big = i === 0 || i === 3;
            return (
              <Reveal
                as="li"
                key={s.slug}
                delay={i * 0.06}
                className={cn(big ? "md:col-span-4" : "md:col-span-2", "min-h-[15rem]")}
              >
                <Link
                  to="/specialties/$slug"
                  params={{ slug: s.slug }}
                  className="surface-card surface-interactive group relative flex h-full flex-col justify-between overflow-hidden p-6 md:p-7"
                >
                  {big && <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-50" />}
                  <div className="relative flex items-start justify-between gap-4">
                    <SpecialtyGlyph slug={s.slug} />
                    <span className="grid size-9 place-items-center rounded-full border border-line text-muted-foreground transition-all duration-300 group-hover:border-transparent group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="relative mt-8">
                    <h3 className="text-h3">{s.short === "AI" ? "Artificial Intelligence" : s.short}</h3>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">{s.tagline}</p>
                    {big && (
                      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                        {s.technologies.slice(0, 4).map((t) => (
                          <li key={t}>
                            <TechBadge>{t}</TechBadge>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-4 font-mono text-xs text-cyan">{count} developers</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function FeaturedTalent() {
  return (
    <section aria-labelledby="featured-title" className="section-y relative border-y border-line bg-gradient-night">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="featured-title"
            eyebrow="Featured talent"
            title="Exceptional talent. Real expertise."
            action={
              <Button asChild variant="outline">
                <Link to="/developers">
                  Browse all developers <ArrowRight />
                </Link>
              </Button>
            }
          />
        </Reveal>
        <Reveal className="mt-10" delay={0.1}>
          <FeaturedCarousel devs={featuredDevelopers} label="Featured developers" />
        </Reveal>
      </div>
    </section>
  );
}

function ProcessPreview() {
  return (
    <section aria-labelledby="process-title" className="section-y">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="process-title"
            eyebrow="How it works"
            title="From idea to the right developer in five steps."
            action={
              <Button asChild variant="link">
                <Link to="/how-it-works">
                  See how STACKORA works <ArrowRight />
                </Link>
              </Button>
            }
          />
        </Reveal>
        <ol className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          <div aria-hidden="true" className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent lg:block" />
          {processSteps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.07} className="relative lg:px-4">
              <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                <span className="relative grid size-12 place-items-center rounded-2xl border border-line-strong bg-surface">
                  <s.icon className="size-5 text-violet-soft" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-cyan lg:mt-5">{s.n}</span>
              </div>
              <h3 className="mt-3 font-display text-xl tracking-tight">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.short}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="pb-24 md:pb-32">
      <div className="container-page">
        <Reveal>
          <div className="ring-gradient relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 text-center md:px-16 md:py-24">
            <div
              aria-hidden="true"
              className="animate-gradient-pan pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(40% 60% at 20% 30%, color-mix(in oklab, var(--violet) 55%, transparent), transparent), radial-gradient(35% 55% at 80% 70%, color-mix(in oklab, var(--cyan) 40%, transparent), transparent)",
                backgroundSize: "200% 200%",
              }}
            />
            <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative mx-auto max-w-3xl">
              <h2 id="cta-title" className="text-h2">
                Great ideas deserve <span className="text-gradient">exceptional developers.</span>
              </h2>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild variant="hero" size="lg">
                  <Link to="/developers">
                    Find Your Developer <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/for-developers">Join as a Developer</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
