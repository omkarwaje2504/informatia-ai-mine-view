export type IndustryItem = { name: string; description: string };

export type IndustrySection = {
  id: string;
  number: string;
  title: string;
  /** short punchy line (used by banking levers) */
  tagline?: string;
  description: string;
  /** solution cards inside the section (pharma). Omit for a single feature card. */
  items?: IndustryItem[];
};

export type Industry = {
  slug: string;
  name: string;
  icon: "pharma" | "banking";
  /** short text for the card on the listing page */
  summary: string;
  headline: string;
  paragraphs: string[];
  image:string;
  badges?: string[];
  sectionsHeading: string;
  sections: IndustrySection[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "pharma",
    name: "Pharma",
    icon: "pharma",
    summary:
      "Digital solutions mapped to your brand funnel, from awareness to long-term adherence, built for regulated environments.",
    headline: "Bridging Science, Strategy, and Scale",
    paragraphs: [
      "In the highly regulated pharmaceutical landscape, standard marketing does not cut it. Our approach begins with strategic alignment: we meticulously study your brand's specific funnel and customize our digital tech solutions based on your exact commercial lever, whether your goal is driving Awareness, Presentation, accelerating Diagnosis, initiating therapy Brand Choice, or maximizing long-term Adherence.",
      "Backed by enterprise-grade security and strict compliance—including HIPAA, GDPR, and DPDP Act certifications, we help you build deep trust, empower your field force, and drive measurable health outcomes.",
    ],
    image:"/industries/pharma.png",
    // badges: ["HIPAA", "GDPR", "DPDP Act"],
    sectionsHeading: "Solutions across the brand funnel",
    sections: [
      {
        id: "awareness",
        number: "01",
        title: "Awareness",
        description:
          "Our tailored solutions help brands reach the right audience through meaningful content, digital engagement and high-impact campaigns.",
        items: [
          {
            name: "AI Avatar",
            description:
              "Creates AI-powered doctor-led videos for patient and disease education. Makes complex information easier to communicate through engaging digital content.",
          },
          {
            name: "Patient Education Videos",
            description:
              "Explains diseases, treatment options and patient care through simple videos. Content can be tailored to different therapies and languages.",
          },
          {
            name: "QR Tools",
            description:
              "Connect printed materials to digital information through a simple scan. Give patients and doctors quick access to relevant educational content.",
          },
          {
            name: "BigViz",
            description:
              "Builds brand visibility through cinema and large-screen campaigns. Helps deliver awareness messages to a wider audience.",
          },
          {
            name: "WhatsApp",
            description:
              "Delivers awareness content directly through a familiar communication channel. Supports timely and personalized audience engagement.",
          },
          {
            name: "ORM",
            description:
              "Helps doctors and clinics strengthen their online presence. Makes it easier for patients to discover services and share feedback.",
          },
        ],
      },
      {
        id: "presence-engagement",
        number: "02",
        title: "Presence and Engagement",
        description:
          "Create a stronger clinic presence and a more engaging patient experience. These solutions help doctors present their expertise, services and clinic environment through digital and physical touchpoints.",
        items: [
          {
            name: "Webie",
            description:
              "Creates personalized websites for doctors and clinics. Brings practice information, services and digital presence together in one place.",
          },
          {
            name: "Insta360",
            description:
              "Offers an interactive view of the clinic environment. Helps patients explore the practice digitally before their visit.",
          },
          {
            name: "Enkare",
            description:
              "Supports digital engagement within the clinic experience. Helps connect patients with relevant information and services.",
          },
          {
            name: "Google Reviews",
            description:
              "Uses QR-enabled tools to simplify patient feedback collection. Helps clinics build and manage their online reputation.",
          },
          {
            name: "Clinic Inputs",
            description:
              "Provides customized materials for use within the clinic. Reinforces key information at relevant patient touchpoints.",
          },
          {
            name: "OPD Camps",
            description:
              "Brings patient awareness and engagement activities into the clinic. Creates opportunities for education and doctor–patient interaction.",
          },
        ],
      },
      {
        id: "diagnosis",
        number: "03",
        title: "Diagnosis",
        description:
          "Support early assessment and more informed clinical conversations. Our digital tools help organize patient information and present assessment results for doctor evaluation.",
        items: [
          {
            name: "HScore",
            description:
              "Offers digital health-risk assessments across multiple therapy areas. Generates results that doctors can use to guide further evaluation.",
          },
          {
            name: "Cardio App",
            description:
              "Supports cardiology-focused patient assessment and engagement. Brings relevant information into a structured digital experience.",
          },
          {
            name: "KAMPET",
            description:
              "Supports patient assessment and engagement through a dedicated digital tool. Helps organize information for review and follow-up.",
          },
          {
            name: "Thermal Reports",
            description:
              "Presents assessment findings in an easy-to-review visual format. Supports clearer communication during clinical evaluation.",
          },
          {
            name: "Nexus Ring",
            description:
              "Adds a connected digital touchpoint to patient engagement. Can support assessment-related interactions and follow-up.",
          },
          {
            name: "Enkare",
            description:
              "Connects clinic engagement with assessment-related interactions. Helps maintain continuity as patients move through their care journey.",
          },
        ],
      },
      {
        id: "therapy-brand-choice",
        number: "04",
        title: "Therapy / Brand Choice",
        description:
          "Make brand communication relevant and memorable at the point of prescription. These solutions support HCP engagement through personalized content, interactive experiences and practical brand tools.",
        items: [
          {
            name: "RxPad",
            description:
              "Creates branded prescription pads for use during consultations. Keeps brand communication present at a key clinical touchpoint.",
          },
          {
            name: "Prace",
            description:
              "Provides a digital platform for HCP engagement. Makes relevant professional and brand content easier to access.",
          },
          {
            name: "RxPert",
            description:
              "Turns prescription and brand-performance data into useful insights. Supports more informed marketing and field-force decisions.",
          },
          {
            name: "Funzo",
            description:
              "Uses interactive games to engage doctors and field teams. Makes learning and brand interactions more participative.",
          },
          {
            name: "PixPro",
            description:
              "Creates personalized print and digital communication assets. Helps tailor brand engagement to individual doctors.",
          },
          {
            name: "Personalized Assets",
            description:
              "Delivers customized materials for specific HCPs and engagement needs. Makes brand communication more relevant at each interaction.",
          },
        ],
      },
      {
        id: "adherence",
        number: "05",
        title: "Adherence",
        description:
          "Keep patients informed and supported throughout their treatment journey. Our solutions connect education, reminders and follow-up touchpoints to support treatment continuity.",
        items: [
          {
            name: "Adherence App",
            description:
              "Provides a digital channel for treatment-related patient support. Helps organize engagement and follow-up during therapy.",
          },
          {
            name: "WhatsApp",
            description:
              "Delivers treatment information and timely patient communication. Can support reminders and follow-up as part of an approved care programme.",
          },
          {
            name: "QR Tools",
            description:
              "Connects patients to therapy information through a quick scan. Keeps educational and support resources easy to access.",
          },
          {
            name: "Patient Education",
            description:
              "Explains prescribed therapy and practical care instructions in simple language. Helps patients better understand their treatment journey.",
          },
          {
            name: "Nexus Ring",
            description:
              "Provides a connected touchpoint for ongoing patient engagement. May support follow-up within a broader patient-support programme.",
          },
          {
            name: "Cardio App",
            description:
              "Extends cardiology-focused digital engagement beyond initial assessment. Can provide a channel for ongoing information and follow-up.",
          },
        ],
      },
    ],
  },
//   {
//     slug: "banking-enterprise",
//     name: "Banking & Enterprise",
//     icon: "banking",
//     summary:
//       "Scalable digital platforms, AI-powered automation and actionable insights for banks, FinTechs and enterprises.",
//     headline: "Smarter Digital Experiences. Faster Business Execution.",
//     paragraphs: [
//       "We help banks, FinTechs and enterprises solve business challenges through scalable digital platforms, AI-powered automation and actionable insights.",
//     ],
// image:"/industries/pharma.png",
//     sectionsHeading: "Our 3 Strategic Levers",
//     sections: [
//       {
//         id: "digital-experience",
//         number: "01",
//         title: "Digital Experience",
//         tagline: "Connect better. Engage smarter.",
//         description:
//           "Build intuitive web and mobile platforms that simplify customer interactions. Create seamless digital journeys through UX/UI design and personalized engagement.",
//       },
//       {
//         id: "intelligent-automation",
//         number: "02",
//         title: "Intelligent Automation",
//         tagline: "Simplify workflows. Accelerate execution.",
//         description:
//           "Use AI and process automation to reduce repetitive work and streamline operations. Connect teams and business processes for faster, more efficient execution.",
//       },
//       {
//         id: "data-enterprise-intelligence",
//         number: "03",
//         title: "Data & Enterprise Intelligence",
//         tagline: "Connect data. Enable smarter decisions.",
//         description:
//           "Bring business information together through enterprise applications, integrations and dashboards. Turn data into actionable insights that support performance and growth.",
//       },
//     ],
//   },
];

export const getIndustry = (slug: string) =>
  INDUSTRIES.find((i) => i.slug === slug);

/** Product shots in /public/products, keyed by solution name. */
const SOLUTION_IMAGES: Record<string, string> = {
  "AI Avatar": "/products/ai-avatar.png",
  "Patient Education Videos": "/products/patient-education-videos.png",
  "Patient Education": "/products/patient-education-videos.png",
  "QR Tools": "/products/qr.png",
  BigViz: "/products/bigviz.png",
  WhatsApp: "/products/whatsapp.png",
  ORM: "/products/orm.png",
  Webie: "/products/webie.png",
  Insta360: "/products/insta-360.png",
  Enkare: "/products/enkare.png",
  "Google Reviews": "/products/google-review.png",
  HScore: "/products/hscore.png",
  "Cardio App": "/products/cardio-app.png",
  KAMPET: "/products/kampet.png",
  "Nexus Ring": "/products/nexus-ring.png",
  RxPad: "/products/rxpad.png",
  Prace: "/products/prace.png",
  RxPert: "/products/rxpert.png",
  Funzo: "/products/funzo.png",
  PixPro: "/products/pixpro.png",
  "Personalized Assets": "/products/brand-assets.png",
  "Adherence App": "/products/adherence-solutions.png",
};

export const solutionImage = (name: string): string | undefined =>
  SOLUTION_IMAGES[name];