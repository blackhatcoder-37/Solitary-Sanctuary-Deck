export type HourTag = "none" | "code" | "art" | "ritual" | "rest";

export interface HourBlock {
  hour: number;
  tag: HourTag;
  note: string;
}

export type Phase = "night" | "morning" | "noon" | "dusk";

export const PHASES: Record<Phase, { label: string; icon: string; range: string; sky: string; textClass: string }> = {
  morning: { label: "Morning", icon: "🌅", range: "06–12", sky: "sky-morning", textClass: "text-on-sky-light" },
  noon:    { label: "Noon",    icon: "☀️", range: "12–17", sky: "sky-noon",    textClass: "text-on-sky-light" },
  dusk:    { label: "Dusk",    icon: "🌆", range: "17–21", sky: "sky-dusk",    textClass: "text-on-sky-light" },
  night:   { label: "Night",   icon: "🌌", range: "21–06", sky: "sky-night",   textClass: "text-on-sky-dark" },
};

export const TAGS: Record<Exclude<HourTag, "none">, { label: string; icon: string; varName: string }> = {
  code:   { label: "Code / Lethal Focus",   icon: "💻", varName: "--tag-code" },
  art:    { label: "Art / Creative Space",  icon: "🎨", varName: "--tag-art" },
  ritual: { label: "Ritual / Reset",        icon: "🧼", varName: "--tag-ritual" },
  rest:   { label: "Sanctuary / Rest",      icon: "🌌", varName: "--tag-rest" },
};

export function phaseForHour(h: number): Phase {
  if (h >= 6 && h < 12) return "morning";
  if (h >= 12 && h < 17) return "noon";
  if (h >= 17 && h < 21) return "dusk";
  return "night";
}

export function defaultBlocks(): HourBlock[] {
  return Array.from({ length: 24 }, (_, h) => ({ hour: h, tag: "none" as HourTag, note: "" }));
}

export function tagColor(tag: HourTag): string {
  if (tag === "none") return "transparent";
  return `var(${TAGS[tag].varName})`;
}
