export default function Footer() {
  return (
    <footer>
      <img src="/svg/logo.svg" alt="Logo" />
      <div>
        <div>
          <a href="/index">Accueil</a>
        </div>
        <div>
          <a href="/podcast">Episode</a>
        </div>
        <div>
          <a href="/about">À propos</a>
        </div>
        <div>
          <a href="/contact">Contact</a>
        </div>
      </div>
      <div>
        <div>
          {/*<div>
            <img src="/svg/youtube.svg" alt="Logo YouTube"/>
          </div>
          <div>
            <img src="/svg/spotify.svg" alt="Logo Spotify"/>
          </div>*/}
          <a href="https://www.instagram.com/techtalk.student/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <img src="/svg/instagram.svg" alt="Logo Instagram"/>
            </div>
          </a>
        </div>
        <p>
          Design by <span>TechTalk</span>
        </p>
      </div>
    </footer>
  );
}
