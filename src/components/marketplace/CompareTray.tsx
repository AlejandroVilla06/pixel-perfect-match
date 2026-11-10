import { useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { developers } from "@/data/developers";
import { COMPARE_LIMIT, useStore } from "@/lib/store";
import { DeveloperAvatar } from "./bits";
import { Button } from "@/components/ui/button";

export function CompareTray() {
  const { compare, compareFull, dispatch } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const selected = compare
    .map((id) => developers.find((d) => d.id === id))
    .filter((d): d is (typeof developers)[number] => !!d);

  useEffect(() => {
    if (compareFull) {
      toast(`You can compare up to ${COMPARE_LIMIT} developers`, {
        description: "Remove someone from the tray to add another.",
      });
      dispatch({ type: "dismissCompareFull" });
    }
  }, [compareFull, dispatch]);

  const show = selected.length > 0 && pathname !== "/compare" && !pathname.startsWith("/dashboard");

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          aria-label="Comparison tray"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-2xl rounded-2xl border border-line-strong bg-elevated/90 p-3 shadow-lift backdrop-blur-xl sm:bottom-5"
        >
          <div className="flex items-center gap-3">
            <ul className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
              {selected.map((d) => (
                <motion.li
                  layout
                  key={d.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex shrink-0 items-center gap-2 rounded-xl bg-background/60 py-1 pl-1 pr-1.5"
                >
                  <DeveloperAvatar dev={d} size="sm" className="size-8 rounded-lg text-xs" />
                  <span className="hidden max-w-[7rem] truncate text-sm sm:inline">{d.name}</span>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "removeCompare", id: d.id })}
                    className="grid size-6 place-items-center rounded-full text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                    aria-label={`Remove ${d.name} from comparison`}
                  >
                    <X className="size-3.5" />
                  </button>
                </motion.li>
              ))}
              {Array.from({ length: COMPARE_LIMIT - selected.length }).map((_, i) => (
                <li
                  key={`empty-${i}`}
                  aria-hidden="true"
                  className="hidden size-10 shrink-0 rounded-xl border border-dashed border-line-strong sm:block"
                />
              ))}
            </ul>
            <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "clearCompare" })}>
              Clear
            </Button>
            <Button asChild size="sm" disabled={selected.length < 2}>
              <Link to="/compare">
                Compare <span className="font-mono">{selected.length}/{COMPARE_LIMIT}</span>
              </Link>
            </Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
