import { useState } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function PoeticCache({ value, onChange }: Props) {
  const [wiping, setWiping] = useState(false);

  const wipe = () => {
    setWiping(true);
    setTimeout(() => {
      onChange("");
      setWiping(false);
    }, 550);
  };

  return (
    <div className="glass rounded-3xl p-6 flex flex-col h-full min-h-[280px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-xl">Poetic Cache</h3>
        <button
          onClick={wipe}
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-destructive transition-colors"
        >
          wipe cache
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Dump thoughts, fleeting logic bugs, half-remembered poetry…"
        className={`flex-1 w-full bg-transparent border-0 focus:outline-none text-sm leading-relaxed resize-none placeholder:text-muted-foreground/60 ${
          wiping ? "fade-out" : ""
        }`}
      />
    </div>
  );
}
