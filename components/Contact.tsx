"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { socials, email, formattedPhoneNumber, whatsappLink } from "@/lib/content";
import { SocialIcon } from "@/components/SocialIcons";
import MailSlider from "@/components/MailSlider";
import PhoneSlider from "@/components/PhoneSlider";

const socialHoverColors: Record<string, string> = {
  GitHub: "hover:text-violet hover:border-violet/40 hover:bg-violet/10",
  LinkedIn: "hover:text-sky-600 hover:border-sky/40 hover:bg-sky/10",
  Instagram: "hover:text-lilac hover:border-lilac/40 hover:bg-lilac/10",
  WhatsApp: "hover:text-emerald-500 hover:border-emerald-500/40 hover:bg-emerald-500/10",
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 sm:px-8 md:px-10 pt-20 md:pt-32 pb-16 md:pb-24 flex flex-col items-center text-center"
    >
      {/* Ambient background aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] max-w-[650px] max-h-[650px] rounded-full opacity-25 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-lilac) 0%, var(--color-sky) 50%, transparent 75%)",
        }}
      />

      {/* Micro-label */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 font-body text-xs sm:text-sm font-medium text-ink-soft mb-3 flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
        <span>Have a project in mind?</span>
      </motion.div>

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="relative z-10 w-full max-w-4xl flex flex-col items-center mb-8 sm:mb-10"
      >
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-ink">
          Let’s start a conversation
        </h2>
      </motion.div>

      {/* Responsive 2-Card Interactive Grid */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.16 }}
        className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
      >
        {/* 1. Email Channel Card */}
        <div className="group relative flex flex-col justify-between p-5 sm:p-6 md:p-7 rounded-3xl bg-cream/90 md:bg-cream/70 border border-ink/[0.09] shadow-[0_8px_28px_rgba(32,28,38,0.04)] backdrop-blur-xl hover:border-violet/35 hover:shadow-[0_14px_36px_rgba(155,142,199,0.14)] transition-all duration-300 text-left">
          {/* Top Card Meta */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-body font-semibold text-violet bg-violet/10 border border-violet/20 px-2.5 py-0.5 rounded-full">
              <span>✉</span>
              <span>EMAIL</span>
            </span>
            <span className="text-[11px] font-body font-medium text-ink-soft/70">
              Replies in &lt; 24h
            </span>
          </div>

          {/* Value Display */}
          <div className="my-2 flex flex-col items-center text-center">
            <Magnetic>
              <a
                href={`mailto:${email}?subject=Project%20Inquiry%20—%20Ansu%20V%20S`}
                data-cursor="hover"
                className="block w-full font-display font-extrabold text-ink text-lg sm:text-xl md:text-[1.35rem] lg:text-[1.55rem] tracking-tight hover:text-violet transition-colors py-1 truncate"
                title={`Email ${email}`}
              >
                {email}
              </a>
            </Magnetic>
          </div>

          {/* Interactive Slider */}
          <div className="mt-3 w-full">
            <MailSlider />
          </div>
        </div>

        {/* 2. Direct Call / WhatsApp Channel Card */}
        <div className="group relative flex flex-col justify-between p-5 sm:p-6 md:p-7 rounded-3xl bg-cream/90 md:bg-cream/70 border border-ink/[0.09] shadow-[0_8px_28px_rgba(32,28,38,0.04)] backdrop-blur-xl hover:border-emerald-500/35 hover:shadow-[0_14px_36px_rgba(37,211,102,0.12)] transition-all duration-300 text-left">
          {/* Top Card Meta */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-body font-semibold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
              </span>
              <span>DIRECT &amp; WHATSAPP</span>
            </span>
            <span className="text-[11px] font-body font-medium text-emerald-700/80">
              Fastest response
            </span>
          </div>

          {/* Value Display */}
          <div className="my-2 flex flex-col items-center text-center">
            <Magnetic>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="block w-full font-display font-extrabold text-ink text-lg sm:text-xl md:text-[1.35rem] lg:text-[1.55rem] tracking-tight hover:text-emerald-600 transition-colors py-1 whitespace-nowrap"
                title="Chat on WhatsApp"
              >
                {formattedPhoneNumber}
              </a>
            </Magnetic>
          </div>

          {/* Interactive Slider */}
          <div className="mt-3 w-full">
            <PhoneSlider />
          </div>
        </div>
      </motion.div>

      {/* Footer copyright and socials */}
      <div className="relative z-10 mt-14 md:mt-20 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ink/10 pt-6">
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

