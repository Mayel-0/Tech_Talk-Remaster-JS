import type { Metadata } from "next";
import { getPodcastById } from "@/lib/actions/podcasts"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ podcastId: string }> }): Promise<Metadata> {
  const { podcastId } = await params
  const podcast = await getPodcastById(podcastId)
  return { title: podcast?.title ?? "Podcast" }
}

export default async function DetailsPage({ params }: { params: Promise<{ podcastId: string }> }) {
  const { podcastId } = await params
  const podcast = await getPodcastById(podcastId)

  if (!podcast) notFound()

  const youtubeUrl = podcast.youtube_url
    ? podcast.youtube_url.startsWith('http') ? podcast.youtube_url : `https://${podcast.youtube_url}`
    : '#'

  const formattedDate = podcast.date
    ? new Date(podcast.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
  <main className="containerDetails">
    <div className="podcastDetails">
      <a href={youtubeUrl}>
        <div className="podcastDetails__image">
          <img src={podcast.image_url ?? '/svg/logoPodcast.svg'} alt={podcast.title} />
          <span className="podcastDetails__listen">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6,4 20,12 6,20" />
            </svg>
            Écouter
          </span>
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
    <div className="JustRotateIt">
      <img src="/svg/background.svg" alt="Background" />
    </div>
  </main>
  )
}
