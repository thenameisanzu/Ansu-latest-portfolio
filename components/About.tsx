"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import VoiceIntro from "@/components/VoiceIntro";

export default function About() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-36">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 items-center">
        {/* Left column / top on mobile: Photo */}
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "0px" }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="md:col-span-5 md:col-start-1"
        >
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:max-w-none rounded-2xl md:rounded-3xl overflow-hidden bg-ink/5 border border-ink/10 shadow-sm">
            <Image
              src="/images/ansu.webp"
              alt="Ansu V S"
              fill
              sizes="(min-width: 1024px) 35vw, (min-width: 768px) 45vw, 90vw"
              className="object-cover grayscale contrast-[1.05]"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAaABMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDr1h8tdiu7AdC3Wqd1M8TFQOAOtXLx2SynngKlxGXTPTOK523a+ms5/PuhOdoKSBQrD1BA4qYtX1KnfluiY3bE52t+dFOhhh8lPNkbfjmiuj3SOVFTUNRvbaIjzd1uBghRhsUmj3IlIRkKAjKhvSq+sf8AHnJ/umnaX923/wB0U3BR2JqO9jYV5EUKHGB/sCimv99vrRV8kS7s/9k="
            />
            {/* Subtle violet tint to match pastel palette */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-color opacity-30"
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

        {/* Right column / below on mobile: Bio paragraph & Action CTAs */}
        <div className="md:col-span-6 md:col-start-7 flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7 }}
            className="font-display font-semibold text-ink text-[clamp(1.45rem,6.2vw,2.5rem)] md:text-4xl leading-[1.25] tracking-tight"
          >
            I design and build websites end to end — pitch, design, code,
            launch. Most of my work lives under Aethra, my own studio, where I
            make brands feel expensive without the bloat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-cream font-body text-xs md:text-sm font-medium hover:bg-violet transition-colors"
            >
              <span>Start a Project</span>
              <span className="text-xs">→</span>
            </a>
            <a
              href="mailto:ansuvs047@gmail.com?subject=Project%20Inquiry%20—%2015-Min%20Intro%20Call"
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink/5 border border-ink/15 text-ink font-body text-xs md:text-sm font-medium hover:bg-cream hover:border-ink/30 transition-all"
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
