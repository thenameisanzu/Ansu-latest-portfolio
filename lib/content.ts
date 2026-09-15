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
    title: "Art Direction & UI/UX",
    description:
      "Crafting distinctive, high-end digital aesthetics in Figma that make brands feel expensive and memorable.",
    points: ["Design Systems", "High-Fidelity Wireframes", "Interactive Prototypes", "Brand Identity"],
    accentColor: "var(--color-violet)",
  },
  {
    number: "02",
    title: "Full-Stack Web Engineering",
    description:
      "Building lightning-fast, production-grade web applications with modern frameworks and robust API architectures.",
    points: ["Next.js & React", "TypeScript & Node.js", "Headless CMS (Sanity)", "Performance & SEO"],
    accentColor: "var(--color-sky)",
  },
  {
    number: "03",
    title: "Cinematic Motion & WebGL",
    description:
      "Transforming static websites into alive, immersive digital stories using buttery-smooth GSAP and 3D animations.",
    points: ["Scroll-Triggered Sequences", "Custom Cursors & Physics", "Micro-Interactions", "Fluid Layouts"],
    accentColor: "var(--color-lilac)",
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
  { label: "Email", href: "mailto:ansuvs047@gmail.com" },
];

export const email = "ansuvs047@gmail.com";
export const calLink = "mailto:ansuvs047@gmail.com?subject=Project%20Inquiry%20—%2015-Min%20Intro%20Call";
