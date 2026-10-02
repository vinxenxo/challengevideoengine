import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TechnicalLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground", className)}>{children}</span>;
}

export function StatusBadge({ children, tone = "planned" }: { children: ReactNode; tone?: string }) {
  return <span className={cn("status-badge", `status-${tone}`)}><span className="status-dot" />{children}</span>;
}

export function SectionHeader({ label, title, description, align = "left" }: { label: string; title: ReactNode; description?: string; align?: "left" | "center" }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
      className={cn("section-heading", align === "center" && "mx-auto text-center")}
    >
      <TechnicalLabel className="text-primary">{label}</TechnicalLabel>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.header>
  );
}

export function GlowDivider() {
  return <div className="glow-divider" aria-hidden="true"><span /></div>;
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay }} className={className}>{children}</motion.div>;
}

export function CodePanel({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return <div className={cn("code-panel", className)}><div className="code-panel-head"><TechnicalLabel>{label}</TechnicalLabel><span className="panel-lights"><i /><i /><i /></span></div>{children}</div>;
}