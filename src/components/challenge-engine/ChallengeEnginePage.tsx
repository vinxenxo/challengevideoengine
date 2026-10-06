import { useEffect, useState } from "react";
import { Activity, Cpu, Layers3, PackageCheck } from "lucide-react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Architecture } from "./Architecture";
import { AssetFamilies, Challenges, ContentWorlds, VisualSystems } from "./ContentSections";
import { Determinism, EvolutionRoadmap, PrinciplesStatus, ProvenanceAudio } from "./TechnicalSections";
import { PhilosophyAndFooter } from "./Footer";
import { GlowDivider, Reveal, SectionHeader, StatusBadge, TechnicalLabel } from "./Primitives";

const heroSeeds = [12345, 314159, 54321, 7770001, 998877];

export function ChallengeEnginePage() {
  const [seed, setSeed] = useState(12345);
  const [labMode, setLabMode] = useState(false);
  useEffect(() => { const timer = window.setInterval(() => setSeed((value) => heroSeeds[(heroSeeds.indexOf(value) + 1) % heroSeeds.length] ?? 12345), 4800); return () => window.clearInterval(timer); }, []);
  return <div className={labMode ? "challenge-site lab-mode" : "challenge-site"}>
    <a className="skip-link" href="#system">Skip to content</a><Navbar labMode={labMode} onToggleLab={() => setLabMode(v => !v)} /><main><Hero seed={seed} />
    <div className="status-strip">{([["C11-C","FROZEN","closed"],["C11-D","ACTIVE","active"],["D0","CLOSED","closed"],["D1","CLOSED","closed"],["D2","CLOSED","closed"],["D3","NEXT","next"]] as const).map(([key,value,tone]) => <div key={key}><span>{key}</span><StatusBadge tone={tone}>{value}</StatusBadge></div>)}</div>
    <section className="section intro-section" id="system"><div className="section-inner"><SectionHeader label="01 / THE SYSTEM" title={<>A VIDEO ENGINE,<br /><span>NOT A VIDEO TEMPLATE.</span></>} description="Challenge Engine does not simply place graphics around a prerecorded animation. It separates gameplay truth from presentation, audio and delivery so every generated video can be reproduced, inspected and evolved without rewriting the underlying mechanic." /><div className="layer-grid">{[[Cpu,"SIMULATION","The game decides what happened."],[Layers3,"PRESENTATION","The system decides how it is shown."],[Activity,"AUDIO","Music and sound become deterministic production layers."],[PackageCheck,"DELIVERY","The same content becomes platform-ready media."]].map(([Icon,title,text], i) => { const C = Icon as typeof Cpu; return <Reveal key={String(title)} delay={i*.07} className="layer-card"><C /><TechnicalLabel>0{i+1} / LAYER</TechnicalLabel><h3>{String(title)}</h3><p>{String(text)}</p></Reveal>})}</div><div className="seed-provenance"><span>SEED</span><i>+</i><span>PROVENANCE</span><p>Every important generation decision should remain traceable.</p></div></div></section>
    <GlowDivider /><Architecture /><ContentWorlds /><Challenges /><AssetFamilies /><VisualSystems /><Determinism seed={seed} onSeedChange={setSeed} /><ProvenanceAudio /><EvolutionRoadmap /><PrinciplesStatus /><PhilosophyAndFooter /></main>
    {labMode && <div className="lab-overlay" aria-hidden="true"><span>LAB_MODE / TRUE</span><span>VIEWPORT / PROCEDURAL</span><span>SEED / {seed}</span><span>C11-D / DEBUG GRID</span></div>}
  </div>;
}