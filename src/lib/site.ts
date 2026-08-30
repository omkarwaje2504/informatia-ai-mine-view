export const site = {
  name: "Informatia AI",
  legalName: "Informatia AI Pvt Ltd",
  tagline: "Engineering Innovation. Delivering Excellence",
  description:
    "Informatia AI is a digital and AI solutions company that turns technology into measurable business outcomes — strategy, digital platforms and intelligent systems built for complex, regulated environments.",
  email: "sales@informatia.ai",
  phone: "1800 309 4544",
  location: "India — partnering with 60+ clients worldwide",
  url: "https://informatia.ai",
  linkedin: "https://in.linkedin.com/company/informatia-ai",
  instagram: "https://www.instagram.com/informatia.ai",
} as const;

export const nav = [
  { href: "/#about", label: "About us" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#industries", label: "Industries" },
  { href: "/#approach", label: "Our Approach" },
  { href: "/#careers", label: "Work with us" },
] as const;

/** currently-highlighted nav item */
export const activeNav = "Capabilities";

export const ctas = {
  primary: { href: "/contact", label: "Start Conversation" },
  secondary: { href: "/#approach", label: "Explore More" },
} as const;
