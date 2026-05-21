"use client";

import { useState } from "react";
import type { Podcast } from "@/lib/actions/podcasts";
import { deletePodcast } from "@/lib/actions/podcasts";

const CATEGORIES = [
  "Marketing & Communication",
  "Créa Design",
  "Tech & Business",
  "Informatique",
  "Cybersécurité",
  "Audiovisuel",
  "Architecture",
  "3D, Animation & Jeux vidéo",
];

type Props = {
  podcast: Podcast | null;
  podcasts: Podcast[];
  isAdmin: boolean;
};

export default function HomeClient({ podcast, podcasts = [], isAdmin }: Props) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredPodcasts =
    activeCategories.length === 0
      ? podcasts
      : podcasts.filter((p) =>
          (p.podcast_categories ?? []).some((c) =>
            activeCategories.includes(c.category)
          )
        );

  const youtubeUrl = podcast?.youtube_url
    ? podcast.youtube_url.startsWith("http") ? podcast.youtube_url : `https://${podcast.youtube_url}`
    : "#";

  const formattedDate = podcast?.date
    ? new Date(podcast.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <main className="container views">

      {podcast && (
        <section className="lastPodcast">
          <div className="podcastDetails">
            <a href={youtubeUrl}>
              <div className="podcastDetails__image">
                <img src={podcast.image_url ?? "/svg/logoPodcast.svg"} alt={podcast.title} />
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
        </section>
      )}

      <section className="allPodcasts">
        <h1 className="centre">Retrouvez tous nos Episodes</h1>
        <li>
          <div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={activeCategories.includes(cat) ? "select" : ""}
                onClick={() => toggleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </li>

        <div className="ContaineurCard">
          {filteredPodcasts.map((p) => (
            <div className="Card" key={p.id}>
              <a href={`/podcast/${p.id}`}>
                <img src={p.image_url ?? "/svg/logoPodcast.svg"} alt={p.title} />
                <span className="Card__listen">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                  Écouter
                </span>
                <div className="podcast">
                  <h2>{p.title}</h2>
                  <p><strong>Invités :</strong></p>
                  {p.name_intervenant}
                  <p><strong>Sortie :</strong></p>
                  {p.date ? new Date(p.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : ""}
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
