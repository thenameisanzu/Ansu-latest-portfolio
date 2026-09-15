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
            className="fixed inset-0 z-40 bg-ink flex flex-col justify-center px-6 md:px-10"
          >
            <nav className="flex flex-col gap-2 md:gap-3">
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
                  className="font-display font-semibold text-cream text-[13vw] md:text-6xl leading-[1.05] hover:text-violet transition-colors"
                  data-cursor="hover"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 md:mt-14 flex flex-wrap gap-x-6 gap-y-2"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.label === "Email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="font-body text-sm text-cream/60 hover:text-cream transition-colors"
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
