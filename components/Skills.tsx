import { skills } from "@/lib/content";

const paletteTints = [
  { bg: "bg-sky/15", border: "border-sky/35", text: "text-ink" },
  { bg: "bg-lilac/20", border: "border-lilac/45", text: "text-ink" },
  { bg: "bg-violet/15", border: "border-violet/35", text: "text-ink" },
];

function Row({ reverse = false }: { reverse?: boolean }) {
  const list = [...skills, ...skills];
  return (
    <div className="overflow-hidden no-scrollbar py-2">
      <div
        className={`flex w-max gap-4 md:gap-6 ${
          reverse ? "marquee-track-reverse" : "marquee-track"
        }`}
      >
        {list.map((s, i) => {
          const tint = paletteTints[i % paletteTints.length];
          return (
            <span
              key={`${s}-${i}`}
              data-cursor="hover"
              className={`font-display font-bold text-3xl md:text-5xl leading-none tracking-tight whitespace-nowrap px-6 py-4 md:px-8 md:py-5 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-md ${tint.bg} ${tint.border} ${tint.text}`}
            >
              {s}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-36 border-y border-ink/10">
      <p className="px-6 md:px-10 font-body text-sm text-ink-soft mb-8 md:mb-10">
        What I work with
      </p>
      <div className="flex flex-col gap-4 md:gap-6">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
