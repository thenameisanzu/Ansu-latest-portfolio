"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/content";
import TiltCard from "@/components/TiltCard";

export default function Services() {
  return (
    <section id="services" className="px-5 sm:px-8 md:px-10 py-20 md:py-32 border-t border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2 block">
              Capabilities &amp; Solutions
            </span>
            <h2 className="font-display font-extrabold text-ink text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none">
              What I deliver.
            </h2>
          </div>
          <p className="font-body text-sm md:text-base text-ink-soft max-w-sm">
            From conversion-driven landing pages to scalable full-stack web platforms and interactive 3D experiences.
          </p>
        </div>

        {/* 2x2 Clean Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="h-full"
            >
              <TiltCard
                maxTilt={6}
                className="group relative h-full p-6 sm:p-8 md:p-9 rounded-3xl bg-cream/90 md:bg-cream/60 border border-ink/[0.09] shadow-[0_8px_30px_rgba(32,28,38,0.03)] backdrop-blur-xl hover:border-ink/25 hover:bg-cream/95 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_16px_40px_rgba(155,142,199,0.18)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-sm font-bold text-ink/40 group-hover:text-ink transition-colors">
                      {s.number}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all shadow-xs"
                      style={{ backgroundColor: s.accentColor }}
                    />
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl md:text-[1.65rem] text-ink tracking-tight mb-3 leading-snug">
                    {s.title}
                  </h3>
                  <p className="font-body text-sm md:text-[15px] text-ink-soft/90 leading-relaxed mb-6">
                    {s.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-5 border-t border-ink/8">
                  {s.points.map((pt) => (
                    <span
                      key={pt}
                      className="font-body text-xs font-medium px-3 py-1.5 rounded-full bg-ink/5 text-ink/75 group-hover:bg-ink group-hover:text-cream transition-all duration-300 border border-ink/5"
                    >
                      {pt}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

