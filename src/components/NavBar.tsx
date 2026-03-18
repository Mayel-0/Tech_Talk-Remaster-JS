
const navItems = [
  { href: '/', label: "Accueil", exact: true },
  { href: '/about', label: "À propos" },
  { href: '/podcast', label: "Nos Podcasts" },
  { href: '/contact', label: "Contact" }
]

export default function NavBar() {
  return (
    <header>
      <img src="/svg/logo.svg" alt="Background" />
      <nav>
        <a href="/">Accueil</a>
        <a href="/about">À propos</a>
        <a href="/podcast">Nos Podcasts</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
}
