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
      <img src="/svg/logo.svg" alt="Background" />
      <nav>
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)

          return (
            <a href={item.href} className={active ? '' : ''}>
              {item.label}
            </a>
          )
        })}
      </nav>
    </header>
  );
}
