export type StatusTone = "active" | "closed" | "next" | "planned" | "unknown";

/** Current project state. Single source for every status mention on the page. */
export const projectStatus = {
  baseline: "C11-D / D7.5",
  baselineStatus: "FROZEN",
  next: "D8.0 / MEDIA QA + RELEASE PIPELINE",
  challengeFormats: 9,
  visualWorlds: 5,
  productionCases: 90,
  archive: "ChallengeEngineV01_STATELESS_C11-D_7.5_V8_FROZEN_20261008_111052.zip",
} as const;

export const navItems = [
  ["WHAT IT IS", "#what"],
  ["EXPERIENCE", "#experience"],
  ["CHALLENGES", "#challenges"],
  ["VISUAL WORLDS", "#worlds"],
  ["HOW IT WORKS", "#how"],
  ["ROADMAP", "#roadmap"],
] as const;

export const experienceParts = [
  { title: "CHALLENGE", text: "The viewer gets a clear challenge or objective." },
  { title: "VISUAL WORLD", text: "The same idea can live inside different visual styles and environments." },
  { title: "MOTION", text: "Movement creates tension, focus and visual interest." },
  { title: "SOUND", text: "Audio helps give the experience rhythm and identity." },
] as const;

export const steps = [
  { id: "01", title: "CHOOSE THE CHALLENGE", text: "Select the challenge format and its intended experience." },
  { id: "02", title: "GIVE IT A VISUAL IDENTITY", text: "Pair the challenge with a visual world, assets, typography and editorial direction." },
  { id: "03", title: "ADD MOTION AND SOUND", text: "Create the audiovisual rhythm that makes the challenge feel alive." },
  { id: "04", title: "PREPARE IT FOR DELIVERY", text: "Organize the result for the intended vertical/social format and production workflow." },
] as const;

export const contentWorlds = [
  { index: "01", title: "CHALLENGE VIDEOS", visual: "particles", text: "Challenge-driven content built around clear objectives, visual tension and a defined outcome." },
  { index: "02", title: "VISUAL LOOPS", visual: "bloom", text: "Continuous generative visuals designed around mathematical motion, rhythm and visual beauty." },
  { index: "03", title: "VISUAL DRILLS", visual: "forces", text: "Motion-driven experiences designed to hold attention and explore tracking, pursuit, saccades and peripheral awareness." },
] as const;

/** Names only: mechanics are not documented here, so descriptors stay restrained. */
export const challenges = ["KEY", "PARKING", "PILOT", "PARKING V2", "HIT", "CATCH", "FIND", "CHOOSE", "COUNT"] as const;

export const loopFamilies = [
  { name: "GEOMETRIC WAVES", type: "waves", text: "Waves, lines and mathematical fields." },
  { name: "FRACTAL BLOOM", type: "bloom", text: "Fractals, expansion and symmetry." },
  { name: "SACRED SYMMETRY", type: "symmetry", text: "Radial structures and controlled symmetry." },
  { name: "LIVING PARTICLES", type: "particles", text: "Particles, trajectories and spatial movement." },
  { name: "INVISIBLE FORCES", type: "forces", text: "Vector fields expressed through moving particles." },
] as const;

export const benefits = [
  { title: "REUSE", text: "Visual elements can be reused intelligently across formats." },
  { title: "VARIETY", text: "Different challenge formats can live inside different visual worlds." },
  { title: "IDENTITY", text: "The overall experience remains coherent instead of becoming a collection of unrelated templates." },
] as const;

export const possibilities = [
  { title: "ONE CHALLENGE", text: "The mechanic defines the experience." },
  { title: "MANY VISUAL IDENTITIES", text: "Different visual worlds can express the same production philosophy." },
  { title: "REPEATABLE CREATION", text: "The system is designed for repeatable output rather than one-off manual construction." },
  { title: "CONSISTENT BRAND LANGUAGE", text: "A reusable visual system makes it possible to grow a recognizable content identity." },
] as const;

export const evolution = [
  { title: "CHALLENGE ORIGINS", text: "Recovering and organizing the original challenge ideas.", meta: "C11-A / C11-B" },
  { title: "VISUAL MATURITY", text: "Developing strong visual loops, drills, presentation and audiovisual direction.", meta: "C11-C · FROZEN" },
  { title: "PRODUCTION FOUNDATION", text: "Bringing challenge content into the same disciplined production framework.", meta: "C11-D · D0–D7.5" },
  { title: "NEXT: MEDIA & RELEASE", text: "Validating the final media QA and release layer.", meta: "D8.0 · NEXT" },
] as const;

export const stages = [
  { title: "FOUNDATION", status: "COMPLETED", tone: "closed", text: "Challenge recovery, visual direction, reusable assets, audio foundation and production contracts." },
  { title: "PRODUCTION SYSTEM", status: "COMPLETED", tone: "closed", text: "Requests, personalization, provenance, seed governance and the canonical Challenge production catalog." },
  { title: "MEDIA + RELEASE", status: "CURRENT", tone: "next", text: "D8 — Media QA and Release Pipeline." },
] as const;

export const progression = [
  { title: "FOUNDATION", state: "done" },
  { title: "PRODUCTION SYSTEM", state: "done", note: "D7 FROZEN" },
  { title: "MEDIA QA", state: "current", note: "D8 CURRENT" },
  { title: "RELEASE", state: "planned" },
  { title: "EXPANSION", state: "planned" },
] as const;

export const roadmap = [
  { id: "D0", title: "BASELINE", detail: "Inventory · Challenge recovery", status: "CLOSED", tone: "closed" },
  { id: "D1", title: "VISUAL / EDITORIAL NORMALIZATION", detail: "Layout · Presentation", status: "CLOSED", tone: "closed" },
  { id: "D2", title: "DECLARATIVE ASSET FAMILIES", detail: "Role evidence · Canonical binding", status: "CLOSED", tone: "closed" },
  { id: "D3", title: "PROCEDURAL MUSIC V5", detail: "Shared deterministic music architecture", status: "CLOSED", tone: "closed" },
  { id: "D4", title: "PRODUCTION REQUEST", detail: "Personalization · GUI / CLI parity", status: "CLOSED", tone: "closed" },
  { id: "D5", title: "ARTIFACT TOPOLOGY", detail: "Provenance", status: "CLOSED", tone: "closed" },
  { id: "D6", title: "SEED REGISTRY", detail: "Governance", status: "CLOSED", tone: "closed" },
  { id: "D7", title: "CHALLENGE PRODUCTION MATRIX", detail: "Canonical catalog · 90 validated production cases", status: "FROZEN", tone: "closed" },
  { id: "D7.5", title: "CONSOLIDATED BASELINE", detail: "Frozen C11-D baseline", status: "CLOSED", tone: "closed" },
  { id: "D8.0", title: "MEDIA QA", detail: "Release pipeline", status: "NEXT", tone: "next" },
  { id: "D9", title: "SUITE / PRODUCER", detail: "Maintenance · Catalog / Config", status: "PLANNED", tone: "planned" },
  { id: "D10", title: "NEW MECHANICS", detail: "New mechanics come last. Production robustness comes first.", status: "PLANNED", tone: "planned" },
] as const;

export const principles = [
  ["REPEATABLE", "The same defined inputs lead to the same structural result."],
  ["MODULAR", "Visual, audio and production capabilities can evolve independently."],
  ["SEPARATED", "Gameplay truth is protected from presentation changes."],
  ["REUSABLE", "Capabilities are built to support many content variations."],
  ["TRACEABLE", "Production decisions remain connected to their outputs."],
  ["CONTROLLED", "Certified foundations stay stable instead of changing accidentally."],
] as const;

export const isList = [
  "A creative production system for challenge-driven audiovisual content.",
  "A framework for repeatable visual experiences.",
  "A foundation for scalable challenge content.",
] as const;

export const isNotList = [
  "A conventional video editor.",
  "A library of prerecorded videos.",
  "A single game.",
  "A generic motion-template marketplace.",
  "A public self-service SaaS product yet.",
] as const;
