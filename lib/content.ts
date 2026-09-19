export type Project = {
  name: string;
  tag: string;
  blurb: string;
  color: string;
  dark: boolean;
  image: string;
  year?: string;
  link?: string;
  stack?: string[];
  deliverables?: string[];
};

export const projects: Project[] = [
  {
    name: "Framify Digital Marketing",
    tag: "Digital growth agency",
    blurb: "A high-conversion, dynamic marketing agency website built to showcase paid acquisition, creative campaigns, and brand scaling systems.",
    color: "#0f172a",
    dark: true,
    image: "/images/works/framify.png",
    year: "2026",
    link: "https://framifydigital.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    deliverables: ["Agency Landing Page", "Case Study Framework", "Lead Capture Funnel"],
  },
  {
    name: "Sharingan Collectibles",
    tag: "Anime & art toys retail",
    blurb: "A premium, dark-mode hype-drop storefront for anime figures, vinyl art toys, and limited runs with interactive catalog loading.",
    color: "#18141f",
    dark: true,
    image: "/images/works/sharingan.png",
    year: "2026",
    link: "https://protoplae-collectibles.vercel.app/",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Framer Motion"],
    deliverables: ["Hype-Drop Engine", "E-Commerce Architecture", "Micro-Interactions"],
  },
  {
    name: "Dreams Event Management",
    tag: "Event production & decor",
    blurb: "An immersive brand experience and consultation scheduler built for grand wedding celebrations and corporate events across Kerala.",
    color: "#1a1622",
    dark: true,
    image: "/images/works/dreams-events.png",
    year: "2026",
    link: "https://dreams-events.vercel.app/",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Theme Switcher"],
    deliverables: ["Brand Identity", "Consultation Scheduler", "Event Showcase Gallery"],
  },
  {
    name: "Mind Art Designs",
    tag: "Architecture & modern homes",
    blurb: "A luxury modernist architectural showcase and spatial design portfolio highlighting curved concrete residences, lakeside villas, and bespoke interiors.",
    color: "#2a2622",
    dark: true,
    image: "/images/works/mindart.png",
    year: "2026",
    link: "https://mindart-designs.vercel.app/",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    deliverables: ["Spatial Showcase", "High-Resolution Gallery", "Editorial Layout"],
  },
  {
    name: "Zeus Tattoos",
    tag: "Tattoo & body art collective",
    blurb: "A luxury brand identity and premium user experience designed for Kottayam's premier body art collective with dynamic portfolio exploration.",
    color: "#141416",
    dark: true,
    image: "/images/works/zeus-tattoos.jpg",
    year: "2026",
    link: "https://zeus-tattoo.vercel.app/",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Lenis"],
    deliverables: ["Visual Hierarchy", "Artist Portfolio System", "Appointment Booking Flow"],
  },
];

export type Service = {
  number: string;
  title: string;
  description: string;
  points: string[];
  accentColor: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "High-Converting Landing Pages",
    description:
      "Crafting ultra-fast, visually striking landing pages with conversion-focused UX, persuasive storytelling, and cinematic micro-interactions.",
    points: ["Conversion Optimization", "Core Web Vitals 99+", "Figma to Code", "A/B Testing Ready"],
    accentColor: "var(--color-violet)",
  },
  {
    number: "02",
    title: "Custom Full-Stack Web Apps (MERN / Next.js)",
    description:
      "Engineering scalable, production-ready web platforms with modern full-stack architectures, secure authentication, real-time databases, and robust APIs.",
    points: ["Next.js & MERN Stack", "REST & GraphQL APIs", "PostgreSQL & MongoDB", "Cloud Deployment"],
    accentColor: "var(--color-sky)",
  },
  {
    number: "03",
    title: "E-Commerce Solutions (Shopify & Custom)",
    description:
      "Designing high-performing online storefronts with seamless checkout flows, custom Shopify themes, and bespoke headless commerce builds.",
    points: ["Shopify & Liquid", "Headless Commerce", "Stripe Integration", "Mobile-First UX"],
    accentColor: "var(--color-lilac)",
  },
  {
    number: "04",
    title: "Interactive & 3D Websites",
    description:
      "Creating immersive, award-winning digital experiences using WebGL, Three.js shaders, buttery-smooth GSAP scroll sequences, and interactive physics.",
    points: ["Three.js & WebGL", "GSAP ScrollTrigger", "Shader Effects", "Creative Interactions"],
    accentColor: "var(--color-violet)",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  accent: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ansu brought a cinematic level of polish to our site that completely changed how high-end clients perceive our brand. Fast, communicative, and insanely talented.",
    author: "Kiran R.",
    role: "Founder",
    company: "Studio Clay",
    accent: "var(--color-sky)",
  },
  {
    quote:
      "The motion design and speed Ansu built into our storefront resulted in an immediate jump in conversion. A rare developer who actually understands design.",
    author: "Arjun V.",
    role: "Product Lead",
    company: "Protoplae Retail",
    accent: "var(--color-violet)",
  },
  {
    quote:
      "Working with Ansu through Aethra was effortless. Delivered on time with spotless code quality and animations that look like an Awwwards showcase.",
    author: "Elena M.",
    role: "Creative Director",
    company: "Illumina Collective",
    accent: "var(--color-lilac)",
  },
];

export const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "GSAP",
  "Three.js",
  "Node.js",
  "Sanity CMS",
  "UI / UX",
  "Figma",
  "Branding",
];

export const socials = [
  { label: "GitHub", href: "https://github.com/thenameisanzu" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ansu-v-s-03913b34a",
  },
  { label: "Instagram", href: "https://instagram.com/________magician________" },
  {
    label: "WhatsApp",
    href: "https://wa.me/916282509301?text=Hi%20Ansu%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!",
  },
  { label: "Email", href: "mailto:ansuvs047@gmail.com" },
];

export type FAQ = {
  question: string;
  answer: string;
  category: string;
};

export const faqs: FAQ[] = [
  {
    category: "Timeline & Velocity",
    question: "How fast can we launch a project?",
    answer:
      "Most studio projects are completed within 2 to 4 weeks using focused sprint cycles. From initial Figma design direction to production Next.js deployment and testing, we move rapidly without bloated agency overhead.",
  },
  {
    category: "Scope & Deliverables",
    question: "What is included in a typical project scope?",
    answer:
      "Every build is end-to-end: bespoke UI/UX in Figma, responsive frontend engineering in Next.js & TypeScript, buttery-smooth GSAP/Framer animations, headless CMS integration if required, and 99+ Lighthouse speed & SEO optimization.",
  },
  {
    category: "Global Collaboration",
    question: "Do you collaborate with international clients?",
    answer:
      "Yes. I work with clients and startups globally across North America, Europe, the Middle East, and India. Communication is async-first via Slack, Loom, and structured weekly video milestones to ensure seamless timezone overlap.",
  },
  {
    category: "Pricing & Retainers",
    question: "How do payments and retainers work?",
    answer:
      "Engagements are structured either as milestone-based fixed-price project sprints (50% upfront / 50% upon deployment) or as dedicated monthly retainers through Aethra for continuous design and engineering support.",
  },
];

export const email = "ansuvs047@gmail.com";
export const calLink = "mailto:ansuvs047@gmail.com?subject=Project%20Inquiry%20—%2015-Min%20Intro%20Call";
export const phoneNumber = "+916282509301";
export const formattedPhoneNumber = "+91 62825 09301";
export const whatsappNumber = "+91 6282509301";
export const whatsappLink =
  "https://wa.me/916282509301?text=Hi%20Ansu%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!";

