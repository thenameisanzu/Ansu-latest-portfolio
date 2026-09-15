"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const onResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", onResize);

    // Smooth luxurious pacing: 1.8 seconds
    const startTime = Date.now();
    const duration = 1800;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(1, elapsed / duration);
      const easedProgress = Math.floor(
        (1 - Math.pow(1 - progressRatio, 2.2)) * 100
      );
      setProgress(easedProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        setIsCompleted(true);

        // 500ms hold on 100% to appreciate the specular flash before the wave pulls up
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "";
        }, 550);
      }
    }, 16);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, []);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} Z`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${
    dimension.width / 2
  } -350 0 0 Z`;

  const curveTransition = {
    duration: 1.05,
    ease: [0.76, 0, 0.24, 1] as const,
  };

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <div className="fixed inset-0 z-[999] pointer-events-none select-none overflow-hidden">
          {/* 1. Fluid SVG Liquid Wave Curtain */}
          {dimension.width > 0 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.path
                fill="#16121d"
                initial={{ d: initialPath }}
                exit={{
                  d: targetPath,
                  transition: curveTransition,
                }}
              />
            </svg>
          )}

          {/* 2. Preloader Content Layer */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: -50,
              transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
            }}
            className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-14"
          >
            {/* Ambient Background Aura */}
            <motion.div
              animate={{
                scale: isCompleted ? 1.3 : 1,
                opacity: isCompleted ? 0.75 : 0.4,
              }}
              transition={{ duration: 0.7 }}
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full blur-[110px]"
              style={{
                background:
                  "radial-gradient(circle, var(--color-violet) 0%, var(--color-lilac) 45%, var(--color-sky) 75%, transparent 100%)",
              }}
            />

            {/* Top Row: Brand & Year */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet animate-pulse" />
                <span className="font-display font-bold text-xs md:text-sm tracking-tight text-cream/80">
                  Aethra Digital Solutions
                </span>
              </div>
              <span className="font-mono text-xs text-cream/50">
                © {new Date().getFullYear()}
              </span>
            </div>

            {/* Center: Big Bold Name with Specular Light Flash on 100% */}
            <div className="relative z-10 flex flex-col items-center my-auto">
              <div className="relative overflow-hidden py-3 px-6">
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  className="font-display font-black text-[clamp(3.2rem,11.5vw,8.5rem)] tracking-tight leading-none text-center"
                >
                  <span
                    className={`transition-all duration-700 ${
                      isCompleted
                        ? "bg-gradient-to-r from-cream via-lilac to-sky bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(189,166,206,0.7)]"
                        : "text-cream"
                    }`}
                  >
                    Ansu V S
                  </span>
                </motion.h1>

                {/* Specular Liquid Light Streak Flash on 100% */}
                {isCompleted && (
                  <motion.div
                    initial={{ x: "-120%" }}
                    animate={{ x: "220%" }}
                    transition={{ duration: 0.85, ease: "easeInOut" }}
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12"
                  />
                )}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-body text-xs md:text-sm text-cream/65 mt-3 tracking-wider uppercase font-medium"
              >
                Developer • Designer • Studio Founder
              </motion.p>
            </div>

            {/* Bottom Row: Dynamic Status & High-Speed Percentage Counter */}
            <div className="relative z-10 flex items-end justify-between w-full">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="status-dot-pulse absolute inline-flex h-full w-full rounded-full bg-sky opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky" />
                </span>
                <span className="font-mono text-xs text-cream/70 uppercase tracking-widest font-medium">
                  {isCompleted ? "Experience Ready" : "Preparing Studio Space"}
                </span>
              </div>

              {/* Large Numeral Counter */}
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-4xl md:text-6xl text-cream tabular-nums tracking-tighter">
                  {progress.toString().padStart(2, "0")}
                </span>
                <span className="font-mono text-sm md:text-base text-sky font-semibold">
                  %
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
