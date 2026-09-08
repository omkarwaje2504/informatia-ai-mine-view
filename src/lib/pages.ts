/**
 * Content for the sub-pages — About, Capabilities, Careers, Connect and the
 * three industry pages. Copy is taken from the client-supplied page docs.
 */

export const aboutPage = {
  eyebrow: "About Informatia AI",
  heading: "Strategy-led. AI-powered. Execution-focused.",
  intro:
    "Informatia AI is a digital and AI solutions company that brings together strategy, technology and execution to solve real business challenges and create measurable impact.",
  heritage: {
    eyebrow: "Our Heritage",
    heading: "Proven experience. Built for what's next.",
    body: "Evolving from Sai Ashirwad Informatia's technology foundation established in 2014, Informatia AI combines proven digital execution with an AI-first approach to building future-ready solutions.",
  },
  beliefs: {
    eyebrow: "What We Believe",
    items: [
      {
        title: "Strategy before technology",
        detail: "Start with the business objective.",
      },
      {
        title: "AI with purpose",
        detail: "Apply intelligence where it creates real value.",
      },
      {
        title: "Built to scale",
        detail: "Design practical, adaptable digital solutions.",
      },
      {
        title: "Execution matters",
        detail: "Turn ideas into solutions that work.",
      },
    ],
  },
  leadership: {
    eyebrow: "Leadership",
    name: "Rohan Sakhale",
    role: "Founder & CEO",
    photo: "/team/rohan-sakhale.jpg",
    bio: "Rohan Sakhale founded Informatia AI with a vision to turn emerging technology into practical solutions that create measurable business impact. With over a decade of technology and business leadership experience, he leads the company at the intersection of strategy, technology and execution.",
    quote:
      "We don't start with technology. We start with the outcome the business needs — then build the shortest path to it.",
    credentials: [
      "16+ years in technology and business leadership",
      "Built on the foundation of Sai Ashirwad Informatia",
    ],
    note: "This belief shapes every engagement we take on.",
  },
  team: {
    eyebrow: "Our Team",
    body: "A multidisciplinary team of strategists, developers, designers and technology specialists focused on turning complex requirements into intuitive digital solutions.",
    departments: [
      {
        name: "Sales",
        members: [
          { name: "Annil Lad", role: "Head" },
          { name: "Prasad", role: "Lead" },
          // { name: "Krish", role: "Executive" },
          // { name: "Tanmay", role: "Executive" },
        ],
      },
      {
        name: "IT",
        members: [
          { name: "Omkar", role: "Tech Head" },
          { name: "Wasim", role: "Backend / App Lead" },
          // { name: "Vedant", role: "Frontend Lead" },
          // { name: "Deepak", role: "App Developer" },
          // { name: "Gaurav", role: "Backend Developer" },
          // { name: "Ashwin", role: "Frontend Developer" },
        ],
      },
      {
        name: "Graphics",
        members: [
          { name: "Sanjib", role: "Lead" },
          { name: "Pooja", role: "Designer" },
          // { name: "Vaishnavi", role: "Designer" },
          // { name: "Mithili", role: "Designer" },
          // { name: "Shruti", role: "Designer" },
        ],
      },
      {
        name: "Video",
        members: [
          { name: "Akash Mashke", role: "" },
          { name: "Akash Sakpal", role: "" },
          // { name: "Pratik", role: "" },
          // { name: "Aniket", role: "" },
        ],
      },
      {
        name: "Sales Service",
        members: [
          { name: "Kamlesh", role: "Service Head" },
          { name: "Virgin", role: "Client Service" },
          // { name: "Akansha", role: "Client Service" },
          // { name: "Subhodh", role: "Client Service" },
        ],
      },
      {
        name: "Product",
        members: [
          { name: "Sushant", role: "Product Manager" },
          { name: "Tina", role: "Product Management" },
        ],
      },
      {
        name: "Content",
        members: [{ name: "Manjiri", role: "Content Writer" }],
      },
      {
        name: "Production",
        members: [{ name: "Ram Chandra", role: "Production" }],
      },
      {
        name: "Accounts",
        members: [
          { name: "Akansha Raut", role: "Accounts" },
          { name: "Swati", role: "Accounts" },
        ],
      },
    ],
  },
  cta: { href: "/connect", label: "Start a Conversation" },
} as const;

export const capabilitiesPage = {
  eyebrow: "Our Capabilities",
  heading: "From strategy to execution.",
  intro:
    "We combine AI, digital technology, experience and execution to build practical solutions around real business needs.",
  tracks: [
    {
      n: "01",
      title: "AI Strategy & Enablement",
      headline: "Turn AI ambition into action.",
      detail:
        "Identify the right AI opportunities and create a practical path from idea to adoption.",
      tags: ["Strategy", "Feasibility", "AI Roadmaps", "Governance"],
    },
    {
      n: "02",
      title: "Digital Platforms & Experiences",
      headline: "Build for performance. Design for people.",
      detail:
        "Create scalable digital platforms and intuitive experiences that connect businesses with their users.",
      tags: [
        "Enterprise Applications",
        "Web & Mobile",
        "UX/UI",
        "Digital Platforms",
      ],
    },
    {
      n: "03",
      title: "AI & Intelligent Automation",
      headline: "Put intelligence to work.",
      detail:
        "Apply AI and automation to simplify workflows, reduce repetitive effort and support smarter execution.",
      tags: [
        "Generative AI",
        "Workflow Automation",
        "AI-Assisted Tools",
        "Process Optimization",
      ],
    },
    {
      n: "04",
      title: "Digital Engagement",
      headline: "Connect every touchpoint.",
      detail:
        "Build connected digital journeys that bring audiences, campaigns, content and technology together.",
      tags: [
        "Omnichannel Engagement",
        "Campaign Enablement",
        "QR Solutions",
        "Engagement Analytics",
      ],
    },
    {
      n: "05",
      title: "Data & Insights",
      headline: "Turn activity into actionable intelligence.",
      detail:
        "Transform digital and engagement data into clearer visibility for better decisions and continuous improvement.",
      tags: ["Dashboards", "Analytics", "Reporting", "Optimization"],
    },
  ],
  close: {
    heading: "One partner. From idea to impact.",
    flow: ["Understand", "Design", "Build", "Optimize"],
    body: "Whether you're exploring AI, building a digital platform or creating a connected engagement ecosystem, we help take the requirement from strategy to execution.",
  },
  ctas: {
    primary: { href: "/connect", label: "Start a Conversation" },
    secondary: { href: "/#industries", label: "Explore Industries" },
  },
} as const;

export const careersPage = {
  eyebrow: "Grow With Us",
  heading: "Build what's next with us.",
  intro:
    "Join a multidisciplinary team working across digital technology, enterprise solutions and practical AI innovation.",
  reasonsLabel: "Why Informatia AI?",
  reasons: [
    {
      title: "Meaningful work",
      detail: "Solve real business challenges through technology.",
    },
    {
      title: "Modern technology",
      detail:
        "Work across digital platforms, AI and contemporary technology stacks.",
    },
    {
      title: "Learn across disciplines",
      detail:
        "Gain exposure across strategy, design, technology and execution.",
    },
    {
      title: "Agility + execution",
      detail:
        "Experience startup energy backed by enterprise delivery discipline.",
    },
  ],
  apply: {
    heading: "Explore opportunities",
    body: "Ready to build what's next with us? Send your resume to careers@informatia.ai.",
    email: "careers@informatia.ai",
    cta: "Apply Now",
  },
} as const;

export const connectPage = {
  eyebrow: "Connect With Us",
  heading: "Let's build the future.",
  intro:
    "Whether you're solving a business challenge or looking to build your career with us, start the conversation with Informatia AI.",
  challenge: {
    heading: "Have a challenge? Let's define the solution.",
    body: "From AI and digital platforms to engagement and automation, we help organizations move from requirement to execution.",
  },
  proof: "60+ clients · 350+ projects",
  formNote: "Tell us about your requirement.",
} as const;

type Pillar = {
  title: string;
  detail: string;
  tags: readonly string[];
};

export type IndustryPage = {
  slug: string;
  name: string;
  heading: string;
  intro: string;
  lever: { label: string; body: string; flow: readonly string[] };
  pillarsLabel: string;
  pillars: readonly Pillar[];
  delivery: { label: string; flow: readonly string[]; body: string };
  close: string;
  cta: { href: string; label: string };
};

export const industryPages: Record<string, IndustryPage> = {
  "healthcare-pharma": {
    slug: "healthcare-pharma",
    name: "Healthcare & Pharma",
    heading: "Turn healthcare engagement into connected execution.",
    intro:
      "Informatia AI helps healthcare and pharma organizations connect brands with HCPs and patients, equip field teams with smarter digital tools, and bring engagement and execution together through technology and insight.",
    lever: {
      label: "One strategic lever. Built around the patient journey.",
      body: "Every program starts by identifying where greater impact is needed — then we shape the right combination of engagement, technology and field enablement around that priority.",
      flow: ["Awareness", "Diagnosis", "Treatment", "Adherence"],
    },
    pillarsLabel: "Three connected pillars",
    pillars: [
      {
        title: "Patient-first digital solutions",
        detail:
          "Create more meaningful patient touchpoints that support awareness, education and continued engagement.",
        tags: [
          "Health Assessments",
          "Patient Kiosks",
          "AI Doctor Avatar",
          "QR Journeys",
          "Localized Content",
        ],
      },
      {
        title: "HCP engagement",
        detail:
          "Help brands and field teams engage HCPs through useful, relevant digital experiences that extend beyond the physical interaction.",
        tags: [
          "HCP Websites",
          "Reputation Management",
          "Virtual Clinic Experiences",
          "Review Tools",
          "Personalized Communication",
        ],
      },
      {
        title: "Field force & commercial excellence",
        detail:
          "Give field teams the tools, content and intelligence they need to engage better and execute with greater visibility.",
        tags: [
          "Field Analytics",
          "HCP Engagement Apps",
          "Gamified Learning",
          "Dashboards & Tracking",
        ],
      },
    ],
    delivery: {
      label: "From conception to execution",
      flow: ["Strategize", "Create", "Build", "Deploy"],
      body: "We bring the campaign journey together — from the initial idea and audience experience to the technology, field rollout and ongoing visibility.",
    },
    close: "One partner. One connected healthcare journey.",
    cta: { href: "/connect", label: "Discuss Your Requirement" },
  },
  "banking-financial-institutions": {
    slug: "banking-financial-institutions",
    name: "Banking & Financial Institutions",
    heading: "Smarter digital experiences. Faster business execution.",
    intro:
      "Informatia AI helps banks, NBFCs, FinTechs and financial institutions create stronger customer connections, equip business teams with intelligent digital tools, and bring workflows and insights together for faster execution.",
    lever: {
      label: "Strategic lever: execution speed",
      body: "Turn customer needs and business requirements into digital experiences, streamlined workflows and clearer decisions — without adding unnecessary complexity.",
      flow: ["Understand", "Design", "Build", "Optimize"],
    },
    pillarsLabel: "How we enable it",
    pillars: [
      {
        title: "Create better customer connections",
        detail:
          "Build intuitive digital platforms that make interactions simpler, more consistent and easier to scale.",
        tags: [
          "Digital Platforms",
          "Web & Mobile",
          "UX/UI",
          "Enterprise Applications",
        ],
      },
      {
        title: "Enable teams to work smarter",
        detail:
          "Use AI and automation to reduce repetitive effort and support faster day-to-day execution.",
        tags: [
          "AI Workflows",
          "Process Automation",
          "Intelligent Data Processing",
          "Business Tools",
        ],
      },
      {
        title: "Bring workflows & insights together",
        detail:
          "Connect business information, operational activity and reporting so teams have a clearer view of what is happening and what needs attention.",
        tags: [
          "Dashboards",
          "Analytics",
          "Reporting",
          "Enterprise Integrations",
        ],
      },
    ],
    delivery: {
      label: "From requirement to execution",
      flow: ["Understand", "Design", "Build", "Optimize"],
      body: "We translate business requirements into practical digital solutions designed for dependable, enterprise-scale use.",
    },
    close: "Build for a faster-moving financial world.",
    cta: { href: "/connect", label: "Discuss Your Requirement" },
  },
  "enterprises-corporates": {
    slug: "enterprises-corporates",
    name: "Enterprises & Corporates",
    heading: "Connect. Automate. Scale.",
    intro:
      "Informatia AI helps enterprises connect customers, teams and business systems, equip people with smarter digital tools, and bring workflows and insights together for more coordinated execution.",
    lever: {
      label: "Strategic lever: operational efficiency at scale",
      body: "When systems, teams and processes operate in isolation, execution slows down. We help bring them together through modern platforms, intelligent automation and clearer business visibility.",
      flow: ["Understand", "Design", "Build", "Optimize"],
    },
    pillarsLabel: "How we enable it",
    pillars: [
      {
        title: "Connect people, platforms & processes",
        detail:
          "Create modern digital environments that make it easier for customers, employees and stakeholders to interact with the business.",
        tags: [
          "Enterprise Applications",
          "Web & Mobile",
          "Digital Workspaces",
          "Integrations",
        ],
      },
      {
        title: "Give teams better tools",
        detail:
          "Use AI and automation to simplify repetitive work and help people move through everyday processes more efficiently.",
        tags: [
          "AI Assistants",
          "Workflow Automation",
          "Task Automation",
          "Intelligent Tools",
        ],
      },
      {
        title: "Bring execution into one view",
        detail:
          "Connect workflows, activity and business information so teams and leadership can operate with greater visibility and coordination.",
        tags: [
          "Enterprise Dashboards",
          "Analytics",
          "Reporting",
          "Workflow Integration",
        ],
      },
    ],
    delivery: {
      label: "From strategy to execution",
      flow: ["Understand", "Design", "Build", "Optimize"],
      body: "From platform modernization to AI-enabled workflows, we build practical digital solutions around the way the organization actually needs to operate.",
    },
    close: "Modernize today. Build for what's next.",
    cta: { href: "/connect", label: "Talk to Our Team" },
  },
};
