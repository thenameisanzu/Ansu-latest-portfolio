"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/content";

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (hover: hover)", () => {
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
    <section id="work" ref={sectionRef} className="relative md:h-screen py-16 md:py-0">
      <div className="md:h-screen md:flex md:items-center md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-6 md:gap-6 px-6 md:px-10 md:w-max"
        >
          <div className="md:w-[28vw] md:shrink-0 flex flex-col justify-end pb-6 md:pb-0 pt-4 md:pt-0">
            <span className="font-body text-sm text-ink-soft mb-3">
              Selected work
            </span>
            <h2 className="font-display font-extrabold text-ink text-[clamp(2.2rem,8.2vw,3rem)] md:text-5xl leading-[0.95] tracking-tight">
              Projects, mostly
              <br />
              through Aethra.
            </h2>
          </div>

          {projects.map((p) => (
            <article
              key={p.name}
              data-cursor="hover"
              className="group relative shrink-0 w-full md:w-[62vw] lg:w-[46vw] aspect-[4/5] md:aspect-[16/11] rounded-2xl overflow-hidden flex flex-col justify-end p-6 md:p-8 border border-ink/10 shadow-sm transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(155,142,199,0.35)] hover:-translate-y-1"
              style={{ backgroundColor: p.color }}
            >
              <div
                className={`absolute inset-0 transition-colors duration-500 ${
                  p.dark
                    ? "bg-cream/0 group-hover:bg-cream/10"
                    : "bg-ink/0 group-hover:bg-ink/10"
                }`}
              />
              <div className="relative z-10">
                <span
                  className={`inline-block font-body text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md mb-2 border ${
                    p.dark
                      ? "bg-cream/15 text-cream border-cream/20"
                      : "bg-ink/10 text-ink border-ink/15"
                  }`}
                >
                  {p.tag}
                </span>
                <h3
                  className={`font-display font-bold text-3xl md:text-4xl mt-1 mb-2 tracking-tight ${
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
  );
}
