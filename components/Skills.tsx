import { skills } from "@/lib/content";

function Row({ reverse = false }: { reverse?: boolean }) {
  const list = [...skills, ...skills];
  return (
    <div className="overflow-hidden no-scrollbar">
      <div
        className={`flex w-max gap-8 md:gap-12 ${
          reverse ? "marquee-track-reverse" : "marquee-track"
        }`}
      >
        {list.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="font-display font-extrabold text-[9vw] md:text-6xl leading-none tracking-tight text-ink/90 whitespace-nowrap"
          >
            {s}
          </span>
        ))}
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
