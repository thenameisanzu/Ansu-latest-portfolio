"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const lines = ["Developer.", "Designer.", "Dreamer of Aethra."];

export default function Hero() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const blob = blobRef.current;
    if (!blob) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      tx = (e.clientX / innerWidth - 0.5) * 60;
      ty = (e.clientY / innerHeight - 0.5) * 60;
    };

    const loop = () => {
      x += (tx - x) * 0.05;
      y += (ty - y) * 0.05;
      blob.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-end overflow-hidden px-6 md:px-10 pb-14 md:pb-16 pt-32"
    >
      <div
        ref={blobRef}
        aria-hidden
        className="pointer-events-none absolute -top-1/4 right-[-10%] w-[70vw] h-[70vw] max-w-[820px] max-h-[820px] rounded-full opacity-70 blur-[80px]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--color-violet), var(--color-lilac) 45%, var(--color-sky) 75%, transparent 78%)",
        }}
      />

      <div className="relative z-10 w-full">
        <p className="font-body text-sm md:text-base text-ink-soft mb-4 md:mb-6">
          Angamāli, Kerala — available for select projects
        </p>

        <h1 className="font-display font-extrabold text-ink leading-[0.92] tracking-tight text-[13vw] md:text-[7.2vw]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
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
            className="hidden md:inline-block font-body text-sm font-medium border-b border-ink pb-1 shrink-0"
          >
            See the work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
