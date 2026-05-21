"use client";

import { useState } from "react";
import type { Podcast } from "@/lib/actions/podcasts";

const CATEGORIES = [
  "Marketing & Communication",
  "Créa Design",
  "Tech & Business",
  "Informatique",
  "Cybersécurité",
  "Audiovisuel",
  "Architecture d'intérieur",
  "3D, Animation & Jeux Vidéo",
];

type Props = {
  podcasts: Podcast[];
  isAdmin: boolean;
};

export default function PodcastClient({ podcasts, isAdmin }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPodcasts = activeCategory
    ? podcasts.filter((podcast) =>
        podcast.podcast_categories.some((c) => c.category === activeCategory)
      )
    : podcasts;

  return (
    <main className="container views">
      <h1 className="centre">Retrouvez tous nos Episodes</h1>

      <li>
        <div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={activeCategory === cat ? "select" : ""}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </li>

      <div className="ContaineurCard">
        {filteredPodcasts.map((podcast) => (
          <div className="Card" key={podcast.id}>
            <a href={`/podcast/${podcast.id}`}>
              <img src={podcast.image_url ?? "/svg/logoPodcast.svg"} alt={podcast.title} />
              <div className="podcast">
                <h2>{podcast.title}</h2>
                <p><strong>Invités :</strong></p>
                {podcast.name_intervenant}
                <p><strong>Sortie :</strong></p>
                {podcast.date
                  ? new Date(podcast.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </div>
            </a>
            {isAdmin && (
              <div className="linkAdmin">
                <a href={`/podcast/edit?id=${podcast.id}`}>
                  <button type="submit">Éditer</button>
                </a>
                <form action={`/podcast/delete/${podcast.id}`} method="POST">
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
  );
}
