"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { socials } from "@/lib/content";

const links = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Aethra", href: "#aethra" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 md:py-7 mix-blend-difference">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
          className="font-display font-bold text-lg tracking-tight text-cream"
          data-cursor="hover"
        >
          Ansu V S
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 font-body text-sm font-medium text-cream flex items-center gap-2"
          data-cursor="hover"
          aria-label="Toggle menu"
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="relative w-6 h-4 flex flex-col justify-between">
            <span
              className={`block h-[1.5px] bg-cream transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] bg-cream transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-cream transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-ink flex flex-col justify-center px-6 md:px-10 overflow-hidden"
          >
            {/* Ambient menu glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/3 -right-20 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full opacity-25 blur-[120px]"
              style={{
                background:
                  "radial-gradient(circle, var(--color-violet) 0%, var(--color-lilac) 45%, var(--color-sky) 85%, transparent 100%)",
              }}
            />

            <nav className="relative z-10 flex flex-col gap-2 md:gap-3">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                  className="group flex items-center gap-4 font-display font-semibold text-cream text-[13vw] md:text-6xl leading-[1.05] transition-colors"
                  data-cursor="hover"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-sky opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cream group-hover:via-lilac group-hover:to-sky transition-all">
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative z-10 mt-10 md:mt-14 flex flex-wrap gap-x-6 gap-y-2"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.label === "Email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="font-body text-sm text-cream/60 hover:text-lilac transition-colors"
                  data-cursor="hover"
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
