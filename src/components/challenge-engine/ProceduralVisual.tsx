import { cn } from "@/lib/utils";

export function ProceduralVisual({ type, compact = false }: { type: string; compact?: boolean }) {
  const lines = Array.from({ length: compact ? 5 : 9 });
  const dots = Array.from({ length: compact ? 12 : 24 });
  return (
    <div className={cn("procedural-visual", `visual-${type}`, compact && "visual-compact")} aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-core" />
      <div className="visual-rings">{lines.map((_, i) => <i key={`r${i}`} style={{ "--i": i } as React.CSSProperties} />)}</div>
      <div className="visual-lines">{lines.map((_, i) => <i key={`l${i}`} style={{ "--i": i } as React.CSSProperties} />)}</div>
      <div className="visual-dots">{dots.map((_, i) => <i key={`d${i}`} style={{ "--i": i } as React.CSSProperties} />)}</div>
      <span className="visual-axis axis-x" /><span className="visual-axis axis-y" />
    </div>
  );
}