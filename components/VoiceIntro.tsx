"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function VoiceIntro() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const duration = 15; // 15 seconds intro
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const introText =
    "Hey there! I'm Ansu. I design and build fast, cinematic web products and run Aethra studio. Let's create something memorable together.";

  const stopAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const playSynthesizedVoice = () => {
    if (typeof window === "undefined") return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(introText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Try to find a natural English voice
      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(
        (v) =>
          (v.name.includes("Natural") ||
            v.name.includes("Samantha") ||
            v.name.includes("Daniel") ||
            v.name.includes("Google UK English Male") ||
            v.lang.startsWith("en")) &&
          !v.name.includes("Albert")
      );
      if (naturalVoice) utterance.voice = naturalVoice;

      utterance.onstart = () => {
        setIsPlaying(true);
      };

      utterance.onend = () => {
        stopAudio();
        setProgress(100);
        setTimeout(() => setProgress(0), 1200);
      };

      utterance.onerror = () => {
        stopAudio();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(true);
    }

    // Progress counter animation
    const startTime = Date.now();
    const totalMs = duration * 1000;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / totalMs) * 100);
      setProgress(pct);
      if (elapsed >= totalMs) {
        stopAudio();
      }
    }, 100);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      setProgress(0);
      playSynthesizedVoice();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTime = (pct: number) => {
    const currentSec = Math.floor((pct / 100) * duration);
    return `0:${currentSec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2.5 sm:p-2 pl-3 sm:pl-3.5 rounded-2xl bg-cream/80 backdrop-blur-md border border-ink/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-full">
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          data-cursor="hover"
          aria-label={isPlaying ? "Pause voice intro" : "Play 15-second voice intro"}
          className="relative w-9 h-9 rounded-full bg-ink text-cream hover:bg-violet transition-colors flex items-center justify-center shrink-0 shadow-sm group"
        >
          {isPlaying ? (
            <span className="flex gap-1 items-center justify-center">
              <span className="w-1 h-3 bg-cream rounded-full" />
              <span className="w-1 h-3 bg-cream rounded-full" />
            </span>
          ) : (
            <svg
              className="w-3.5 h-3.5 ml-0.5 fill-cream transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Info & Title */}
        <div className="flex flex-col min-w-0 pr-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
            <span className="font-display font-bold text-xs text-ink tracking-tight">
              Ansu&apos;s Voice Note
            </span>
            <span className="font-mono text-[10px] text-ink-soft bg-ink/5 px-1.5 py-0.5 rounded">
              15s
            </span>
          </div>
          <span className="font-body text-[11px] text-ink-soft truncate">
            {isPlaying ? "Playing intro..." : "Click to hear a quick hello"}
          </span>
        </div>
      </div>

      {/* Waveform Equalizer & Progress Bar */}
      <div className="flex items-center gap-3 px-2 sm:px-3 py-1 sm:py-0 border-t sm:border-t-0 sm:border-l border-ink/10">
        <div className="flex items-center gap-1 h-5">
          {[0.4, 0.9, 0.6, 1.0, 0.7, 0.5, 0.85, 0.35, 0.75, 0.95, 0.5, 0.3].map(
            (barHeight, idx) => (
              <motion.span
                key={idx}
                className={`w-0.5 md:w-1 rounded-full transition-colors ${
                  isPlaying ? "bg-violet" : "bg-ink/25"
                }`}
                animate={
                  isPlaying
                    ? {
                        height: [
                          `${Math.max(4, barHeight * 5)}px`,
                          `${Math.max(4, barHeight * 18)}px`,
                          `${Math.max(4, barHeight * 6)}px`,
                        ],
                      }
                    : { height: `${Math.max(4, barHeight * 12)}px` }
                }
                transition={
                  isPlaying
                    ? {
                        duration: 0.45 + (idx % 4) * 0.1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: (idx % 3) * 0.08,
                      }
                    : { duration: 0.3 }
                }
              />
            )
          )}
        </div>

        <span className="font-mono text-[11px] font-medium text-ink-soft w-8 text-right tabular-nums">
          {isPlaying ? formatTime(progress) : "0:15"}
        </span>
      </div>
    </div>
  );
}
