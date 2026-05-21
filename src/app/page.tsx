import type { Metadata } from "next";
import { getLastPodcast, getAllPodcasts, deletePodcast } from "@/lib/actions/podcasts";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Accueil",
};

export default async function Home() {
  const [podcast, podcasts] = await Promise.all([
    getLastPodcast(),
    getAllPodcasts(),
  ]);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    isAdmin = profile?.role === 'admin';
  }

  const youtubeUrl = podcast?.youtube_url
    ? podcast.youtube_url.startsWith('http') ? podcast.youtube_url : `https://${podcast.youtube_url}`
    : '#';

  const formattedDate = podcast?.date
    ? new Date(podcast.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <main className="container views">

      {podcast && (
        <section className="lastPodcast">
          <div className="podcastDetails">
            <a href={youtubeUrl}>
              <div className="podcastDetails__image">
                <img src={podcast.image_url ?? '/svg/logoPodcast.svg'} alt={podcast.title} />
              </div>
            </a>
            <div className="podcastDetails__info">
              <h2>{podcast.title}</h2>
              <p><strong>Sortie : </strong>{formattedDate}</p>
              <p><strong>Invités : </strong>{podcast.name_intervenant}</p>
              <div className="podcastDetails__description">
                <label><strong>Résumé :</strong></label>
                <p>{podcast.description}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="allPodcasts">
        <h1 className="centre">Retrouvez tous nos Episodes</h1>
        <li>
          <div>
            <button>Marketing & Communication</button>
            <button>Créa Design</button>
            <button>Tech & Business</button>
            <button>Informatique</button>
          </div>
          <div>
            <button>Cybersécurité</button>
            <button>Audiovisuel</button>
            <button>Architecture d'intérieur</button>
            <button>3D, Animation & Jeux Vidéo</button>
          </div>
        </li>
        <div className="ContaineurCard">
          {podcasts.map((p) => (
            <div className="Card" key={p.id}>
              <a href={`/podcast/${p.id}`}>
                <img src={p.image_url ?? '/svg/logoPodcast.svg'} alt={p.title} />
                <div className="podcast">
                  <h2>{p.title}</h2>
                  <p><strong>Invités :</strong></p>
                  {p.name_intervenant}
                  <p><strong>Sortie :</strong></p>
                  {p.date ? new Date(p.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                </div>
              </a>
              {isAdmin && (
                <div className="linkAdmin">
                  <a href={`/podcast/edit?id=${p.id}`}>
                    <button type="submit">Éditer</button>
                  </a>
                  <form action={deletePodcast.bind(null, p.id)}>
                    <button type="submit">Supprimer</button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
        {isAdmin && (
          <div className="buttonAdmin">
            <a href="/podcast/create" className="buttonAdminLink">Création</a>
          </div>
        )}
      </section>

      <div className="backgroundSVG contact">
        <img src="/svg/background.svg" alt="Background" />
        <img src="/svg/background.svg" alt="Background" />
      </div>

    </main>
  );
}
