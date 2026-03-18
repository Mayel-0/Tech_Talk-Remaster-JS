export default function VerifyPage() {
  return (
    <main className="container verify-page">
    <h1>Vérification par email</h1>
    <p className="error"></p>

    {
    // {{.Error}}
    }

    <form method="post" action="/verify">
      <input type="hidden" name="user_id" value="{{.UserID}}"/>
      <label htmlFor="code">Code reçu :</label>
      <input type="text" id="code" name="code" required />
      <button type="submit">Valider</button>
    </form>
    </main>
  )
}
