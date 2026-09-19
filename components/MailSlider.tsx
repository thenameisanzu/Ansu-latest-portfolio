"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { email } from "@/lib/content";

export default function MailSlider() {
  const [status, setStatus] = useState<"idle" | "copied" | "mailed">("idle");
  const x = useMotionValue(0);

  // Dynamic opacity and scales for morphing icons
  const dualIconOpacity = useTransform(x, [-25, -12, 0, 12, 25], [0, 0.4, 1, 0.4, 0]);
  const leftDragIconOpacity = useTransform(x, [-75, -20, 0], [1, 0.6, 0]);
  const leftDragIconScale = useTransform(x, [-75, -20, 0], [1.15, 0.9, 0.6]);
  const rightDragIconOpacity = useTransform(x, [0, 20, 75], [0, 0.6, 1]);
  const rightDragIconScale = useTransform(x, [0, 20, 75], [0.6, 0.9, 1.15]);

  const leftTrackFill = useTransform(x, [-95, 0], [1, 0]);
  const rightTrackFill = useTransform(x, [0, 95], [0, 1]);
  const knobBg = useTransform(
    x,
    [-90, -40, 0, 40, 90],
    [
      "rgb(155, 142, 199)", // violet on left drag
      "rgb(189, 166, 206)",
      "rgb(32, 28, 38)",    // ink default
      "rgb(189, 166, 206)",
      "rgb(180, 211, 217)", // sky on right drag
    ]
  );

  const triggerCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      if (typeof navigator.vibrate === "function") navigator.vibrate(40);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2800);
    }
  };

  const triggerMail = () => {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(40);
    }
    setStatus("mailed");
    setTimeout(() => setStatus("idle"), 2400);
    window.location.href = `mailto:${email}?subject=Project%20Inquiry%20—%20Ansu%20V%20S`;
  };

  const handleDragEnd = (_: unknown, info: { offset?: { x: number } }) => {
    const threshold = 45;
    const currentX = x.get();
    const offsetX = info?.offset?.x ?? 0;
    if (currentX >= threshold || offsetX >= threshold) {
      triggerCopy();
    } else if (currentX <= -threshold || offsetX <= -threshold) {
      triggerMail();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto select-none mt-2 touch-none">
      {/* iOS Slider Bar */}
      <div
        style={{ touchAction: "none" }}
        className="relative w-full h-14 rounded-full bg-ink/8 border border-ink/15 backdrop-blur-md p-1.5 flex items-center justify-between overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] touch-none"
      >
        {/* Left Track Ambient Fill (Lilac/Violet) */}
        <motion.div
          style={{ opacity: leftTrackFill }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-violet/25 to-transparent rounded-l-full"
        />

        {/* Right Track Ambient Fill (Sky) */}
        <motion.div
          style={{ opacity: rightTrackFill }}
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-sky/35 to-transparent rounded-r-full"
        />

        {/* Left Track Zone: Open Mail */}
        <button
          onClick={triggerMail}
          className="relative z-10 flex-1 h-full flex items-center justify-start pl-3.5 gap-1.5 text-xs font-body font-medium transition-colors text-ink hover:text-violet text-left group touch-manipulation"
          data-cursor="hover"
          title="Click or slide left to open mail app"
        >
          <motion.span
            style={{
              opacity: useTransform(x, [-90, -20, 0], [1, 0.9, 0.75]),
              scale: useTransform(x, [-90, 0], [1.05, 1]),
            }}
            className="flex items-center gap-1.5 text-ink font-semibold"
          >
            <span className="text-sm text-violet transition-transform group-hover:-translate-x-0.5">←</span>
            <span className="p-1 rounded-full bg-violet/15 text-violet flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </span>
            <span className="truncate group-hover:text-violet transition-colors">Direct Mail</span>
          </motion.span>
        </button>

        {/* Right Track Zone: Copy Email */}
        <button
          onClick={triggerCopy}
          className="relative z-10 flex-1 h-full flex items-center justify-end pr-3.5 gap-1.5 text-xs font-body font-medium transition-colors text-ink hover:text-sky-600 text-right group touch-manipulation"
          data-cursor="hover"
          title="Click or slide right to copy address"
        >
          <motion.span
            style={{
              opacity: useTransform(x, [0, 20, 90], [0.75, 0.9, 1]),
              scale: useTransform(x, [0, 90], [1, 1.05]),
            }}
            className="flex items-center gap-1.5 text-ink font-semibold"
          >
            <span className="truncate group-hover:text-sky-600 transition-colors">Copy Email</span>
            <span className="p-1 rounded-full bg-sky/35 text-ink flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
            </span>
            <span className="text-sm text-sky-600 transition-transform group-hover:translate-x-0.5">→</span>
          </motion.span>
        </button>

        {/* Interactive Draggable Center Knob with Direction-Morphing Icons */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -95, right: 95 }}
          dragElastic={0.12}
          dragSnapToOrigin={true}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{ x, backgroundColor: knobBg, touchAction: "none" }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-1/2 -translate-x-1/2 z-20 w-11 h-11 rounded-full text-cream flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_4px_14px_rgba(32,28,38,0.25)] border border-white/25 overflow-hidden touch-none select-none"
          data-cursor="hover"
        >
          <AnimatePresence mode="wait">
            {status === "copied" ? (
              <motion.span
                key="copied"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="text-base font-bold text-sky"
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
                {/* 1. Bidirectional Idle Icon (Shown at Center) */}
                <motion.div
                  style={{ opacity: dualIconOpacity }}
                  className="absolute flex items-center justify-center gap-0.5 text-cream"
                >
                  <svg
                    className="w-3.5 h-3.5 text-cream/70"
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
                    className="w-3.5 h-3.5 text-cream/70"
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

                {/* 2. Dragging Left Icon (Morphs to Left Arrow / Mail) */}
                <motion.div
                  style={{
                    opacity: leftDragIconOpacity,
                    scale: leftDragIconScale,
                  }}
                  className="absolute flex items-center justify-center text-cream"
                >
                  <svg
                    className="w-4 h-4 text-cream"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </motion.div>

                {/* 3. Dragging Right Icon (Morphs to Right Arrow / Copy) */}
                <motion.div
                  style={{
                    opacity: rightDragIconOpacity,
                    scale: rightDragIconScale,
                  }}
                  className="absolute flex items-center justify-center text-cream"
                >
                  <svg
                    className="w-4 h-4 text-cream"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
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

      {/* Dynamic status feedback or instruction */}
      <div className="h-6 flex items-center justify-center">
        {status === "copied" ? (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-body font-semibold text-violet flex items-center gap-1.5"
          >
            <span>Copied to clipboard!</span>
            <span>✦</span>
          </motion.span>
        ) : status === "mailed" ? (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-body font-semibold text-violet flex items-center gap-1.5"
          >
            <span>Opening default mail client...</span>
            <span>↗</span>
          </motion.span>
        ) : (
          <span className="text-[11px] font-body text-ink-soft/70">
            Slide right to copy • Slide left to open mail
          </span>
        )}
      </div>
    </div>
  );
}
