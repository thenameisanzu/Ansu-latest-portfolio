"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-32 border-t border-ink/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2 block">
            Endorsements
          </span>
          <h2 className="font-display font-extrabold text-ink text-3xl md:text-5xl tracking-tight leading-none">
            What clients say.
          </h2>
        </div>
        <p className="font-body text-sm md:text-base text-ink-soft max-w-sm">
          Collaborations built on trust, rapid execution, and visual craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            data-cursor="hover"
            className="p-8 md:p-10 rounded-3xl bg-ink/3 border border-ink/10 hover:border-ink/20 hover:bg-cream/60 transition-all duration-500 flex flex-col justify-between"
          >
            <p className="font-display font-medium text-base md:text-lg text-ink/90 leading-relaxed mb-8 italic">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="flex items-center gap-3.5 pt-6 border-t border-ink/8">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm text-ink/80 border border-ink/15"
                style={{ backgroundColor: t.accent }}
              >
                {t.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-ink">
                  {t.author}
                </h4>
                <p className="font-body text-xs text-ink-soft">
                  {t.role} — {t.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
