"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-36">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 items-center">
        {/* Left column / top on mobile: Photo */}
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="md:col-span-5 md:col-start-1"
        >
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:max-w-none rounded-2xl md:rounded-3xl overflow-hidden bg-ink/5 border border-ink/10 shadow-sm">
            <Image
              src="/images/ansu.png"
              alt="Ansu V S"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover grayscale contrast-[1.05]"
              priority={false}
            />
            {/* Subtle violet tint to match pastel palette */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-color opacity-30"
              style={{ backgroundColor: "var(--color-violet)" }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, var(--color-violet) 100%)",
              }}
            />
          </div>
        </motion.div>

        {/* Right column / below on mobile: Bio paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="md:col-span-6 md:col-start-7 font-display font-semibold text-ink text-[clamp(1.45rem,6.2vw,2.5rem)] md:text-4xl leading-[1.25] tracking-tight"
        >
          I design and build websites end to end — pitch, design, code,
          launch. Most of my work lives under Aethra, my own studio, where I
          make brands feel expensive without the bloat.
        </motion.p>
      </div>
    </section>
  );
}
