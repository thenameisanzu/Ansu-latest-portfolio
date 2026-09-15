"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { socials, email } from "@/lib/content";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-10 pt-24 md:pt-36 pb-10 flex flex-col items-center text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-body text-sm text-ink-soft mb-4"
      >
        Have a project in mind?
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <Magnetic>
          <a
            href={`mailto:${email}`}
            data-cursor="hover"
            className="font-display font-extrabold text-ink text-[9vw] md:text-6xl tracking-tight leading-none hover:text-violet transition-colors"
          >
            {email}
          </a>
        </Magnetic>
      </motion.div>

      <div className="mt-16 md:mt-24 w-full flex flex-col md:flex-row items-center justify-between gap-6 border-t border-ink/10 pt-8">
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
                className="font-body text-sm text-ink-soft hover:text-ink transition-colors"
              >
                {s.label}
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}
