import { Heart, GitCompareArrows, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Developer } from "@/data/developers";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const base =
  "relative z-10 inline-flex items-center justify-center gap-2 rounded-full border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function FavoriteButton({
  dev,
  withLabel,
  className,
}: {
  dev: Pick<Developer, "id" | "name">;
  withLabel?: boolean;
  className?: string;
}) {
  const { isFavorite, dispatch } = useStore();
  const active = isFavorite(dev.id);
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.88 }}
      aria-pressed={active}
      aria-label={withLabel ? undefined : active ? `Remove ${dev.name} from saved` : `Save ${dev.name}`}
      onClick={() => dispatch({ type: "toggleFavorite", id: dev.id })}
      className={cn(
        base,
        withLabel ? "h-10 px-4" : "size-9",
        active
          ? "border-violet-soft/50 bg-accent text-foreground"
          : "border-line bg-surface/60 text-muted-foreground hover:border-line-strong hover:text-foreground",
        className,
      )}
    >
      <motion.span
        key={String(active)}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 18 }}
        className="inline-flex"
      >
        <Heart className={cn("size-4", active && "fill-violet-soft text-violet-soft")} />
      </motion.span>
      {withLabel && <span>{active ? "Saved" : "Save"}</span>}
    </motion.button>
  );
}

export function CompareButton({
  dev,
  withLabel,
  className,
}: {
  dev: Pick<Developer, "id" | "name">;
  withLabel?: boolean;
  className?: string;
}) {
  const { isComparing, dispatch } = useStore();
  const active = isComparing(dev.id);
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      aria-pressed={active}
      aria-label={withLabel ? undefined : active ? `Remove ${dev.name} from comparison` : `Add ${dev.name} to comparison`}
      onClick={() => dispatch({ type: "toggleCompare", id: dev.id })}
      className={cn(
        base,
        withLabel ? "h-10 px-4" : "size-9",
        active
          ? "border-cyan/50 bg-cyan/10 text-cyan"
          : "border-line bg-surface/60 text-muted-foreground hover:border-line-strong hover:text-foreground",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={String(active)}
          initial={{ opacity: 0, rotate: -30 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 30 }}
          transition={{ duration: 0.18 }}
          className="inline-flex"
        >
          {active ? <Check className="size-4" /> : <GitCompareArrows className="size-4" />}
        </motion.span>
      </AnimatePresence>
      {withLabel && <span>{active ? "Comparing" : "Compare"}</span>}
    </motion.button>
  );
}
