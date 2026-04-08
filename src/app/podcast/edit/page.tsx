import { getPodcastById, updatePodcast } from "@/lib/actions/podcasts"
import { notFound } from "next/navigation"

export default async function EditPodcastPage({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id } = await searchParams
  const podcast = await getPodcastById(id)

  if (!podcast) notFound()

  async function handleUpdate(formData: FormData) {
    "use server"
    await updatePodcast(podcast!.id, formData)
  }

  return(
  <main className="container views">
    <form action={handleUpdate} className="data">
      <label>Titre</label>
      <input type="text" name="title" defaultValue={podcast.title} required/>
      <label>Description</label>
      <input name="description" defaultValue={podcast.description ?? ''} required/>
      <label>URL Youtube</label>
      <input type="text" name="youtube_url" defaultValue={podcast.youtube_url ?? ''} required/>
      <label>Name Intervenant</label>
      <input type="text" name="name_intervenant" defaultValue={podcast.name_intervenant ?? ''} required/>
      <label>Date</label>
      <input type="date" name="date" defaultValue={podcast.date ?? ''} required/>
      <button type="submit">Enregistre les modifications</button>
    </form>
  </main>
  )
}
