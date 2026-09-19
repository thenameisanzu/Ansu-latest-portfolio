"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { phoneNumber, formattedPhoneNumber, whatsappLink } from "@/lib/content";

export default function PhoneSlider() {
  const [status, setStatus] = useState<"idle" | "copied" | "called" | "whatsapp">("idle");
  const x = useMotionValue(0);

  // Dynamic opacity and scales for morphing knob icons
  const dualIconOpacity = useTransform(x, [-25, -12, 0, 12, 25], [0, 0.4, 1, 0.4, 0]);
  const leftDragIconOpacity = useTransform(x, [-75, -20, 0], [1, 0.6, 0]);
  const leftDragIconScale = useTransform(x, [-75, -20, 0], [1.15, 0.9, 0.6]);
  const rightDragIconOpacity = useTransform(x, [0, 20, 75], [0, 0.6, 1]);
  const rightDragIconScale = useTransform(x, [0, 20, 75], [0.6, 0.9, 1.15]);

  // Track fills
  const leftTrackFill = useTransform(x, [-95, 0], [1, 0]);
  const rightTrackFill = useTransform(x, [0, 95], [0, 1]);

  // Dynamic knob background transition
  const knobBg = useTransform(
    x,
    [-90, -40, 0, 40, 90],
    [
      "rgb(99, 102, 241)", // Indigo/Call accent on left drag
      "rgb(139, 92, 246)",
      "rgb(32, 28, 38)",    // Ink default
      "rgb(52, 199, 89)",
      "rgb(37, 211, 102)", // WhatsApp green on right drag
    ]
  );

  const triggerCall = () => {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(40);
    }
    setStatus("called");
    setTimeout(() => setStatus("idle"), 2400);
    window.location.href = `tel:${phoneNumber}`;
  };

  const triggerWhatsApp = () => {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(40);
    }
    setStatus("whatsapp");
    setTimeout(() => setStatus("idle"), 2400);

    // On iPad / iOS, Safari blocks window.open inside touch gestures; window.location.href opens WhatsApp seamlessly
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
      if (typeof navigator.vibrate === "function") navigator.vibrate(40);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2800);
    }
  };

  const handleDragEnd = (_: unknown, info: { offset?: { x: number } }) => {
    const threshold = 40;
    const currentX = x.get();
    const offsetX = info?.offset?.x ?? 0;
    if (currentX >= threshold || offsetX >= threshold) {
      triggerWhatsApp();
    } else if (currentX <= -threshold || offsetX <= -threshold) {
      triggerCall();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto select-none mt-2 touch-none">
      {/* iOS Slider Bar */}
      <div
        style={{ touchAction: "none" }}
        className="relative w-full h-14 rounded-full bg-ink/8 border border-ink/15 backdrop-blur-md p-1.5 flex items-center justify-between overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] touch-none"
      >
        {/* Left Track Ambient Fill (Call Indigo/Violet) */}
        <motion.div
          style={{ opacity: leftTrackFill }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-indigo-500/30 to-transparent rounded-l-full"
        />

        {/* Right Track Ambient Fill (WhatsApp Emerald Green) */}
        <motion.div
          style={{ opacity: rightTrackFill }}
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#25D366]/35 to-transparent rounded-r-full"
        />

        {/* Left Track Zone: Direct Call */}
        <button
          onClick={triggerCall}
          className="relative z-10 flex-1 h-full flex items-center justify-start pl-3.5 gap-1.5 text-xs font-body font-medium transition-colors text-ink hover:text-indigo-600 text-left group touch-manipulation cursor-pointer"
          data-cursor="hover"
          title="Click or slide left to call directly"
        >
          <motion.span
            style={{
              opacity: useTransform(x, [-90, -20, 0], [1, 0.9, 0.75]),
              scale: useTransform(x, [-90, 0], [1.05, 1]),
            }}
            className="flex items-center gap-1.5 text-ink font-semibold"
          >
            <span className="text-sm text-indigo-600 transition-transform group-hover:-translate-x-0.5">←</span>
            <span className="p-1 rounded-full bg-indigo-500/15 text-indigo-600 flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5"
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
            <span className="truncate group-hover:text-indigo-600 transition-colors">Direct Call</span>
          </motion.span>
        </button>

        {/* Right Track Zone: WhatsApp */}
        <button
          onClick={triggerWhatsApp}
          className="relative z-10 flex-1 h-full flex items-center justify-end pr-3.5 gap-1.5 text-xs font-body font-medium transition-colors text-ink hover:text-[#128C7E] text-right group touch-manipulation cursor-pointer"
          data-cursor="hover"
          title="Click or slide right to chat on WhatsApp"
        >
          <motion.span
            style={{
              opacity: useTransform(x, [0, 20, 90], [0.75, 0.9, 1]),
              scale: useTransform(x, [0, 90], [1, 1.05]),
            }}
            className="flex items-center gap-1.5 text-ink font-semibold"
          >
            <span className="truncate group-hover:text-[#128C7E] transition-colors">WhatsApp</span>
            <span className="p-1 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0 shadow-xs">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </span>
            <span className="text-sm text-[#25D366] transition-transform group-hover:translate-x-0.5">→</span>
          </motion.span>
        </button>

        {/* Interactive Draggable Center Knob with Morphing Icons */}
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
                className="text-base font-bold text-emerald-400"
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
                  className="w-4 h-4 text-cream"
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
                  className="w-4 h-4 text-cream"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </motion.span>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                {/* 1. Bidirectional Idle Icon */}
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

                {/* 2. Dragging Left Icon (Morphs to Phone Call) */}
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
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </motion.div>

                {/* 3. Dragging Right Icon (Morphs to WhatsApp Icon) */}
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

      {/* Dynamic status feedback or instruction + Quick Copy */}
      <div className="h-6 flex items-center justify-center gap-2">
        {status === "copied" ? (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-body font-semibold text-emerald-600 flex items-center gap-1.5"
          >
            <span>Copied {formattedPhoneNumber}!</span>
            <span>✦</span>
          </motion.span>
        ) : status === "called" ? (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-body font-semibold text-indigo-600 flex items-center gap-1.5"
          >
            <span>Starting phone call...</span>
            <span>↗</span>
          </motion.span>
        ) : status === "whatsapp" ? (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-body font-semibold text-[#25D366] flex items-center gap-1.5"
          >
            <span>Opening WhatsApp chat...</span>
            <span>↗</span>
          </motion.span>
        ) : (
          <div className="flex items-center gap-2 text-[11px] font-body text-ink-soft/70">
            <span>Slide right for WhatsApp • Slide left to call</span>
            <span className="text-ink/25">•</span>
            <button
              onClick={triggerCopy}
              className="underline underline-offset-2 hover:text-ink transition-colors font-medium cursor-pointer"
              title="Click to copy phone number"
            >
              Copy number
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
