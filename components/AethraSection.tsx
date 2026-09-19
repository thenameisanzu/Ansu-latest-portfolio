"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AethraSection() {
  return (
    <section
      id="aethra"
      className="relative overflow-hidden px-7 md:px-14 py-16 md:py-28 bg-ink text-cream rounded-[2.5rem] md:rounded-[3.5rem] mx-4 sm:mx-6 md:mx-10 my-10 md:my-16 border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
    >
      {/* Subtle iridescent studio glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full opacity-25 blur-[100px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #48bb78, var(--color-violet) 50%, var(--color-sky) 90%, transparent 100%)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
        {/* Left: Headline & blurb */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="md:col-span-7 flex flex-col items-start"
        >
          <span className="inline-flex items-center gap-2 font-body text-sm text-cream/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
            Beyond freelance
          </span>
          <h2 className="font-display font-extrabold text-[clamp(2.2rem,6.5vw,3.75rem)] md:text-5xl lg:text-6xl leading-[1.02] tracking-tight mt-3">
            I run Aethra
            <br />
            <span className="bg-gradient-to-r from-cream via-[#86efac] to-sky bg-clip-text text-transparent">
              Digital Solutions.
            </span>
          </h2>
          <p className="font-body text-base md:text-lg text-cream/75 mt-5 max-w-lg leading-relaxed">
            A small studio for cinematic, high-motion websites — built for
            brands that want to feel premium.
          </p>
        </motion.div>

        {/* Right: Transparent Logo with ambient glow & URL button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="md:col-span-5 flex flex-col items-center md:items-end justify-center gap-6 relative"
        >
          {/* Ambient Emerald Logo Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 md:left-auto md:right-12 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 w-48 h-48 rounded-full bg-[#22c55e]/20 blur-3xl"
          />

          <motion.a
            href="https://aethrasolutions.in"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="group block relative z-10"
            title="Visit Aethra Digital Solutions"
          >
            <Image
              src="/images/aethra-logo.png"
              alt="Aethra Digital Solutions Logo"
              width={260}
              height={360}
              className="w-36 sm:w-44 md:w-52 lg:w-56 h-auto object-contain filter drop-shadow-[0_12px_28px_rgba(74,222,128,0.35)] group-hover:scale-105 group-hover:drop-shadow-[0_16px_36px_rgba(74,222,128,0.55)] transition-all duration-300"
              priority
            />
          </motion.a>

          <a
            href="https://aethrasolutions.in"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="group relative inline-flex items-center gap-3 font-body text-sm font-medium p-[1px] rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 shadow-md"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-sky via-lilac to-[#22c55e] opacity-75 group-hover:opacity-100 transition-opacity" />
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
