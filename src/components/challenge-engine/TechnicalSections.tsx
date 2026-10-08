import { Check, Minus, Volume2 } from "lucide-react";
import { evolution, isList, isNotList, possibilities, principles, progression, projectStatus, roadmap, stages } from "@/data/challenge-engine";
import { CodePanel, Reveal, SectionHeader, StatusBadge, TechnicalLabel } from "./Primitives";
import { ProceduralVisual } from "./ProceduralVisual";

export function Consistency() {
  return <section className="section determinism-section"><div className="section-inner">
    <SectionHeader label="CONSISTENCY" title={<>CONSISTENT<br /><span>BY DESIGN.</span></>} description="When a creative setup is defined, the system is designed so it can be reproduced consistently rather than rebuilt by hand from scratch." />
    <div className="repeat-proof"><span>REPEATABLE INPUTS</span><b>→</b><span>REPEATABLE STRUCTURE</span></div>
    <details className="tech-details"><summary>How it works underneath</summary><p>Under the hood, Challenge Engine separates gameplay and audiovisual randomness by responsibility so creative variation does not silently change the underlying challenge.</p></details>
  </div></section>;
}

export function ProvenanceAudio() {
  return <>
    <section className="section provenance-section"><div className="section-inner provenance-layout">
      <SectionHeader label="TRUST" title={<>KNOW HOW YOUR<br /><span>CONTENT WAS CREATED.</span></>} description="The system keeps the important production decisions connected to the content they create. That makes the process easier to reproduce, validate and evolve." />
      <CodePanel label="FOR THE TECHNICAL READER" className="secondary-panel"><div className="trace-panel"><b>TRACEABLE PRODUCTION</b><p>Challenge definition → production intent → catalog entry → identity → provenance</p></div></CodePanel>
    </div></section>
    <section className="section audio-section"><div className="audio-visual"><ProceduralVisual type="waves" /></div><div className="section-inner audio-content">
      <SectionHeader label="SOUND" title={<>SOUND THAT BELONGS<br /><span>TO THE EXPERIENCE.</span></>} description="Audio is treated as part of the creative identity rather than an unrelated soundtrack added at the end." />
      <p className="audio-note">The procedural music foundation has been developed and validated.</p>
      <div className="style-profile"><TechnicalLabel>PLANNED CHALLENGE SOUND PROFILE</TechnicalLabel><strong><Volume2 size={18} /> 8-BIT / CHIPTUNE</strong><StatusBadge tone="next">CREATIVE DIRECTION</StatusBadge></div>
      <small>The planned Challenge sound identity is inspired by 8-bit / chiptune aesthetics. It is a creative direction, not yet a finished production profile.</small>
    </div></section>
  </>;
}

export function Possibilities() {
  return <section className="section"><div className="section-inner">
    <SectionHeader label="WHAT MAKES IT DIFFERENT" title={<>ONE IDEA.<br /><span>MANY CONTENT POSSIBILITIES.</span></>} />
    <div className="benefit-grid four">{possibilities.map((p, i) => <Reveal key={p.title} delay={i * .07} className="benefit"><h3>{p.title}</h3><p>{p.text}</p></Reveal>)}</div>
  </div></section>;
}

export function EvolutionRoadmap() {
  return <section className="section evolution-section"><div className="section-inner">
    <SectionHeader label="THE JOURNEY" title={<>FROM EXPERIMENTS TO A<br /><span>REPEATABLE CONTENT SYSTEM.</span></>} />
    <div className="evolution-track">{evolution.map((item, i) => <Reveal key={item.title} delay={i * .08} className="evolution-node"><span>{String(i + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p><TechnicalLabel>{item.meta}</TechnicalLabel></Reveal>)}</div>
  </div></section>;
}

export function StatusToday() {
  return <section className="section status-section" id="status"><div className="section-inner">
    <SectionHeader label="STATUS" title={<>WHERE CHALLENGE ENGINE<br /><span>IS TODAY.</span></>} />
    <div className="stage-grid">{stages.map((s) => <Reveal key={s.title} className={`stage stage-${s.tone}`}><StatusBadge tone={s.tone}>{s.status}</StatusBadge><h3>{s.title}</h3><p>{s.text}</p></Reveal>)}</div>
    <div className="proof-strip"><div><b>{projectStatus.challengeFormats}</b><span>CHALLENGE FORMATS</span></div><div><b>{projectStatus.visualWorlds}</b><span>VISUAL WORLDS</span></div><div><b>{projectStatus.productionCases}</b><span>VALIDATED PRODUCTION CONFIGURATIONS</span></div><div><b>D7</b><span>FROZEN</span></div></div>
    <div id="roadmap" className="roadmap-block">
      <TechnicalLabel className="text-primary">ROADMAP</TechnicalLabel>
      <ol className="progression">{progression.map((p) => <li key={p.title} className={`prog-${p.state}`}><i /><b>{p.title}</b>{"note" in p && <small>{p.note}</small>}</li>)}</ol>
      <details className="tech-details"><summary>Technical roadmap</summary><div className="roadmap-list">{roadmap.map((item) => <div key={item.id} className="roadmap-item"><strong>{item.id}</strong><div><h3>{item.title}</h3><p>{item.detail}</p></div><StatusBadge tone={item.tone}>{item.status}</StatusBadge></div>)}</div></details>
    </div>
  </div></section>;
}

export function PrinciplesSection() {
  return <section className="section principles-section"><div className="section-inner">
    <SectionHeader label="ENGINEERING" title={<>BUILT WITH DISCIPLINE.<br /><span>DESIGNED FOR CREATIVITY.</span></>} />
    <div className="principle-grid">{principles.map(([title, text], i) => <Reveal key={title} className="principle"><span>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
  </div></section>;
}

export function IsIsNot() {
  return <section className="section"><div className="section-inner is-grid">
    <div className="is-col"><TechnicalLabel className="text-primary">IT IS</TechnicalLabel><ul>{isList.map((x) => <li key={x}><Check size={16} />{x}</li>)}</ul></div>
    <div className="is-col is-not"><TechnicalLabel>IT IS NOT</TechnicalLabel><ul>{isNotList.map((x) => <li key={x}><Minus size={16} />{x}</li>)}</ul></div>
  </div></section>;
}

export function CurrentBuild() {
  const rows = [["CURRENT BASELINE", projectStatus.baseline], ["STATUS", projectStatus.baselineStatus], ["NEXT", projectStatus.next], ["CHALLENGE FORMATS", String(projectStatus.challengeFormats)], ["PRODUCTION CASES", String(projectStatus.productionCases)]];
  return <section className="section build-section"><div className="section-inner">
    <CodePanel label="CURRENT BUILD" className="build-compact">
      <dl className="system-state">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      <details className="tech-details inner"><summary>Technical provenance</summary><div className="fingerprints"><span>BASELINE ARCHIVE</span><code>{projectStatus.archive}</code><span>C11-C 2.19.12 REFERENCE · ZIP SHA-256</span><code>D85425CF18C5211C8497574F4FC66202D613EACC0EC14CD4E2FEF0B24F634A32</code><span>C11-C 2.19.12 REFERENCE · TREE SHA-256</span><code>2D39B7B923B42CDC6647A4D25493B75023CDD19CEE18214BBDE1FDD295B8F256</code></div></details>
    </CodePanel>
  </div></section>;
}
