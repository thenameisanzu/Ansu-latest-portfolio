"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/content";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(0);

  const toggleService = (index: number) => {
    setActiveService(activeService === index ? null : index);
  };

  return (
    <section
      id="services"
      className="px-5 sm:px-8 md:px-10 lg:px-12 py-20 md:py-32 border-t border-ink/8 relative overflow-hidden"
    >
      {/* Subtle ambient gradient aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full opacity-20 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-lilac) 0%, var(--color-sky) 50%, transparent 80%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-xs font-semibold uppercase tracking-widest text-ink-soft mb-3 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
              Capabilities &amp; Solutions
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-extrabold text-ink text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05]"
            >
              What I deliver.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-body text-sm sm:text-base text-ink-soft max-w-md leading-relaxed"
          >
            End-to-end engineering and design solutions crafted to elevate brand presence, accelerate conversion, and scale seamless digital experiences.
          </motion.p>
        </div>

        {/* Editorial Interactive List (No Boxy Cards) */}
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {services.map((s, i) => {
            const isOpen = activeService === i;

            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group transition-colors duration-300 ${
                  isOpen ? "bg-ink/[0.02]" : "hover:bg-ink/[0.015]"
                }`}
              >
                {/* Clickable Header Row */}
                <button
                  type="button"
                  onClick={() => toggleService(i)}
                  className="w-full py-8 sm:py-10 md:py-12 px-2 sm:px-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 text-left cursor-pointer select-none transition-all"
                  aria-expanded={isOpen}
                >
                  {/* Left: Number & Title */}
                  <div className="flex items-start sm:items-center gap-5 sm:gap-8 md:gap-12 flex-1">
                    <span className="font-mono text-sm sm:text-base font-bold text-ink/35 group-hover:text-ink transition-colors pt-1 sm:pt-0">
                      {s.number}
                    </span>

                    <h3
                      className={`font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight transition-colors duration-300 ${
                        isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink"
                      }`}
                    >
                      {s.title}
                    </h3>
                  </div>

                  {/* Right: Category Indicator & Toggle Action */}
                  <div className="flex items-center justify-between md:justify-end gap-4 pl-10 sm:pl-16 md:pl-0">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2 h-2 rounded-full transition-transform duration-300"
                        style={{
                          backgroundColor: s.accentColor,
                          transform: isOpen ? "scale(1.4)" : "scale(1)",
                        }}
                      />
                      <span className="font-mono text-xs uppercase tracking-wider text-ink-soft/75 hidden sm:inline-block">
                        {s.points[0]}
                      </span>
                    </div>

                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isOpen
                          ? "bg-ink text-cream border-ink rotate-90"
                          : "border-ink/15 text-ink/60 group-hover:border-ink/40 group-hover:text-ink"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expandable Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 sm:pb-10 pt-2 px-2 sm:px-4 pl-10 sm:pl-16 md:pl-20 max-w-4xl">
                        <p className="font-body text-base sm:text-lg text-ink-soft leading-relaxed mb-6">
                          {s.description}
                        </p>

                        {/* Deliverables / Feature Tags */}
                        <div className="flex flex-wrap gap-2 sm:gap-2.5 items-center">
                          <span className="font-mono text-xs uppercase font-semibold text-ink/40 mr-2">
                            Key Deliverables:
                          </span>
                          {s.points.map((pt) => (
                            <span
                              key={pt}
                              className="font-body text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full bg-cream/80 text-ink/80 border border-ink/10 shadow-xs"
                            >
                              {pt}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Action Footer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 text-sm text-ink-soft"
        >
          <p className="font-body">
            Need a custom architectural solution or hybrid tech stack?
          </p>
          <a
            href="#contact"
            className="group font-body font-semibold text-ink hover:text-ink/70 flex items-center gap-1.5 transition-colors"
          >
            <span>Let&apos;s discuss your project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

