export type Project = {
  name: string;
  tag: string;
  blurb: string;
  color: string;
  dark: boolean;
  year?: string;
  link?: string;
  stack?: string[];
  deliverables?: string[];
};

export const projects: Project[] = [
  {
    name: "Protoplae",
    tag: "Collectibles retail",
    blurb: "A hype-drop commerce site for a toy and collectibles store.",
    color: "var(--color-violet)",
    dark: true,
    year: "2025",
    link: "https://aethrasolutions.in",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Stripe"],
    deliverables: ["E-Commerce Architecture", "Hype Drop Flow", "Custom Micro-interactions"],
  },
  {
    name: "Thai Aquatics",
    tag: "Cinematic landing page",
    blurb: "A dark, luxury betta-fish showcase with water-ripple motion.",
    color: "var(--color-ink)",
    dark: true,
    year: "2025",
    link: "https://aethrasolutions.in",
    stack: ["Next.js", "GSAP", "Three.js", "Tailwind CSS"],
    deliverables: ["Art Direction", "Fluid Ripple Shader", "Sound & Motion Design"],
  },
  {
    name: "Tintinkss",
    tag: "Ceramics studio",
    blurb: "Handmade pottery, told through parallax and quiet motion.",
    color: "var(--color-lilac)",
    dark: false,
    year: "2024",
    link: "https://aethrasolutions.in",
    stack: ["React", "Tailwind CSS", "Framer Motion", "Sanity CMS"],
    deliverables: ["Brand Identity", "Editorial Typography", "Interactive Catalogue"],
  },
  {
    name: "Clay Art Café",
    tag: "Pottery & coffee",
    blurb: "An earthy, tactile site for a working pottery studio.",
    color: "var(--color-sky)",
    dark: false,
    year: "2024",
    link: "https://aethrasolutions.in",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Lenis"],
    deliverables: ["Workshop Booking", "Tactile UI Design", "Local SEO Optimization"],
  },
  {
    name: "RAW",
    tag: "Cold-pressed juice",
    blurb: "A single-page cinematic build with particle-driven scroll.",
    color: "var(--color-violet)",
    dark: true,
    year: "2025",
    link: "https://aethrasolutions.in",
    stack: ["Next.js", "Framer Motion", "GSAP", "Tailwind CSS"],
    deliverables: ["Full-Page Experience", "Custom 3D Can Visualizer", "Performance Tuning"],
  },
  {
    name: "Illumina Tea",
    tag: "Specialty café",
    blurb: "A slow, steeped experience for a specialty tea brand.",
    color: "var(--color-lilac)",
    dark: false,
    year: "2024",
    link: "https://aethrasolutions.in",
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    deliverables: ["Digital Tea Menu", "Quiet Motion System", "Bespoke Illustrations"],
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

