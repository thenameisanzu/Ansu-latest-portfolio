"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { socials, email, formattedPhoneNumber, whatsappLink } from "@/lib/content";
import { SocialIcon } from "@/components/SocialIcons";
import { ChevronLeft, ChevronRight, Sparkles, Copy, Check, ArrowUpRight } from "lucide-react";

// Curated Behind The Scenes placeholder items
const btsSlides = [
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    title: "Code Architecture & Next.js",
    tag: "Engineering",
    caption: "Late-night full-stack architecture, clean component trees, and high-performance serverless endpoints.",
  },
  {
    src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop",
    title: "UI/UX & Design Systems",
    tag: "Figma Direction",
    caption: "Translating brand identities into responsive design tokens and high-fidelity prototypes.",
  },
  {
    src: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=1200&auto=format&fit=crop",
    title: "Minimal Studio Desk",
    tag: "Workspace",
    caption: "Curated dual-monitor workstation designed for deep focus and precision web craftsmanship.",
  },
  {
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    title: "Late Night Sprints",
    tag: "Production",
    caption: "Fine-tuning WebGL shaders, GSAP scroll sequences, and 60fps micro-animations.",
  },
  {
    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    title: "Information Architecture",
    tag: "Wireframing",
    caption: "Mapping user journeys, conversion funnels, and content hierarchies before writing a single line of code.",
  },
];

// Contact Channels Data for Single Swipeable Card
const contactChannels = [
  {
    id: "email",
    type: "EMAIL",
    label: "Email Channel",
    statusPill: "Replies in < 24h",
    accentColor: "var(--color-violet)",
    value: email,
    ctaText: "Open Mail Client",
    ctaLink: `mailto:${email}?subject=Project%20Inquiry%20—%20Ansu%20V%20S`,
    icon: "✉",
  },
  {
    id: "call",
    type: "DIRECT CALL",
    label: "Phone Line",
    statusPill: "Mon–Sat 9AM–8PM IST",
    accentColor: "var(--color-sky)",
    value: formattedPhoneNumber,
    rawCopyValue: "+919747904381",
    ctaText: "Call Direct",
    ctaLink: "tel:+919747904381",
    icon: "📞",
  },
  {
    id: "whatsapp",
    type: "WHATSAPP",
    label: "Instant Chat",
    statusPill: "Fastest response",
    accentColor: "#22c55e",
    value: formattedPhoneNumber,
    rawCopyValue: "+919747904381",
    ctaText: "Chat on WhatsApp",
    ctaLink: whatsappLink,
    icon: "💬",
    isLive: true,
  },
];

const socialHoverColors: Record<string, string> = {
  GitHub: "hover:text-violet hover:border-violet/40 hover:bg-violet/10",
  LinkedIn: "hover:text-sky-600 hover:border-sky/40 hover:bg-sky/10",
  Instagram: "hover:text-lilac hover:border-lilac/40 hover:bg-lilac/10",
  WhatsApp: "hover:text-emerald-500 hover:border-emerald-500/40 hover:bg-emerald-500/10",
};

export default function Contact() {
  // Contact Card Slider State (User-controlled only, no auto-advance)
  const [contactSlide, setContactSlide] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const totalContactSlides = contactChannels.length;

  // Behind The Scenes Slideshow State (Auto-play enabled with pause on hover)
  const [btsSlide, setBtsSlide] = useState(0);
  const [isBtsPaused, setIsBtsPaused] = useState(false);
  const totalBtsSlides = btsSlides.length;

  // Auto-play for Behind The Scenes only
  useEffect(() => {
    if (isBtsPaused) return;
    const interval = setInterval(() => {
      setBtsSlide((prev) => (prev + 1) % totalBtsSlides);
    }, 4500);
    return () => clearInterval(interval);
  }, [isBtsPaused, totalBtsSlides]);

  // Contact Navigation Handlers
  const nextContact = () => {
    setContactSlide((prev) => (prev + 1) % totalContactSlides);
  };
  const prevContact = () => {
    setContactSlide((prev) => (prev - 1 + totalContactSlides) % totalContactSlides);
  };

  // Drag Gesture for Mobile Contact Card
  const handleContactDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -40) {
      nextContact();
    } else if (info.offset.x > 40) {
      prevContact();
    }
  };

  // Copy to Clipboard Handler
  const handleCopy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const currentContact = contactChannels[contactSlide];

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
          {/* Left Column: Single Minimal Swipeable Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={handleContactDragEnd}
            className="lg:col-span-6 relative flex flex-col justify-between rounded-3xl bg-cream/70 md:bg-cream/50 backdrop-blur-xl border border-ink/10 shadow-xs min-h-[440px] sm:min-h-[480px] p-6 sm:p-8 select-none cursor-grab active:cursor-grabbing"
          >
            {/* Top Bar: Channel Meta & Status Pill */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border border-ink/10 backdrop-blur-md">
                <span className="text-xs">{currentContact.icon}</span>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                  {currentContact.type}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border border-ink/10 text-xs font-body font-medium text-ink-soft">
                {currentContact.isLive && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
                  </span>
                )}
                <span>{currentContact.statusPill}</span>
              </div>
            </div>

            {/* Middle: Large Value & Ghost Copy Action */}
            <div className="relative z-10 py-10 sm:py-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentContact.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-start gap-4"
                >
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-ink-soft/70">
                    {currentContact.label}
                  </span>

                  <div className="flex items-center gap-3 w-full flex-wrap">
                    <a
                      href={currentContact.ctaLink}
                      target={currentContact.id === "whatsapp" ? "_blank" : undefined}
                      rel={currentContact.id === "whatsapp" ? "noreferrer" : undefined}
                      data-cursor="hover"
                      className="font-display font-extrabold text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.25rem] text-ink tracking-tight hover:text-violet transition-colors leading-none"
                    >
                      {currentContact.value}
                    </a>

                    {/* Small Ghost Copy Icon Button */}
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          currentContact.rawCopyValue || currentContact.value,
                          currentContact.id
                        )
                      }
                      data-cursor="hover"
                      aria-label={`Copy ${currentContact.type}`}
                      className="p-2 rounded-full border border-ink/12 hover:border-ink/30 hover:bg-ink/5 text-ink/70 hover:text-ink transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 active:scale-90"
                      title="Copy to clipboard"
                    >
                      {copiedId === currentContact.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Primary CTA Button */}
                  <div className="pt-4 w-full">
                    <a
                      href={currentContact.ctaLink}
                      target={currentContact.id === "whatsapp" ? "_blank" : undefined}
                      rel={currentContact.id === "whatsapp" ? "noreferrer" : undefined}
                      data-cursor="hover"
                      className="group inline-flex items-center justify-between gap-3 px-6 py-3 rounded-2xl bg-ink text-cream font-body text-sm font-semibold hover:bg-violet hover:shadow-[0_8px_25px_rgba(155,142,199,0.35)] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
                    >
                      <span>{currentContact.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Bar: Matching Dot Indicators & Navigation Arrows */}
            <div className="relative z-10 flex items-center justify-between gap-4 pt-4 border-t border-ink/10">
              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {contactChannels.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setContactSlide(i)}
                    aria-label={`Go to channel slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      contactSlide === i
                        ? "w-7 bg-ink"
                        : "w-2 bg-ink/20 hover:bg-ink/40"
                    }`}
                  />
                ))}
              </div>

              {/* Arrow Nav Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevContact}
                  data-cursor="hover"
                  aria-label="Previous contact channel"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-ink/5 hover:bg-ink hover:text-cream text-ink border border-ink/15 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextContact}
                  data-cursor="hover"
                  aria-label="Next contact channel"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-ink/5 hover:bg-ink hover:text-cream text-ink border border-ink/15 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Behind The Scenes Slideshow Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsBtsPaused(true)}
            onMouseLeave={() => setIsBtsPaused(false)}
            className="lg:col-span-6 relative flex flex-col justify-between rounded-3xl overflow-hidden bg-ink text-cream border border-ink/10 shadow-[0_12px_40px_rgba(32,28,38,0.15)] min-h-[440px] sm:min-h-[480px] p-6 sm:p-8"
          >
            {/* Background Image Slideshow with Crossfade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={btsSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src={btsSlides[btsSlide].src}
                  alt={btsSlides[btsSlide].title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover opacity-45"
                  priority={btsSlide === 0}
                />
                {/* Gradient Overlays for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
              </motion.div>
            </AnimatePresence>

            {/* Top Carousel Bar */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream/15 border border-cream/20 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#86efac]" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cream">
                  Behind The Scenes
                </span>
              </div>

              <span className="font-mono text-xs text-cream/75 font-semibold bg-ink/50 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
                0{btsSlide + 1} / 0{totalBtsSlides}
              </span>
            </div>

            {/* Bottom Caption & Carousel Navigation */}
            <div className="relative z-10 pt-16 sm:pt-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={btsSlide}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-5"
                >
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-[#86efac] block mb-1.5">
                    {btsSlides[btsSlide].tag}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-cream tracking-tight mb-2">
                    {btsSlides[btsSlide].title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-cream/80 leading-relaxed max-w-md line-clamp-2">
                    {btsSlides[btsSlide].caption}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Controls & Progress Dots */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/15">
                {/* Dot Indicators */}
                <div className="flex items-center gap-1.5">
                  {btsSlides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setBtsSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        btsSlide === i
                          ? "w-7 bg-cream"
                          : "w-2 bg-cream/30 hover:bg-cream/60"
                      }`}
                    />
                  ))}
                </div>

                {/* Arrow Nav Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setBtsSlide((prev) => (prev - 1 + totalBtsSlides) % totalBtsSlides)
                    }
                    data-cursor="hover"
                    aria-label="Previous slide"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cream/15 hover:bg-cream hover:text-ink text-cream border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setBtsSlide((prev) => (prev + 1) % totalBtsSlides)
                    }
                    data-cursor="hover"
                    aria-label="Next slide"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cream/15 hover:bg-cream hover:text-ink text-cream border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

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

