"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-36">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="md:col-span-8 md:col-start-3 font-display font-semibold text-ink text-[7.5vw] md:text-4xl leading-[1.2] tracking-tight"
        >
          I design and build websites end to end — pitch, design, code,
          launch. Most of my work lives under Aethra, my own studio, where I
          make brands feel expensive without the bloat.
        </motion.p>
      </div>
    </section>
  );
}
