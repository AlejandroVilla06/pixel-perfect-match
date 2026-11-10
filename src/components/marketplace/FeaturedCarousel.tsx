import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Developer } from "@/data/developers";
import { DeveloperCard } from "./DeveloperCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FeaturedCarousel({ devs, label }: { devs: Developer[]; label: string }) {
  const [ref, api] = useEmblaCarousel({ align: "start", loop: false });
  const [index, setIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!api) return;
    setIndex(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const onInit = () => {
      setSnaps(api.scrollSnapList());
      onSelect();
    };
    onInit();
    api.on("select", onSelect).on("reInit", onInit);
    return () => {
      api.off("select", onSelect).off("reInit", onInit);
    };
  }, [api, onSelect]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") api?.scrollPrev();
        if (e.key === "ArrowRight") api?.scrollNext();
      }}
    >
      <div ref={ref} className="-mx-2 overflow-hidden px-2 py-3">
        <ul className="flex gap-4 md:gap-5">
          {devs.map((d, i) => (
            <li
              key={d.id}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${devs.length}`}
              className="min-w-0 shrink-0 grow-0 basis-[86%] sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(33.333%-0.85rem)]"
            >
              <DeveloperCard dev={d} />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2" role="group" aria-label="Choose slide">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-gradient-brand" : "w-3 bg-line-strong hover:bg-muted-foreground",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => api?.scrollPrev()} disabled={!canPrev} aria-label="Previous developers">
            <ArrowLeft />
          </Button>
          <Button variant="outline" size="icon" onClick={() => api?.scrollNext()} disabled={!canNext} aria-label="Next developers">
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
