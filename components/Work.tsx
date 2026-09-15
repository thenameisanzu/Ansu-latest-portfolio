"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, Project } from "@/lib/content";

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <section id="work" ref={sectionRef} className="relative md:h-screen py-16 md:py-0">
        <div className="md:h-screen md:flex md:items-center md:overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row gap-6 md:gap-6 px-6 md:px-10 md:w-max"
          >
            <div className="md:w-[28vw] md:shrink-0 flex flex-col justify-end pb-6 md:pb-0 pt-4 md:pt-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Selected work
                </span>
                <span className="font-mono text-xs text-ink/50 font-medium">
                  (06)
                </span>
              </div>
              <h2 className="font-display font-extrabold text-ink text-[clamp(2.2rem,8.2vw,3rem)] md:text-5xl leading-[0.95] tracking-tight">
                Projects, mostly
                <br />
                through Aethra.
              </h2>
            </div>

            {projects.map((p, i) => (
              <article
                key={p.name}
                onClick={() => setActiveProject(p)}
                data-cursor="hover"
                className="group relative shrink-0 w-full md:w-[62vw] lg:w-[46vw] aspect-[4/5] md:aspect-[16/11] rounded-2xl overflow-hidden flex flex-col justify-between p-6 md:p-8 border border-ink/10 shadow-sm transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(155,142,199,0.35)] hover:-translate-y-1 cursor-pointer"
                style={{ backgroundColor: p.color }}
              >
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    p.dark
                      ? "bg-cream/0 group-hover:bg-cream/10"
                      : "bg-ink/0 group-hover:bg-ink/10"
                  }`}
                />

                {/* Top card bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className={`inline-block font-body text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md border ${
                      p.dark
                        ? "bg-cream/15 text-cream border-cream/20"
                        : "bg-ink/10 text-ink border-ink/15"
                    }`}
                  >
                    {p.tag}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline ${
                        p.dark ? "text-cream/80" : "text-ink/80"
                      }`}
                    >
                      View details ↗
                    </span>
                    <span
                      className={`font-mono text-xs font-semibold ${
                        p.dark ? "text-cream/50" : "text-ink/40"
                      }`}
                    >
                      0{i + 1}
                    </span>
                  </div>
                </div>

                {/* Bottom card content */}
                <div className="relative z-10">
                  <h3
                    className={`font-display font-bold text-3xl md:text-4xl mb-2 tracking-tight ${
                      p.dark ? "text-cream" : "text-ink"
                    }`}
                  >
                    {p.name}
                  </h3>
                  <p
                    className={`font-body text-sm md:text-base max-w-xs ${
                      p.dark ? "text-cream/80" : "text-ink/70"
                    }`}
                  >
                    {p.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Details Drawer */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-ink/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 w-full max-w-xl bg-cream rounded-3xl p-8 md:p-10 shadow-2xl border border-ink/10 text-ink overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    {activeProject.tag} {activeProject.year && `• ${activeProject.year}`}
                  </span>
                  <h3 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight mt-1">
                    {activeProject.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-2 rounded-full hover:bg-ink/5 transition-colors text-ink/70 hover:text-ink"
                  aria-label="Close modal"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p className="font-body text-base text-ink/80 leading-relaxed mb-6">
                {activeProject.blurb}
              </p>

              {/* Deliverables */}
              {activeProject.deliverables && activeProject.deliverables.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-soft mb-2.5">
                    Deliverables
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.deliverables.map((d) => (
                      <span
                        key={d}
                        className="font-body text-xs font-medium px-3 py-1 rounded-full bg-ink/5 text-ink/80 border border-ink/8"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {activeProject.stack && activeProject.stack.length > 0 && (
                <div className="mb-8">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-soft mb-2.5">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.stack.map((t) => (
                      <span
                        key={t}
                        className="font-body text-xs font-semibold px-3 py-1 rounded-full bg-violet/15 text-ink border border-violet/25"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA link */}
              <div className="flex items-center justify-between pt-6 border-t border-ink/10">
                <span className="font-body text-xs text-ink-soft">
                  Client project via Aethra
                </span>
                <a
                  href={activeProject.link || "https://aethrasolutions.in"}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream font-body text-sm font-medium hover:bg-violet transition-colors"
                >
                  <span>Visit Project</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
