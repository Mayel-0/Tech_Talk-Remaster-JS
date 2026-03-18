export default function Footer() {
  return (
    <footer>
      <img src="/svg/logo.svg" alt="Logo" />
      <div>
        <div>
          <a href="/index">Accueil</a>
        </div>
        <div>
          <a href="/about">À propos</a>
        </div>
        <div>
          <a href="/podcast">Podcast</a>
        </div>
        <div>
          <a href="/contact">Contact</a>
        </div>
      </div>
      <div>
        <p>Suivez nous!</p>
        <div>
          <img src="/svg/youtube.svg" alt="Logo YouTube" />
          <img src="/svg/spotify.svg" alt="Logo Spotify" />
          <img src="/svg/instagram.svg" alt="Logo Instagram" />
          <div style={{ color: "#feb161" }}></div>
        </div>
        <p>
          Design by <span>TechTalk</span>
        </p>
      </div>
    </footer>
  );
}
