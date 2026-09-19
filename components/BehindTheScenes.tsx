"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface BTSPhoto {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  category: string;
  src: string;
  year?: string;
  gear?: string;
}

const placeholderPhotos: BTSPhoto[] = [
  {
    id: "photo-1",
    title: "Golden Hour Mirage",
    subtitle: "Coastal reflections & quiet tides",
    location: "Varkala Cliff, Kerala",
    category: "Landscape & Film",
    year: "2026",
    gear: "35mm • f/1.8",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "photo-2",
    title: "Brutalist Geometry",
    subtitle: "Concrete textures and angled sunlight",
    location: "Kochi, India",
    category: "Architecture",
    year: "2025",
    gear: "50mm • f/2.8",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "photo-3",
    title: "Midnight Noir",
    subtitle: "Street shadows & ambient neon",
    location: "Bangalore",
    category: "Street & Motion",
    year: "2026",
    gear: "28mm • f/1.4",
    src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "photo-4",
    title: "Studio Analog Session",
    subtitle: "Tactile film gear & creative staging",
    location: "Aethra Studio, Kottayam",
    category: "Behind The Scenes",
    year: "2026",
    gear: "85mm • f/1.4",
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "photo-5",
    title: "Emerald Mist",
    subtitle: "Morning dew over Western Ghats tea plantations",
    location: "Munnar, Kerala",
    category: "Nature & Mood",
    year: "2025",
    gear: "24-70mm • f/2.8",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "photo-6",
    title: "Raw Grain & Light",
    subtitle: "Experimental light streaks and motion blur",
    location: "Night Drive",
    category: "Abstract",
    year: "2026",
    gear: "35mm • 1/4s",
    src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function BehindTheScenes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<BTSPhoto | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const total = placeholderPhotos.length;

  const resetInactivityTimer = useCallback(() => {
    setIsInteracting(true);
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 3000);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
    resetInactivityTimer();
  }, [total, resetInactivityTimer]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    resetInactivityTimer();
  }, [total, resetInactivityTimer]);

  // Auto-play interval
  useEffect(() => {
    if (isInteracting) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(interval);
  }, [isInteracting, total]);

  // Keyboard arrow keys navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "Escape" && lightboxPhoto) {
        setLightboxPhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, lightboxPhoto]);

  // Mouse wheel navigation with debounce
  const lastWheelTime = useRef<number>(0);
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 400) return;
    if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 20) {
      if (e.deltaX > 20 || e.deltaY > 20) {
        nextSlide();
      } else {
        prevSlide();
      }
      lastWheelTime.current = now;
    }
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    resetInactivityTimer();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStartX(null);
  };

  return (
    <section
      id="behind-the-scenes"
      className="relative overflow-hidden px-4 sm:px-8 md:px-10 lg:px-12 py-20 md:py-32 border-t border-ink/10 select-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={resetInactivityTimer}
    >
      {/* Ambient background aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-lilac) 0%, var(--color-sky) 40%, var(--color-violet) 70%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-8 sm:mb-12"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
            Behind The Scenes
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink tracking-tight">
            Frames &amp; Captures.
          </h2>
          <p className="font-body text-sm sm:text-base text-ink-soft mt-3 max-w-md">
            Moments, analog experiments, and visual perspectives from behind the lens.
          </p>
        </motion.div>

        {/* 3D Curved Gallery Stage */}
        <div className="relative w-full h-[420px] sm:h-[480px] md:h-[560px] flex items-center justify-center overflow-visible">
          {/* 3D Perspective Canvas */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {/* Center Background Typography Overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none overflow-hidden">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 0.08, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-serif italic font-normal text-[18vw] md:text-[14vw] text-ink tracking-tight whitespace-nowrap leading-none drop-shadow-sm"
              >
                {placeholderPhotos[activeIndex]?.title.split(" ")[0] || "Shadway"}
              </motion.span>
            </div>

            {/* Render 3D Cards */}
            {placeholderPhotos.map((photo, index) => {
              // Calculate circular offset relative to activeIndex
              let offset = index - activeIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isCurrent = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              // 3D Transform math
              const translateX = offset * 280; // horizontal separation
              const translateZ = -Math.abs(offset) * 140; // push side cards into depth
              const rotateY = offset * -26; // rotate towards center cylinder
              const scale = 1 - Math.abs(offset) * 0.14;
              const opacity = isCurrent ? 1 : 1 - Math.abs(offset) * 0.32;
              const zIndex = 40 - Math.abs(offset) * 10;

              return (
                <motion.div
                  key={photo.id}
                  onClick={() => {
                    if (isCurrent) {
                      setLightboxPhoto(photo);
                    } else {
                      setActiveIndex(index);
                      resetInactivityTimer();
                    }
                  }}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  style={{
                    zIndex: zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  className={`absolute w-[240px] sm:w-[280px] md:w-[320px] lg:w-[340px] aspect-[4/5] rounded-3xl overflow-hidden border cursor-pointer transition-shadow duration-500 ${
                    isCurrent
                      ? "border-white/60 shadow-[0_24px_60px_rgba(32,28,38,0.22)] ring-1 ring-ink/10"
                      : "border-ink/10 shadow-[0_12px_32px_rgba(32,28,38,0.08)] brightness-90 hover:brightness-100"
                  }`}
                  data-cursor="hover"
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(min-width: 1024px) 340px, (min-width: 768px) 300px, 240px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={isCurrent}
                  />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-body font-medium text-white/90 border border-white/15">
                      {photo.category}
                    </span>
                  </div>

                  {/* Gradient Scrim for Bottom Details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-white/60 mb-1">
                      {photo.location} {photo.year && `• ${photo.year}`}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl leading-snug tracking-tight text-white">
                      {photo.title}
                    </h3>
                    <p className="font-body text-xs text-white/75 mt-1 line-clamp-1">
                      {photo.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Left Navigation Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous photo"
            data-cursor="hover"
            className="absolute left-2 sm:left-6 md:left-10 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-cream/90 md:bg-cream/80 backdrop-blur-md border border-ink/15 shadow-[0_8px_24px_rgba(32,28,38,0.1)] text-ink flex items-center justify-center hover:scale-110 hover:bg-ink hover:text-cream transition-all duration-300 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next photo"
            data-cursor="hover"
            className="absolute right-2 sm:right-6 md:right-10 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-cream/90 md:bg-cream/80 backdrop-blur-md border border-ink/15 shadow-[0_8px_24px_rgba(32,28,38,0.1)] text-ink flex items-center justify-center hover:scale-110 hover:bg-ink hover:text-cream transition-all duration-300 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Bottom Pagination Dots & Dynamic Hint */}
        <div className="flex flex-col items-center gap-4 mt-6 sm:mt-8">
          {/* Pagination Indicators */}
          <div className="flex items-center gap-2">
            {placeholderPhotos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setActiveIndex(i);
                  resetInactivityTimer();
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === activeIndex
                    ? "w-8 h-2 bg-ink"
                    : "w-2 h-2 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>

          {/* Interaction Instruction Banner */}
          <div className="text-center font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-ink-soft/70 space-y-1">
            <p className="font-semibold">
              USE MOUSE WHEEL, ARROW KEYS, OR TOUCH TO NAVIGATE
            </p>
            <p className="text-ink-soft/50 text-[9.5px]">
              {isInteracting
                ? "AUTO-PLAY RESUMES AFTER 3 SECONDS OF INACTIVITY"
                : "AUTO-PLAY ACTIVE"}
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxPhoto && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxPhoto(null)}
              className="absolute inset-0 bg-ink/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 max-w-4xl w-full max-h-[90vh] bg-cream rounded-3xl overflow-hidden shadow-2xl border border-ink/10 flex flex-col md:flex-row text-ink"
            >
              {/* Photo Area */}
              <div className="relative w-full md:w-3/5 aspect-[4/5] md:aspect-auto md:min-h-[480px] bg-black">
                <Image
                  src={lightboxPhoto.src}
                  alt={lightboxPhoto.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 600px, 90vw"
                  priority
                />
              </div>

              {/* Sidebar Info Area */}
              <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-cream">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-violet/15 text-violet text-xs font-semibold">
                      {lightboxPhoto.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setLightboxPhoto(null)}
                      className="p-2 rounded-full hover:bg-ink/5 text-ink/70 hover:text-ink transition-colors cursor-pointer"
                      aria-label="Close lightbox"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-ink tracking-tight mb-2">
                    {lightboxPhoto.title}
                  </h3>
                  <p className="font-body text-sm text-ink-soft leading-relaxed mb-6">
                    {lightboxPhoto.subtitle}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-ink/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-body text-ink-soft">Location</span>
                      <span className="font-semibold text-ink">{lightboxPhoto.location}</span>
                    </div>
                    {lightboxPhoto.gear && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-body text-ink-soft">Lens / Setting</span>
                        <span className="font-mono text-ink/80">{lightboxPhoto.gear}</span>
                      </div>
                    )}
                    {lightboxPhoto.year && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-body text-ink-soft">Captured</span>
                        <span className="font-mono text-ink/80">{lightboxPhoto.year}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-ink/10 flex items-center justify-between">
                  <span className="text-xs font-body text-ink-soft">
                    Shot by Ansu V S
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxPhoto(null)}
                    className="px-5 py-2 rounded-full bg-ink text-cream text-xs font-semibold hover:bg-violet transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
