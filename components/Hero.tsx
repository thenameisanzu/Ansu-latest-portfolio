"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const lines = ["Developer.", "Designer.", "Dreamer of Aethra."];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const blob = blobRef.current;
    const section = sectionRef.current;
    if (!blob || !section) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let isVisible = true;

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      tx = (e.clientX / innerWidth - 0.5) * 60;
      ty = (e.clientY / innerHeight - 0.5) * 60;
    };

    const loop = () => {
      if (isVisible) {
        x += (tx - x) * 0.05;
        y += (ty - y) * 0.05;
        blob.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[100svh] flex items-end overflow-hidden px-6 md:px-10 pb-14 md:pb-16 pt-32"
    >
      <div
        ref={blobRef}
        aria-hidden
        className="pointer-events-none absolute -top-1/4 right-[-10%] w-[70vw] h-[70vw] max-w-[820px] max-h-[820px] rounded-full opacity-70 blur-[80px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--color-violet), var(--color-lilac) 45%, var(--color-sky) 75%, transparent 78%)",
        }}
      />

      <div className="relative z-10 w-full">
        <div className="flex items-center gap-2.5 mb-4 md:mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="status-dot-pulse absolute inline-flex h-full w-full rounded-full bg-sky opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky" />
          </span>
          <p className="font-body text-sm md:text-base text-ink-soft">
            Angamāli, Kerala — available for select projects
          </p>
        </div>

        <h1 className="font-display font-extrabold text-ink leading-[0.92] tracking-tight text-[clamp(2.6rem,11.2vw,7.2vw)]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={`block ${
                  line.includes("Aethra")
                    ? "bg-gradient-to-r from-ink via-violet to-ink bg-clip-text text-transparent"
                    : ""
                }`}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 md:mt-10 flex items-end justify-between gap-6"
        >
          <p className="font-body text-base md:text-lg text-ink-soft max-w-sm">
            I build fast, cinematic websites — and run the studio behind
            them.
          </p>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#work")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            data-cursor="hover"
            className="group relative hidden md:inline-flex items-center gap-2 font-body text-sm font-medium pb-1 shrink-0 text-ink"
          >
            <span>See the work</span>
            <span className="block w-full h-[1.5px] bg-gradient-to-r from-violet via-lilac to-sky absolute bottom-0 left-0 transition-transform origin-left group-hover:scale-x-110" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
