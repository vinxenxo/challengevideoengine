export type StatusTone = 'active' | 'closed' | 'blocked' | 'planned';
export type VisualType = 'waves' | 'bloom' | 'symmetry' | 'particles' | 'forces';
export const projectStatus = {
  date: 'October 13, 2026', simulation: 'C11-C 2.19.12', phase: 'C11-D · ENGINEERING VALIDATION',
  challengeFormats: 9, visualWorlds: 5, contentPillars: 3,
  validation: { configurations: 90, profiles: 5, modes: 2, kind: 'Historical engineering validation coverage' },
  renderer: 'OFF', productionMediaCreated: false, releaseAuthority: 'NONE', rendererBaselineApproved: false,
  summary: 'The shared production architecture is being validated. The future D renderer is not authorized for production.',
  gates: [
    { id: 'C11-C 2.19.12', title: 'Simulation foundation', status: 'FROZEN / IMMUTABLE', tone: 'closed' },
    { id: 'C11-D', title: 'Production context and renderer-baseline preparation', status: 'ACTIVE ENGINEERING', tone: 'active' },
    { id: 'GUI model', title: 'Editorial model and view-model validation', status: 'PASSED', tone: 'closed' },
    { id: 'CLI / GUI', title: 'Shared-context parity · three content types, tested scope', status: 'VALIDATED', tone: 'closed' },
    { id: 'D9.10', title: 'Downstream adapter', status: 'PREPARE_ONLY', tone: 'active' },
    { id: 'D9.14', title: 'Full real-media acceptance', status: 'BLOCKED', tone: 'blocked' },
    { id: 'D9.15', title: 'No-media operational GUI acceptance', status: 'PASS / CLOSED', tone: 'closed' },
    { id: 'D9.16', title: 'Preflight passed · full acceptance', status: 'BLOCKED', tone: 'blocked' },
    { id: 'D9.17', title: 'Production go / no-go gate', status: 'NO-GO', tone: 'blocked' },
    { id: 'D renderer', title: 'Future baseline', status: 'NOT APPROVED / NOT FROZEN', tone: 'blocked' },
    { id: 'D4.8', title: 'Renderer authorization', status: 'BLOCKED', tone: 'blocked' },
    { id: 'Renderer', title: 'Current D workflow · no production media created', status: 'OFF', tone: 'blocked' },
    { id: 'Release', title: 'Release authority', status: 'NONE', tone: 'blocked' },
    { id: 'D10', title: 'Further expansion', status: 'BLOCKED', tone: 'blocked' },
  ],
} as const;
export const navItems = [['System','#system'],['Content Formats','#formats'],['Visual Worlds','#worlds'],['Architecture','#architecture'],['Roadmap','#roadmap']] as const;
export const positioning = {
  category: 'Challenge Engine is a deterministic creative-production framework being engineered to coordinate interactive challenges and procedural visual systems into a repeatable workflow for vertical-video content.',
  benefit: 'A traceable, reusable architecture that keeps simulation truth separate from editorial decisions and visual presentation.',
  tagline: 'Turn Challenges Into Content People Want to Watch.',
};
export const isList = ['A deterministic creative-production framework.','A system for coordinating challenges and procedural visuals.','A structured editorial and presentation architecture.','An engineering approach built around reproducibility and traceability.'];
export const isNotList = ['A generic stock-video library.','A conventional template-only video editor.','An opaque “AI generates everything” product.','A publicly released rendering service today.'];
export const experienceParts = [
  { title:'Challenge', label:'THE IDEA', text:'A clear interactive objective, defined mechanics and an identifiable reveal.' },
  { title:'Visual world', label:'THE IDENTITY', text:'A procedural visual language that gives a format its own character.' },
  { title:'Motion', label:'THE BEHAVIOR', text:'Temporal structure, pacing and visual behavior that support the challenge.' },
  { title:'Sound', label:'THE AUDIOVISUAL LAYER', text:'An architectural layer for rhythm and identity. Final audio production and compositing are not promised today.' },
];
export const contentWorlds = [
  { title:'Challenge Videos', visual:'particles', label:'MECHANICS → STAKES → REVEAL', text:'Structured interactive challenges built around a readable objective and a defined outcome. A foundation for repeatable vertical-content formats.', status:'Canonical mechanics · production rendering gated' },
  { title:'Visual Loops', visual:'bloom', label:'CONTINUITY → RHYTHM → IDENTITY', text:'Procedural compositions designed around continuous motion and coherent visual identity. A way to explore the visual language of a channel.', status:'Shared context validated · production exports restricted' },
  { title:'Visual Drills', visual:'forces', label:'TASK → TYPE → TIER', text:'Structured visual tasks and exercises with defined types and tiers. A framework for deliberate attention-focused visual experiences.', status:'Shared context validated · production exports restricted' },
] as const;
// Mechanics are not publicly documented in this site; do not infer proprietary rules from names.
export const challenges = ['KEY','PARKING','PILOT','PARKING V2','HIT','CATCH','FIND','CHOOSE','COUNT'] as const;
export const loopFamilies: { name: string; type: VisualType; text: string; formula: string }[] = [
  { name:'Geometric Waves',type:'waves',text:'Layered wave fields and geometric contours. Continuous mathematical motion gives structure to a changing surface.',formula:'WAVE FIELD / PHASE + FREQUENCY' },
  { name:'Fractal Bloom',type:'bloom',text:'Branching radial forms and repeated transformations. Expansion follows a controlled geometric rhythm.',formula:'RADIAL GROWTH / REPEATED TRANSFORMS' },
  { name:'Sacred Symmetry',type:'symmetry',text:'Interlocking radial geometry, ordered repetition and controlled symmetry. A shared center anchors each transformation.',formula:'RADIAL GEOMETRY / ANGULAR REPEAT' },
  { name:'Living Particles',type:'particles',text:'Seed-defined particles trace coherent paths through space. Individual trajectories become a collective visual identity.',formula:'PARTICLE PATHS / SEEDED INITIAL CONDITIONS' },
  { name:'Invisible Forces',type:'forces',text:'A vector field made visible through moving traces. Curvature and direction reveal the underlying mathematical behavior.',formula:'VECTOR FIELD / FLOW TRACES' },
];
export const steps = [
  {title:'Select the format',text:'Choose the content pillar and canonical format.',state:'Catalog foundation'},
  {title:'Define the identity',text:'Resolve the visual world, parameters and independent seed domains.',state:'Configured inputs'},
  {title:'Resolve the context',text:'Bring editorial content and presentation planning into a shared canonical context.',state:'Validated within tested scope'},
  {title:'Validate & prepare',text:'Check the production plan and prepare the downstream workflow. Rendering remains a separate authorization gate.',state:'Preparation ≠ production'},
];
export const principles = [
  {title:'Reproducibility',text:'Defined inputs make configured behavior easier to investigate and reproduce, rather than recreate manually.'},
  {title:'Consistency',text:'Shared content and presentation contracts help protect the identity of a format.'},
  {title:'Traceability',text:'Configuration identity and source lineage keep decisions connected to their origin.'},
  {title:'Extensibility',text:'Content families and defined variants offer a structured basis for evolution, not another disconnected template.'},
  {title:'Separation of concerns',text:'Simulation, editorial data and presentation stay distinct. Creative iteration must not alter frozen simulation truth.'},
];
export const useCases = [
  {audience:'CREATORS & CHANNEL OPERATORS',title:'Build a format, not another one-off.',text:'Develop repeatable vertical-content concepts without starting from disconnected templates every time.'},
  {audience:'CREATIVE PRODUCERS & AGENCIES',title:'Explore identity without losing consistency.',text:'Compare procedural worlds for a channel and maintain editorial rules across content types.'},
  {audience:'TECHNOLOGY TEAMS & PARTNERS',title:'Make the workflow inspectable.',text:'Reproduce configured behavior during QA, audit a plan before a controlled run, and evaluate private deployment requirements.'},
];
export const roadmap = [
  {title:'Protect the foundation',id:'01 / C11-C',status:'FROZEN',tone:'closed',text:'The simulation and mechanical foundation is immutable. C11-D does not rewrite its behavior.'},
  {title:'Validate the shared context',id:'02 / C11-D',status:'NO-MEDIA VALIDATION PASSED',tone:'closed',text:'Editorial models and shared GUI/CLI production-context components passed within the tested scope. This is not media acceptance.'},
  {title:'Prepare the renderer baseline',id:'03 / INTEGRATION',status:'ACTIVE ENGINEERING',tone:'active',text:'Visual payload composition and renderer-baseline preparation continue. The future baseline is not approved or frozen.'},
  {title:'Authorize production & release',id:'04 / AUTHORIZATION',status:'BLOCKED',tone:'blocked',text:'Full production acceptance, D4.8 authorization and release authority remain outstanding. Renderer OFF. D10 BLOCKED.'},
] as const;
export const technicalTopics = [
  {title:'Determinism & independent seed domains',text:'Defined seed domains separate simulation responsibility from audiovisual variation. Repeatability is a property of the configured behavior, not a guarantee of an unapproved final render.'},
  {title:'Simulation truth ≠ presentation',text:'C11-C 2.19.12 is frozen and immutable. Editorial content, layouts and visual planning in C11-D cannot authorize changes to that simulation foundation.'},
  {title:'One canonical context, two interfaces',text:'CLI and GUI use shared production-context logic. Parity has been validated for all three content types within the tested scope; end-to-end rendered output is not implied.'},
  {title:'Source lineage & configuration identity',text:'Explicit source data and configuration identity support auditing and reproducibility. Declarative asset families keep identity, family and role distinct; missing evidence stays unknown.'},
  {title:'Preparation is not renderer activation',text:'The D9.10 adapter is PREPARE_ONLY. Payload preparation and no-media acceptance do not grant permission to render, export or release production media.'},
  {title:'Contracts, validation & governance',text:'Strict contracts and explicit gates keep tested preparation separate from full real-media acceptance. Preflight success cannot close a blocked acceptance gate.'},
];
export const faq = [
  {q:'Is Challenge Engine a public SaaS product today?',a:'No. It remains under controlled engineering validation. There is no publicly released self-service production workflow, signup or subscription.'},
  {q:'Does it rely on a black-box AI video generator?',a:'The core framework is positioned around deterministic procedural systems, defined rules and traceable configuration—not an opaque “AI generates everything” promise. This landing’s visual lab uses mathematical Canvas drawing, not an AI video generator.'},
  {q:'Can I generate and export production videos immediately?',a:'No immediate production export is promised. The future D renderer baseline is not approved or frozen, D4.8 remains blocked, the renderer is OFF and release authority is NONE. Visual Loops and Visual Drills are not offered as available production exports.'},
  {q:'How is it different from a conventional video editor?',a:'It organizes content identity, mechanics, procedural visuals and editorial rules as a reusable system. The architecture is designed to make configured behavior reproducible and traceable, rather than depend entirely on manual assembly.'},
  {q:'Can editorial identity be reused across content types?',a:'The shared editorial model and GUI/CLI context have been validated for the three content types within the tested scope. This establishes an integration foundation—not proof of end-to-end production media.'},
  {q:'What do the 90 validation configurations represent?',a:'Historical engineering coverage: 9 canonical challenge formats × 5 profiles × 2 modes. They are not 90 completed videos, public exports or evidence that the current D renderer creates production media.'},
  {q:'How can I discuss a private deployment or collaboration?',a:'A public contact channel is not configured on this site yet. Explore the architecture and engineering status here; there is no booking, purchasing or submission flow currently available.'},
];
