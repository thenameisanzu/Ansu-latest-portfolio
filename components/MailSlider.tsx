"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { email } from "@/lib/content";

export default function MailSlider() {
  const [status, setStatus] = useState<"idle" | "copied" | "mailed">("idle");
  const x = useMotionValue(0);

  // Dynamic opacity and scales for morphing icons
  const dualIconOpacity = useTransform(x, [-20, -10, 0, 10, 20], [0, 0.3, 1, 0.3, 0]);
  const leftDragIconOpacity = useTransform(x, [-50, -14, 0], [1, 0.7, 0]);
  const leftDragIconScale = useTransform(x, [-50, -14, 0], [1.1, 0.9, 0.6]);
  const rightDragIconOpacity = useTransform(x, [0, 14, 50], [0, 0.7, 1]);
  const rightDragIconScale = useTransform(x, [0, 14, 50], [0.6, 0.9, 1.1]);

  const leftTrackFill = useTransform(x, [-70, 0], [1, 0]);
  const rightTrackFill = useTransform(x, [0, 70], [0, 1]);
  const knobBg = useTransform(
    x,
    [-65, -28, 0, 28, 65],
    [
      "rgb(155, 142, 199)", // violet
      "rgb(189, 166, 206)",
      "rgb(32, 28, 38)",    // ink default
      "rgb(189, 166, 206)",
      "rgb(180, 211, 217)", // sky
    ]
  );

  const triggerCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      if (typeof navigator.vibrate === "function") navigator.vibrate(30);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2600);
    }
  };

  const triggerMail = () => {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(30);
    }
    setStatus("mailed");
    setTimeout(() => setStatus("idle"), 2400);
    window.location.href = `mailto:${email}?subject=Project%20Inquiry%20—%20Ansu%20V%20S`;
  };

  const handleDragEnd = (_: unknown, info: { offset?: { x: number } }) => {
    const threshold = 32;
    const currentX = x.get();
    const offsetX = info?.offset?.x ?? 0;
    if (currentX >= threshold || offsetX >= threshold) {
      triggerCopy();
    } else if (currentX <= -threshold || offsetX <= -threshold) {
      triggerMail();
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-[340px] sm:max-w-[360px] mx-auto select-none touch-none">
      {/* Sleek iOS-style Slider Bar */}
      <div
        style={{ touchAction: "none" }}
        className="relative w-full h-12 sm:h-13 rounded-full bg-ink/[0.04] border border-ink/[0.09] backdrop-blur-md p-1 flex items-center justify-between overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] touch-none"
      >
        {/* Left Track Fill Gradient */}
        <motion.div
          style={{ opacity: leftTrackFill }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-violet/20 to-transparent rounded-l-full"
        />

        {/* Right Track Fill Gradient */}
        <motion.div
          style={{ opacity: rightTrackFill }}
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-sky/30 to-transparent rounded-r-full"
        />

        {/* Left Track Action: Direct Mail */}
        <button
          type="button"
          onClick={triggerMail}
          className="relative z-10 flex-1 h-full flex items-center justify-start pl-2 sm:pl-3 gap-1.5 text-xs font-body font-semibold transition-colors text-ink/80 hover:text-violet group touch-manipulation cursor-pointer"
          data-cursor="hover"
          title="Click or drag left to open mail"
        >
          <motion.span
            style={{
              opacity: useTransform(x, [-65, -15, 0], [1, 0.9, 0.75]),
              scale: useTransform(x, [-65, 0], [1.04, 1]),
            }}
            className="flex items-center gap-1.5"
          >
            <span className="text-xs text-violet font-bold transition-transform group-hover:-translate-x-0.5">←</span>
            <span className="p-1 rounded-full bg-violet/10 text-violet flex items-center justify-center shrink-0">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </span>
            <span className="text-[11px] sm:text-xs tracking-tight">Open Mail</span>
          </motion.span>
        </button>

        {/* Right Track Action: Copy Address */}
        <button
          type="button"
          onClick={triggerCopy}
          className="relative z-10 flex-1 h-full flex items-center justify-end pr-2 sm:pr-3 gap-1.5 text-xs font-body font-semibold transition-colors text-ink/80 hover:text-sky-700 group touch-manipulation cursor-pointer"
          data-cursor="hover"
          title="Click or drag right to copy email"
        >
          <motion.span
            style={{
              opacity: useTransform(x, [0, 15, 65], [0.75, 0.9, 1]),
              scale: useTransform(x, [0, 65], [1, 1.04]),
            }}
            className="flex items-center gap-1.5"
          >
            <span className="text-[11px] sm:text-xs tracking-tight">Copy</span>
            <span className="p-1 rounded-full bg-sky/30 text-ink flex items-center justify-center shrink-0">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
            </span>
            <span className="text-xs text-sky-700 font-bold transition-transform group-hover:translate-x-0.5">→</span>
          </motion.span>
        </button>

        {/* Tactile Center Knob */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -68, right: 68 }}
          dragElastic={0.1}
          dragSnapToOrigin={true}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{ x, backgroundColor: knobBg, touchAction: "none" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="absolute left-1/2 -translate-x-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full text-cream flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_3px_12px_rgba(32,28,38,0.22)] border border-white/20 overflow-hidden touch-none select-none"
          data-cursor="hover"
        >
          <AnimatePresence mode="wait">
            {status === "copied" ? (
              <motion.span
                key="copied"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="text-sm font-bold text-sky"
              >
                ✓
              </motion.span>
            ) : status === "mailed" ? (
              <motion.span
                key="mailed"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="text-sm font-bold text-cream"
              >
                ↗
              </motion.span>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                {/* Idle Bidirectional Glyphs */}
                <motion.div
                  style={{ opacity: dualIconOpacity }}
                  className="absolute flex items-center justify-center gap-0.5 text-cream"
                >
                  <svg
                    className="w-3 h-3 text-cream/75"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  <span className="w-1 h-1 rounded-full bg-cream/80" />
                  <svg
                    className="w-3 h-3 text-cream/75"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </motion.div>

                {/* Morphing Left Indicator */}
                <motion.div
                  style={{
                    opacity: leftDragIconOpacity,
                    scale: leftDragIconScale,
                  }}
                  className="absolute flex items-center justify-center text-cream"
                >
                  <svg
                    className="w-3.5 h-3.5 text-cream"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </motion.div>

                {/* Morphing Right Indicator */}
                <motion.div
                  style={{
                    opacity: rightDragIconOpacity,
                    scale: rightDragIconScale,
                  }}
                  className="absolute flex items-center justify-center text-cream"
                >
                  <svg
                    className="w-3.5 h-3.5 text-cream"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Minimal Helper / Feedback */}
      <div className="h-5 flex items-center justify-center">
        {status === "copied" ? (
          <motion.span
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-body font-semibold text-violet flex items-center gap-1"
          >
            <span>Email copied to clipboard!</span>
            <span>✦</span>
          </motion.span>
        ) : status === "mailed" ? (
          <motion.span
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-body font-semibold text-violet flex items-center gap-1"
          >
            <span>Opening email client...</span>
            <span>↗</span>
          </motion.span>
        ) : (
          <span className="text-[11px] font-body text-ink-soft/60 tracking-tight">
            Swipe or tap to email or copy
          </span>
        )}
      </div>
    </div>
  );
}

