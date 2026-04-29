import type { Metadata } from "next";
import { getPodcastById, updatePodcast } from "@/lib/actions/podcasts"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Modifier un podcast",
};

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
    <form action={handleUpdate} className="data" encType="multipart/form-data">
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
      <label>Image de prévisualisation</label>
      {podcast.image_url && (
        <img src={podcast.image_url} alt="Image actuelle" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }} />
      )}
      <input type="file" name="image" accept="image/*" />
      <button type="submit">Enregistre les modifications</button>
    </form>
  </main>
  )
}
