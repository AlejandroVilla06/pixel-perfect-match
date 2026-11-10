import { useEffect, type RefObject } from "react";

/**
 * GSAP entrance choreography for elements marked [data-hero] inside the container.
 * Elements start hidden via the `hero-pending` class; any failure reveals them immediately.
 */
export function useHeroEntrance(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-hero]"));
    const reveal = () => targets.forEach((el) => el.classList.remove("hero-pending"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    import("gsap")
      .then(({ gsap }) => {
        if (cancelled) return;
        ctx = gsap.context(() => {
          gsap.set(targets, { opacity: 0, y: 36 });
          reveal();
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.09,
            delay: 0.05,
          });
        }, root);
      })
      .catch(reveal);

    return () => {
      cancelled = true;
      ctx?.revert();
      reveal();
    };
  }, [ref]);
}
