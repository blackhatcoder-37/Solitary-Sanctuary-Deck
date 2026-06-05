import { useEffect, useRef, useState } from "react";

const SOUNDS = [
  { id: "rain",  label: "Rain on glass",   icon: "🌧️", src: "https://cdn.pixabay.com/audio/2022/03/15/audio_3d889c2b25.mp3" },
  { id: "cafe",  label: "Distant café",    icon: "☕", src: "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d57a.mp3" },
  { id: "train", label: "Lo-fi train",     icon: "🚂", src: "https://cdn.pixabay.com/audio/2022/03/10/audio_d0c4c1d0d7.mp3" },
];

export function Soundscape() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const refs = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    Object.entries(refs.current).forEach(([id, el]) => {
      if (!el) return;
      el.volume = volume;
      if (id === playing) el.play().catch(() => {});
      else { el.pause(); }
    });
  }, [playing, volume]);

  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl">Solitary Soundscape</h3>
        <span className="text-xs text-muted-foreground">{playing ? "playing" : "silent"}</span>
      </div>
      <div className="space-y-2">
        {SOUNDS.map((s) => {
          const active = playing === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setPlaying(active ? null : s.id)}
              className={`w-full flex items-center justify-between rounded-xl px-4 py-3 border transition-all text-sm ${
                active ? "ring-2 ring-primary border-primary" : "border-glass-border hover:border-foreground/30"
              }`}
              style={{ background: active ? "color-mix(in oklab, var(--primary) 18%, transparent)" : "var(--glass)" }}
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{s.icon}</span>
                {s.label}
              </span>
              <span className="text-xs font-mono opacity-70">{active ? "▌▌" : "▶"}</span>
              <audio
                ref={(el) => { refs.current[s.id] = el; }}
                src={s.src}
                loop
                preload="none"
              />
            </button>
          );
        })}
      </div>
      <div className="mt-4">
        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Volume</label>
        <input
          type="range" min={0} max={1} step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full accent-primary mt-1"
        />
      </div>
    </div>
  );
}
