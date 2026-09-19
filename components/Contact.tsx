"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { socials, email, phoneNumber, formattedPhoneNumber, whatsappLink } from "@/lib/content";
import { SocialIcon } from "@/components/SocialIcons";
import MailSlider from "@/components/MailSlider";
import PhoneSlider from "@/components/PhoneSlider";

const socialHoverColors: Record<string, string> = {
  GitHub: "hover:text-violet hover:border-violet/40 hover:bg-violet/10",
  LinkedIn: "hover:text-sky hover:border-sky/40 hover:bg-sky/10",
  Instagram: "hover:text-lilac hover:border-lilac/40 hover:bg-lilac/10",
  WhatsApp: "hover:text-emerald-500 hover:border-emerald-500/40 hover:bg-emerald-500/10",
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 md:px-10 pt-24 md:pt-36 pb-16 md:pb-24 flex flex-col items-center text-center"
    >
      {/* Ambient background aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] max-w-[700px] max-h-[700px] rounded-full opacity-30 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-lilac) 0%, var(--color-sky) 50%, transparent 75%)",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 font-body text-sm text-ink-soft mb-4 flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-violet" />
        Have a project in mind?
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative z-10 w-full max-w-4xl flex flex-col items-center px-2"
      >
        {/* Contact Headlines: Email & Phone / WhatsApp */}
        <div className="flex flex-col items-center gap-3 md:gap-4 mb-2">
          <Magnetic>
            <a
              href={`mailto:${email}?subject=Project%20Inquiry%20—%20Ansu%20V%20S`}
              data-cursor="hover"
              className="group inline-block font-display font-extrabold text-ink text-[clamp(1.5rem,5.2vw,3.75rem)] md:text-5xl lg:text-6xl tracking-tight leading-[1.18] py-1 px-2 transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet hover:via-lilac hover:to-sky max-w-full text-center"
              title="Click or slide below to email"
            >
              {email}
            </a>
          </Magnetic>

          {/* Highlighted Direct Call & WhatsApp Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Magnetic>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/90 border border-ink/15 hover:border-[#25D366]/60 hover:bg-[#25D366]/10 shadow-xs hover:shadow-[0_4px_16px_rgba(37,211,102,0.2)] transition-all duration-300"
                title="Chat on WhatsApp"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
                </span>
                <span className="font-display font-bold text-sm md:text-base text-ink group-hover:text-[#128C7E] transition-colors">
                  WhatsApp: {formattedPhoneNumber}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#128C7E] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  Instant Reply
                </span>
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href={`tel:${phoneNumber}`}
                data-cursor="hover"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream/90 border border-ink/15 hover:border-indigo-500/50 hover:bg-indigo-50 shadow-xs hover:shadow-[0_4px_16px_rgba(99,102,241,0.2)] transition-all duration-300"
                title="Call Directly"
              >
                <span className="text-indigo-600 group-hover:scale-110 transition-transform">
                  📞
                </span>
                <span className="font-display font-bold text-sm md:text-base text-ink group-hover:text-indigo-600 transition-colors">
                  Direct Call
                </span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Dual Interactive Sliders (Email + WhatsApp / Direct Call) */}
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mt-4">
          <MailSlider />
          <PhoneSlider />
        </div>
      </motion.div>

      <div className="relative z-10 mt-16 md:mt-24 w-full flex flex-col md:flex-row items-center justify-between gap-6 border-t border-ink/10 pt-8">
        <p className="font-body text-sm text-ink-soft">
          © {new Date().getFullYear()} Ansu V S
        </p>
        <div className="flex items-center gap-3 sm:pr-16">
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
                className={`p-2.5 rounded-full border border-ink/15 text-ink/75 hover:scale-110 transition-all duration-300 flex items-center justify-center ${
                  socialHoverColors[s.label] || "hover:text-ink"
                }`}
              >
                <SocialIcon name={s.label} size={18} />
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}
