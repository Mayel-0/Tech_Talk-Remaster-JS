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
};

export async function getAllPodcasts(): Promise<Podcast[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("podcasts")
    .select("*")
    .order("date", { ascending: false });

  if (error) return [];

  return data;
}

export async function getPodcastById(id: string): Promise<Podcast | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("podcasts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;

  return data;
}

export async function getLastPodcast(): Promise<Podcast | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("podcasts")
    .select("*")
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

  const { error } = await supabase.from("podcasts").insert({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    youtube_url: formData.get("youtube_url") as string,
    name_intervenant: formData.get("name_intervenant") as string,
    date,
    image_url,
  });

  if (error) throw new Error(error.message);

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

  redirect("/podcast");
}

export async function deletePodcast(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase.from("podcasts").delete().eq("id", id);

  if (error) throw new Error(error.message);

  redirect("/podcast");
}
