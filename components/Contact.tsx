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
        className="relative z-10 w-full max-w-5xl flex flex-col items-center px-1 sm:px-2"
      >
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-ink mb-6 sm:mb-8">
          Let’s start a conversation
        </h2>

        {/* Grouped Contact Channels Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* 1. Email Group */}
          <div className="flex flex-col items-center justify-between p-5 sm:p-6 md:p-6 lg:p-8 rounded-3xl bg-ink/[0.03] border border-ink/10 backdrop-blur-md hover:border-violet/30 hover:shadow-[0_12px_32px_rgba(155,142,199,0.12)] transition-all duration-300 min-w-0">
            <div className="flex flex-col items-center gap-2 mb-3 sm:mb-4 w-full min-w-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-violet bg-violet/10 px-3 py-1 rounded-full shrink-0">
                <span>✉</span>
                <span>Direct Mail</span>
              </span>
              <Magnetic>
                <a
                  href={`mailto:${email}?subject=Project%20Inquiry%20—%20Ansu%20V%20S`}
                  data-cursor="hover"
                  className="block w-full font-display font-extrabold text-ink text-base sm:text-lg md:text-[1.2rem] lg:text-2xl xl:text-[1.55rem] tracking-tight hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet hover:to-sky transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis py-1 text-center"
                  title={email}
                >
                  {email}
                </a>
              </Magnetic>
            </div>

            {/* Slider for Email (Direct Mail / Copy) */}
            <div className="w-full">
              <MailSlider />
            </div>
          </div>

          {/* 2. Contact Number Group (WhatsApp / Direct Call) */}
          <div className="flex flex-col items-center justify-between p-5 sm:p-6 md:p-6 lg:p-8 rounded-3xl bg-ink/[0.03] border border-ink/10 backdrop-blur-md hover:border-[#25D366]/30 hover:shadow-[0_12px_32px_rgba(37,211,102,0.12)] transition-all duration-300 min-w-0">
            <div className="flex flex-col items-center gap-2 mb-3 sm:mb-4 w-full min-w-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-[#128C7E] bg-[#25D366]/10 px-3 py-1 rounded-full shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
                </span>
                <span>WhatsApp & Direct Call</span>
              </span>
              <Magnetic>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="block w-full font-display font-extrabold text-ink text-base sm:text-lg md:text-[1.2rem] lg:text-2xl xl:text-[1.55rem] tracking-tight hover:text-[#128C7E] transition-colors py-1 text-center whitespace-nowrap"
                  title="Click to chat on WhatsApp"
                >
                  {formattedPhoneNumber}
                </a>
              </Magnetic>
            </div>

            {/* Slider for Phone Number (Direct Call / WhatsApp) */}
            <div className="w-full">
              <PhoneSlider />
            </div>
          </div>
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
