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
    <section id="work" ref={sectionRef} className="relative md:h-screen">
      <div className="md:h-screen md:flex md:items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-6 md:gap-6 px-6 md:px-10 md:w-max"
        >
          <div className="md:w-[28vw] md:shrink-0 flex flex-col justify-end pb-6 md:pb-0 pt-8 md:pt-0">
            <span className="font-body text-sm text-ink-soft mb-3">
              Selected work
            </span>
            <h2 className="font-display font-extrabold text-ink text-[11vw] md:text-5xl leading-[0.95] tracking-tight">
              Projects, mostly
              <br />
              through Aethra.
            </h2>
          </div>

          {projects.map((p) => (
            <article
              key={p.name}
              data-cursor="hover"
              className="group relative shrink-0 w-full md:w-[62vw] lg:w-[46vw] aspect-[4/5] md:aspect-[16/11] rounded-2xl overflow-hidden flex flex-col justify-end p-6 md:p-8"
              style={{ backgroundColor: p.color }}
            >
              <div
                className={`absolute inset-0 transition-colors duration-500 ${
                  p.dark
                    ? "bg-cream/0 group-hover:bg-cream/10"
                    : "bg-ink/0 group-hover:bg-ink/10"
                }`}
              />
              <div className="relative">
                <span
                  className={`font-body text-xs md:text-sm ${
                    p.dark ? "text-cream/70" : "text-ink/65"
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
