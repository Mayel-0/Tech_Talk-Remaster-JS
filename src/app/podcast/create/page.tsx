import type { Metadata } from "next";
import { createPodcast } from "@/lib/actions/podcasts"

export const metadata: Metadata = {
  title: "Créer un podcast",
};

export default function CreatePodcastPage() {
  return (
  <main>
    <form action={createPodcast} className="data" encType="multipart/form-data">
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="description" placeholder="Description" />
      <input type="text" name="youtube_url" placeholder="URL Youtube" />
      <input type="text" name="name_intervenant" placeholder="Name intervenant" />
      <input type="date" name="date"/>
      <label>Image de prévisualisation</label>
      <input type="file" name="image" accept="image/*" />
      <button type="submit">Créer</button>
    </form>
  </main>
  )
}
