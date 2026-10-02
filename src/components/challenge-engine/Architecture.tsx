import { ArrowDown, GitBranch, Layers3, Route, Volume2 } from "lucide-react";
import { architectureLayers } from "@/data/challenge-engine";
import { CodePanel, Reveal, SectionHeader, TechnicalLabel } from "./Primitives";

export function Architecture() {
  return (
    <section className="section architecture-section" id="architecture">
      <div className="section-inner">
        <SectionHeader label="02 / ARCHITECTURE" title={<>ONE TRUTH.<br /><span>MULTIPLE LAYERS.</span></>} description="The mechanic defines the truth. The presentation defines the experience." />
        <Reveal className="architecture-diagram">
          <div className="arch-node arch-primary"><Layers3 /><TechnicalLabel>IMMUTABLE INPUT</TechnicalLabel><b>{architectureLayers[0].title}</b><span>{architectureLayers[0].meta}</span></div>
          <div className="arch-flow"><i /><ArrowDown /></div>
          <div className="arch-node"><Route /><TechnicalLabel>STRUCTURAL OUTPUT</TechnicalLabel><b>{architectureLayers[1].title}</b><span>{architectureLayers[1].meta}</span></div>
          <div className="arch-split"><span /><span /><span /></div>
          <div className="arch-branches">
            <div className="arch-node arch-small"><GitBranch /><b>PRESENTATION</b><span>Declarative</span></div>
            <div className="arch-node arch-small arch-warm"><Volume2 /><b>AUDIO</b><span>Production layer</span></div>
            <div className="arch-node arch-small arch-acid"><Route /><b>PROVENANCE</b><span>Traceable</span></div>
          </div>
          <div className="arch-merge"><span /><span /><span /></div>
          <div className="arch-node arch-delivery"><TechnicalLabel>OUTPUT CONTRACT</TechnicalLabel><b>DELIVERY LAYER</b><span>Social / Review / Production Profiles</span></div>
        </Reveal>
        <div className="presentation-contract">
          <div className="contract-copy"><TechnicalLabel>PRESENTATION CONTRACT</TechnicalLabel><h3>PRESENTATION IS<br />NOT SIMULATION.</h3><p>The presentation layer consumes simulation results. It does not redefine them.</p><span className="contract-tag">CANONICAL CHALLENGE SOCIAL GEOMETRY</span></div>
          <CodePanel label="GEOMETRY / CONTRACT" className="geometry-panel">
            <div className="geometry-scale"><div><strong>540 × 960</strong><span>LOGICAL CANVAS</span></div><ArrowDown /><div><strong>720 × 1280</strong><span>SOCIAL DELIVERY</span></div></div>
            <div className="canvas-map"><span className="canvas-header">HEADER <b>0 — 144</b></span><span className="canvas-body">BODY <b>144 — 816</b></span><span className="canvas-footer">FOOTER <b>816 — 960</b></span></div>
          </CodePanel>
        </div>
      </div>
    </section>
  );
}