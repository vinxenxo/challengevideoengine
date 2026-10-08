import { Activity, Eye, Gamepad2, Palette, Target } from "lucide-react";
import { benefits, challenges, contentWorlds, experienceParts, loopFamilies, steps } from "@/data/challenge-engine";
import { ProceduralVisual } from "./ProceduralVisual";
import { Reveal, SectionHeader, TechnicalLabel } from "./Primitives";

const partIcons = [Gamepad2, Palette, Activity, Eye];

export function WhatItIs() {
  return <section className="section intro-section" id="what"><div className="section-inner">
    <SectionHeader label="WHAT IT IS" title={<>MORE THAN A TEMPLATE.<br /><span>A SYSTEM FOR CREATING CHALLENGE CONTENT.</span></>} description="Challenge Engine is designed around a simple idea: a great challenge can become much more than a game mechanic. It can become a repeatable video format with its own visual identity, motion language, sound and editorial style." />
    <div className="layer-grid">{experienceParts.map((part, i) => { const Icon = partIcons[i] ?? Gamepad2; return <Reveal key={part.title} delay={i * .07} className="layer-card"><Icon /><h3>{part.title}</h3><p>{part.text}</p></Reveal>; })}</div>
  </div></section>;
}

export function HowItWorks() {
  return <section className="section" id="how"><div className="section-inner">
    <SectionHeader label="HOW IT WORKS" title={<>FROM IDEA<br /><span>TO REPEATABLE FORMAT.</span></>} />
    <ol className="steps-grid">{steps.map((step, i) => <Reveal key={step.id} delay={i * .08} className="step-card"><span className="step-id">{step.id}</span><h3>{step.title}</h3><p>{step.text}</p></Reveal>)}</ol>
  </div></section>;
}

export function ContentWorlds() {
  return <section className="section" id="experience"><div className="section-inner">
    <SectionHeader label="EXPERIENCE" title={<>THREE WAYS TO EXPERIENCE<br /><span>CHALLENGE ENGINE.</span></>} />
    <div className="world-grid">{contentWorlds.map((world, index) => <Reveal key={world.title} delay={index * .08} className="world-card visual-card"><div className="visual-card-art"><ProceduralVisual type={world.visual} compact /></div><div className="world-index">{world.index}</div><h3>{world.title}</h3><p>{world.text}</p></Reveal>)}</div>
  </div></section>;
}

export function Challenges() {
  return <section className="section challenges-section" id="challenges"><div className="section-inner">
    <SectionHeader label="THE CHALLENGE LIBRARY" title={<>NINE CHALLENGE FORMATS.<br /><span>ONE CREATIVE SYSTEM.</span></>} description="The current Challenge Engine baseline contains nine recovered and normalized challenge formats — giving the system a real content foundation rather than a single demo mechanic." />
    <div className="challenge-grid">{challenges.map((name, index) => <Reveal key={name} delay={(index % 3) * .06} className="challenge-card"><div className={`challenge-glyph glyph-${(index % 5) + 1}`}><span /><i /><b>{String(index + 1).padStart(2, "0")}</b></div><h3>{name}</h3><p className="challenge-desc">Challenge format</p></Reveal>)}</div>
  </div></section>;
}

export function VisualSystems() {
  const drills = ["TRACKING", "SACCADE", "PURSUIT", "PERIPHERAL"];
  return <>
    <section className="section loops-section" id="worlds"><div className="section-inner">
      <SectionHeader label="VISUAL WORLDS" title={<>FIVE VISUAL WORLDS.<br /><span>COUNTLESS WAYS TO FEEL THEM.</span></>} description="Same system. Never the same-looking video." />
      <div className="loop-grid">{loopFamilies.map((family, index) => <Reveal key={family.name} className={`loop-card loop-card-${index + 1}`}><ProceduralVisual type={family.type} compact /><div><TechnicalLabel>WORLD {String(index + 1).padStart(2, "0")}</TechnicalLabel><h3>{family.name}</h3><p>{family.text}</p></div></Reveal>)}</div>
    </div></section>
    <section className="section drills-section"><div className="section-inner drill-layout">
      <div><SectionHeader label="ATTENTION" title={<>DESIGNED TO<br /><span>HOLD ATTENTION.</span></>} description="Challenge Engine treats motion as part of the experience — not decoration. Movement can create anticipation, visual tension, focus and rhythm." /><p className="section-copy">Visual Drills are the clearest example: motion deliberately designed around tracking, pursuit, saccades and peripheral awareness.</p></div>
      <div className="drill-orbit"><div className="orbit-center"><Target /><small>ATTENTION<br />BY DESIGN</small></div>{drills.map((name, i) => <div key={name} className={`orbit-item orbit-item-${i + 1}`}><span>{name}</span></div>)}</div>
    </div></section>
  </>;
}

export function VisualIdentity() {
  return <section className="section asset-section"><div className="section-inner">
    <SectionHeader label="VISUAL IDENTITY" title={<>CONSISTENCY<br /><span>WITHOUT REPETITION.</span></>} description="A reusable visual system makes it possible to build a recognizable identity without forcing every video to look the same." />
    <div className="benefit-grid">{benefits.map((b, i) => <Reveal key={b.title} delay={i * .08} className="benefit"><h3>{b.title}</h3><p>{b.text}</p></Reveal>)}</div>
    <details className="tech-details"><summary>Technical detail</summary><p>Visual assets are organized into declarative asset families. Identity, family and role stay separate, so an asset can be reused across formats without the formats collapsing into one. Where evidence for a family is missing, it is recorded as unknown rather than guessed.</p></details>
  </div></section>;
}
