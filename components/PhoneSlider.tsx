"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { phoneNumber, formattedPhoneNumber, whatsappLink } from "@/lib/content";

export default function PhoneSlider() {
  const [status, setStatus] = useState<"idle" | "copied" | "called" | "whatsapp">("idle");
  const x = useMotionValue(0);

  // Dynamic opacity and scales for morphing knob icons
  const dualIconOpacity = useTransform(x, [-20, -10, 0, 10, 20], [0, 0.3, 1, 0.3, 0]);
  const leftDragIconOpacity = useTransform(x, [-50, -14, 0], [1, 0.7, 0]);
  const leftDragIconScale = useTransform(x, [-50, -14, 0], [1.1, 0.9, 0.6]);
  const rightDragIconOpacity = useTransform(x, [0, 14, 50], [0, 0.7, 1]);
  const rightDragIconScale = useTransform(x, [0, 14, 50], [0.6, 0.9, 1.1]);

  // Track fills
  const leftTrackFill = useTransform(x, [-70, 0], [1, 0]);
  const rightTrackFill = useTransform(x, [0, 70], [0, 1]);

  // Dynamic knob background
  const knobBg = useTransform(
    x,
    [-65, -28, 0, 28, 65],
    [
      "rgb(99, 102, 241)", // Indigo call
      "rgb(139, 92, 246)",
      "rgb(32, 28, 38)",    // Ink default
      "rgb(52, 199, 89)",
      "rgb(37, 211, 102)", // WhatsApp green
    ]
  );

  const triggerCall = () => {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(30);
    }
    setStatus("called");
    setTimeout(() => setStatus("idle"), 2400);
    window.location.href = `tel:${phoneNumber}`;
  };

  const triggerWhatsApp = () => {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(30);
    }
    setStatus("whatsapp");
    setTimeout(() => setStatus("idle"), 2400);

    if (typeof window !== "undefined") {
      const isTouchApple =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      if (isTouchApple) {
        window.location.href = whatsappLink;
      } else {
        window.open(whatsappLink, "_blank", "noopener,noreferrer");
      }
    }
  };

  const triggerCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(phoneNumber);
      if (typeof navigator.vibrate === "function") navigator.vibrate(30);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2600);
    }
  };

  const handleDragEnd = (_: unknown, info: { offset?: { x: number } }) => {
    const threshold = 32;
    const currentX = x.get();
    const offsetX = info?.offset?.x ?? 0;
    if (currentX >= threshold || offsetX >= threshold) {
      triggerWhatsApp();
    } else if (currentX <= -threshold || offsetX <= -threshold) {
      triggerCall();
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-[340px] sm:max-w-[360px] mx-auto select-none touch-none">
      {/* Sleek iOS-style Slider Bar */}
      <div
        style={{ touchAction: "none" }}
        className="relative w-full h-12 sm:h-13 rounded-full bg-ink/[0.04] border border-ink/[0.09] backdrop-blur-md p-1 flex items-center justify-between overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] touch-none"
      >
        {/* Left Track Gradient */}
        <motion.div
          style={{ opacity: leftTrackFill }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-indigo-500/20 to-transparent rounded-l-full"
        />

        {/* Right Track Gradient */}
        <motion.div
          style={{ opacity: rightTrackFill }}
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#25D366]/25 to-transparent rounded-r-full"
        />

        {/* Left Track: Direct Call */}
        <button
          type="button"
          onClick={triggerCall}
          className="relative z-10 flex-1 h-full flex items-center justify-start pl-2 sm:pl-3 gap-1.5 text-xs font-body font-semibold transition-colors text-ink/80 hover:text-indigo-600 group touch-manipulation cursor-pointer"
          data-cursor="hover"
          title="Click or drag left to call directly"
        >
          <motion.span
            style={{
              opacity: useTransform(x, [-65, -15, 0], [1, 0.9, 0.75]),
              scale: useTransform(x, [-65, 0], [1.04, 1]),
            }}
            className="flex items-center gap-1.5"
          >
            <span className="text-xs text-indigo-600 font-bold transition-transform group-hover:-translate-x-0.5">←</span>
            <span className="p-1 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span className="text-[11px] sm:text-xs tracking-tight">Call</span>
          </motion.span>
        </button>

        {/* Right Track: WhatsApp */}
        <button
          type="button"
          onClick={triggerWhatsApp}
          className="relative z-10 flex-1 h-full flex items-center justify-end pr-2 sm:pr-3 gap-1.5 text-xs font-body font-semibold transition-colors text-ink/80 hover:text-[#128C7E] group touch-manipulation cursor-pointer"
          data-cursor="hover"
          title="Click or drag right for WhatsApp"
        >
          <motion.span
            style={{
              opacity: useTransform(x, [0, 15, 65], [0.75, 0.9, 1]),
              scale: useTransform(x, [0, 65], [1, 1.04]),
            }}
            className="flex items-center gap-1.5"
          >
            <span className="text-[11px] sm:text-xs tracking-tight">WhatsApp</span>
            <span className="p-1 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </span>
            <span className="text-xs text-[#25D366] font-bold transition-transform group-hover:translate-x-0.5">→</span>
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
                className="text-sm font-bold text-emerald-400"
              >
                ✓
              </motion.span>
            ) : status === "called" ? (
              <motion.span
                key="called"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="text-sm font-bold text-cream flex items-center justify-center"
              >
                <svg
                  className="w-3.5 h-3.5 text-cream"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </motion.span>
            ) : status === "whatsapp" ? (
              <motion.span
                key="whatsapp"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="text-sm font-bold text-cream flex items-center justify-center"
              >
                <svg
                  className="w-3.5 h-3.5 text-cream"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </motion.span>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                {/* Idle Indicators */}
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

                {/* Left Indicator */}
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
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </motion.div>

                {/* Right Indicator */}
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
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dynamic Feedback + Quick Copy */}
      <div className="h-5 flex items-center justify-center">
        {status === "copied" ? (
          <motion.span
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-body font-semibold text-emerald-600 flex items-center gap-1"
          >
            <span>Phone copied to clipboard!</span>
            <span>✦</span>
          </motion.span>
        ) : status === "called" ? (
          <motion.span
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-body font-semibold text-indigo-600 flex items-center gap-1"
          >
            <span>Starting phone call...</span>
            <span>↗</span>
          </motion.span>
        ) : status === "whatsapp" ? (
          <motion.span
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-body font-semibold text-[#25D366] flex items-center gap-1"
          >
            <span>Opening WhatsApp chat...</span>
            <span>↗</span>
          </motion.span>
        ) : (
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-body text-ink-soft/60 tracking-tight">
            <span>Swipe or tap for call or chat</span>
            <span>•</span>
            <button
              type="button"
              onClick={triggerCopy}
              className="underline underline-offset-2 hover:text-ink font-medium transition-colors cursor-pointer"
              title="Click to copy phone number"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

