'use client'

import { usePathname } from "next/navigation";

const navItems = [
  { href: '/', label: "Accueil", exact: true },
  { href: '/about', label: "À propos" },
  { href: '/podcast', label: "Nos Podcasts" },
  { href: '/contact', label: "Contact" }
]

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header>
      <a href="/">
        <img src="/svg/logo.svg" alt="Background" />
      </a>
      <nav>
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)

          return (
            <a key={item.href} href={item.href} className={active ? '' : ''}>
              {item.label}
            </a>
          )
        })}
      </nav>
    </header>
  );
}
