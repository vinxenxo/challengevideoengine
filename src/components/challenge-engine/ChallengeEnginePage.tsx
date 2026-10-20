import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Challenges, ContentWorlds, FourPartExperience, HowItWorks, UseCases, VisualSystems, WhatItIs } from './ContentSections';
import { EvolutionRoadmap, FAQ, PrinciplesSection, TechnicalFoundation } from './TechnicalSections';
import { PhilosophyAndFooter } from './Footer';
export function ChallengeEnginePage() {
  useEffect(()=>{const els=document.querySelectorAll('[data-reveal]');document.documentElement.classList.add('reveal-ready');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.15,rootMargin:'0px 0px -8% 0px'});els.forEach(el=>io.observe(el));return()=>io.disconnect();},[]);
  return <div className="challenge-site"><a className="skip-link" href="#system">Skip to content</a><Navbar/><main><Hero/><WhatItIs/><FourPartExperience/><ContentWorlds/><Challenges/><VisualSystems/><HowItWorks/><PrinciplesSection/><UseCases/><EvolutionRoadmap/><TechnicalFoundation/><FAQ/><PhilosophyAndFooter/></main></div>;
}
