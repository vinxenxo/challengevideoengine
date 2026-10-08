import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Challenges, ContentWorlds, HowItWorks, VisualIdentity, VisualSystems, WhatItIs } from "./ContentSections";
import { Consistency, CurrentBuild, EvolutionRoadmap, IsIsNot, Possibilities, PrinciplesSection, ProvenanceAudio, StatusToday } from "./TechnicalSections";
import { PhilosophyAndFooter } from "./Footer";
import { GlowDivider } from "./Primitives";

/** Narrative order: what it is → why it matters → what it creates → how it works → today → next. */
export function ChallengeEnginePage() {
  return <div className="challenge-site">
    <a className="skip-link" href="#what">Skip to content</a>
    <Navbar />
    <main>
      <Hero />
      <WhatItIs />
      <HowItWorks />
      <GlowDivider />
      <ContentWorlds />
      <Challenges />
      <VisualSystems />
      <VisualIdentity />
      <Consistency />
      <ProvenanceAudio />
      <Possibilities />
      <EvolutionRoadmap />
      <StatusToday />
      <PrinciplesSection />
      <IsIsNot />
      <CurrentBuild />
      <PhilosophyAndFooter />
    </main>
  </div>;
}
