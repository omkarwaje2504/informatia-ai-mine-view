/**
 * Homepage hero content — adapted from informatia.ai.
 * Informatia AI: a digital + AI solutions company delivering measurable
 * business outcomes across strategy, execution and optimization.
 */

export const promo = {
  eyebrow: "Trusted by 60+ organizations worldwide",
  text: "Successful deliveries across banking, healthcare & pharma, and enterprise.",
};

export const sceneOne = {
  heading: "Intelligent AI and digital solutions that deliver measurable outcomes.",
  body: "We empower organizations to design, build and scale AI-powered digital solutions that drive engagement, efficiency and growth across industries.",
};

export const sceneTwo = {
  eyebrow: "Strategy · Development · Optimization",
  headingLines: [
    { text: "AI and digital,", tone: "mist" },
    { text: "engineered", tone: "gold", trailing: "for" },
    { text: "measurable", tone: "mist" },
    { text: "business outcomes.", tone: "mist" },
  ],
  centeredHeading: "AI and digital solutions, engineered for measurable business outcomes.",
  body: [
    "Exploring AI? Modernizing platforms? Scaling engagement? Every path leads to performance — we support you through strategy, execution and optimization.",
    "Built for complex, regulated environments: banking & finance, healthcare & pharma, and enterprise.",
  ],
  ctas: {
    primary: { href: "/contact", label: "Start Conversation" },
    secondary: { href: "/#approach", label: "Explore More" },
  },
} as const;

/**
 * The "Understand → Design → Build → Optimize" delivery model, kept here for a
 * later section. Not currently rendered.
 */
export const approach = {
  eyebrow: "Our Approach",
  intro:
    "We follow a clear and structured delivery model to ensure alignment, transparency and measurable outcomes.",
  steps: [
    { title: "Understand", detail: "Clarify business objectives, users and constraints." },
    { title: "Design", detail: "Define solution architecture, experience strategy and roadmap." },
    { title: "Build", detail: "Execute with speed, scalability and quality." },
    { title: "Optimize", detail: "Measure performance, refine solutions and scale impact." },
  ],
} as const;
