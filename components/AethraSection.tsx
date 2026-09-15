"use client";

import { motion } from "framer-motion";

export default function AethraSection() {
  return (
    <section
      id="aethra"
      className="px-6 md:px-10 py-24 md:py-36 bg-ink text-cream rounded-t-[2rem] md:rounded-t-[3rem]"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="md:col-span-8"
        >
          <span className="font-body text-sm text-cream/50">
            Beyond freelance
          </span>
          <h2 className="font-display font-extrabold text-[10vw] md:text-6xl leading-[0.95] tracking-tight mt-3">
            I run Aethra
            <br />
            Digital Solutions.
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
            className="inline-flex items-center gap-3 font-body text-sm font-medium border border-cream/30 rounded-full px-6 py-3 hover:bg-cream hover:text-ink transition-colors"
          >
            aethrasolutions.in
          </a>
        </motion.div>
      </div>
    </section>
  );
}
