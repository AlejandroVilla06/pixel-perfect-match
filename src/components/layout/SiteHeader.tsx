import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { primaryNav, secondaryNav } from "./nav-links";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { favorites, compare } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-line bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="relative rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{
                    className: "text-foreground after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-px after:bg-gradient-brand",
                    "aria-current": "page",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            to="/favorites"
            className="relative inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
            aria-label={`Saved developers (${favorites.length})`}
            activeProps={{ className: "text-foreground" }}
          >
            <Heart className="size-[18px]" />
            {favorites.length > 0 && (
              <span className="absolute right-1 top-1 grid min-w-4 place-items-center rounded-full bg-primary px-1 font-mono text-[10px] leading-4 text-primary-foreground">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link
            to="/login"
            className="hidden rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            Sign In
          </Link>
          <Button asChild size="sm" className="hidden h-9 px-4 sm:inline-flex">
            <Link to="/developers">Find Talent</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col border-line bg-background p-0 sm:max-w-sm">
              <div className="flex h-16 items-center border-b border-line px-6">
                <SheetTitle className="font-display text-base tracking-[0.14em]">MENU</SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="space-y-1">
                  {primaryNav.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-xl tracking-tight text-foreground/85 transition-colors hover:bg-surface"
                        activeProps={{ className: "bg-surface text-foreground", "aria-current": "page" }}
                      >
                        {item.label}
                        <ArrowRight className="size-4 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="text-eyebrow mt-8 px-3">More</p>
                <ul className="mt-3 grid grid-cols-2 gap-1">
                  {secondaryNav.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
                        activeProps={{ className: "text-foreground", "aria-current": "page" }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link to="/favorites" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground">
                      Saved ({favorites.length})
                    </Link>
                  </li>
                  <li>
                    <Link to="/compare" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground">
                      Compare ({compare.length})
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="grid grid-cols-2 gap-3 border-t border-line p-6">
                <Button asChild variant="outline">
                  <Link to="/login" onClick={() => setOpen(false)}>Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/developers" onClick={() => setOpen(false)}>Find Talent</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
