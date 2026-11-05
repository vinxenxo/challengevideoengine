import { ProceduralVisual } from './ProceduralVisual';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
export function TechnicalLabel({children,className}:{children:ReactNode;className?:string}) { return <span className={cn('technical-label',className)}>{children}</span>; }
export function StatusBadge({children,tone='planned'}:{children:ReactNode;tone?:string}) { return <span className={`status-badge status-${tone}`}><i aria-hidden="true" />{children}</span>; }
export function SectionHeader({label,title,description}:{label:string;title:ReactNode;description?:string}) { return <header className="section-heading" data-reveal="mask-up"><TechnicalLabel>{label}</TechnicalLabel><h2>{title}</h2>{description && <p>{description}</p>}</header>; }

const companion: Partial<Record<import('@/data/challenge-engine').VisualType, import('@/data/challenge-engine').VisualType>> = {lissajous:'particles',orbits:'moire',helix:'bloom',radar:'lattice',terrain:'rings',lattice:'forces',spiral:'helix',tunnel:'orbits',moire:'spiral',rings:'tunnel',symmetry:'radar'};
export function AmbientArt({type,label,side='right'}:{type:import('@/data/challenge-engine').VisualType;label:string;side?:'left'|'right'}) { const other=side==='right'?'left':'right'; const c=companion[type]??'particles'; return <><div className={`section-ambient ambient-${side}`} aria-hidden="true"><ProceduralVisual type={type}/><span>{label}</span></div><div className={`section-ambient ambient-companion ambient-${other}`} aria-hidden="true"><ProceduralVisual type={c} seed={9173}/></div></>; }
