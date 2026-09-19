"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { whatsappLink } from "@/lib/content";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let inContact = false;

    const contactEl = document.querySelector("#contact");
    let observer: IntersectionObserver | null = null;

    if (contactEl) {
      observer = new IntersectionObserver(
        ([entry]) => {
          inContact = entry.isIntersecting;
          updateVisibility();
        },
        { threshold: 0.1 }
      );
      observer.observe(contactEl);
    }

    const updateVisibility = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 250 && !inContact);
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 16 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          data-cursor="hover"
          aria-label="Chat on WhatsApp"
          className="group fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 inline-flex items-center gap-2.5 p-2 pr-4 md:p-2.5 md:pr-4.5 rounded-full bg-cream/95 text-ink border border-ink/15 shadow-[0_10px_30px_rgba(32,28,38,0.12)] hover:shadow-[0_14px_36px_rgba(37,211,102,0.28)] hover:border-[#25D366]/50 backdrop-blur-md transition-all duration-300 hover:scale-105"
        >
          {/* Authentic WhatsApp Green Icon Circle */}
          <span className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#25D366] text-white shadow-sm shrink-0 group-hover:scale-110 transition-transform">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
              aria-hidden="true"
              className="drop-shadow-xs"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>

            {/* Green Online Pulse Dot */}
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="status-dot-pulse absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366] border-2 border-white" />
            </span>
          </span>

          {/* Text & Micro-CTA */}
          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-xs md:text-sm text-ink leading-tight group-hover:text-[#128C7E] transition-colors">
              Chat on WhatsApp
            </span>
            <span className="font-body text-[10px] text-ink-soft leading-none hidden sm:inline">
              Instant reply
            </span>
          </div>

          <span className="text-xs text-ink/40 group-hover:text-ink group-hover:translate-x-0.5 transition-all ml-0.5">
            ↗
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
