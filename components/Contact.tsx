"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";
import { socials, email, formattedPhoneNumber, whatsappLink } from "@/lib/content";
import { SocialIcon } from "@/components/SocialIcons";
import MailSlider from "@/components/MailSlider";
import PhoneSlider from "@/components/PhoneSlider";
import {
  Sparkles,
  Mail,
  MessageCircle,
  Copy,
  Check,
  Maximize2,
  ChevronLeft,
  ChevronRight,
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
    alt: "Behind The Scenes 03",
  },
  {
    src: "/images/IMG_20260704_083342.jpg",
    alt: "Behind The Scenes 04",
  },
  {
    src: "/images/IMG_20260707_212337.jpg",
    alt: "Behind The Scenes 05",
  },
  {
    src: "/images/IMG_20260707_214524.jpg",
    alt: "Behind The Scenes 06",
  },
  {
    src: "/images/IMG_20260726_101246.jpg",
    alt: "Behind The Scenes 07",
  },
  {
    src: "/images/IMG_20260831_143005.jpg",
    alt: "Behind The Scenes 08",
  },
  {
    src: "/images/IMG_20260901_095618.jpg",
    alt: "Behind The Scenes 09",
  },
  {
    src: "/images/IMG_20260901_213522.jpg",
    alt: "Behind The Scenes 10",
  },
  {
    src: "/images/IMG_20260905_212222.jpg",
    alt: "Behind The Scenes 11",
  },
  {
    src: "/images/IMG_20260913_233739.jpg",
    alt: "Behind The Scenes 12",
  },
  {
    src: "/images/IMG_20260916_124956.jpg",
    alt: "Behind The Scenes 13",
  },
];

// Split into 2 alternating rows for dual marquee motion
const row1Photos = btsPhotos.filter((_, i) => i % 2 === 0);
const row2Photos = btsPhotos.filter((_, i) => i % 2 !== 0);

const socialHoverColors: Record<string, string> = {
  GitHub: "hover:text-violet hover:border-violet/40 hover:bg-violet/10",
  LinkedIn: "hover:text-sky-600 hover:border-sky/40 hover:bg-sky/10",
  Instagram: "hover:text-lilac hover:border-lilac/40 hover:bg-lilac/10",
  WhatsApp: "hover:text-emerald-500 hover:border-emerald-500/40 hover:bg-emerald-500/10",
};

export default function Contact() {
  // Channel Tab State (0: Email, 1: WhatsApp / Phone)
  const [activeTab, setActiveTab] = useState<"email" | "whatsapp">("email");
  const [copied, setCopied] = useState(false);

  // Fullscreen Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev - 1 + btsPhotos.length) % btsPhotos.length
    );
  };

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev + 1) % btsPhotos.length
    );
  };

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden pt-20 md:pt-32 pb-16 md:pb-24"
    >
      {/* Ambient background aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[750px] max-h-[750px] rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-lilac) 0%, var(--color-sky) 45%, var(--color-violet) 75%, transparent 100%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
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

        {/* Studio Slider Console (Full Clean Form) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl mx-auto flex flex-col justify-between p-6 sm:p-8 md:p-10 rounded-3xl bg-cream/90 md:bg-cream/70 border border-ink/[0.09] shadow-[0_8px_28px_rgba(32,28,38,0.03)] backdrop-blur-xl min-h-[440px] sm:min-h-[460px]"
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
      </div>

      {/* Behind The Scenes (Edge-to-Edge Freeform Marquee Slideshow - Placed Just Above Footer) */}
      <div className="mt-16 md:mt-24 w-full relative z-10">
        {/* Section Title & Hint */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 mb-5 flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border border-ink/10">
            <Sparkles className="w-3.5 h-3.5 text-violet" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
              Behind The Scenes
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-ink-soft/75">
            <span className="hidden sm:inline-block font-body text-[11px] sm:text-xs">
              Hover to pause • Click to expand
            </span>
            <button
              type="button"
              onClick={() => openLightbox(0)}
              data-cursor="hover"
              className="font-body text-[11px] font-medium text-ink hover:text-violet transition-colors cursor-pointer inline-flex items-center gap-1 bg-ink/5 px-2.5 py-1 rounded-full border border-ink/10"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Fullscreen Gallery</span>
            </button>
          </div>
        </div>

        {/* Dual-Track Flowing Filmstrip Marquee (No Card Containment) */}
        <div className="group relative w-full flex flex-col gap-3.5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] py-2">
          {/* Row 1: Flowing Left */}
          <div className="flex overflow-hidden group-hover:[animation-play-state:paused]">
            <div className="animate-marquee-track flex gap-3.5 shrink-0 group-hover:[animation-play-state:paused]">
              {row1Photos.concat(row1Photos).map((photo, i) => {
                const originalIndex = btsPhotos.findIndex((p) => p.src === photo.src);
                return (
                  <button
                    key={`r1_${photo.src}_${i}`}
                    type="button"
                    onClick={() => openLightbox(originalIndex >= 0 ? originalIndex : 0)}
                    data-cursor="hover"
                    aria-label="View photo"
                    className="group/card relative w-48 sm:w-60 md:w-72 h-32 sm:h-40 md:h-48 rounded-2xl md:rounded-3xl overflow-hidden bg-ink/5 border border-ink/10 shrink-0 shadow-sm transition-all duration-300 hover:scale-105 hover:border-violet/40 hover:shadow-xl cursor-pointer"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 240px, 320px"
                      className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />
                    {/* Hover Overlay Icon */}
                    <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2.5 rounded-full bg-cream/90 text-ink shadow-md backdrop-blur-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Flowing Right */}
          <div className="flex overflow-hidden group-hover:[animation-play-state:paused]">
            <div className="animate-marquee-track-reverse flex gap-3.5 shrink-0 group-hover:[animation-play-state:paused]">
              {row2Photos.concat(row2Photos).map((photo, i) => {
                const originalIndex = btsPhotos.findIndex((p) => p.src === photo.src);
                return (
                  <button
                    key={`r2_${photo.src}_${i}`}
                    type="button"
                    onClick={() => openLightbox(originalIndex >= 0 ? originalIndex : 0)}
                    data-cursor="hover"
                    aria-label="View photo"
                    className="group/card relative w-48 sm:w-60 md:w-72 h-32 sm:h-40 md:h-48 rounded-2xl md:rounded-3xl overflow-hidden bg-ink/5 border border-ink/10 shrink-0 shadow-sm transition-all duration-300 hover:scale-105 hover:border-violet/40 hover:shadow-xl cursor-pointer"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 240px, 320px"
                      className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />
                    {/* Hover Overlay Icon */}
                    <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2.5 rounded-full bg-cream/90 text-ink shadow-md backdrop-blur-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
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
                  {String(lightboxIndex + 1).padStart(2, "0")} / {String(btsPhotos.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={closeLightbox}
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none flex items-center justify-center"
                >
                  <Image
                    src={btsPhotos[lightboxIndex].src}
                    alt={btsPhotos[lightboxIndex].alt}
                    fill
                    sizes="95vw"
                    className="object-contain pointer-events-none"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Lightbox Side Navigation Arrows */}
              <button
                type="button"
                onClick={prevLightbox}
                data-cursor="hover"
                aria-label="Previous image"
                className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-cream/15 hover:bg-cream/30 text-cream border border-cream/20 backdrop-blur-xl transition-all duration-200 hover:scale-110 cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={nextLightbox}
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
                const isActive = lightboxIndex === i;
                return (
                  <button
                    key={photo.src + "_lightbox_" + i}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
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

      {/* Footer Credits & Socials (Directly Below Behind The Scenes) */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 relative z-10 mt-12 md:mt-16 w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ink/10 pt-6">
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
    </section>
  );
}
