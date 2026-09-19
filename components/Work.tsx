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

    // Only pin on desktop (>= 1024px) so iPads and mobile have smooth natural touch scrolling
    mm.add("(min-width: 1024px)", () => {
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
      <section id="work" ref={sectionRef} className="relative lg:h-screen py-16 lg:py-0">
        <div className="lg:h-screen lg:flex lg:items-center lg:overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-6 px-5 sm:px-8 md:px-10 lg:w-max max-w-5xl lg:max-w-none mx-auto lg:mx-0"
          >
            {/* Header Column */}
            <div className="lg:w-[28vw] lg:shrink-0 flex flex-col justify-end pb-4 lg:pb-0 pt-2 lg:pt-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Selected work
                </span>
                <span className="font-mono text-xs text-ink/50 font-medium">
                  (06)
                </span>
              </div>
              <h2 className="font-display font-extrabold text-ink text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-[0.98] tracking-tight">
                Projects, mostly
                <br />
                through Aethra.
              </h2>
            </div>

            {/* Project Cards (Grid on tablet/iPad, horizontal pinned on desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row gap-5 sm:gap-6 w-full lg:w-auto">
              {projects.map((p, i) => (
                <article
                  key={p.name}
                  onClick={() => setActiveProject(p)}
                  data-cursor="hover"
                  className="group relative shrink-0 w-full lg:w-[45vw] xl:w-[42vw] aspect-[4/3] sm:aspect-[16/11] rounded-2xl md:rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 md:p-8 border border-ink/10 shadow-sm transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(155,142,199,0.35)] hover:-translate-y-1 cursor-pointer"
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
                      className={`font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-2 tracking-tight ${
                        p.dark ? "text-cream" : "text-ink"
                      }`}
                    >
                      {p.name}
                    </h3>
                    <p
                      className={`font-body text-xs sm:text-sm md:text-base max-w-sm ${
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
        </div>
      </section>

      {/* Interactive Project Details Drawer */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
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
              className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto bg-cream rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-ink/10 text-ink"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    {activeProject.tag} {activeProject.year && `• ${activeProject.year}`}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink tracking-tight mt-1">
                    {activeProject.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="p-2 rounded-full hover:bg-ink/5 transition-colors text-ink/70 hover:text-ink cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p className="font-body text-sm sm:text-base text-ink/80 leading-relaxed mb-6">
                {activeProject.blurb}
              </p>

              {/* Deliverables */}
              {activeProject.deliverables && activeProject.deliverables.length > 0 && (
                <div className="mb-5">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-soft mb-2">
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
                <div className="mb-6">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-soft mb-2">
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
              <div className="flex items-center justify-between pt-5 border-t border-ink/10">
                <span className="font-body text-xs text-ink-soft">
                  Client project via Aethra
                </span>
                <a
                  href={activeProject.link || "https://aethrasolutions.in"}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-cream font-body text-xs sm:text-sm font-medium hover:bg-violet transition-colors"
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

