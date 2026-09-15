"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="px-6 md:px-10 py-20 md:py-32 border-t border-ink/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2 block">
            Capabilities & Focus
          </span>
          <h2 className="font-display font-extrabold text-ink text-3xl md:text-5xl tracking-tight leading-none">
            What I deliver.
          </h2>
        </div>
        <p className="font-body text-sm md:text-base text-ink-soft max-w-sm">
          From concept wireframes to production-grade deployment with motion that grabs attention.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            data-cursor="hover"
            className="group relative p-8 md:p-10 rounded-3xl bg-ink/3 border border-ink/10 hover:border-ink/20 hover:bg-cream/60 transition-all duration-500 flex flex-col justify-between hover:shadow-[0_16px_40px_-15px_rgba(155,142,199,0.2)]"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-sm font-bold text-ink/40 group-hover:text-ink transition-colors">
                  {s.number}
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all"
                  style={{ backgroundColor: s.accentColor }}
                />
              </div>

              <h3 className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight mb-3">
                {s.title}
              </h3>
              <p className="font-body text-sm md:text-base text-ink-soft/90 leading-relaxed mb-8">
                {s.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-6 border-t border-ink/8">
              {s.points.map((pt) => (
                <span
                  key={pt}
                  className="font-body text-xs font-medium px-3 py-1.5 rounded-full bg-ink/5 text-ink/75 group-hover:bg-cream group-hover:text-ink transition-colors border border-ink/5"
                >
                  {pt}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
