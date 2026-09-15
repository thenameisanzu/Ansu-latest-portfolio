"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { email } from "@/lib/content";

export default function MailSlider() {
  const [status, setStatus] = useState<"idle" | "copied" | "mailed">("idle");
  const x = useMotionValue(0);

  // Dynamic opacity and colors based on drag position
  const leftOpacity = useTransform(x, [-90, -30, 0], [1, 0.4, 0.2]);
  const rightOpacity = useTransform(x, [0, 30, 90], [0.2, 0.4, 1]);
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

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const threshold = 65;
    if (info.offset.x >= threshold) {
      triggerCopy();
    } else if (info.offset.x <= -threshold) {
      triggerMail();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto select-none mt-6">
      {/* iOS Slider Bar */}
      <div className="relative w-full h-14 rounded-full bg-ink/8 border border-ink/15 backdrop-blur-md p-1.5 flex items-center justify-between overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
        {/* Left Track Zone: Open Mail */}
        <button
          onClick={triggerMail}
          className="relative z-10 flex-1 h-full flex items-center justify-start pl-4 gap-1.5 text-xs font-body font-medium transition-colors text-ink/75 hover:text-ink text-left"
          data-cursor="hover"
          title="Click or slide left to open mail app"
        >
          <motion.span
            style={{ opacity: leftOpacity }}
            className="flex items-center gap-1 text-ink font-semibold"
          >
            <span className="text-sm">←</span>
            <span>Direct Mail</span>
          </motion.span>
        </button>

        {/* Right Track Zone: Copy Email */}
        <button
          onClick={triggerCopy}
          className="relative z-10 flex-1 h-full flex items-center justify-end pr-4 gap-1.5 text-xs font-body font-medium transition-colors text-ink/75 hover:text-ink text-right"
          data-cursor="hover"
          title="Click or slide right to copy address"
        >
          <motion.span
            style={{ opacity: rightOpacity }}
            className="flex items-center gap-1 text-ink font-semibold"
          >
            <span>Copy Email</span>
            <span className="text-sm">→</span>
          </motion.span>
        </button>

        {/* Interactive Draggable Center Knob */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -95, right: 95 }}
          dragElastic={0.12}
          dragSnapToOrigin={true}
          onDragEnd={handleDragEnd}
          style={{ x, backgroundColor: knobBg }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-1/2 -translate-x-1/2 z-20 w-11 h-11 rounded-full text-cream flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_4px_14px_rgba(32,28,38,0.25)] border border-white/25"
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
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-0.5"
              >
                <svg
                  className="w-4 h-4 text-cream"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </motion.div>
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
