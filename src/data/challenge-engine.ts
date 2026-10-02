export type StatusTone = "active" | "closed" | "next" | "planned" | "unknown";

export type Challenge = {
  id: string;
  name: string;
  version: string;
  assetFamily: string;
  status: StatusTone;
};

export const challenges: Challenge[] = [
  { id: "CHALLENGE_001", name: "KEY", version: "v1.0", assetFamily: "fam_001", status: "closed" },
  { id: "CHALLENGE_002", name: "PARKING", version: "v1.0", assetFamily: "fam_garage_01", status: "closed" },
  { id: "CHALLENGE_003", name: "PILOT", version: "v2.0", assetFamily: "fam_001", status: "closed" },
  { id: "CHALLENGE_004", name: "PARKING V2", version: "v2.0", assetFamily: "fam_garage_01", status: "closed" },
  { id: "CHALLENGE_005", name: "HIT", version: "v1.0", assetFamily: "UNKNOWN", status: "unknown" },
  { id: "CHALLENGE_006", name: "CATCH", version: "UNKNOWN", assetFamily: "UNKNOWN", status: "unknown" },
  { id: "CHALLENGE_007", name: "FIND", version: "UNKNOWN", assetFamily: "UNKNOWN", status: "unknown" },
  { id: "CHALLENGE_008", name: "CHOOSE", version: "UNKNOWN", assetFamily: "UNKNOWN", status: "unknown" },
  { id: "CHALLENGE_009", name: "COUNT", version: "UNKNOWN", assetFamily: "UNKNOWN", status: "unknown" },
];

export const contentWorlds = [
  { index: "01", title: "CHALLENGE", tag: "MECHANIC-DRIVEN", icon: "game", text: "Interactive-looking visual challenges generated from deterministic gameplay mechanics.", details: ["KEY", "PARKING", "PILOT", "HIT", "CATCH", "FIND", "CHOOSE", "COUNT"] },
  { index: "02", title: "VISUAL LOOPS", tag: "PURE PROCEDURAL MOTION", icon: "loop", text: "Continuous generative visual systems designed around mathematical motion, rhythm and visual grammar.", details: ["GEOMETRIC WAVES", "FRACTAL BLOOM", "SACRED SYMMETRY", "LIVING PARTICLES", "INVISIBLE FORCES"] },
  { index: "03", title: "VISUAL DRILLS", tag: "ATTENTION / TRACKING", icon: "target", text: "Motion-driven visual drills designed around tracking, saccades, pursuit and peripheral attention.", details: ["TRACKING", "SACCADE", "PURSUIT", "PERIPHERAL"] },
] as const;

export const loopFamilies = [
  { name: "GEOMETRIC WAVES", type: "waves", text: "Waves, lines and mathematical fields." },
  { name: "FRACTAL BLOOM", type: "bloom", text: "Fractals, expansion and symmetry." },
  { name: "SACRED SYMMETRY", type: "symmetry", text: "Radial structures with controlled clipping." },
  { name: "LIVING PARTICLES", type: "particles", text: "Particles, trajectories and a restrained spatial grid." },
  { name: "INVISIBLE FORCES", type: "forces", text: "Vector fields made legible through particle paths." },
] as const;

export const roadmap = [
  { id: "D0", title: "BASELINE", detail: "Inventory · Challenge recovery", status: "CLOSED", tone: "closed" },
  { id: "D1", title: "VISUAL / EDITORIAL NORMALIZATION", detail: "Layout · Presentation", status: "CLOSED", tone: "closed" },
  { id: "D2", title: "DECLARATIVE ASSET FAMILIES", detail: "Role evidence · Canonical binding", status: "CLOSED", tone: "closed" },
  { id: "D3", title: "PROCEDURAL MUSIC V5", detail: "Shared deterministic music architecture", status: "NEXT", tone: "next" },
  { id: "D4", title: "PRODUCTION REQUEST", detail: "Personalization · GUI / CLI parity", status: "PLANNED", tone: "planned" },
  { id: "D5", title: "ARTIFACT TOPOLOGY", detail: "Provenance", status: "PLANNED", tone: "planned" },
  { id: "D6", title: "SEED REGISTRY", detail: "Governance", status: "PLANNED", tone: "planned" },
  { id: "D7", title: "CHALLENGE PRODUCTION MATRIX", detail: "Catalog", status: "PLANNED", tone: "planned" },
  { id: "D8", title: "MEDIA QA", detail: "Release pipeline", status: "PLANNED", tone: "planned" },
  { id: "D9", title: "SUITE / PRODUCER", detail: "Maintenance · Catalog / Config", status: "PLANNED", tone: "planned" },
  { id: "D10", title: "NEW MECHANICS", detail: "New mechanics come last. Production robustness comes first.", status: "PLANNED", tone: "planned" },
] as const;

export const principles = [
  ["01", "DETERMINISTIC", "Same inputs. Same structural result."],
  ["02", "DECLARATIVE", "Configuration should describe the system."],
  ["03", "SEPARATED", "Simulation truth stays isolated from presentation."],
  ["04", "REUSABLE", "One capability should not become three duplicated pipelines."],
  ["05", "TRACEABLE", "Every generated artifact should have a lineage."],
  ["06", "FROZEN WHEN CERTIFIED", "Stable contracts stay stable until evidence justifies change."],
] as const;

export const architectureLayers = [
  { title: "GAMEPLAY TRUTH", meta: "Simulation / Rules", tone: "cyan" },
  { title: "RESULT / FRAMES", meta: "winning_frame etc.", tone: "violet" },
  { title: "PRESENTATION", meta: "Declarative", tone: "cyan" },
  { title: "AUDIO", meta: "Production layer", tone: "amber" },
  { title: "PROVENANCE", meta: "Traceable", tone: "acid" },
  { title: "DELIVERY LAYER", meta: "Social / Review / Production Profiles", tone: "violet" },
] as const;