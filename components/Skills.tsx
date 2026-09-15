import { skills } from "@/lib/content";

const paletteTints = [
  { bg: "bg-sky/20", border: "border-sky/40", text: "text-ink" },
  { bg: "bg-lilac/25", border: "border-lilac/50", text: "text-ink" },
  { bg: "bg-violet/20", border: "border-violet/40", text: "text-ink" },
];

function SkillItems() {
  return (
    <div className="flex shrink-0 items-center gap-3 md:gap-6 pr-3 md:pr-6">
      {skills.map((s, i) => {
        const tint = paletteTints[i % paletteTints.length];
        return (
          <span
            key={`${s}-${i}`}
            data-cursor="hover"
            className={`font-display font-bold text-xl md:text-5xl leading-none tracking-tight whitespace-nowrap px-4 py-2.5 md:px-8 md:py-5 rounded-full border transition-transform duration-300 hover:scale-105 ${tint.bg} ${tint.border} ${tint.text}`}
          >
            {s}
          </span>
        );
      })}
    </div>
  );
}

function Row({ reverse = false }: { reverse?: boolean }) {
  const animClass = reverse
    ? "animate-marquee-track-reverse"
    : "animate-marquee-track";

  return (
    <div className="flex overflow-hidden no-scrollbar py-1 md:py-2 select-none">
      <div className={animClass}>
        <SkillItems />
      </div>
      <div className={animClass} aria-hidden="true">
        <SkillItems />
      </div>
      <div className={animClass} aria-hidden="true">
        <SkillItems />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-36 border-y border-ink/10 overflow-hidden">
      <p className="px-6 md:px-10 font-body text-sm text-ink-soft mb-6 md:mb-10">
        What I work with
      </p>
      <div className="flex flex-col gap-3 md:gap-6">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
