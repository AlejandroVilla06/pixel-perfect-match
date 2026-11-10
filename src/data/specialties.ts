export type SpecialtySlug =
  | "frontend"
  | "backend"
  | "full-stack"
  | "artificial-intelligence"
  | "machine-learning"
  | "mobile"
  | "devops-cloud"
  | "cybersecurity"
  | "data-engineering"
  | "creative-development";

export interface Specialty {
  slug: SpecialtySlug;
  name: string;
  short: string;
  tagline: string;
  description: string;
  technologies: string[];
  typicalProjects: { title: string; text: string }[];
  /** Highlighted on the homepage */
  featured?: boolean;
}

export const specialties: Specialty[] = [
  {
    slug: "frontend",
    name: "Frontend Development",
    short: "Frontend",
    tagline: "Interfaces people love to use.",
    description:
      "Engineers who turn product ideas into fast, accessible and beautifully crafted interfaces across every screen size.",
    technologies: ["React", "TypeScript", "Next.js", "Vue", "Tailwind CSS", "Web Vitals"],
    typicalProjects: [
      { title: "Design systems", text: "Reusable component libraries with tokens and documentation." },
      { title: "SaaS dashboards", text: "Data-dense product interfaces that stay readable." },
      { title: "Performance audits", text: "Core Web Vitals improvements on real traffic." },
    ],
    featured: true,
  },
  {
    slug: "backend",
    name: "Backend Development",
    short: "Backend",
    tagline: "Reliable systems behind every click.",
    description:
      "Specialists in APIs, databases and distributed services that stay fast and dependable as products grow.",
    technologies: ["Node.js", "Go", "PostgreSQL", "Python", "GraphQL", "Redis"],
    typicalProjects: [
      { title: "API platforms", text: "Versioned REST and GraphQL APIs with clear contracts." },
      { title: "Payments & billing", text: "Idempotent, auditable transaction flows." },
      { title: "Service migrations", text: "Moving monoliths to well-bounded services." },
    ],
    featured: true,
  },
  {
    slug: "full-stack",
    name: "Full Stack Development",
    short: "Full Stack",
    tagline: "From database to pixel.",
    description:
      "Versatile builders who own features end to end — ideal for startups shipping their first versions quickly.",
    technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "Prisma", "AWS"],
    typicalProjects: [
      { title: "MVP builds", text: "Production-ready first versions in weeks." },
      { title: "Internal tools", text: "Admin panels and workflows for operations teams." },
      { title: "Marketplace features", text: "Search, listings, messaging and checkout." },
    ],
    featured: true,
  },
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    short: "AI",
    tagline: "Products that understand and assist.",
    description:
      "AI engineers who design LLM-powered features, retrieval pipelines and agents that are useful, safe and measurable.",
    technologies: ["LLMs", "RAG", "LangChain", "Python", "Vector DBs", "Evaluations"],
    typicalProjects: [
      { title: "AI assistants", text: "Grounded copilots inside existing products." },
      { title: "Document intelligence", text: "Extraction and search across large archives." },
      { title: "Agent workflows", text: "Tool-using agents with guardrails and evals." },
    ],
    featured: true,
  },
  {
    slug: "machine-learning",
    name: "Machine Learning",
    short: "ML",
    tagline: "Models that learn from your data.",
    description:
      "ML engineers who train, deploy and monitor predictive models — from recommendation engines to forecasting.",
    technologies: ["PyTorch", "scikit-learn", "MLflow", "Python", "Spark", "Kubeflow"],
    typicalProjects: [
      { title: "Recommendations", text: "Personalised ranking for content and commerce." },
      { title: "Forecasting", text: "Demand and capacity predictions with uncertainty." },
      { title: "MLOps", text: "Reproducible training and monitored deployments." },
    ],
  },
  {
    slug: "mobile",
    name: "Mobile Development",
    short: "Mobile",
    tagline: "Native-quality apps in every pocket.",
    description:
      "iOS, Android and cross-platform developers who ship smooth, offline-ready mobile experiences.",
    technologies: ["Swift", "Kotlin", "React Native", "Flutter", "Expo", "Firebase"],
    typicalProjects: [
      { title: "Consumer apps", text: "Polished apps with thoughtful onboarding." },
      { title: "Offline-first", text: "Sync engines that survive poor connectivity." },
      { title: "App store launches", text: "Release pipelines, signing and review readiness." },
    ],
  },
  {
    slug: "devops-cloud",
    name: "DevOps & Cloud",
    short: "DevOps",
    tagline: "Infrastructure that scales quietly.",
    description:
      "Cloud and platform engineers who automate deployments, harden infrastructure and keep costs predictable.",
    technologies: ["AWS", "Kubernetes", "Terraform", "Docker", "GitHub Actions", "GCP"],
    typicalProjects: [
      { title: "CI/CD pipelines", text: "Fast, safe deploys with preview environments." },
      { title: "Kubernetes platforms", text: "Self-service clusters for product teams." },
      { title: "Cost optimisation", text: "Right-sizing and observability for cloud spend." },
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    short: "Security",
    tagline: "Trust, engineered in.",
    description:
      "Security engineers who find weaknesses before attackers do and build secure-by-default practices.",
    technologies: ["OWASP", "Pen Testing", "IAM", "SIEM", "Zero Trust", "Burp Suite"],
    typicalProjects: [
      { title: "Security audits", text: "Application and infrastructure assessments." },
      { title: "Compliance readiness", text: "Controls for SOC 2 and ISO 27001 programmes." },
      { title: "Identity & access", text: "SSO, least-privilege and secrets management." },
    ],
  },
  {
    slug: "data-engineering",
    name: "Data Engineering",
    short: "Data",
    tagline: "Clean data, ready when you need it.",
    description:
      "Data engineers who design pipelines, warehouses and models that analysts and products can trust.",
    technologies: ["dbt", "Airflow", "Snowflake", "BigQuery", "Kafka", "Python"],
    typicalProjects: [
      { title: "Modern data stack", text: "Warehouse, transformations and BI from scratch." },
      { title: "Streaming pipelines", text: "Real-time events with exactly-once guarantees." },
      { title: "Data quality", text: "Contracts, tests and lineage across sources." },
    ],
  },
  {
    slug: "creative-development",
    name: "Creative Development",
    short: "Creative",
    tagline: "Where code becomes craft.",
    description:
      "Creative technologists who build immersive web experiences with WebGL, motion and generative visuals.",
    technologies: ["Three.js", "WebGL", "GSAP", "GLSL", "Blender", "Motion"],
    typicalProjects: [
      { title: "Launch experiences", text: "Memorable product reveals and campaign sites." },
      { title: "3D configurators", text: "Interactive product viewers in the browser." },
      { title: "Generative art", text: "Shader-driven visuals and installations." },
    ],
  },
];

export const specialtyBySlug = (slug: string) => specialties.find((s) => s.slug === slug);
