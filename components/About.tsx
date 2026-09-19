"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import VoiceIntro from "@/components/VoiceIntro";

export default function About() {
  return (
    <section className="px-5 sm:px-8 md:px-10 lg:px-12 py-16 md:py-28 lg:py-36">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
        {/* Left column: Prominent Photo */}
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "0px" }}
          transition={{
            duration: 1.0,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full md:col-span-1 lg:col-span-5"
        >
          <div className="group relative aspect-[3/4] sm:aspect-[4/5] w-full max-w-md md:max-w-none mx-auto rounded-3xl overflow-hidden bg-ink/5 border border-ink/10 shadow-[0_16px_40px_rgba(32,28,38,0.08)] hover:shadow-[0_24px_50px_rgba(155,142,199,0.2)] transition-shadow duration-500">
            <Image
              src="/images/ansu.webp"
              alt="Ansu V S"
              fill
              sizes="(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 92vw"
              className="object-cover grayscale contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAaABMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDr1h8tdiu7AdC3Wqd1M8TFQOAOtXLx2SynngKlxGXTPTOK523a+ms5/PuhOdoKSBQrD1BA4qYtX1KnfluiY3bE52t+dFOhhh8lPNkbfjmiuj3SOVFTUNRvbaIjzd1uBghRhsUmj3IlIRkKAjKhvSq+sf8AHnJ/umnaX923/wB0U3BR2JqO9jYV5EUKHGB/sCimv99vrRV8kS7s/9k="
              priority
            />
            {/* Subtle violet tint to match pastel palette */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-color opacity-25"
              style={{ backgroundColor: "var(--color-violet)" }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, var(--color-violet) 100%)",
              }}
            />
          </div>
        </motion.div>

        {/* Right column: Bio paragraph & Action CTAs */}
        <div className="w-full md:col-span-1 lg:col-span-7 flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-semibold text-ink text-2xl sm:text-3xl md:text-[2rem] lg:text-4xl leading-[1.22] tracking-tight"
          >
            I design and build websites end to end — pitch, design, code,
            launch. Most of my work lives under Aethra, my own studio, where I
            make brands feel expensive without the bloat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-cream font-body text-xs md:text-sm font-medium hover:bg-violet hover:shadow-[0_8px_25px_rgba(155,142,199,0.35)] transition-all duration-300"
            >
              <span>Start a Project</span>
              <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="mailto:ansuvs047@gmail.com?subject=Project%20Inquiry%20—%2015-Min%20Intro%20Call"
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink/5 border border-ink/15 text-ink font-body text-xs md:text-sm font-medium hover:bg-cream hover:border-ink/30 hover:shadow-xs transition-all duration-300"
            >
              <span>Book 15-min Call</span>
              <span className="text-xs text-ink/60">↗</span>
            </a>
          </motion.div>

          <div className="pt-2">
            <VoiceIntro />
          </div>
        </div>
      </div>
    </section>
  );
}
