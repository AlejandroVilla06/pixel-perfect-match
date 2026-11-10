import type { Developer } from "@/data/developers";
import { specialtyBySlug } from "@/data/specialties";

export type SortKey = "relevance" | "rate-asc" | "rate-desc" | "experience" | "name";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "experience", label: "Most experienced" },
  { value: "rate-asc", label: "Rate: low to high" },
  { value: "rate-desc", label: "Rate: high to low" },
  { value: "name", label: "Name (A–Z)" },
];

export const experienceOptions = [
  { value: 0, label: "Any" },
  { value: 3, label: "3+ yrs" },
  { value: 5, label: "5+ yrs" },
  { value: 8, label: "8+ yrs" },
  { value: 10, label: "10+ yrs" },
];

export const RATE_MIN = 40;
export const RATE_MAX = 160;

export interface DevFilters {
  q?: string;
  specialties?: string[];
  minExp?: number;
  available?: boolean;
  maxRate?: number;
  sort?: SortKey;
}

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function matchesQuery(dev: Developer, q: string): boolean {
  const terms = norm(q).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = norm(
    [
      dev.name,
      dev.title,
      dev.location,
      dev.skills.join(" "),
      specialtyBySlug(dev.specialty)?.name ?? "",
    ].join(" "),
  );
  return terms.every((t) => haystack.includes(t));
}

export function filterDevelopers(devs: Developer[], f: DevFilters): Developer[] {
  const result = devs.filter((d) => {
    if (f.q && !matchesQuery(d, f.q)) return false;
    if (f.specialties && f.specialties.length > 0 && !f.specialties.includes(d.specialty))
      return false;
    if (f.minExp && d.experience < f.minExp) return false;
    if (f.available && d.availability !== "available") return false;
    if (f.maxRate != null && d.hourlyRate > f.maxRate) return false;
    return true;
  });
  return sortDevelopers(result, f.sort ?? "relevance");
}

export function sortDevelopers(devs: Developer[], sort: SortKey): Developer[] {
  const list = [...devs];
  switch (sort) {
    case "rate-asc":
      return list.sort((a, b) => a.hourlyRate - b.hourlyRate);
    case "rate-desc":
      return list.sort((a, b) => b.hourlyRate - a.hourlyRate);
    case "experience":
      return list.sort((a, b) => b.experience - a.experience);
    case "name":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    default: {
      // Relevance: available first, then featured, then experience.
      const rank = { available: 0, limited: 1, unavailable: 2 } as const;
      return list.sort(
        (a, b) =>
          rank[a.availability] - rank[b.availability] ||
          Number(!!b.featured) - Number(!!a.featured) ||
          b.experience - a.experience,
      );
    }
  }
}

export function countActiveFilters(f: DevFilters): number {
  return (
    (f.q ? 1 : 0) +
    (f.specialties?.length ?? 0) +
    (f.minExp ? 1 : 0) +
    (f.available ? 1 : 0) +
    (f.maxRate != null && f.maxRate < RATE_MAX ? 1 : 0)
  );
}
