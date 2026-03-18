export default function LoginPage() {
  return (
      <main className="container views">
        <h1>Connexion</h1>
        <form method="post" action="/login" id="loginForm" className="loginForm">
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Mot de passe:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Se connecter</button>
        </form>
        <a href="/index.html" className="btn-accueil">Aller à l'accueil</a>
      </main>
  )
}
