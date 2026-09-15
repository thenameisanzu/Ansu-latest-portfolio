"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const lines = ["Developer.", "Designer.", "Dreamer of Aethra."];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
        setTime(`${formatted} IST`);
      } catch {
        setTime("IST (GMT+5:30)");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
      className="relative min-h-[100svh] flex flex-col justify-center lg:justify-end overflow-hidden px-6 md:px-10 lg:px-12 pb-12 lg:pb-16 pt-24 md:pt-32"
    >
      <div
        ref={blobRef}
        aria-hidden
        className="pointer-events-none absolute -top-1/4 right-[-10%] w-[70vw] h-[70vw] max-w-[820px] max-h-[820px] rounded-full opacity-65 blur-[55px] will-change-transform transform-gpu"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--color-violet), var(--color-lilac) 45%, var(--color-sky) 75%, transparent 78%)",
        }}
      />

      <div className="relative z-10 w-full my-auto lg:my-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border border-ink/10 backdrop-blur-xs">
            <span className="relative flex h-2 w-2">
              <span className="status-dot-pulse absolute inline-flex h-full w-full rounded-full bg-sky opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky" />
            </span>
            <span className="font-body text-xs md:text-sm text-ink-soft">
              Kerala, India
            </span>
            {time && (
              <span className="font-mono text-[11px] md:text-xs text-ink/70 pl-1 border-l border-ink/15 font-medium">
                {time}
              </span>
            )}
          </div>
          <span className="hidden sm:inline text-xs font-body text-ink-soft/60">
            • available for select projects
          </span>
        </motion.div>

        <h1 className="font-display font-extrabold text-ink leading-[0.98] tracking-tight text-[clamp(2.6rem,11.2vw,7.2vw)]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-2 md:pb-3 -mb-2 md:-mb-3">
              <motion.span
                className={`block pb-1 ${
                  line.includes("Aethra")
                    ? "bg-gradient-to-r from-ink via-violet to-ink bg-clip-text text-transparent"
                    : ""
                }`}
                initial={{ y: "115%" }}
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
          className="mt-6 md:mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
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
            className="group relative inline-flex items-center gap-2 font-body text-sm font-medium pb-1 shrink-0 text-ink w-max"
          >
            <span>See the work</span>
            <span className="block w-full h-[1.5px] bg-gradient-to-r from-violet via-lilac to-sky absolute bottom-0 left-0 transition-transform origin-left group-hover:scale-x-110" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
