export type Project = {
  name: string;
  tag: string;
  blurb: string;
  color: string;
  dark: boolean;
};

export const projects: Project[] = [
  {
    name: "Protoplae",
    tag: "Collectibles retail",
    blurb: "A hype-drop commerce site for a toy and collectibles store.",
    color: "var(--color-violet)",
    dark: true,
  },
  {
    name: "Thai Aquatics",
    tag: "Cinematic landing page",
    blurb: "A dark, luxury betta-fish showcase with water-ripple motion.",
    color: "var(--color-ink)",
    dark: true,
  },
  {
    name: "Tintinkss",
    tag: "Ceramics studio",
    blurb: "Handmade pottery, told through parallax and quiet motion.",
    color: "var(--color-lilac)",
    dark: false,
  },
  {
    name: "Clay Art Café",
    tag: "Pottery & coffee",
    blurb: "An earthy, tactile site for a working pottery studio.",
    color: "var(--color-sky)",
    dark: false,
  },
  {
    name: "RAW",
    tag: "Cold-pressed juice",
    blurb: "A single-page cinematic build with particle-driven scroll.",
    color: "var(--color-violet)",
    dark: true,
  },
  {
    name: "Illumina Tea",
    tag: "Specialty café",
    blurb: "A slow, steeped experience for a specialty tea brand.",
    color: "var(--color-lilac)",
    dark: false,
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
