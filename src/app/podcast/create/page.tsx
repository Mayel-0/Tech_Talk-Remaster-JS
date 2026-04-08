import { createPodcast } from "@/lib/actions/podcasts"

export default function CreatePodcastPage() {
  return (
  <main>
    <form action={createPodcast} className="data">
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="description" placeholder="Description" />
      <input type="text" name="youtube_url" placeholder="URL Youtube" />
      <input type="text" name="name_intervenant" placeholder="Name intervenant" />
      <input type="date" name="date"/>
      <button type="submit">Créer</button>
    </form>
  </main>
  )
}
