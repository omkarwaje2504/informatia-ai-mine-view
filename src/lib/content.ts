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
  eyebrow: "Brand Strategy · Creative · Digital · AI",
  headingLines: [
    { text: "We build brands.", tone: "mist" },
    { text: "We build what's next.", tone: "gold" },
  ],
  centeredHeading: "What starts as an idea can become an experience.",
  body: [
    "From a brand idea to the people it needs to reach, we connect strategy, creativity and technology across every touchpoint.",
  ],
  flow: ["Idea", "Brand", "Experience", "Intelligence"],
  ctas: {
    primary: { href: "/contact", label: "Book a Meeting" },
    secondary: { href: "/#work", label: "Explore Our Work" },
  },
} as const;

/**
 * Four capabilities — surface as a row of cards that overlap the Scene 2
 * panel's bottom edge and rise in with staggered parallax on scroll.
 */
export const capabilities = [
  { n: "01", title: "Brand Strategy", detail: "Find the idea worth remembering." },
  { n: "02", title: "Campaigns & Creative", detail: "Turn the idea into a distinctive identity." },
  { n: "03", title: "Digital Engagement", detail: "Extend the brand into living experiences." },
  { n: "04", title: "AI Solutions", detail: "Make those experiences smarter and personal." },
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
  heading: "We've built our expertise by serving regulated enterprises.",
  sub: "Trusted where compliance, scale and measurable outcomes aren't optional.",
  note: "Discover why 60+ enterprises partner with Informatia AI.",
  ctas: {
    primary: { href: "/contact", label: "Start a Conversation" },
    secondary: { href: "/contact", label: "Request a Consultation" },
  },
  sectors: [
    {
      id: "healthcare",
      tab: "Healthcare & Life Sciences",
      title: "Healthcare & Life Sciences",
      points: [
        "Patient & HCP engagement platforms (PixPro, RxPad, Enkare, HScore, AI Doctor Avatar)",
        "Field force & commercial analytics tools (RxPert, Prace, Funzo)",
        "Clinician-first EHR/EMR design and compliant digital architectures",
      ],
    },
    {
      id: "bfsi",
      tab: "Banking & Financial Services",
      title: "Banking & Financial Services (BFSI)",
      points: [
        "Digital banking portals, FinTech platform engineering, and cloud-ready architectures",
        "AI-driven process automation and intelligent document/data processing",
        "Real-time risk scoring, predictive intelligence dashboards, and compliance-ready systems",
      ],
    },
    {
      id: "enterprise",
      tab: "Enterprises & Corporates",
      title: "Enterprises & Corporates",
      points: [
        "Legacy system re-architecting, API-first development, and cloud modernization",
        "Task orchestration, AI assistants, and enterprise workflow integration",
        "Unified leadership dashboards, data governance, and employee experience portals",
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
  eyebrow: "Orchestration",
  heading: "Where work gets coordinated",
  body: "Coordinate work across AI, people and systems — keeping every process moving with visibility, durability and control.",
  cta: { href: "/contact", label: "Explore business orchestration" },
  points: [
    {
      title: "One process, end to end",
      detail:
        "A workflow runs as one governed case, with every stage and handoff on a single canvas.",
    },
    {
      title: "Durable by design",
      detail:
        "Processes pause for documents and approvals, then resume exactly where they left off. No state lost.",
    },
    {
      title: "Exceptions, handled",
      detail:
        "Low-confidence decisions route to people automatically, with full context attached.",
    },
    {
      title: "Outcomes you can measure",
      detail:
        "Every run produces one traceable result, start to finish.",
    },
  ],
  nodes: [
    { title: "Application intake", stage: "Stage 01", badge: "Routed", x: 2, y: 4 },
    { title: "Credit & identity", stage: "Stage 02", badge: "Verified", x: 54, y: 4 },
    { title: "Underwriting decision", stage: "Stage 03", badge: "Approved", x: 2, y: 40 },
    { title: "Exception", stage: "Low confidence", badge: "Overridden", x: 54, y: 40 },
    { title: "Funding & closing", stage: "Stage 04", badge: "Funded", x: 2, y: 76 },
  ],
} as const;

/**
 * The "Understand → Design → Build → Optimize" delivery model — rendered as
 * the four-step approach section.
 */
export const approach = {
  eyebrow: "Our Delivery Approach",
  heading: "A structured path to measurable outcomes.",
  intro:
    "A clear, structured model that keeps delivery aligned, transparent and measurable.",
  steps: [
    { n: "01", title: "Understand", detail: "Clarify core business objectives, user needs, and regulatory constraints." },
    { n: "02", title: "Design", detail: "Define technical solution architecture, experience strategy, and execution roadmaps." },
    { n: "03", title: "Build", detail: "Execute rapid development with speed, enterprise scalability, and quality precision." },
    { n: "04", title: "Optimize", detail: "Measure live performance metrics, refine systems, and scale total impact." },
  ],
} as const;

/**
 * Closing section — client logos, the partner CTA and the proof stats merged
 * into one block. Client logos live in public/clients/ (from saiashirwad.com).
 */
export const impact = {
  eyebrow: "Partner with us",
  bandLabel: "Trusted by leading pharma, healthcare & retail brands",
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
    { lead: "Exploring", highlight: "AI adoption" },
    { lead: "Modernizing", highlight: "digital platforms" },
    { lead: "Scaling", highlight: "engagement" },
  ],
  body: "Partner with our leadership and engineering teams to transform technology into measurable outcomes.",
  leadership:
    "Founded and led by CEO Rohan Sakhale, bringing deep cross-industry digital-transformation expertise.",
  ctas: {
    primary: { href: "/contact", label: "Start a Conversation" },
    secondary: { href: "/contact", label: "Request a Consultation" },
  },
} as const;
