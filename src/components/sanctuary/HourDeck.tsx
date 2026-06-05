import { HourBlock, phaseForHour, tagColor } from "@/lib/sanctuary";

interface Props {
  blocks: HourBlock[];
  currentHour: number;
  selected: number | null;
  onSelect: (h: number) => void;
}

export function HourDeck({ blocks, currentHour, selected, onSelect }: Props) {
  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-display text-2xl md:text-3xl">The 24-Hour Horizon</h2>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          24 beads · one revolution
        </span>
      </div>
      <div className="grid grid-cols-12 md:grid-cols-24 gap-2">
        {blocks.map((b) => {
          const phase = phaseForHour(b.hour);
          const isNow = b.hour === currentHour;
          const isSel = b.hour === selected;
          const filled = b.tag !== "none";
          return (
            <button
              key={b.hour}
              onClick={() => onSelect(b.hour)}
              className={`hour-bead group relative aspect-square rounded-xl flex flex-col items-center justify-center border ${
                isSel ? "ring-2 ring-primary" : ""
              } ${isNow ? "border-primary" : "border-glass-border"}`}
              style={{
                background: filled
                  ? `linear-gradient(160deg, ${tagColor(b.tag)} 0%, color-mix(in oklab, ${tagColor(b.tag)} 60%, transparent) 100%)`
                  : "var(--glass)",
              }}
              title={`${String(b.hour).padStart(2, "0")}:00 · ${phase}`}
            >
              <span className="text-[10px] md:text-xs font-mono opacity-80">
                {String(b.hour).padStart(2, "0")}
              </span>
              {isNow && (
                <span className="breathing absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <Legend swatch="var(--tag-code)" label="Code" />
        <Legend swatch="var(--tag-art)" label="Art" />
        <Legend swatch="var(--tag-ritual)" label="Ritual" />
        <Legend swatch="var(--tag-rest)" label="Rest" />
      </div>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-3 w-3 rounded-full" style={{ background: swatch }} />
      {label}
    </span>
  );
}
