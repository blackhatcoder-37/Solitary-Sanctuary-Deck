import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { HourBlock, PHASES, defaultBlocks, phaseForHour } from "@/lib/sanctuary";
import { HourDeck } from "@/components/sanctuary/HourDeck";
import { HourEditor } from "@/components/sanctuary/HourEditor";
import { Soundscape } from "@/components/sanctuary/Soundscape";
import { PoeticCache } from "@/components/sanctuary/PoeticCache";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solitary Sanctuary Deck — A 24-Hour Horizon" },
      { name: "description", content: "A quiet, Ghibli-flavored dashboard for one continuous day. Beads of hours, ambient sound, and a poetic cache." },
      { property: "og:title", content: "Solitary Sanctuary Deck" },
      { property: "og:description", content: "A 24-hour horizon loop for the solitary maker." },
    ],
  }),
  component: Sanctuary,
});

function Sanctuary() {
  const [blocks, setBlocks] = useLocalStorage<HourBlock[]>("sanctuary.blocks.v1", defaultBlocks());
  const [cache, setCache] = useLocalStorage<string>("sanctuary.cache.v1", "");
  const [selected, setSelected] = useState<number | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const currentHour = now.getHours();
  const phase = phaseForHour(currentHour);
  const phaseInfo = PHASES[phase];

  const selectedBlock = useMemo(
    () => (selected === null ? null : blocks.find((b) => b.hour === selected) ?? null),
    [selected, blocks],
  );

  const updateBlock = (b: HourBlock) =>
    setBlocks(blocks.map((x) => (x.hour === b.hour ? b : x)));

  const tagged = blocks.filter((b) => b.tag !== "none").length;
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`relative min-h-screen ${phaseInfo.sky} transition-[background] duration-1000`}>
      {/* drifting orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="drift absolute -top-20 -left-20 h-80 w-80 rounded-full opacity-30 blur-3xl"
             style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }} />
        <div className="drift absolute bottom-0 right-0 h-96 w-96 rounded-full opacity-25 blur-3xl"
             style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)", animationDelay: "-9s" }} />
      </div>

      <div className={`relative z-10 mx-auto max-w-7xl px-5 md:px-10 py-10 md:py-14 ${phaseInfo.textClass}`}>
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] opacity-70">
              {phaseInfo.icon} {phaseInfo.label} · {phaseInfo.range}
            </p>
            <h1 className="font-display text-5xl md:text-7xl mt-2 leading-[0.95]">
              Solitary<br />Sanctuary Deck
            </h1>
          </div>
          <div className="text-right">
            <div className="font-display text-4xl md:text-5xl tabular-nums">{timeStr}</div>
            <p className="text-xs uppercase tracking-[0.2em] opacity-70 mt-1">
              {tagged}/24 hours tended
            </p>
          </div>
        </header>

        {/* Horizon + Editor */}
        <section className="grid lg:grid-cols-3 gap-5 mb-5">
          <div className="lg:col-span-2">
            <HourDeck
              blocks={blocks}
              currentHour={currentHour}
              selected={selected}
              onSelect={(h) => setSelected(selected === h ? null : h)}
            />
          </div>
          <div>
            <HourEditor
              block={selectedBlock}
              onChange={updateBlock}
              onClose={() => setSelected(null)}
            />
          </div>
        </section>

        {/* Sound + Cache */}
        <section className="grid lg:grid-cols-3 gap-5">
          <Soundscape />
          <div className="lg:col-span-2">
            <PoeticCache value={cache} onChange={setCache} />
          </div>
        </section>

        <footer className="mt-12 text-center text-xs uppercase tracking-[0.3em] opacity-60">
          one revolution · saved quietly in this browser
        </footer>
      </div>
    </div>
  );
}
