"use client";

import { motion } from "framer-motion";

export default function AethraSection() {
  return (
    <section
      id="aethra"
      className="relative overflow-hidden px-6 md:px-10 py-16 md:py-36 bg-ink text-cream rounded-t-[2rem] md:rounded-t-[3rem]"
    >
      {/* Subtle iridescent studio glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full opacity-20 blur-[100px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-violet), var(--color-lilac) 50%, var(--color-sky) 90%, transparent 100%)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="md:col-span-8"
        >
          <span className="inline-flex items-center gap-2 font-body text-sm text-cream/60">
            <span className="w-1.5 h-1.5 rounded-full bg-lilac" />
            Beyond freelance
          </span>
          <h2 className="font-display font-extrabold text-[clamp(2.2rem,8.5vw,3.75rem)] md:text-6xl leading-[0.95] tracking-tight mt-3">
            I run Aethra
            <br />
            <span className="bg-gradient-to-r from-cream via-lilac to-sky bg-clip-text text-transparent">
              Digital Solutions.
            </span>
          </h2>
          <p className="font-body text-base md:text-lg text-cream/70 mt-6 max-w-md">
            A small studio for cinematic, high-motion websites — built for
            brands that want to feel premium.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:col-span-4 flex md:justify-end"
        >
          <a
            href="https://aethrasolutions.in"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="group relative inline-flex items-center gap-3 font-body text-sm font-medium p-[1px] rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-sky via-lilac to-violet opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 px-6 py-3 rounded-full bg-ink text-cream group-hover:bg-cream group-hover:text-ink transition-colors flex items-center gap-2">
              <span>aethrasolutions.in</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
