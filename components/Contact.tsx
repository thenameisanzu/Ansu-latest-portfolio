"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";
import { socials, email, formattedPhoneNumber, whatsappLink } from "@/lib/content";
import { SocialIcon } from "@/components/SocialIcons";
import MailSlider from "@/components/MailSlider";
import PhoneSlider from "@/components/PhoneSlider";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Mail,
  MessageCircle,
  Copy,
  Check,
  Maximize2,
  Play,
  Pause,
  X,
} from "lucide-react";

// Behind The Scenes photography & studio moments
const btsPhotos = [
  {
    src: "/images/Screenshot_20260919_205734.jpg",
    alt: "Studio Engineering & Deep Work",
  },
  {
    src: "/images/IMG_5898.jpg",
    alt: "Creative Session & Prototyping",
  },
  {
    src: "/images/IMG_20260612_215448.jpg",
    alt: "Behind The Scenes Reel 03",
  },
  {
    src: "/images/IMG_20260704_083342.jpg",
    alt: "Behind The Scenes Reel 04",
  },
  {
    src: "/images/IMG_20260707_212337.jpg",
    alt: "Behind The Scenes Reel 05",
  },
  {
    src: "/images/IMG_20260707_214524.jpg",
    alt: "Behind The Scenes Reel 06",
  },
  {
    src: "/images/IMG_20260726_101246.jpg",
    alt: "Behind The Scenes Reel 07",
  },
  {
    src: "/images/IMG_20260831_143005.jpg",
    alt: "Behind The Scenes Reel 08",
  },
  {
    src: "/images/IMG_20260901_095618.jpg",
    alt: "Behind The Scenes Reel 09",
  },
  {
    src: "/images/IMG_20260901_213522.jpg",
    alt: "Behind The Scenes Reel 10",
  },
  {
    src: "/images/IMG_20260905_212222.jpg",
    alt: "Behind The Scenes Reel 11",
  },
  {
    src: "/images/IMG_20260913_233739.jpg",
    alt: "Behind The Scenes Reel 12",
  },
  {
    src: "/images/IMG_20260916_124956.jpg",
    alt: "Behind The Scenes Reel 13",
  },
];

const socialHoverColors: Record<string, string> = {
  GitHub: "hover:text-violet hover:border-violet/40 hover:bg-violet/10",
  LinkedIn: "hover:text-sky-600 hover:border-sky/40 hover:bg-sky/10",
  Instagram: "hover:text-lilac hover:border-lilac/40 hover:bg-lilac/10",
  WhatsApp: "hover:text-emerald-500 hover:border-emerald-500/40 hover:bg-emerald-500/10",
};

// Smooth slide animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 32 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 32 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  }),
};

export default function Contact() {
  // Channel Tab State (0: Email, 1: WhatsApp / Phone)
  const [activeTab, setActiveTab] = useState<"email" | "whatsapp">("email");
  const [copied, setCopied] = useState(false);

  // Cinematic Slider State
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const totalPhotos = btsPhotos.length;
  // Normalized active index
  const activeIndex = ((page % totalPhotos) + totalPhotos) % totalPhotos;

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    },
    []
  );

  const setSlide = useCallback(
    (targetIndex: number) => {
      const currentNorm = ((page % totalPhotos) + totalPhotos) % totalPhotos;
      const diff = targetIndex - currentNorm;
      setPage([page + diff, diff >= 0 ? 1 : -1]);
    },
    [page, totalPhotos]
  );

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    const el = thumbnailRefs.current[activeIndex];
    if (el && thumbnailContainerRef.current) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  // Gentle autoplay timer (5 seconds)
  useEffect(() => {
    if (!isPlaying || isHovered || isLightboxOpen) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered, isLightboxOpen, paginate]);

  // Keyboard navigation when lightbox is open or stage is focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "Escape" && isLightboxOpen) setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate, isLightboxOpen]);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 sm:px-8 md:px-10 lg:px-12 pt-20 md:pt-32 pb-16 md:pb-24"
    >
      {/* Ambient background aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[750px] max-h-[750px] rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-lilac) 0%, var(--color-sky) 45%, var(--color-violet) 75%, transparent 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border border-ink/10 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-ink"
          >
            Let’s start a conversation.
          </motion.h2>
        </div>

        {/* Split-View Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Studio Slider Console */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex flex-col justify-between p-6 sm:p-8 md:p-9 rounded-3xl bg-cream/90 md:bg-cream/70 border border-ink/[0.09] shadow-[0_8px_28px_rgba(32,28,38,0.03)] backdrop-blur-xl min-h-[460px] sm:min-h-[500px]"
          >
            {/* Top Bar: Segmented Channel Selector */}
            <div className="flex items-center justify-between gap-3 pb-5 border-b border-ink/8">
              <div className="inline-flex p-1 rounded-full bg-ink/5 border border-ink/8">
                <button
                  type="button"
                  onClick={() => setActiveTab("email")}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-body text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                    activeTab === "email" ? "text-cream" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {activeTab === "email" && (
                    <motion.span
                      layoutId="contactTabIndicator"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Mail className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("whatsapp")}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-body text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                    activeTab === "whatsapp" ? "text-cream" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {activeTab === "whatsapp" && (
                    <motion.span
                      layoutId="contactTabIndicator"
                      className="absolute inset-0 rounded-full bg-emerald-600"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <MessageCircle className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">WhatsApp</span>
                </button>
              </div>

              {/* Status Pill */}
              <span className="font-mono text-[11px] font-medium text-ink-soft/80 hidden sm:inline-block">
                {activeTab === "email" ? "Replies in < 24h" : "Fastest response"}
              </span>
            </div>

            {/* Middle: Active Channel Value & Magnetic Typography */}
            <div className="my-auto py-8 sm:py-10">
              <AnimatePresence mode="wait">
                {activeTab === "email" ? (
                  <motion.div
                    key="emailTab"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-start gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-violet animate-pulse" />
                      <span className="font-body text-xs font-semibold uppercase tracking-wider text-violet">
                        Direct Email
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <Magnetic>
                        <a
                          href={`mailto:${email}?subject=Project%20Inquiry%20—%20Ansu%20V%20S`}
                          data-cursor="hover"
                          className="font-display font-extrabold text-ink text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.25rem] tracking-tight hover:text-violet transition-colors leading-none"
                          title={`Email ${email}`}
                        >
                          {email}
                        </a>
                      </Magnetic>

                      <button
                        type="button"
                        onClick={() => handleCopy(email)}
                        data-cursor="hover"
                        className="p-2 rounded-full border border-ink/10 hover:border-ink/25 hover:bg-ink/5 text-ink/70 hover:text-ink transition-all cursor-pointer"
                        title="Copy email"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <p className="font-body text-xs sm:text-sm text-ink-soft leading-relaxed max-w-md">
                      Best for detailed project briefs, RFP proposals, technical inquiries, and consultation calls.
                    </p>

                    {/* Interactive Mail Slider */}
                    <div className="mt-4 w-full">
                      <MailSlider />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="whatsappTab"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-start gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                      </span>
                      <span className="font-body text-xs font-semibold uppercase tracking-wider text-emerald-700">
                        WhatsApp &amp; Direct Call
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <Magnetic>
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="hover"
                          className="font-display font-extrabold text-ink text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.25rem] tracking-tight hover:text-emerald-600 transition-colors leading-none"
                          title="Chat on WhatsApp"
                        >
                          {formattedPhoneNumber}
                        </a>
                      </Magnetic>

                      <button
                        type="button"
                        onClick={() => handleCopy("+919747904381")}
                        data-cursor="hover"
                        className="p-2 rounded-full border border-ink/10 hover:border-ink/25 hover:bg-ink/5 text-ink/70 hover:text-ink transition-all cursor-pointer"
                        title="Copy phone number"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <p className="font-body text-xs sm:text-sm text-ink-soft leading-relaxed max-w-md">
                      Fastest response for urgent client sprint deadlines, quick voice notes, and live discussions.
                    </p>

                    {/* Interactive Phone Slider */}
                    <div className="mt-4 w-full">
                      <PhoneSlider />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Bar: Quick Channel Info */}
            <div className="pt-4 border-t border-ink/8 flex items-center justify-between text-xs text-ink-soft/80">
              <span>Timezone: IST (GMT+5:30)</span>
              <span>Kerala, India</span>
            </div>
          </motion.div>

          {/* Right Column: Cinematic Interactive Stage with Touch-Drag Swipe & Thumbnail Dock */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="lg:col-span-6 relative flex flex-col justify-between rounded-3xl overflow-hidden bg-cream/90 md:bg-cream/70 border border-ink/[0.09] shadow-[0_8px_28px_rgba(32,28,38,0.03)] backdrop-blur-xl p-5 sm:p-6 md:p-7 min-h-[460px] sm:min-h-[500px]"
          >
            {/* Top Bar: Header Badge, Slide Counter & Controls */}
            <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-ink/8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border border-ink/10">
                <Sparkles className="w-3.5 h-3.5 text-violet" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                  Behind The Scenes
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  data-cursor="hover"
                  title={isPlaying ? "Pause auto-advance" : "Play auto-advance"}
                  className="p-1.5 rounded-full bg-ink/5 hover:bg-ink/10 border border-ink/8 text-ink/70 hover:text-ink transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3 translate-x-[0.5px]" />
                  )}
                </button>

                <span className="font-mono text-xs text-ink font-semibold bg-ink/5 px-2.5 py-1 rounded-full border border-ink/10">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(totalPhotos).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Main Interactive Stage with Touch-Drag Gesture */}
            <div className="relative my-auto py-2 w-full">
              <div className="group relative w-full aspect-[16/10] sm:aspect-[16/10] md:aspect-[16/10] min-h-[260px] sm:min-h-[290px] rounded-2xl sm:rounded-3xl overflow-hidden bg-ink/5 border border-ink/10 shadow-sm cursor-grab active:cursor-grabbing">
                {/* Autoplay Progress Line */}
                {isPlaying && !isHovered && (
                  <motion.div
                    key={page}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet to-lilac z-30 opacity-90"
                  />
                )}

                {/* Draggable & Swipeable Image Viewport */}
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, { offset, velocity }) => {
                      const swipe = Math.abs(offset.x) * velocity.x;
                      if (swipe < -8000 || offset.x < -60) {
                        paginate(1);
                      } else if (swipe > 8000 || offset.x > 60) {
                        paginate(-1);
                      }
                    }}
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute inset-0 w-full h-full select-none"
                  >
                    <Image
                      src={btsPhotos[activeIndex].src}
                      alt={btsPhotos[activeIndex].alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 90vw"
                      className="object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
                      priority={activeIndex === 0}
                    />

                    {/* Subtle aesthetic gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Lightbox Trigger Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  data-cursor="hover"
                  title="Expand to Fullscreen"
                  className="absolute top-3 right-3 z-20 p-2 rounded-xl bg-ink/40 hover:bg-ink/70 text-cream backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 sm:opacity-90 cursor-pointer shadow-md"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Floating Desktop Prev/Next Buttons */}
                <div className="hidden sm:flex items-center justify-between absolute inset-x-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      paginate(-1);
                    }}
                    data-cursor="hover"
                    aria-label="Previous photo"
                    className="pointer-events-auto p-2 rounded-full bg-cream/80 hover:bg-cream text-ink border border-ink/10 shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      paginate(1);
                    }}
                    data-cursor="hover"
                    aria-label="Next photo"
                    className="pointer-events-auto p-2 rounded-full bg-cream/80 hover:bg-cream text-ink border border-ink/10 shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Touch Swipe Hint Pill */}
                <div className="sm:hidden absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 px-2.5 py-0.5 rounded-full bg-ink/60 backdrop-blur-md text-[10px] text-cream/90 font-body pointer-events-none">
                  Swipe or tap to expand
                </div>
              </div>
            </div>

            {/* Bottom Interactive Thumbnail Dock & Navigation Filmstrip */}
            <div className="pt-3 border-t border-ink/8 flex flex-col gap-2.5">
              <div
                ref={thumbnailContainerRef}
                className="flex items-center gap-2 overflow-x-auto py-1 px-0.5 no-scrollbar scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {btsPhotos.map((photo, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <button
                      key={photo.src + i}
                      ref={(el) => {
                        thumbnailRefs.current[i] = el;
                      }}
                      type="button"
                      onClick={() => setSlide(i)}
                      onMouseEnter={() => setSlide(i)}
                      data-cursor="hover"
                      aria-label={`View photo ${i + 1}`}
                      className={`relative shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "border-2 border-ink ring-2 ring-violet/50 scale-105 opacity-100 shadow-md"
                          : "border border-ink/15 opacity-50 hover:opacity-90 hover:scale-105"
                      }`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="48px"
                        className="object-cover pointer-events-none"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Indicator */}
              <div className="flex items-center justify-between text-xs text-ink-soft/70">
                <span className="font-body text-[11px] sm:text-xs">
                  Swipe or click thumbnails to browse
                </span>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  data-cursor="hover"
                  className="font-body text-[11px] font-medium text-ink hover:text-violet transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Fullscreen</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Immersive Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsLightboxOpen(false)}
              className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-8 bg-ink/95 backdrop-blur-2xl text-cream"
            >
              {/* Lightbox Top Bar */}
              <div
                className="w-full max-w-6xl flex items-center justify-between z-10 pt-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream/10 border border-cream/15 text-cream">
                  <Sparkles className="w-3.5 h-3.5 text-lilac" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                    Behind The Scenes
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-cream/80 bg-cream/10 px-3 py-1.5 rounded-full border border-cream/15">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(totalPhotos).padStart(2, "0")}
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(false)}
                    data-cursor="hover"
                    aria-label="Close Lightbox"
                    className="p-2.5 rounded-full bg-cream/15 hover:bg-cream/30 text-cream border border-cream/20 transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Fullscreen Stage */}
              <div
                className="relative my-auto w-full max-w-5xl h-[70vh] sm:h-[75vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, { offset, velocity }) => {
                      const swipe = Math.abs(offset.x) * velocity.x;
                      if (swipe < -8000 || offset.x < -60) {
                        paginate(1);
                      } else if (swipe > 8000 || offset.x > 60) {
                        paginate(-1);
                      }
                    }}
                    className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none cursor-grab active:cursor-grabbing"
                  >
                    <Image
                      src={btsPhotos[activeIndex].src}
                      alt={btsPhotos[activeIndex].alt}
                      fill
                      sizes="95vw"
                      className="object-contain pointer-events-none"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Lightbox Side Arrows */}
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  data-cursor="hover"
                  aria-label="Previous image"
                  className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-cream/15 hover:bg-cream/30 text-cream border border-cream/20 backdrop-blur-xl transition-all duration-200 hover:scale-110 cursor-pointer shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => paginate(1)}
                  data-cursor="hover"
                  aria-label="Next image"
                  className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-cream/15 hover:bg-cream/30 text-cream border border-cream/20 backdrop-blur-xl transition-all duration-200 hover:scale-110 cursor-pointer shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Bottom Thumbnail Ribbon */}
              <div
                className="w-full max-w-4xl flex items-center justify-center gap-2 overflow-x-auto py-2 z-10"
                onClick={(e) => e.stopPropagation()}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {btsPhotos.map((photo, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <button
                      key={photo.src + "_lightbox_" + i}
                      type="button"
                      onClick={() => setSlide(i)}
                      data-cursor="hover"
                      className={`relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "border-2 border-white ring-2 ring-lilac scale-110 opacity-100"
                          : "border border-white/20 opacity-40 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="56px"
                        className="object-cover pointer-events-none"
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Footer Credits & Socials */}
        <div className="relative z-10 mt-14 md:mt-20 w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ink/10 pt-6">
          <p className="font-body text-xs sm:text-sm text-ink-soft">
            © {new Date().getFullYear()} Ansu V S. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5">
            {socials
              .filter((s) => s.label !== "Email")
              .map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  data-cursor="hover"
                  className={`p-2 sm:p-2.5 rounded-full border border-ink/12 text-ink/75 hover:scale-110 transition-all duration-300 flex items-center justify-center ${
                    socialHoverColors[s.label] || "hover:text-ink"
                  }`}
                >
                  <SocialIcon name={s.label} size={16} />
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
