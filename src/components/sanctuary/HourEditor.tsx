import { HourBlock, HourTag, TAGS, phaseForHour, PHASES } from "@/lib/sanctuary";

interface Props {
  block: HourBlock | null;
  onChange: (b: HourBlock) => void;
  onClose: () => void;
}

export function HourEditor({ block, onChange, onClose }: Props) {
  if (!block) {
    return (
      <div className="glass rounded-3xl p-8 h-full flex items-center justify-center text-center">
        <p className="text-muted-foreground max-w-xs">
          Tap a bead on the horizon to assign a state and leave a quiet note for that hour.
        </p>
      </div>
    );
  }
  const phase = phaseForHour(block.hour);
  const p = PHASES[phase];
  return (
    <div className="glass rounded-3xl p-6 md:p-8 animate-fade-in">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {p.icon} {p.label}
          </div>
          <div className="font-display text-5xl mt-1">
            {String(block.hour).padStart(2, "0")}:00
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          close
        </button>
      </div>

      <div className="space-y-2 mb-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">State</p>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(TAGS) as Exclude<HourTag, "none">[]).map((k) => {
            const t = TAGS[k];
            const active = block.tag === k;
            return (
              <button
                key={k}
                onClick={() => onChange({ ...block, tag: active ? "none" : k })}
                className={`rounded-xl px-3 py-2.5 text-left text-sm border transition-all ${
                  active ? "ring-2 ring-primary" : "hover:border-foreground/30"
                }`}
                style={{
                  background: active
                    ? `color-mix(in oklab, var(${t.varName}) 35%, transparent)`
                    : "var(--glass)",
                  borderColor: active ? `var(${t.varName})` : "var(--glass-border)",
                }}
              >
                <span className="mr-2">{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Intention</p>
        <textarea
          value={block.note}
          onChange={(e) => onChange({ ...block, note: e.target.value })}
          placeholder="A single line for this hour…"
          rows={3}
          className="w-full glass rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/60"
        />
      </div>
    </div>
  );
}
