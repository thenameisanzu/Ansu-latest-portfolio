"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function VoiceIntro() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(12);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/voice-note.m4a");
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = () => {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(25);
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback failed, attempting fallback:", err);
          // Fallback to Kottayam 2.m4a if needed
          if (audioRef.current) {
            audioRef.current.src = "/audio/Kottayam%202.m4a";
            audioRef.current.play().catch((e) => console.error(e));
          }
        });
    }
  };

  const formatTime = (seconds: number) => {
    const sec = Math.floor(seconds);
    return `0:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2.5 sm:p-2 pl-3 sm:pl-3.5 rounded-2xl bg-cream/80 backdrop-blur-md border border-ink/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-full">
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          data-cursor="hover"
          aria-label={isPlaying ? "Pause voice note" : "Play Ansu's voice note"}
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
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPlaying ? "bg-[#25D366] animate-ping" : "bg-violet animate-pulse"
              }`}
            />
            <span className="font-display font-bold text-xs text-ink tracking-tight">
              Ansu&apos;s Voice Note
            </span>
            <span className="font-mono text-[10px] text-ink-soft bg-ink/5 px-1.5 py-0.5 rounded">
              {Math.round(duration)}s
            </span>
          </div>
          <span className="font-body text-[11px] text-ink-soft truncate">
            {isPlaying ? "Playing voice note..." : "Click to hear my voice note"}
          </span>
        </div>
      </div>

      {/* Waveform Equalizer & Dynamic Progress */}
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
          {isPlaying ? formatTime(currentTime) : formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
