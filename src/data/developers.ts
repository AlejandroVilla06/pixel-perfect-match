import type { SpecialtySlug } from "./specialties";
import type { ProjectImageKey } from "./project-images";

export type Availability = "available" | "limited" | "unavailable";

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  image: ProjectImageKey;
}

export interface CareerItem {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export interface Developer {
  id: string;
  slug: string;
  name: string;
  /** Initials monogram — STACKORA uses generated monograms instead of stock portraits. */
  avatar: string;
  title: string;
  specialty: SpecialtySlug;
  location: string;
  experience: number;
  hourlyRate: number;
  availability: Availability;
  skills: string[];
  summary: string;
  projects: Project[];
  languages: string[];
  education: string;
  certifications: string[];
  career: CareerItem[];
  featured?: boolean;
}

type Seed = Omit<Developer, "id" | "slug" | "avatar">;

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/* All companies, people and projects below are fictional. */
const seeds: Seed[] = [
  // ---------- Frontend ----------
  {
    name: "Valentina Ríos",
    title: "Senior Frontend Engineer",
    specialty: "frontend",
    location: "Medellín, Colombia",
    experience: 9,
    hourlyRate: 95,
    availability: "available",
    skills: ["React", "TypeScript", "Next.js", "Design Systems", "Accessibility", "Storybook"],
    summary:
      "Valentina builds design systems and product interfaces that scale across teams. She cares deeply about accessibility and has led component libraries used by dozens of engineers.",
    projects: [
      {
        name: "Aurora Design System",
        description: "Token-driven component library with 80+ accessible components and docs.",
        technologies: ["React", "Storybook", "Radix"],
        image: "dashboard",
      },
      {
        name: "Fintrail Dashboard",
        description: "Real-time portfolio dashboard redesign focused on readability.",
        technologies: ["Next.js", "D3", "TypeScript"],
        image: "data",
      },
    ],
    languages: ["Spanish", "English"],
    education: "B.Sc. Systems Engineering, Universidad EAFIT",
    certifications: ["IAAP Web Accessibility Specialist"],
    career: [
      { role: "Staff Frontend Engineer", company: "Lumen Labs", period: "2021 — Present", summary: "Leads the design system and frontend platform team." },
      { role: "Frontend Engineer", company: "Paylane", period: "2017 — 2021", summary: "Built the merchant dashboard and checkout UI." },
    ],
    featured: true,
  },
  {
    name: "Jonas Becker",
    title: "Frontend Performance Engineer",
    specialty: "frontend",
    location: "Berlin, Germany",
    experience: 7,
    hourlyRate: 110,
    availability: "limited",
    skills: ["Vue", "Nuxt", "Web Vitals", "Vite", "TypeScript"],
    summary:
      "Jonas specialises in making large web apps feel instant. He profiles real user traffic and turns findings into measurable Core Web Vitals improvements.",
    projects: [
      {
        name: "Shopfront Speed Programme",
        description: "Cut largest contentful paint on a high-traffic storefront through image and hydration work.",
        technologies: ["Nuxt", "Vite", "Lighthouse CI"],
        image: "dashboard",
      },
      {
        name: "Edge Rendering Kit",
        description: "Internal toolkit for streaming SSR at the edge.",
        technologies: ["Vue", "Cloudflare Workers"],
        image: "data",
      },
    ],
    languages: ["German", "English"],
    education: "M.Sc. Computer Science, TU Berlin",
    certifications: [],
    career: [
      { role: "Senior Frontend Engineer", company: "Kaufhalle Digital", period: "2020 — Present", summary: "Owns web performance across the storefront." },
      { role: "Web Developer", company: "Studio Nord", period: "2017 — 2020", summary: "Built marketing sites and e-commerce themes." },
    ],
  },
  {
    name: "Aiko Tanaka",
    title: "UI Engineer",
    specialty: "frontend",
    location: "Osaka, Japan",
    experience: 4,
    hourlyRate: 65,
    availability: "available",
    skills: ["React", "Tailwind CSS", "Motion", "Figma", "Remix"],
    summary:
      "Aiko bridges design and engineering, translating detailed Figma work into pixel-precise, animated interfaces with clean, maintainable code.",
    projects: [
      {
        name: "Kumo Booking",
        description: "Booking flow for a boutique travel brand with delightful micro-interactions.",
        technologies: ["Remix", "Motion", "Tailwind CSS"],
        image: "mobile",
      },
      {
        name: "Portfolio Engine",
        description: "Template system for photographers with fast image galleries.",
        technologies: ["React", "Vite"],
        image: "creative",
      },
    ],
    languages: ["Japanese", "English"],
    education: "B.A. Interaction Design, Kyoto Institute of Technology",
    certifications: [],
    career: [
      { role: "UI Engineer", company: "Hikari Studio", period: "2022 — Present", summary: "Builds interactive product UIs for client launches." },
      { role: "Junior Developer", company: "Mori Web", period: "2020 — 2022", summary: "Frontend implementation for agency projects." },
    ],
  },
  // ---------- Backend ----------
  {
    name: "Carlos Méndez",
    title: "Senior Backend Engineer",
    specialty: "backend",
    location: "Mexico City, Mexico",
    experience: 10,
    hourlyRate: 105,
    availability: "available",
    skills: ["Go", "PostgreSQL", "gRPC", "Kafka", "Redis", "Docker"],
    summary:
      "Carlos designs high-throughput backend services with a focus on correctness. He has built payment and ledger systems where every cent must reconcile.",
    projects: [
      {
        name: "Ledgerline",
        description: "Double-entry ledger service handling millions of daily transactions.",
        technologies: ["Go", "PostgreSQL", "Kafka"],
        image: "data",
      },
      {
        name: "Rate Limiter Mesh",
        description: "Distributed rate limiting for a public API gateway.",
        technologies: ["Go", "Redis"],
        image: "security",
      },
    ],
    languages: ["Spanish", "English"],
    education: "B.Sc. Computer Engineering, UNAM",
    certifications: ["AWS Certified Developer – Associate"],
    career: [
      { role: "Principal Engineer", company: "Monedo", period: "2019 — Present", summary: "Leads core ledger and payments infrastructure." },
      { role: "Backend Engineer", company: "Rutas Cloud", period: "2015 — 2019", summary: "Built logistics APIs and routing services." },
    ],
    featured: true,
  },
  {
    name: "Amara Okafor",
    title: "Backend & API Architect",
    specialty: "backend",
    location: "Lagos, Nigeria",
    experience: 8,
    hourlyRate: 85,
    availability: "limited",
    skills: ["Node.js", "GraphQL", "TypeScript", "PostgreSQL", "NestJS"],
    summary:
      "Amara designs developer-friendly APIs with clear contracts and versioning. She helps teams move from ad-hoc endpoints to well-documented platforms.",
    projects: [
      {
        name: "Openbank Gateway",
        description: "Unified GraphQL gateway for a multi-bank aggregation product.",
        technologies: ["NestJS", "GraphQL", "PostgreSQL"],
        image: "dashboard",
      },
      {
        name: "Webhooks Hub",
        description: "Reliable webhook delivery with retries and signing.",
        technologies: ["Node.js", "SQS"],
        image: "data",
      },
    ],
    languages: ["English", "Igbo"],
    education: "B.Sc. Computer Science, University of Lagos",
    certifications: ["Apollo Graph Developer – Professional"],
    career: [
      { role: "Lead API Engineer", company: "Kobo Rails", period: "2020 — Present", summary: "Owns public API strategy and SDKs." },
      { role: "Software Engineer", company: "Tella", period: "2016 — 2020", summary: "Backend services for a mobile wallet." },
    ],
  },
  {
    name: "Mateus Silva",
    title: "Python Backend Engineer",
    specialty: "backend",
    location: "Lisbon, Portugal",
    experience: 5,
    hourlyRate: 70,
    availability: "unavailable",
    skills: ["Python", "Django", "FastAPI", "Celery", "PostgreSQL"],
    summary:
      "Mateus builds pragmatic Python backends for SaaS products, with strong testing habits and a knack for untangling legacy Django codebases.",
    projects: [
      {
        name: "Clinica Scheduler",
        description: "Appointment engine for a network of health clinics.",
        technologies: ["Django", "Celery", "PostgreSQL"],
        image: "dashboard",
      },
      {
        name: "Invoice Parser API",
        description: "FastAPI service extracting line items from invoices.",
        technologies: ["FastAPI", "Python"],
        image: "ai",
      },
    ],
    languages: ["Portuguese", "English", "Spanish"],
    education: "M.Sc. Software Engineering, Universidade de Lisboa",
    certifications: [],
    career: [
      { role: "Backend Engineer", company: "Saúde Digital", period: "2021 — Present", summary: "Scheduling and billing services." },
      { role: "Python Developer", company: "Tejo Labs", period: "2019 — 2021", summary: "Client SaaS backends." },
    ],
  },
  // ---------- Full stack ----------
  {
    name: "Priya Raman",
    title: "Full Stack Product Engineer",
    specialty: "full-stack",
    location: "Bengaluru, India",
    experience: 8,
    hourlyRate: 80,
    availability: "available",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Prisma"],
    summary:
      "Priya ships complete product features end to end. She has taken several startups from prototype to their first paying customers.",
    projects: [
      {
        name: "Crewly",
        description: "Shift-scheduling SaaS for hospitality teams, built from zero.",
        technologies: ["Next.js", "Prisma", "PostgreSQL"],
        image: "dashboard",
      },
      {
        name: "Mentor Match",
        description: "Two-sided marketplace with messaging and payments.",
        technologies: ["React", "Node.js", "Stripe"],
        image: "mobile",
      },
    ],
    languages: ["English", "Tamil", "Hindi"],
    education: "B.Tech. Computer Science, IIT Madras",
    certifications: ["AWS Solutions Architect – Associate"],
    career: [
      { role: "Founding Engineer", company: "Crewly", period: "2021 — Present", summary: "Built the product and engineering team." },
      { role: "Full Stack Engineer", company: "Zest Commerce", period: "2017 — 2021", summary: "Checkout and merchant tools." },
    ],
    featured: true,
  },
  {
    name: "Lucas Moreau",
    title: "Full Stack Developer",
    specialty: "full-stack",
    location: "Lyon, France",
    experience: 6,
    hourlyRate: 75,
    availability: "limited",
    skills: ["Vue", "Laravel", "PHP", "MySQL", "Docker"],
    summary:
      "Lucas builds robust business applications with Laravel and Vue, and enjoys modernising older platforms without disrupting daily operations.",
    projects: [
      {
        name: "Atelier ERP",
        description: "Order and inventory platform for a furniture manufacturer.",
        technologies: ["Laravel", "Vue", "MySQL"],
        image: "dashboard",
      },
      {
        name: "Vélo Rent",
        description: "City bike rental platform with real-time availability.",
        technologies: ["Vue", "Laravel", "WebSockets"],
        image: "mobile",
      },
    ],
    languages: ["French", "English"],
    education: "Licence Informatique, Université Lyon 1",
    certifications: [],
    career: [
      { role: "Lead Developer", company: "Rhône Logiciels", period: "2020 — Present", summary: "Leads client ERP projects." },
      { role: "Web Developer", company: "Agence Soie", period: "2018 — 2020", summary: "E-commerce and CMS builds." },
    ],
  },
  {
    name: "Sofia Lindqvist",
    title: "Senior Full Stack Engineer",
    specialty: "full-stack",
    location: "Stockholm, Sweden",
    experience: 11,
    hourlyRate: 130,
    availability: "available",
    skills: ["TypeScript", "React", "tRPC", "Next.js", "PostgreSQL", "Vercel"],
    summary:
      "Sofia is a senior generalist who sets up strong engineering foundations — type-safe stacks, testing culture and pragmatic architecture.",
    projects: [
      {
        name: "Nordic Grants Portal",
        description: "Application and review platform for research funding.",
        technologies: ["Next.js", "tRPC", "PostgreSQL"],
        image: "dashboard",
      },
      {
        name: "Fika Analytics",
        description: "Privacy-friendly product analytics for small teams.",
        technologies: ["TypeScript", "ClickHouse"],
        image: "data",
      },
    ],
    languages: ["Swedish", "English", "German"],
    education: "M.Sc. Computer Science, KTH Royal Institute of Technology",
    certifications: [],
    career: [
      { role: "Engineering Lead", company: "Fjord Systems", period: "2018 — Present", summary: "Platform and product engineering lead." },
      { role: "Software Engineer", company: "Nordbank Tech", period: "2014 — 2018", summary: "Internal banking tools." },
    ],
  },
  // ---------- AI ----------
  {
    name: "Daniel Cho",
    title: "AI Engineer — LLM Applications",
    specialty: "artificial-intelligence",
    location: "Seoul, South Korea",
    experience: 6,
    hourlyRate: 140,
    availability: "available",
    skills: ["LLMs", "RAG", "Python", "LangChain", "pgvector", "Evaluations"],
    summary:
      "Daniel builds grounded LLM features that teams can trust. He pairs retrieval pipelines with rigorous evaluation so quality is measured, not guessed.",
    projects: [
      {
        name: "Docsy Copilot",
        description: "Retrieval-augmented assistant over 200k internal documents.",
        technologies: ["Python", "pgvector", "LLMs"],
        image: "ai",
      },
      {
        name: "Eval Harness",
        description: "Open evaluation framework for regression-testing prompts.",
        technologies: ["Python", "Pytest"],
        image: "data",
      },
    ],
    languages: ["Korean", "English"],
    education: "M.Sc. Artificial Intelligence, KAIST",
    certifications: ["Google Cloud Professional ML Engineer"],
    career: [
      { role: "Senior AI Engineer", company: "Hanul AI", period: "2022 — Present", summary: "Leads applied LLM product work." },
      { role: "ML Engineer", company: "Pixelwave", period: "2019 — 2022", summary: "Search and ranking models." },
    ],
    featured: true,
  },
  {
    name: "Elena Petrova",
    title: "AI Agents Engineer",
    specialty: "artificial-intelligence",
    location: "Sofia, Bulgaria",
    experience: 5,
    hourlyRate: 115,
    availability: "limited",
    skills: ["Agents", "TypeScript", "Python", "Function Calling", "Guardrails"],
    summary:
      "Elena designs tool-using AI agents for operations teams, with careful guardrails, human-in-the-loop review and clear observability.",
    projects: [
      {
        name: "Ops Agent",
        description: "Agent that triages support tickets and drafts responses for review.",
        technologies: ["TypeScript", "LLMs", "Postgres"],
        image: "ai",
      },
      {
        name: "Contract Reviewer",
        description: "Clause extraction and risk flagging for legal teams.",
        technologies: ["Python", "LLMs"],
        image: "security",
      },
    ],
    languages: ["Bulgarian", "English", "Russian"],
    education: "M.Sc. Data Science, Sofia University",
    certifications: [],
    career: [
      { role: "AI Engineer", company: "Balkan Automations", period: "2021 — Present", summary: "Agent systems for enterprise clients." },
      { role: "Data Scientist", company: "Rila Analytics", period: "2019 — 2021", summary: "NLP for customer feedback." },
    ],
  },
  {
    name: "Omar Haddad",
    title: "Conversational AI Developer",
    specialty: "artificial-intelligence",
    location: "Amman, Jordan",
    experience: 4,
    hourlyRate: 75,
    availability: "available",
    skills: ["Python", "Speech", "LLMs", "FastAPI", "Arabic NLP"],
    summary:
      "Omar builds multilingual voice and chat assistants, with particular expertise in Arabic language processing.",
    projects: [
      {
        name: "Salam Voice",
        description: "Bilingual voice assistant for a telecom help line.",
        technologies: ["Python", "Speech", "FastAPI"],
        image: "ai",
      },
      {
        name: "Menu Bot",
        description: "Ordering assistant for restaurant chains.",
        technologies: ["LLMs", "Node.js"],
        image: "mobile",
      },
    ],
    languages: ["Arabic", "English"],
    education: "B.Sc. Computer Science, University of Jordan",
    certifications: [],
    career: [
      { role: "AI Developer", company: "Petra Voice", period: "2022 — Present", summary: "Speech and dialogue systems." },
      { role: "Software Engineer", company: "Nabd", period: "2020 — 2022", summary: "Chatbots and integrations." },
    ],
  },
  // ---------- ML ----------
  {
    name: "Hannah Weiss",
    title: "Machine Learning Engineer",
    specialty: "machine-learning",
    location: "Zurich, Switzerland",
    experience: 9,
    hourlyRate: 150,
    availability: "limited",
    skills: ["PyTorch", "Recommender Systems", "MLflow", "Python", "Spark"],
    summary:
      "Hannah designs recommendation and ranking systems, taking models from notebook experiments to monitored production services.",
    projects: [
      {
        name: "StreamRank",
        description: "Personalised ranking for a video platform.",
        technologies: ["PyTorch", "Spark", "MLflow"],
        image: "ai",
      },
      {
        name: "Feature Store",
        description: "Shared feature platform for online and offline models.",
        technologies: ["Python", "Redis", "Spark"],
        image: "data",
      },
    ],
    languages: ["German", "English", "French"],
    education: "Ph.D. Machine Learning, ETH Zürich",
    certifications: [],
    career: [
      { role: "Staff ML Engineer", company: "Alpstream", period: "2019 — Present", summary: "Recommendations and ML platform." },
      { role: "Research Engineer", company: "Lakeside Research", period: "2016 — 2019", summary: "Applied ranking research." },
    ],
  },
  {
    name: "Rafael Costa",
    title: "MLOps Engineer",
    specialty: "machine-learning",
    location: "São Paulo, Brazil",
    experience: 6,
    hourlyRate: 90,
    availability: "available",
    skills: ["Kubeflow", "MLflow", "Python", "Kubernetes", "scikit-learn"],
    summary:
      "Rafael makes machine learning reproducible: versioned data, automated training and safe deployments with drift monitoring.",
    projects: [
      {
        name: "Credit Risk Pipeline",
        description: "Automated retraining and monitoring for credit models.",
        technologies: ["Kubeflow", "MLflow", "Python"],
        image: "data",
      },
      {
        name: "Forecast Studio",
        description: "Self-service demand forecasting for retail planners.",
        technologies: ["scikit-learn", "FastAPI"],
        image: "dashboard",
      },
    ],
    languages: ["Portuguese", "English"],
    education: "B.Sc. Statistics, Universidade de São Paulo",
    certifications: ["Certified Kubernetes Application Developer"],
    career: [
      { role: "MLOps Lead", company: "Banco Aurora", period: "2021 — Present", summary: "ML platform for risk teams." },
      { role: "Data Scientist", company: "Varejo Analytics", period: "2018 — 2021", summary: "Forecasting models." },
    ],
  },
  // ---------- Mobile ----------
  {
    name: "Mia Thompson",
    title: "Senior iOS Engineer",
    specialty: "mobile",
    location: "Melbourne, Australia",
    experience: 8,
    hourlyRate: 120,
    availability: "available",
    skills: ["Swift", "SwiftUI", "Combine", "Core Data", "XCTest"],
    summary:
      "Mia crafts native iOS apps with meticulous attention to motion, accessibility and battery-friendly performance.",
    projects: [
      {
        name: "Tide Journal",
        description: "Mindful journaling app with widgets and Apple Watch support.",
        technologies: ["SwiftUI", "WidgetKit"],
        image: "mobile",
      },
      {
        name: "Fieldnote",
        description: "Offline-first inspection app for construction teams.",
        technologies: ["Swift", "Core Data"],
        image: "dashboard",
      },
    ],
    languages: ["English"],
    education: "B.Sc. Software Engineering, RMIT University",
    certifications: [],
    career: [
      { role: "Senior iOS Engineer", company: "Southbank Apps", period: "2020 — Present", summary: "Leads iOS for consumer products." },
      { role: "iOS Developer", company: "Koala Mobile", period: "2016 — 2020", summary: "Client app development." },
    ],
  },
  {
    name: "Kwame Mensah",
    title: "Cross-platform Mobile Developer",
    specialty: "mobile",
    location: "Accra, Ghana",
    experience: 5,
    hourlyRate: 60,
    availability: "available",
    skills: ["React Native", "Expo", "TypeScript", "Firebase", "Flutter"],
    summary:
      "Kwame ships cross-platform apps quickly without sacrificing feel, with a focus on low-bandwidth and offline scenarios.",
    projects: [
      {
        name: "Market Mama",
        description: "Ordering app for informal market vendors with offline sync.",
        technologies: ["React Native", "Expo", "SQLite"],
        image: "mobile",
      },
      {
        name: "Clinic Queue",
        description: "Patient queue app with SMS fallbacks.",
        technologies: ["Flutter", "Firebase"],
        image: "dashboard",
      },
    ],
    languages: ["English", "Twi"],
    education: "B.Sc. Computer Science, KNUST",
    certifications: [],
    career: [
      { role: "Mobile Lead", company: "Volta Apps", period: "2021 — Present", summary: "Leads cross-platform development." },
      { role: "Developer", company: "Gold Coast Digital", period: "2019 — 2021", summary: "Mobile and web projects." },
    ],
  },
  // ---------- DevOps ----------
  {
    name: "Ingrid Haugen",
    title: "Platform & Cloud Engineer",
    specialty: "devops-cloud",
    location: "Oslo, Norway",
    experience: 10,
    hourlyRate: 125,
    availability: "limited",
    skills: ["Kubernetes", "Terraform", "AWS", "ArgoCD", "Prometheus"],
    summary:
      "Ingrid builds internal developer platforms that let product teams deploy confidently, with observability and guardrails baked in.",
    projects: [
      {
        name: "Fjell Platform",
        description: "Self-service Kubernetes platform for 40 product teams.",
        technologies: ["Kubernetes", "ArgoCD", "Terraform"],
        image: "data",
      },
      {
        name: "Cost Lens",
        description: "Cloud cost dashboards with per-team allocation.",
        technologies: ["AWS", "Grafana"],
        image: "dashboard",
      },
    ],
    languages: ["Norwegian", "English"],
    education: "M.Sc. Informatics, University of Oslo",
    certifications: ["Certified Kubernetes Administrator", "AWS DevOps Engineer – Professional"],
    career: [
      { role: "Principal Platform Engineer", company: "Nordlys Energy", period: "2019 — Present", summary: "Developer platform and SRE." },
      { role: "DevOps Engineer", company: "Viken Tech", period: "2015 — 2019", summary: "CI/CD and infrastructure automation." },
    ],
  },
  {
    name: "Diego Fernández",
    title: "DevOps Engineer",
    specialty: "devops-cloud",
    location: "Buenos Aires, Argentina",
    experience: 6,
    hourlyRate: 70,
    availability: "available",
    skills: ["Docker", "GitHub Actions", "GCP", "Terraform", "Linux"],
    summary:
      "Diego automates everything between commit and production — fast pipelines, preview environments and infrastructure as code.",
    projects: [
      {
        name: "Preview Envs",
        description: "Per-pull-request environments for a SaaS product.",
        technologies: ["GitHub Actions", "GCP", "Terraform"],
        image: "data",
      },
      {
        name: "Zero-downtime Migration",
        description: "Moved a monolith to containers without downtime.",
        technologies: ["Docker", "Linux"],
        image: "security",
      },
    ],
    languages: ["Spanish", "English"],
    education: "Ingeniería en Sistemas, UTN Buenos Aires",
    certifications: ["Google Cloud Professional DevOps Engineer"],
    career: [
      { role: "Senior DevOps Engineer", company: "Pampa Cloud", period: "2021 — Present", summary: "Infrastructure for SaaS clients." },
      { role: "SysAdmin", company: "Andes Hosting", period: "2018 — 2021", summary: "Linux and networking." },
    ],
  },
  // ---------- Security ----------
  {
    name: "Noah Fischer",
    title: "Application Security Engineer",
    specialty: "cybersecurity",
    location: "Vienna, Austria",
    experience: 9,
    hourlyRate: 135,
    availability: "available",
    skills: ["Pen Testing", "OWASP", "Burp Suite", "Threat Modeling", "Go"],
    summary:
      "Noah performs application security assessments and helps engineering teams adopt secure-by-default patterns that stick.",
    projects: [
      {
        name: "Secure SDLC Programme",
        description: "Threat modelling and secure code review for a fintech.",
        technologies: ["OWASP", "Semgrep"],
        image: "security",
      },
      {
        name: "Bug Bounty Triage",
        description: "Triage tooling and process for a public bounty programme.",
        technologies: ["Go", "Burp Suite"],
        image: "data",
      },
    ],
    languages: ["German", "English"],
    education: "M.Sc. Information Security, TU Wien",
    certifications: ["OSCP", "CISSP"],
    career: [
      { role: "Lead AppSec Engineer", company: "Donau Pay", period: "2020 — Present", summary: "Application security programme." },
      { role: "Penetration Tester", company: "Redline Security", period: "2016 — 2020", summary: "Client assessments." },
    ],
  },
  {
    name: "Leila Ahmadi",
    title: "Cloud Security Specialist",
    specialty: "cybersecurity",
    location: "Toronto, Canada",
    experience: 7,
    hourlyRate: 120,
    availability: "unavailable",
    skills: ["IAM", "Zero Trust", "AWS", "SIEM", "Compliance"],
    summary:
      "Leila designs identity and cloud security architectures and prepares teams for compliance audits without slowing delivery.",
    projects: [
      {
        name: "Zero Trust Rollout",
        description: "Identity-aware access for a distributed workforce.",
        technologies: ["IAM", "Zero Trust"],
        image: "security",
      },
      {
        name: "SOC 2 Readiness",
        description: "Controls and evidence automation for an audit.",
        technologies: ["AWS", "SIEM"],
        image: "dashboard",
      },
    ],
    languages: ["English", "Persian", "French"],
    education: "B.Eng. Computer Engineering, University of Toronto",
    certifications: ["CCSP", "AWS Security – Specialty"],
    career: [
      { role: "Security Architect", company: "Maple Health", period: "2021 — Present", summary: "Cloud and identity security." },
      { role: "Security Engineer", company: "Northstar Bank", period: "2017 — 2021", summary: "SIEM and incident response." },
    ],
  },
  // ---------- Data ----------
  {
    name: "Chen Wei",
    title: "Senior Data Engineer",
    specialty: "data-engineering",
    location: "Singapore",
    experience: 8,
    hourlyRate: 110,
    availability: "available",
    skills: ["dbt", "Snowflake", "Airflow", "Python", "Kafka"],
    summary:
      "Chen builds modern data platforms with tested transformations, clear lineage and dashboards stakeholders actually trust.",
    projects: [
      {
        name: "Harbour Warehouse",
        description: "Warehouse and dbt models for a logistics company.",
        technologies: ["Snowflake", "dbt", "Airflow"],
        image: "data",
      },
      {
        name: "Event Stream",
        description: "Real-time event pipeline for product analytics.",
        technologies: ["Kafka", "Python"],
        image: "dashboard",
      },
    ],
    languages: ["Mandarin", "English"],
    education: "B.Comp. Computer Science, National University of Singapore",
    certifications: ["dbt Analytics Engineering Certification"],
    career: [
      { role: "Data Engineering Lead", company: "Strait Logistics", period: "2020 — Present", summary: "Data platform lead." },
      { role: "Data Engineer", company: "Lion Retail", period: "2016 — 2020", summary: "ETL and reporting." },
    ],
  },
  {
    name: "Isabela Duarte",
    title: "Analytics Engineer",
    specialty: "data-engineering",
    location: "Bogotá, Colombia",
    experience: 3,
    hourlyRate: 55,
    availability: "available",
    skills: ["SQL", "dbt", "BigQuery", "Looker", "Python"],
    summary:
      "Isabela turns messy data into clean, well-documented models and self-service dashboards for growing teams.",
    projects: [
      {
        name: "Growth Metrics Layer",
        description: "Semantic layer for a subscription business.",
        technologies: ["dbt", "BigQuery", "Looker"],
        image: "dashboard",
      },
      {
        name: "Data Quality Checks",
        description: "Automated tests and alerts across 60 sources.",
        technologies: ["dbt", "Python"],
        image: "data",
      },
    ],
    languages: ["Spanish", "English"],
    education: "B.Sc. Industrial Engineering, Universidad de los Andes",
    certifications: [],
    career: [
      { role: "Analytics Engineer", company: "Café Cloud", period: "2023 — Present", summary: "Metrics and modelling." },
      { role: "Data Analyst", company: "Ruta Fintech", period: "2021 — 2023", summary: "Reporting and dashboards." },
    ],
  },
  // ---------- Creative ----------
  {
    name: "Theo Laurent",
    title: "Creative Developer — WebGL",
    specialty: "creative-development",
    location: "Paris, France",
    experience: 7,
    hourlyRate: 120,
    availability: "limited",
    skills: ["Three.js", "WebGL", "GLSL", "GSAP", "Blender"],
    summary:
      "Theo builds immersive launch experiences and 3D product configurators that run smoothly even on mid-range phones.",
    projects: [
      {
        name: "Orbit Launch",
        description: "Interactive 3D reveal for a consumer hardware launch.",
        technologies: ["Three.js", "GLSL", "GSAP"],
        image: "creative",
      },
      {
        name: "Sneaker Configurator",
        description: "Real-time 3D product customiser.",
        technologies: ["Three.js", "Blender"],
        image: "mobile",
      },
    ],
    languages: ["French", "English"],
    education: "Master Design Interactif, Gobelins Paris",
    certifications: [],
    career: [
      { role: "Lead Creative Developer", company: "Studio Lumière", period: "2020 — Present", summary: "Immersive web campaigns." },
      { role: "Creative Developer", company: "Pixel Atelier", period: "2017 — 2020", summary: "Interactive sites." },
    ],
    featured: true,
  },
  {
    name: "Nina Kowalski",
    title: "Motion & Creative Technologist",
    specialty: "creative-development",
    location: "Kraków, Poland",
    experience: 5,
    hourlyRate: 85,
    availability: "available",
    skills: ["GSAP", "Motion", "React", "Canvas", "Rive"],
    summary:
      "Nina designs and engineers expressive motion systems for brands and products, keeping performance and accessibility in balance.",
    projects: [
      {
        name: "Brand Motion Kit",
        description: "Reusable animation primitives for a fintech brand.",
        technologies: ["GSAP", "React"],
        image: "creative",
      },
      {
        name: "Generative Posters",
        description: "Canvas-based generative poster tool.",
        technologies: ["Canvas", "TypeScript"],
        image: "ai",
      },
    ],
    languages: ["Polish", "English"],
    education: "M.A. New Media, Academy of Fine Arts in Kraków",
    certifications: [],
    career: [
      { role: "Creative Technologist", company: "Wawel Studio", period: "2021 — Present", summary: "Motion and interactive." },
      { role: "Frontend Developer", company: "Vistula Agency", period: "2019 — 2021", summary: "Animated marketing sites." },
    ],
  },
];

export const developers: Developer[] = seeds.map((s, i) => ({
  ...s,
  id: `dev-${String(i + 1).padStart(3, "0")}`,
  slug: slugify(s.name),
  avatar: initials(s.name),
}));

export const developerBySlug = (slug: string) => developers.find((d) => d.slug === slug);
export const featuredDevelopers = developers.filter((d) => d.featured);
export const developersBySpecialty = (slug: string) =>
  developers.filter((d) => d.specialty === slug);

export const availabilityLabel: Record<Availability, string> = {
  available: "Available now",
  limited: "Limited availability",
  unavailable: "Booked",
};
