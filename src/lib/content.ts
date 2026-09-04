/**
 * Homepage hero content — adapted from informatia.ai.
 * Informatia AI: a digital + AI solutions company delivering measurable
 * business outcomes across strategy, execution and optimization.
 */

export const promo = {
  eyebrow: "60+ global clients · 350+ successful deliveries",
  text: "Connecting Businesses. Empowering Sales. Accelerating Growth.",
};

export const sceneOne = {
  heading:
    "Digital, AI and engagement solutions that bridge the customer journey, empower sales teams and unify field execution.",
  body: "Digital, AI and engagement solutions that bridge the customer journey, empower sales teams and unify field execution.",
};

export const sceneTwo = {
  eyebrow: "AI · Digital Platforms · Engagement · Data",
  headingLines: [
    { text: "Built on experience.", tone: "mist" },
    { text: "Focused on what's next.", tone: "gold" },
  ],
  centeredHeading: "One connected approach to growth.",
  body: [
    "Informatia AI builds on the technology-led foundation of Sai Ashirwad with modern digital capabilities and AI-first solutions.",
  ],
  flow: ["Strategy", "Engagement", "Execution"],
  ctas: {
    primary: { href: "/capabilities", label: "Explore Our Solutions" },
    secondary: { href: "/connect", label: "Start a Conversation" },
  },
} as const;

/**
 * Four capabilities — surface as a row of cards that overlap the Scene 2
 * panel's bottom edge and rise in with staggered parallax on scroll.
 */
export const capabilities = [
  {
    n: "01",
    title: "AI & Intelligent Solutions",
    detail: "AI and automation built around business needs.",
  },
  {
    n: "02",
    title: "Digital Platforms",
    detail: "Scalable web, mobile and enterprise applications.",
  },
  {
    n: "03",
    title: "Digital Engagement",
    detail: "Technology-led experiences that connect brands, to audiences.",
  },
  {
    n: "04",
    title: "Data & Insights",
    detail: "Dashboards and intelligence to show actionable visibility.",
  },
] as const;

export const industries = {
  eyebrow: "Industries We Serve",
  heading: "Built for the industries we know best.",
  sub: "Trusted where Compliance, scale and measurable outcomes are mandatory.",
  note: "60+ enterprises partner with Informatia AI.",
  ctas: {
    primary: { href: "/#industries", label: "Explore Industries" },
    secondary: { href: "/connect", label: "Start a Conversation" },
  },
  sectors: [
    {
      id: "healthcare",
      tab: "Healthcare & Pharma",
      title: "Healthcare & Pharma",
      href: "/industries/healthcare-pharma",
      points: [
        "Connecting pharma, HCPs, field teams and patients through intelligent digital solutions Patient and HCP engagement.",
        "Field Force and commercial analytics tools.",
        "Compliant Digital architecture.",
      ],
    },
    {
      id: "bfsi",
      tab: "Banking & Financial Institutions",
      title: "Banking & Financial Institutions",
      href: "/industries/banking-financial-institutions",
      points: [
        "Digital and AI solutions that strengthen customer engagement, sales enablement and execution.",
        "Digital banking portals, FinTech platform and cloud-ready architectures.",
        "AI-driven process automation and intelligent data processing.",
        "Real-time risk scoring and predictive intelligence dashboards.",
      ],
    },
    {
      id: "enterprise",
      tab: "Enterprises & Corporates",
      title: "Enterprises & Corporates",
      href: "/industries/enterprises-corporates",
      points: [
        "Modern platforms and intelligent solutions that connect teams, customers and business operations.",
        "Legacy system re-architecting, API-first development, and cloud modernization.",
        "Task orchestration, AI assistants, and enterprise workflow integration",
        "Unified leadership dashboards, and employee experience portals.",
      ],
    },
  ],
} as const;

/**
 * Industry solutions — a 3-up card grid. Each card: a "ready to deploy"
 * eyebrow, an outcome-led blurb, a short list of solution areas, and a CTA.
 */
export const industrySolutions = {
  eyebrow: "Solutions",
  heading: "Purpose-built for regulated industries.",
  sub: "Platforms that orchestrate and automate critical workflows — measurable outcomes without long build cycles or replacing the systems you already run.",
  cardEyebrow: "Ready to deploy",
  ctaPrefix: "Explore",
  cards: [
    {
      id: "bfsi",
      name: "Banking & Financial Services",
      cta: "banking",
      blurb:
        "Digital banking and FinTech platforms with intelligent automation and real-time risk scoring — decisions that stay consistent, traceable and audit-ready.",
      solutions: [
        "Digital banking & FinTech platforms",
        "Intelligent process & document automation",
        "Risk scoring & compliance-ready systems",
      ],
    },
    {
      id: "healthcare",
      name: "Healthcare & Life Sciences",
      cta: "healthcare",
      blurb:
        "Patient and HCP engagement platforms, field-force analytics and clinician-first EHR design — compliant by construction, measurable in the field.",
      solutions: [
        "Patient & HCP engagement platforms",
        "Field-force & commercial analytics",
        "Clinician-first EHR / EMR design",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprises & Corporates",
      cta: "enterprise",
      blurb:
        "Legacy modernization, API-first platforms and AI-assisted workflows — with unified leadership dashboards and governed data across the organization.",
      solutions: [
        "Cloud & legacy modernization",
        "Workflow automation & AI assistants",
        "Governed data & leadership dashboards",
      ],
    },
  ],
} as const;

/**
 * Core capabilities & engagement tracks — a stack of dark cards that pin at
 * the top one after another, each new card sliding up over the last.
 */
export const engagementTracks = {
  eyebrow: "One Connected Approach to Growth",
  heading: "Five tracks, from strategy to measurable impact.",
  sub: "Engage us at any point — framing an AI strategy, modernizing a platform, or optimizing systems already in production.",
  tracks: [
    {
      n: "01",
      title: "Bridge the Customer Gap",
      focus:
        "We connect your business, your teams and your solutions to the customers and stakeholders you ultimately need to reach.",
      impact: "Strategy → Engagement → Execution ",
    },
    {
      n: "02",
      title: "Empower Your Sales Force",
      focus:
        "We equip sales and field teams with smarter digital tools, engagement solutions and actionable intelligence to execute more effectively.",
      impact: "Enable → Engage → Perform ",
    },
    {
      n: "03",
      title: "Unify Sales Execution",
      focus:
        "We build connected sales force applications that bring field activity, engagement and business insights into one unified experience.",
      impact: "Connect → Execute → Measure",
    },
  ],
} as const;

/**
 * Orchestration — a pinned scroll-story. As the reader scrolls, the left
 * column swaps its heading for a growing list of points and the right-hand
 * process diagram lights up node by node.
 */
export const orchestration = {
  index: "01",
  eyebrow: "What We Do",
  heading: "One connected approach to growth",
  body: "We connect your business, your teams and your solutions to the customers and stakeholders you ultimately need to reach.",
  cta: { href: "/capabilities", label: "Explore our capabilities" },
  points: [
    {
      title: "Bridge the customer gap",
      detail:
        "We connect your business, your teams and your solutions to the customers and stakeholders you ultimately need to reach.",
    },
    {
      title: "Empower your sales force",
      detail:
        "We equip sales and field teams with smarter digital tools, engagement solutions and actionable intelligence to execute more effectively.",
    },
    {
      title: "Unify sales execution",
      detail:
        "We build connected sales-force applications that bring field activity, engagement and business insights into one unified experience.",
    },
  ],
  nodes: [
    { title: "Strategy", stage: "Stage 01", badge: "Aligned", x: 2, y: 4 },
    { title: "Engagement", stage: "Stage 02", badge: "Connected", x: 54, y: 4 },
    {
      title: "Field execution",
      stage: "Stage 03",
      badge: "Enabled",
      x: 2,
      y: 40,
    },
    {
      title: "Insights",
      stage: "In one view",
      badge: "Measured",
      x: 54,
      y: 40,
    },
    { title: "Growth", stage: "Stage 04", badge: "Delivered", x: 2, y: 76 },
  ],
} as const;

/**
 * The "Understand → Design → Build → Optimize" delivery model — rendered as
 * the four-step approach section.
 */
export const approach = {
  eyebrow: "How We Deliver",
  heading: "From the business objective to the final audience ",
  intro: "we bring strategy, technology and execution together.",
  steps: [
    {
      n: "01",
      title: "Understand",
      detail:
        "Start with the business objective, the users and the constraints.",
    },
    {
      n: "02",
      title: "Design",
      detail:
        "Shape the solution architecture, experience strategy and execution roadmap.",
    },
    {
      n: "03",
      title: "Build",
      detail:
        "Execute with speed, enterprise scalability and quality precision.",
    },
    {
      n: "04",
      title: "Execute & Optimize",
      detail: "Deploy, measure live performance and scale the total impact.",
    },
  ],
} as const;

/**
 * Closing section — client logos, the partner CTA and the proof stats merged
 * into one block. Client logos live in public/clients/ (from saiashirwad.com).
 */
export const impact = {
  eyebrow: "Let's build",
  bandLabel: "Trusted by leading pharma, healthcare & financial brands",
  clients: [
    { name: "Sun Pharma", logo: "/clients/sun-pharma.png" },
    { name: "Cipla", logo: "/clients/cipla.png" },
    { name: "Zydus", logo: "/clients/zydus.png" },
    { name: "Novo Nordisk", logo: "/clients/novo-nordisk.png" },
    { name: "Glenmark", logo: "/clients/glenmark.png" },
    { name: "Alkem", logo: "/clients/alkem.png" },
    { name: "Ajanta Pharma", logo: "/clients/ajanta.png" },
    { name: "RPG Life Sciences", logo: "/clients/rpg.png" },
    { name: "Indoco", logo: "/clients/indoco.png" },
    { name: "Gufic", logo: "/clients/gufic.png" },
    { name: "Medley", logo: "/clients/medley.png" },
    { name: "Signutra", logo: "/clients/signutra.png" },
    { name: "HBC Dermiza", logo: "/clients/hbc-derma.png" },
    { name: "Regaliz", logo: "/clients/regaliz.png" },
    { name: "D-Mart", logo: "/clients/dmart.png" },
  ],
  stats: [
    { value: "60+", label: "Global clients" },
    { value: "350+", label: "Successful Deliveries" },
  ],
  questions: [
    { lead: "Built on", highlight: "Experience" },
    { lead: "Focused on", highlight: "What is Next" },
  ],
  heading: "Let's build the connection that drives growth.",
  body: "Informatia AI builds on the technology-led foundation of Sai Ashirwad with modern digital capabilities and AI-first solutions.",
  ctaHeading: "Let's Build the Connection That Drives Growth.",
  ctaBody:
    "Whether the goal is stronger customer engagement, a more empowered sales force or unified digital execution, Informatia AI can help take it from strategy to deployment.",
  leadership:
    "Rohan Sakhale founded Informatia AI with a vision to turn emerging technology into practical solutions that create measurable business impact. Drawing on extensive digital-transformation experience across industries, he leads the company at the intersection of strategy, technology and execution.",
  ctas: {
    primary: { href: "/connect", label: "Start a Conversation" },
    secondary: { href: "/capabilities", label: "Explore Our Solutions" },
  },
} as const;
