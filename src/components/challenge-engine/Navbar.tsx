import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/challenge-engine";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav">
      <a href="#top" className="brand" aria-label="Challenge Engine home"><span className="brand-mark">CE</span><span><b>CHALLENGE ENGINE</b><small>CHALLENGE CONTENT SYSTEM</small></span></a>
      <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
        {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a href="#status" onClick={() => setOpen(false)}>STATUS</a>
      </nav>
      <a href="#experience" className="nav-cta">EXPLORE <span>↗</span></a>
      <button type="button" className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
    </header>
  );
}
