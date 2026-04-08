"use client"

import { signInWithMagicLink } from "@/lib/actions/auth"
import { useState } from "react"

export default function LoginPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const formData = new FormData(e.currentTarget)
    const result = await signInWithMagicLink(formData);

    if (result.error) {
      setError(result.error)
      setStatus((result as any).isNewUser ? 'idle' : 'error')
    } else {
      setStatus('sent')
    }
  }

  return (
      <main className="container views">
        <h1>Connexion</h1>
        {status === 'sent' ? (
          <p>Un lien de connexion a été envoyé à votre adresse email.</p>
        ) : (
          <form onSubmit={handleSubmit} id="loginForm" className="loginForm">
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            {error && <p>{error}</p>}
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Envoi...' : 'Se connecter'}
            </button>
          </form>
        )}
        <a href="/" className="btn-accueil">Aller à l'accueil</a>
      </main>
  )
}
