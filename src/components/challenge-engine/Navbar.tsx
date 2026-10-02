import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [["SYSTEM", "#system"], ["ARCHITECTURE", "#architecture"], ["CONTENT", "#content"], ["ROADMAP", "#roadmap"]];

export function Navbar({ labMode, onToggleLab }: { labMode: boolean; onToggleLab: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav">
      <a href="#top" className="brand" aria-label="Challenge Engine home"><span className="brand-mark">CE</span><span><b>CHALLENGE ENGINE</b><small>PROCEDURAL VIDEO SYSTEM</small></span></a>
      <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
        {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <button type="button" className={labMode ? "lab-toggle is-active" : "lab-toggle"} onClick={onToggleLab} aria-pressed={labMode}>LAB MODE</button>
      </nav>
      <a href="#lab" className="nav-cta">ENTER THE LAB <span>↗</span></a>
      <button type="button" className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
    </header>
  );
}