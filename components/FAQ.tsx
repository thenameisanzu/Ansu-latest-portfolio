"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="px-6 md:px-10 py-20 md:py-32 border-t border-ink/10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        {/* Left header column */}
        <div className="md:col-span-4">
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2 block">
            Process & Clarity
          </span>
          <h2 className="font-display font-extrabold text-ink text-3xl md:text-5xl tracking-tight leading-[1.05] mb-4">
            Working with me.
          </h2>
          <p className="font-body text-sm md:text-base text-ink-soft leading-relaxed max-w-sm mb-6">
            Transparent communication, rapid sprints, and zero unexpected surprises.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            data-cursor="hover"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-ink border-b border-ink/30 pb-0.5 hover:border-ink hover:text-violet transition-colors"
          >
            <span>Have another question? Let&apos;s talk</span>
            <span className="text-xs">→</span>
          </a>
        </div>

        {/* Right accordion list */}
        <div className="md:col-span-8 flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-cream/90 border-ink/20 shadow-sm"
                    : "bg-ink/3 border-ink/8 hover:border-ink/15 hover:bg-cream/50"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  data-cursor="hover"
                  className="w-full p-6 md:p-8 flex items-start justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <div>
                    <span className="font-body text-xs font-semibold uppercase tracking-wider text-violet/90 block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-display font-bold text-lg md:text-xl text-ink tracking-tight">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="shrink-0 w-8 h-8 rounded-full border border-ink/15 flex items-center justify-center text-ink/70 mt-1 transition-transform duration-300">
                    <span
                      className={`block font-display font-medium text-lg leading-none transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 font-body text-sm md:text-base text-ink-soft/90 leading-relaxed border-t border-ink/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
