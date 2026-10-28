import { cn } from "@/lib/utils";

export interface VBarDatum {
  label: string;
  value: number;
}

/** Lightweight vertical bar chart built from divs — no chart library. */
export function VBarChart({
  data,
  ariaLabel,
  className,
}: {
  data: VBarDatum[];
  ariaLabel: string;
  className?: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className={cn("w-full", className)}>
      <div className="flex h-40 items-end gap-1.5" role="img" aria-label={ariaLabel}>
        {data.map((d, i) => (
          <div key={i} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1">
            <span className="text-[10px] font-semibold text-muted-foreground">{d.value}</span>
            <div
              className="w-full max-w-8 rounded-t-sm bg-gradient-to-t from-wood-dark to-wood"
              style={{ height: `${Math.max(2, (d.value / max) * 100)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-1.5">
        {data.map((d, i) => (
          <span key={i} className="min-w-0 flex-1 truncate text-center text-[9px] text-muted-foreground">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export type HBarTone = "gold" | "wood" | "destructive";

export interface HBarRow {
  label: string;
  segments: { value: number; tone: HBarTone }[];
  caption?: string;
}

const TONE_CLASS: Record<HBarTone, string> = {
  gold: "bg-gold",
  wood: "bg-wood",
  destructive: "bg-destructive",
};

export interface HBarLegendItem {
  tone: HBarTone;
  label: string;
}

/** Lightweight horizontal bar chart built from divs — no chart library. */
export function HBarChart({
  rows,
  ariaLabel,
  legend,
  className,
}: {
  rows: HBarRow[];
  ariaLabel: string;
  legend?: HBarLegendItem[];
  className?: string;
}) {
  const scale = Math.max(1, ...rows.map((r) => r.segments.reduce((s, seg) => s + seg.value, 0)));
  return (
    <div className={cn("flex flex-col gap-3", className)} role="img" aria-label={ariaLabel}>
      {rows.map((row) => (
        <div key={row.label} className="flex items-center gap-3">
          <span className="w-20 shrink-0 truncate text-xs font-medium text-muted-foreground">
            {row.label}
          </span>
          <div className="flex h-4 min-w-0 flex-1 gap-px overflow-hidden rounded-full bg-muted">
            {row.segments.map((seg, i) => (
              <div
                key={i}
                className={cn("h-full", TONE_CLASS[seg.tone])}
                style={{ width: `${(seg.value / scale) * 100}%` }}
              />
            ))}
          </div>
          <span className="w-24 shrink-0 text-right text-xs text-muted-foreground">
            {row.caption}
          </span>
        </div>
      ))}
      {legend && (
        <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-wider text-muted-foreground">
          {legend.map((item) => (
            <span key={item.tone} className="flex items-center gap-1.5">
              <span className={cn("inline-block h-2.5 w-2.5 rounded-sm", TONE_CLASS[item.tone])} />
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
