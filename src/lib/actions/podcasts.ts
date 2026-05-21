"use server";

import { createClient } from "../supabase/server";
import { createAdminClient } from "../supabase/admin";
import { redirect } from "next/navigation";

export type Podcast = {
  id: string;
  title: string;
  description: string | null;
  youtube_url: string | null;
  name_intervenant: string | null;
  date: string | null;
  image_url: string | null;
  created_at: string;
  podcast_categories: { category: string }[]; // peut être undefined au runtime
};

export async function getAllPodcasts(): Promise<Podcast[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("podcasts")
    .select(
      `
      *,
      podcast_categories!fk_podcast_categories_podcast (
        category
      )
    `,
    )
    .order("date", { ascending: false });

  console.log("data:", JSON.stringify(data, null, 2));
  console.log("error:", error);

  if (error) return [];

  return data.map((podcast) => ({
    ...podcast,
    podcast_categories: podcast.podcast_categories ?? [],
  }));
}

export async function getCategoriesByPodcast(
  podcastId: string,
): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("podcast_categories")
    .select("category")
    .eq("podcast_id", podcastId);

  if (error) return [];

  return data.map((item) => item.category);
}

export async function getPodcastById(id: string): Promise<Podcast | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("podcasts")
    .select(
      `
      *,
      podcast_categories!fk_podcast_categories_podcast (
        category
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) return null;

  return data;
}

export async function getLastPodcast(): Promise<Podcast | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("podcasts")
    .select(
      `
      *,
      podcast_categories!fk_podcast_categories_podcast (
        category
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) return null;

  return data;
}

async function uploadPodcastImage(
  supabase: ReturnType<typeof createAdminClient>,
  file: File,
): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from("podcast-images")
    .upload(path, file);
  if (error) return null;
  const { data } = supabase.storage.from("podcast-images").getPublicUrl(path);
  return data.publicUrl;
}

export async function createPodcast(formData: FormData) {
  const supabase = createAdminClient();

  const imageFile = formData.get("image") as File | null;
  const image_url =
    imageFile && imageFile.size > 0
      ? await uploadPodcastImage(supabase, imageFile)
      : null;

  const date = (formData.get("date") as string) || null;
  const categories = formData.getAll("categories") as string[];

  const { data, error } = await supabase
    .from("podcasts")
    .insert({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      youtube_url: formData.get("youtube_url") as string,
      name_intervenant: formData.get("name_intervenant") as string,
      date,
      image_url,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  if (categories.length > 0) {
    const { error: catError } = await supabase
      .from("podcast_categories")
      .insert(
        categories.map((category) => ({
          podcast_id: data.id,
          category,
        })),
      );

    if (catError) throw new Error(catError.message);
  }

  redirect("/podcast");
}

export async function updatePodcast(id: string, formData: FormData) {
  const supabase = createAdminClient();

  const imageFile = formData.get("image") as File | null;
  const newImageUrl =
    imageFile && imageFile.size > 0
      ? await uploadPodcastImage(supabase, imageFile)
      : undefined;

  const updateData: Record<string, string | null> = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    youtube_url: formData.get("youtube_url") as string,
    name_intervenant: formData.get("name_intervenant") as string,
    date: (formData.get("date") as string) || null,
  };
  if (newImageUrl !== undefined) updateData.image_url = newImageUrl;

  const { error } = await supabase
    .from("podcasts")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error(error.message);

  // Mettre à jour les catégories
  const categories = formData.getAll("categories") as string[];

  // Supprimer les anciennes catégories
  await supabase.from("podcast_categories").delete().eq("podcast_id", id);

  // Insérer les nouvelles
  if (categories.length > 0) {
    const { error: catError } = await supabase
      .from("podcast_categories")
      .insert(
        categories.map((category) => ({
          podcast_id: id,
          category,
        })),
      );

    if (catError) throw new Error(catError.message);
  }

  redirect("/podcast");
}

export async function deletePodcast(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase.from("podcasts").delete().eq("id", id);

  if (error) throw new Error(error.message);

  redirect("/podcast");
}
