import { ArrowDownRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { ProceduralVisual } from "./ProceduralVisual";
import { StatusBadge, TechnicalLabel } from "./Primitives";

export function Hero({ seed }: { seed: number }) {
  return (
    <section className="hero" id="top">
      <div className="hero-procedural"><ProceduralVisual type="forces" /></div>
      <div className="hero-coordinates" aria-hidden="true"><span>X 042.16</span><span>Y 118.04</span><span>SYS/CE-D</span></div>
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <TechnicalLabel className="eyebrow"><span /> C11-D / PROCEDURAL VIDEO SYSTEM</TechnicalLabel>
        <h1>TURN GAMEPLAY<br />INTO REPRODUCIBLE<br /><em>VIDEO.</em></h1>
        <p className="hero-lead">Challenge Engine is a deterministic audiovisual production system built to turn game mechanics into reproducible, presentation-ready vertical videos.</p>
        <p className="hero-secondary">Simulation truth stays immutable.<br />Everything around it becomes programmable, declarative and traceable.</p>
        <div className="hero-actions"><a href="#system" className="button-primary"><Play size={15} fill="currentColor" /> EXPLORE THE SYSTEM</a><a href="#roadmap" className="button-secondary">VIEW THE ROADMAP <ArrowDownRight size={16} /></a></div>
        <div className="hero-metadata"><span>720 × 1280 <small>SOCIAL DELIVERY</small></span><i /> <span>30 FPS</span><i /><span>DETERMINISTIC</span><i /><span>PROCEDURAL</span></div>
      </motion.div>
      <motion.div className="engine-shell" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
        <div className="engine-window"><div className="engine-window-head"><TechnicalLabel>SYSTEM PREVIEW / CONCEPTUAL</TechnicalLabel><StatusBadge tone="active">ONLINE</StatusBadge></div><div className="engine-screen"><ProceduralVisual type="waves" compact /><span className="frame-corner corner-a" /><span className="frame-corner corner-b" /><span className="engine-target">+</span></div><dl className="engine-data"><div><dt>CHALLENGE</dt><dd>CHALLENGE_001 / KEY</dd></div><div><dt>SEED</dt><dd className="accent-value">{seed}</dd></div><div><dt>FRAME</dt><dd>0540</dd></div><div><dt>FPS</dt><dd>30</dd></div><div><dt>STATUS</dt><dd className="acid-value">DETERMINISTIC</dd></div><div><dt>PRESENTATION</dt><dd>LOCKED</dd></div><div><dt>AUDIO</dt><dd>READY</dd></div></dl></div>
        <p className="concept-note">CONCEPTUAL VISUALIZATION — NOT A LIVE ENGINE INSTANCE</p>
      </motion.div>
    </section>
  );
}