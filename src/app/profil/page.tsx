import type { Metadata } from "next";
import { signOut } from "@/lib/actions/auth"

export const metadata: Metadata = {
  title: "Mon profil",
};

export default function ProfilPage() {
  return (
    <main className="containerprofile">
      <h1>Profil admin</h1>

      <form action={signOut}>
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
