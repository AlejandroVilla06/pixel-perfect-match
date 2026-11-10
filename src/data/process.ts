import { Compass, Search, ScanEye, GitCompareArrows, Send, type LucideIcon } from "lucide-react";

export interface ProcessStep {
  n: string;
  title: string;
  short: string;
  detail: string;
  points: string[];
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Discover",
    short: "Browse ten curated specialties.",
    detail:
      "Start from the discipline you need. Each specialty page explains typical projects and the technologies involved, so you know what to look for.",
    points: ["10 technical specialties", "Typical projects per field", "Featured specialists"],
    icon: Compass,
  },
  {
    n: "02",
    title: "Search",
    short: "Filter by skill, rate and availability.",
    detail:
      "Search by name, technology or location and narrow results with specialty, experience, availability and hourly-rate filters that update instantly.",
    points: ["Live search", "Combinable filters", "Shareable result URLs"],
    icon: Search,
  },
  {
    n: "03",
    title: "Evaluate",
    short: "Review portfolios and experience.",
    detail:
      "Every developer has a dedicated profile with an overview, career history, project portfolio and skills — organised in tabs so you can focus.",
    points: ["Project portfolios", "Career history", "Skills & certifications"],
    icon: ScanEye,
  },
  {
    n: "04",
    title: "Compare",
    short: "Put up to three side by side.",
    detail:
      "Add candidates to the comparison tray and review rate, experience, availability and skills side by side before deciding.",
    points: ["Side-by-side table", "Up to 3 developers", "Saved between visits"],
    icon: GitCompareArrows,
  },
  {
    n: "05",
    title: "Connect",
    short: "Send a request in one step.",
    detail:
      "Reach out from any profile with a short request. In this prototype, requests are simulated — nothing is actually sent.",
    points: ["One short form", "Clear next steps", "Frontend simulation"],
    icon: Send,
  },
];
