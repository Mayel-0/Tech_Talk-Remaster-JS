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
  "Architecture d\u2019int\u00e9rieur",
  "3D, Animation & Jeux vidéo",
];

type Props = {
  podcasts: Podcast[];
  isAdmin: boolean;
};

export default function PodcastClient({ podcasts = [], isAdmin }: Props) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredPodcasts =
    activeCategories.length === 0
      ? podcasts
      : podcasts.filter((podcast) =>
          (podcast.podcast_categories ?? []).some((c) =>
            activeCategories.includes(c.category)
          )
        );

  return (
    <main className="container views">
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
        {filteredPodcasts.map((podcast) => (
          <div className="Card" key={podcast.id}>
            <a href={`/podcast/${podcast.id}`}>
              <img src={podcast.image_url ?? "/svg/logoPodcast.svg"} alt={podcast.title} />
              <span className="Card__listen">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
                Écouter
              </span>
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
  );
}
