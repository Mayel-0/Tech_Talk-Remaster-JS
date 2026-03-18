export default function ProfilPage() {
  return (
    <main className="containerprofile">
      <h1>Profil admin</h1>
      <p>Email : </p>
      <p>Rôle : </p>

      {
        //    <p>Email : {{.Email}}</p>
        //    <p>Rôle : {{.Role}}</p>
      }

      <form method="post" action="/logout">
        <button type="submit">Se déconnecter</button>
      </form>

      <div className="buttonAdmin">
        <a href="/podcast/create">
          <button>Creation</button>
        </a>
      </div>
    </main>
  )
}
