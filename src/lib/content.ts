/**
 * Homepage hero content — adapted from informatia.ai.
 * Informatia AI: a digital + AI solutions company delivering measurable
 * business outcomes across strategy, execution and optimization.
 */

export const promo = {
  eyebrow: "60+ global clients · 350+ successful deliveries",
  text: "Digital, AI and engagement solutions built on the technology-led foundation of Sai Ashirwad.",
};

export const sceneOne = {
  heading:
    "Connecting businesses. Empowering sales. Accelerating growth.",
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
    detail: "Practical AI and automation built around business needs.",
  },
  {
    n: "02",
    title: "Digital Platforms",
    detail: "Scalable web, mobile and enterprise applications.",
  },
  {
    n: "03",
    title: "Digital Engagement",
    detail: "Technology-led experiences that connect brands, teams and audiences.",
  },
  {
    n: "04",
    title: "Data & Insights",
    detail: "Dashboards and intelligence that turn activity into actionable visibility.",
  },
] as const;

/**
 * Product network — a free-floating web of platforms we've built. `x`/`y` are
 * percentages (0–100) placing each node on the canvas; connections between
 * nearby nodes are computed automatically, so adding a product just means
 * adding a row here with a rough position.
 */
// export const productNetwork = {
//   eyebrow: "The Product Network",
//   heading: "One connected system of ways to engage.",
//   intro:
//     "Every product runs on the same thinking — brand, creativity, digital and AI — so patients, doctors and field teams meet your brand wherever they are.",
//   products: [
//     { name: "EGreet", blurb: "Personalised digital greetings that keep a brand present on the moments that matter.", x: 13, y: 28 },
//     { name: "E-Poster", blurb: "Interactive digital posters for congresses, clinics and detailing.", x: 16, y: 54 },
//     { name: "Patient Education EVideo", blurb: "Short explainer films that make a condition and its therapy easy to follow.", x: 16, y: 82 },
//     { name: "Patient Education AI Video", blurb: "AI-generated, personalised education videos produced at campaign scale.", x: 44, y: 90 },
//     { name: "Hscore", blurb: "A guided health assessment that turns answers into a clear, shareable score.", x: 38, y: 24 },
//     { name: "Kampet", blurb: "A campaign activation kit that ships a full engagement journey fast.", x: 48, y: 64 },
//     { name: "SaiConnect", blurb: "The engagement hub linking field teams, doctors and patients in one thread.", x: 43, y: 11 },
//     { name: "NFC Card", blurb: "Tap-to-share smart cards that hand over brand and rep details instantly.", x: 77, y: 33 },
//     { name: "Caricature", blurb: "Personalised illustrated pieces that make HCP outreach memorable.", x: 84, y: 63 },
//     { name: "Frame", blurb: "Shareable branded photo frames for events and patient milestones.", x: 63, y: 87 },
//     { name: "Microwebsites", blurb: "Fast, focused campaign sites for a brand, a therapy or a moment.", x: 66, y: 13 },
//     { name: "AI Assistant", blurb: "A conversational assistant trained on your approved brand and medical content.", x: 89, y: 13 },
//     { name: "Voice AI", blurb: "Voice-led experiences for hands-free patient and HCP interactions.", x: 68, y: 48 },
//     { name: "Medical Info Bot", blurb: "On-demand medical information answers, compliant and always available.", x: 40, y: 45 },
//   ],
// } as const;

/**
 * Industries showcase — a sticky left rail + tabbed feature card, one per
 * sector. Product/tool names come straight from the delivery portfolio.
 */
export const industries = {
  eyebrow: "Industries We Serve",
  heading: "Built for the industries we know best.",
  sub: "From the business objective to the final audience, we bring strategy, technology and execution together.",
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
        "Patient-first digital solutions — health assessments, kiosks, AI Doctor Avatar and QR journeys.",
        "HCP engagement — websites, virtual clinic experiences and personalized communication.",
        "Field force and commercial excellence — field analytics, engagement apps and dashboards.",
      ],
    },
    {
      id: "bfsi",
      tab: "Banking & Financial Institutions",
      title: "Banking & Financial Institutions",
      href: "/industries/banking-financial-institutions",
      points: [
        "Better customer connections — digital platforms, web and mobile, enterprise applications.",
        "Teams that work smarter — AI workflows, process automation and intelligent data processing.",
        "Workflows and insights together — dashboards, analytics, reporting and integrations.",
      ],
    },
    {
      id: "enterprise",
      tab: "Enterprises & Corporates",
      title: "Enterprises & Corporates",
      href: "/industries/enterprises-corporates",
      points: [
        "Connect people, platforms and processes — enterprise apps, digital workspaces and integrations.",
        "Better tools for teams — AI assistants, workflow automation and task automation.",
        "Execution in one view — enterprise dashboards, analytics and workflow integration.",
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
  eyebrow: "Core Capabilities & Engagement Tracks",
  heading: "Five tracks, from strategy to measurable impact.",
  sub: "Engage us at any point — framing an AI strategy, modernizing a platform, or optimizing systems already in production.",
  tracks: [
    {
      n: "01",
      title: "AI Strategy & Enablement",
      focus:
        "Business-goal alignment, practicality & feasibility assessment, adoption roadmaps, and AI governance frameworks.",
      impact:
        "Minimizes technology risk, prioritizes high-value use cases, and operationalizes AI responsibly.",
    },
    {
      n: "02",
      title: "Digital Experience & Platform Engineering",
      focus:
        "Scalable system architectures, enterprise portals and apps, intuitive UX/UI design, and high-performance digital front ends.",
      impact:
        "Replaces legacy friction, accelerates digital modernization, and scales engagement.",
    },
    {
      n: "03",
      title: "Generative AI & Intelligent Automation",
      focus:
        "Custom generative-AI solutions, workflow automation, AI-assisted decision support, and process optimization.",
      impact:
        "Improves operational speed, reduces cycle times, and enhances decision-making accuracy.",
    },
    {
      n: "04",
      title: "Omnichannel Engagement & MarTech",
      focus:
        "Integrated campaign enablement, QR & digital touchpoint tools, and central engagement-analytics hubs.",
      impact:
        "Connects fragmented touchpoints to drive measurable audience engagement across channels.",
    },
    {
      n: "05",
      title: "Data, Insights & Optimization",
      focus:
        "Raw-data-to-action frameworks (Chaos → Clarity → Action), executive dashboards, and reporting models.",
      impact:
        "Transforms raw data into real-time operational insights for continuous business performance.",
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
    { title: "Insights", stage: "In one view", badge: "Measured", x: 54, y: 40 },
    { title: "Growth", stage: "Stage 04", badge: "Delivered", x: 2, y: 76 },
  ],
} as const;

/**
 * The "Understand → Design → Build → Optimize" delivery model — rendered as
 * the four-step approach section.
 */
export const approach = {
  eyebrow: "How We Deliver",
  heading: "From the business objective to the final audience.",
  intro:
    "We bring strategy, technology and execution together — a clear, structured model that keeps delivery aligned and measurable.",
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
      detail:
        "Deploy, measure live performance and scale the total impact.",
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
    { value: "60+", label: "Global clients partnered" },
    { value: "350+", label: "Successful deliveries" },
    { value: "98%", label: "Client retention rate" },
  ],
  questions: [
    { lead: "Stronger", highlight: "customer engagement" },
    { lead: "A more empowered", highlight: "sales force" },
    { lead: "Unified", highlight: "digital execution" },
  ],
  heading: "Let's build the connection that drives growth.",
  body: "Whether the goal is stronger customer engagement, a more empowered sales force or unified digital execution, Informatia AI can take it from strategy to deployment.",
  leadership:
    "Rohan Sakhale founded Informatia AI with a vision to turn emerging technology into practical solutions that create measurable business impact. Drawing on extensive digital-transformation experience across industries, he leads the company at the intersection of strategy, technology and execution.",
  ctas: {
    primary: { href: "/connect", label: "Start a Conversation" },
    secondary: { href: "/capabilities", label: "Explore Our Solutions" },
  },
} as const;
