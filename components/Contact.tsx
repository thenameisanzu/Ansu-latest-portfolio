"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { socials, email } from "@/lib/content";

const socialHoverColors: Record<string, string> = {
  GitHub: "hover:text-violet",
  LinkedIn: "hover:text-sky",
  Instagram: "hover:text-lilac",
};

export default function Contact() {
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
        className="relative z-10"
      >
        <Magnetic>
          <a
            href={`mailto:${email}`}
            data-cursor="hover"
            className="group block font-display font-extrabold text-ink text-[9vw] md:text-6xl tracking-tight leading-none transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet hover:via-lilac hover:to-sky"
          >
            {email}
          </a>
        </Magnetic>
      </motion.div>

      <div className="relative z-10 mt-16 md:mt-24 w-full flex flex-col md:flex-row items-center justify-between gap-6 border-t border-ink/10 pt-8">
        <p className="font-body text-sm text-ink-soft">
          © {new Date().getFullYear()} Ansu V S
        </p>
        <div className="flex gap-6">
          {socials
            .filter((s) => s.label !== "Email")
            .map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className={`font-body text-sm text-ink-soft ${
                  socialHoverColors[s.label] || "hover:text-ink"
                } transition-colors font-medium`}
              >
                {s.label}
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}
