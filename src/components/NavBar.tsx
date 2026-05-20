'use client'

import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: '/', label: "Accueil", exact: true },
  { href: '/podcast', label: "Nos Episodes" },
  { href: '/contact', label: "Contact" },
  { href: '/about', label: "À propos" },
]

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <a href="/">
        <img src="/svg/logo.svg" alt="Background" />
      </a>

      <nav>
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <a key={item.href} href={item.href} className={active ? 'nav-active' : ''}>
              {item.label}
            </a>
          )
        })}
      </nav>

      <button
        className="burger-btn"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <span /><span /><span />
      </button>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <button
          className="mobile-menu__close"
          onClick={() => setOpen(false)}
          aria-label="Fermer le menu"
        >
          ✕
        </button>
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <a
              key={item.href}
              href={item.href}
              className={active ? 'nav-active' : ''}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          )
        })}
      </div>

      {open && <div className="mobile-menu__overlay" onClick={() => setOpen(false)} />}
    </header>
  );
}
