import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Challenges, ContentWorlds, FourPartExperience, HowItWorks, UseCases, VisualSystems, WhatItIs } from './ContentSections';
import { EvolutionRoadmap, FAQ, PrinciplesSection, TechnicalFoundation } from './TechnicalSections';
import { PhilosophyAndFooter } from './Footer';
export function ChallengeEnginePage() {
  return <div className="challenge-site"><a className="skip-link" href="#system">Skip to content</a><Navbar/><main><Hero/><WhatItIs/><FourPartExperience/><ContentWorlds/><Challenges/><VisualSystems/><HowItWorks/><PrinciplesSection/><UseCases/><EvolutionRoadmap/><TechnicalFoundation/><FAQ/><PhilosophyAndFooter/></main></div>;
}
