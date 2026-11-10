export const primaryNav = [
  { to: "/developers", label: "Explore Talent" },
  { to: "/specialties", label: "Specialties" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/for-companies", label: "For Companies" },
] as const;

export const secondaryNav = [
  { to: "/for-developers", label: "For Developers" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const footerColumns = [
  {
    title: "Platform",
    links: [
      { to: "/developers", label: "Explore Talent" },
      { to: "/specialties", label: "Specialties" },
      { to: "/compare", label: "Compare" },
      { to: "/favorites", label: "Saved developers" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { to: "/for-companies", label: "For Companies" },
      { to: "/for-developers", label: "For Developers" },
      { to: "/pricing", label: "Pricing" },
      { to: "/how-it-works", label: "How It Works" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/login", label: "Sign in" },
      { to: "/dashboard", label: "Developer dashboard" },
    ],
  },
] as const;
