import { ArrowUpRight } from "lucide-react";
import { navItems } from "@/data/challenge-engine";
import { ProceduralVisual } from "./ProceduralVisual";
import { TechnicalLabel } from "./Primitives";

export function PhilosophyAndFooter() {
  return <>
    <section className="final-cta"><div className="final-visual"><ProceduralVisual type="symmetry" /></div><div className="section-inner">
      <TechnicalLabel>CHALLENGE ENGINE</TechnicalLabel>
      <h2>TURN GREAT CHALLENGES<br />INTO <em>REPEATABLE CONTENT.</em></h2>
      <p>Challenge Engine is being built as a new kind of creative production system — where challenge design, visual identity, motion and sound can work together as one repeatable format.</p>
      <div><a href="#experience" className="button-primary">EXPLORE THE EXPERIENCE <ArrowUpRight size={16} /></a><a href="#status" className="button-secondary">VIEW THE PROJECT</a></div>
    </div></section>
    <footer>
      <div className="footer-brand"><span className="brand-mark">CE</span><div><b>CHALLENGE ENGINE</b><small>CHALLENGE-DRIVEN AUDIOVISUAL CONTENT SYSTEM</small></div></div>
      <nav>{navItems.map(([l, h]) => <a key={l} href={h}>{l}</a>)}</nav>
      <div className="footer-copy"><p>Built to turn challenge ideas into repeatable audiovisual experiences.</p><p className="footer-small">Behind the experience is a deterministic, modular and traceable production architecture.</p><small>C11-D · D7.5 FROZEN · D8.0 NEXT</small></div>
      <span className="footer-lab">CIBERPUNK.ES / LAB</span>
    </footer>
  </>;
}
