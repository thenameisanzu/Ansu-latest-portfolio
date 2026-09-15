"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { socials, email } from "@/lib/content";
import { SocialIcon } from "@/components/SocialIcons";

const socialHoverColors: Record<string, string> = {
  GitHub: "hover:text-violet hover:border-violet/40 hover:bg-violet/10",
  LinkedIn: "hover:text-sky hover:border-sky/40 hover:bg-sky/10",
  Instagram: "hover:text-lilac hover:border-lilac/40 hover:bg-lilac/10",
};

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 md:px-10 pt-24 md:pt-36 pb-10 flex flex-col items-center text-center"
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
        className="relative z-10 w-full max-w-full flex flex-col items-center px-2"
      >
        <Magnetic>
          <a
            href={`mailto:${email}`}
            onClick={handleCopy}
            data-cursor="hover"
            className="group block font-display font-extrabold text-ink text-[clamp(1.25rem,5.6vw,3.75rem)] md:text-5xl lg:text-6xl tracking-tight leading-none transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet hover:via-lilac hover:to-sky max-w-full text-center select-none"
            title="Click to copy email"
          >
            {email}
          </a>
        </Magnetic>

        <div className="h-8 mt-3 flex items-center justify-center">
          {copied ? (
            <motion.span
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink text-cream text-xs font-body font-medium shadow-md border border-cream/20"
            >
              <span>Copied to clipboard!</span>
              <span className="text-sky">✦</span>
            </motion.span>
          ) : (
            <span className="text-xs font-body text-ink-soft/60">
              click to copy or open mail
            </span>
          )}
        </div>
      </motion.div>

      <div className="relative z-10 mt-16 md:mt-24 w-full flex flex-col md:flex-row items-center justify-between gap-6 border-t border-ink/10 pt-8">
        <p className="font-body text-sm text-ink-soft">
          © {new Date().getFullYear()} Ansu V S
        </p>
        <div className="flex items-center gap-3">
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
