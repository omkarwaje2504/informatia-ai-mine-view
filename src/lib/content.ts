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
 * Product network — a free-floating web of everything we build. `x`/`y` are
 * percentages (0–100) placing each node on the canvas; connections between
 * nearby nodes are computed automatically, so adding a product just means
 * adding a row here with a rough position.
 */
export const productNetwork = {
  eyebrow: "The Product Network",
  heading: "One connected system of ways to engage.",
  intro:
    "Every product runs on the same thinking — brand, creativity, digital and AI — so patients, doctors and field teams meet your brand wherever they are.",
  products: [
    { name: "EGreet", blurb: "Personalised digital greetings that keep a brand present on the moments that matter.", x: 13, y: 28 },
    { name: "E-Poster", blurb: "Interactive digital posters for congresses, clinics and detailing.", x: 16, y: 54 },
    { name: "Patient Education EVideo", blurb: "Short explainer films that make a condition and its therapy easy to follow.", x: 16, y: 82 },
    { name: "Patient Education AI Video", blurb: "AI-generated, personalised education videos produced at campaign scale.", x: 44, y: 90 },
    { name: "Hscore", blurb: "A guided health assessment that turns answers into a clear, shareable score.", x: 38, y: 24 },
    { name: "Kampet", blurb: "A campaign activation kit that ships a full engagement journey fast.", x: 48, y: 64 },
    { name: "SaiConnect", blurb: "The engagement hub linking field teams, doctors and patients in one thread.", x: 43, y: 11 },
    { name: "NFC Card", blurb: "Tap-to-share smart cards that hand over brand and rep details instantly.", x: 77, y: 33 },
    { name: "Caricature", blurb: "Personalised illustrated pieces that make HCP outreach memorable.", x: 84, y: 63 },
    { name: "Frame", blurb: "Shareable branded photo frames for events and patient milestones.", x: 63, y: 87 },
    { name: "Microwebsites", blurb: "Fast, focused campaign sites for a brand, a therapy or a moment.", x: 66, y: 13 },
    { name: "AI Assistant", blurb: "A conversational assistant trained on your approved brand and medical content.", x: 89, y: 13 },
    { name: "Voice AI", blurb: "Voice-led experiences for hands-free patient and HCP interactions.", x: 68, y: 48 },
    { name: "Medical Info Bot", blurb: "On-demand medical information answers, compliant and always available.", x: 40, y: 45 },
  ],
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
