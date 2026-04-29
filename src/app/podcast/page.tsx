import type { Metadata } from "next";
import { getAllPodcasts, deletePodcast } from "@/lib/actions/podcasts"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Podcasts",
};

export default async function PodcastPage() {
  const podcasts = await getAllPodcasts();

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let isAdmin = false
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    isAdmin = profile?.role === 'admin'
  }

  return (
  <main className="container views">
    <div className="ContaineurCard">
      {podcasts.map((podcast) => (
        <div className="Card" key={podcast.id}>
          <a href={`/podcast/${podcast.id}`}>
            <img src={podcast.image_url ?? '/svg/logoPodcast.svg'} alt={podcast.title} />
            <div className="podcast">
              <h2>{podcast.title}</h2>
              <p><strong>Invités :</strong></p>
              {podcast.name_intervenant}
              <p><strong>Sortie :</strong></p>
              {podcast.date}
            </div>
          </a>
          {isAdmin && (
            <div className="linkAdmin">
              <a href={`/podcast/edit?id=${podcast.id}`}>
                <button type="submit">Éditer</button>
              </a>
              <form action={deletePodcast.bind(null, podcast.id)}>
                <button type="submit">Supprimer</button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
    {isAdmin && (
      <div className="buttonAdmin">
        <a href="/podcast/create" className="buttonAdminLink">Creation</a>
      </div>
    )}

    <div className="backgroundSVG contact">
      <img src="/svg/background.svg" alt="Background" />
      <img src="/svg/background.svg" alt="Background" />
    </div>
  </main>
  )
}
