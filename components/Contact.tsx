"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { socials, email, formattedPhoneNumber, whatsappLink } from "@/lib/content";
import { SocialIcon } from "@/components/SocialIcons";
import { Send, Check, ChevronLeft, ChevronRight, Sparkles, MessageSquare, ArrowUpRight } from "lucide-react";

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

const serviceOptions = [
  "Landing Page",
  "Full-Stack Web App",
  "E-Commerce",
  "3D / Interactive Site",
  "Other",
];

const socialHoverColors: Record<string, string> = {
  GitHub: "hover:text-violet hover:border-violet/40 hover:bg-violet/10",
  LinkedIn: "hover:text-sky-600 hover:border-sky/40 hover:bg-sky/10",
  Instagram: "hover:text-lilac hover:border-lilac/40 hover:bg-lilac/10",
  WhatsApp: "hover:text-emerald-500 hover:border-emerald-500/40 hover:bg-emerald-500/10",
};

export default function Contact() {
  // Form State
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = btsSlides.length;

  // Auto-play slideshow timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, slideCount]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent(`Project Inquiry: ${selectedService} — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${userEmail}\nService: ${selectedService}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
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
        <div className="flex flex-col items-start mb-12 md:mb-16">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 md:p-9 rounded-3xl bg-cream/90 md:bg-cream/70 border border-ink/[0.09] shadow-[0_8px_30px_rgba(32,28,38,0.03)] backdrop-blur-xl"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-ink/8">
                <span className="font-display font-bold text-lg sm:text-xl text-ink">
                  Send a Direct Message
                </span>
                <span className="text-xs font-body font-medium text-emerald-700 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Replies &lt; 24h
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-xs font-semibold text-ink-soft mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-cream/80 border border-ink/12 text-ink placeholder:text-ink-soft/40 text-sm focus:outline-none focus:border-violet focus:ring-2 focus:ring-violet/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-ink-soft mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-cream/80 border border-ink/12 text-ink placeholder:text-ink-soft/40 text-sm focus:outline-none focus:border-violet focus:ring-2 focus:ring-violet/20 transition-all"
                    />
                  </div>
                </div>

                {/* Service Selection Pills */}
                <div>
                  <label className="block font-body text-xs font-semibold text-ink-soft mb-2">
                    Project Interest
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedService(opt)}
                        className={`font-body text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                          selectedService === opt
                            ? "bg-ink text-cream border-ink shadow-xs"
                            : "bg-cream/60 text-ink/75 border-ink/10 hover:border-ink/25"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block font-body text-xs font-semibold text-ink-soft mb-1.5">
                    Your Message / Goals
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, timeline, or key objectives..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-cream/80 border border-ink/12 text-ink placeholder:text-ink-soft/40 text-sm focus:outline-none focus:border-violet focus:ring-2 focus:ring-violet/20 transition-all resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  data-cursor="hover"
                  disabled={submitted}
                  className="w-full py-3.5 px-6 rounded-2xl bg-ink text-cream font-body text-sm font-semibold hover:bg-violet hover:shadow-[0_8px_25px_rgba(155,142,199,0.35)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitted ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Opening Mail Client...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Request</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Direct Channel Quick Links */}
            <div className="pt-6 mt-6 border-t border-ink/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <a
                href={`mailto:${email}`}
                data-cursor="hover"
                className="text-ink-soft hover:text-ink flex items-center gap-1.5 font-medium transition-colors"
              >
                <span>✉ {email}</span>
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 font-medium transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>WhatsApp: {formattedPhoneNumber}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Behind The Scenes Slideshow Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="lg:col-span-6 relative flex flex-col justify-between rounded-3xl overflow-hidden bg-ink text-cream border border-ink/10 shadow-[0_12px_40px_rgba(32,28,38,0.15)] min-h-[420px] sm:min-h-[480px] p-6 sm:p-8"
          >
            {/* Background Image Slideshow with Crossfade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src={btsSlides[currentSlide].src}
                  alt={btsSlides[currentSlide].title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover opacity-45"
                  priority={currentSlide === 0}
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
                0{currentSlide + 1} / 0{slideCount}
              </span>
            </div>

            {/* Bottom Caption & Carousel Navigation */}
            <div className="relative z-10 pt-16 sm:pt-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-5"
                >
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-[#86efac] block mb-1.5">
                    {btsSlides[currentSlide].tag}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-cream tracking-tight mb-2">
                    {btsSlides[currentSlide].title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-cream/80 leading-relaxed max-w-md line-clamp-2">
                    {btsSlides[currentSlide].caption}
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
                      onClick={() => setCurrentSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlide === i
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
                    onClick={prevSlide}
                    data-cursor="hover"
                    aria-label="Previous slide"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cream/15 hover:bg-cream hover:text-ink text-cream border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
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

