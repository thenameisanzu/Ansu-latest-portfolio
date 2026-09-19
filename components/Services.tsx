"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/content";
import { ArrowUpRight, Plus, Minus, Sparkles } from "lucide-react";

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
        className="pointer-events-none absolute top-1/4 -right-32 w-[550px] h-[550px] rounded-full opacity-20 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-lilac) 0%, var(--color-sky) 50%, transparent 80%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Split-Screen Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Sticky Editorial Header (Desktop & iPad) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border border-ink/10 mb-4"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  04 Capabilities
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold text-ink text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02] mb-5"
              >
                What I deliver.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-body text-sm sm:text-base text-ink-soft/90 leading-relaxed max-w-md mb-8"
              >
                I partner with ambitious brands, founders, and teams to build high-performance digital products — combining conversion UX, modern web architecture, and cinematic motion design.
              </motion.p>
            </div>

            {/* Live Booking Mini Banner & Action CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pt-6 border-t border-ink/8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2.5 text-xs text-ink/75 font-body">
                <Sparkles className="w-3.5 h-3.5 text-violet" />
                <span>Available for selected projects this quarter</span>
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                data-cursor="hover"
                className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-ink hover:text-violet transition-colors w-max"
              >
                <span>Let&apos;s discuss your project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Editorial Typographic Index */}
          <div className="lg:col-span-7 divide-y divide-ink/10 border-y border-ink/10">
            {services.map((s, i) => {
              const isOpen = activeService === i;

              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`group transition-colors duration-300 ${
                    isOpen ? "bg-ink/[0.02]" : "hover:bg-ink/[0.015]"
                  }`}
                >
                  {/* Clickable Header Row */}
                  <button
                    type="button"
                    onClick={() => toggleService(i)}
                    data-cursor="hover"
                    className="w-full py-7 sm:py-8 md:py-9 px-3 sm:px-4 flex items-start justify-between gap-4 text-left cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    {/* Left: Number & Title */}
                    <div className="flex items-start gap-4 sm:gap-6 flex-1">
                      <span className="font-mono text-xs sm:text-sm font-bold text-ink/35 group-hover:text-ink transition-colors pt-1">
                        {s.number}
                      </span>

                      <div>
                        <h3
                          className={`font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-tight transition-colors duration-300 leading-snug ${
                            isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink"
                          }`}
                        >
                          {s.title}
                        </h3>

                        <div className="flex items-center gap-2 mt-2 sm:hidden">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: s.accentColor }}
                          />
                          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft/75">
                            {s.points[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Toggle Button */}
                    <div
                      className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all duration-300 mt-0.5 ${
                        isOpen
                          ? "bg-ink text-cream border-ink rotate-90"
                          : "border-ink/15 text-ink/60 group-hover:border-ink/40 group-hover:text-ink"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Content Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 sm:pb-8 pt-1 px-3 sm:px-4 pl-10 sm:pl-14">
                          <p className="font-body text-sm sm:text-base text-ink-soft/90 leading-relaxed mb-5">
                            {s.description}
                          </p>

                          {/* Deliverables / Feature Tags */}
                          <div className="flex flex-wrap gap-2 items-center">
                            {s.points.map((pt) => (
                              <span
                                key={pt}
                                className="font-body text-xs font-medium px-3 py-1.5 rounded-full bg-cream/90 text-ink/80 border border-ink/10 shadow-xs hover:border-ink/20 transition-colors"
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
        </div>
      </div>
    </section>
  );
}

