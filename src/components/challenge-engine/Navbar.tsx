import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navItems, projectStatus } from '@/data/challenge-engine';
export function Navbar() {
  const [open,setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!open) return; const close = (event:KeyboardEvent) => { if(event.key === 'Escape') {setOpen(false); toggle.current?.focus();} }; window.addEventListener('keydown',close); return () => window.removeEventListener('keydown',close); },[open]);
  return <header className="site-nav"><a href="#top" className="brand" aria-label="Challenge Engine home"><span className="wordmark-icon" aria-hidden="true">[c/e]</span><span>CHALLENGE<br/>ENGINE</span></a><nav id="primary-nav" className={`nav-links ${open?'is-open':''}`} aria-label="Primary navigation">{navItems.map(([label,href])=><a href={href} key={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav><a href="#roadmap" className="nav-status" title={projectStatus.summary}><i/>{projectStatus.phase}</a><Button asChild className="nav-cta"><a href="#formats">Explore <ArrowUpRight/></a></Button><Button ref={toggle} variant="ghost" size="icon" className="menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="primary-nav" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button></header>;
}
