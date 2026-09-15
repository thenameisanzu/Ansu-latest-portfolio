# Ansu V S — Portfolio

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, GSAP (ScrollTrigger) and Lenis smooth scroll.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

Push to GitHub and import into Vercel — zero config needed. Or run:

```bash
npm run build
npm run start
```

## Edit content

All copy — project names, blurbs, skills, and social links — lives in `lib/content.ts`. Swap it without touching any component.

Colors and fonts are defined as CSS variables in `app/globals.css` (`@theme inline` block) — change the four palette hexes there to re-theme the whole site.

## Notes

- The horizontal scroll-through gallery in "Work" only activates on desktop with a mouse (`(min-width: 768px) and (hover: hover)`); on mobile it becomes a normal vertical, swipeable stack.
- Respects `prefers-reduced-motion`: smooth scroll and marquees fall back to instant/static.
- Fonts (Montserrat, Inter) are self-hosted via `@fontsource`, so there's no external font request at runtime.
