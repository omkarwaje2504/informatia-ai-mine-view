/**
 * Headline proof points — the single source for these numbers. Every page
 * that shows client / project counts reads them from here, so they can't
 * drift apart again.
 */
export const proof = {
  clients: { value: "75+", label: "Global Clients" },
  projects: { value: "500+", label: "Successful Projects" },
} as const;

/** "75+ Global Clients. 500+ Successful Projects." */
export const proofLine = `${proof.clients.value} ${proof.clients.label}. ${proof.projects.value} ${proof.projects.label}.`;

export const site = {
  name: "Informatia AI",
  legalName: "Informatia AI Pvt Ltd",
  tagline: "Engineering Innovation. Delivering Excellence",
  description:
    "Informatia AI is a digital and AI solutions company that turns technology into measurable business outcomes — strategy, digital platforms and intelligent systems built for complex, regulated environments.",
  email: "sales@informatia.ai",
  phone: "1800 309 4544",
  location: `India — partnering with ${proof.clients.value} clients worldwide`,
  url: "https://informatia.ai",
  linkedin: "https://in.linkedin.com/company/informatia-ai",
  instagram: "https://www.instagram.com/informatia.ai",
} as const;


export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  // { href: "/careers", label: "Grow With Us" },
  { href: "/connect", label: "Connect" },
] as const;


export const ctas = {
  primary: { href: "/connect", label: "Start a Conversation" },
  secondary: { href: "/products", label: "Explore Our Solutions" },
} as const;
