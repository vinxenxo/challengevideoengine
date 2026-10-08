import { ArrowDownRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { projectStatus } from "@/data/challenge-engine";
import { ProceduralVisual } from "./ProceduralVisual";
import { TechnicalLabel } from "./Primitives";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-procedural"><ProceduralVisual type="forces" /></div>
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <TechnicalLabel className="eyebrow"><span /> CREATIVE PRODUCTION SYSTEM</TechnicalLabel>
        <h1>TURN CHALLENGES<br />INTO CONTENT PEOPLE<br /><em>WANT TO WATCH.</em></h1>
        <p className="hero-lead">Challenge Engine is a creative production system for building visually engaging challenge videos and audiovisual experiences — combining challenge mechanics, motion, sound and social-first presentation into one repeatable format.</p>
        <p className="proof-line">{projectStatus.challengeFormats} CHALLENGE FORMATS <i /> {projectStatus.visualWorlds} VISUAL WORLDS <i /> REPEATABLE PRODUCTION</p>
        <div className="hero-actions"><a href="#experience" className="button-primary"><Play size={15} fill="currentColor" /> EXPLORE THE EXPERIENCE</a><a href="#how" className="button-secondary">SEE HOW IT WORKS <ArrowDownRight size={16} /></a></div>
      </motion.div>
      <motion.div className="engine-shell" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
        <div className="engine-window product-preview">
          <div className="engine-window-head"><TechnicalLabel>CHALLENGE EXPERIENCE / CONCEPT PREVIEW</TechnicalLabel></div>
          <div className="engine-screen preview-screen"><ProceduralVisual type="waves" compact /><span className="frame-corner corner-a" /><span className="frame-corner corner-b" /><div className="preview-caption"><b>KEY</b><span>Geometric Waves world</span></div></div>
          <dl className="engine-data"><div><dt>FORMAT</dt><dd>CHALLENGE VIDEO</dd></div><div><dt>VISUAL WORLD</dt><dd>GEOMETRIC WAVES</dd></div><div><dt>FRAME</dt><dd>VERTICAL 9:16</dd></div><div><dt>SOUND</dt><dd>CREATIVE DIRECTION</dd></div></dl>
        </div>
        <p className="concept-note">PROCEDURAL VISUAL / PRODUCT DIRECTION — ILLUSTRATIVE, NOT A RENDER</p>
      </motion.div>
    </section>
  );
}
