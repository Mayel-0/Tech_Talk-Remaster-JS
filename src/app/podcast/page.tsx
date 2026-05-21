import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { getAllPodcasts } from "@/lib/actions/podcasts";
import { createClient } from "@/lib/supabase/server";
import PodcastClient from "./PodcastClient";

export const metadata: Metadata = {
  title: "Podcasts",
};

export default async function PodcastPage() {
  noStore();

  const podcasts = await getAllPodcasts();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    isAdmin = profile?.role === "admin";
  }

  return <PodcastClient podcasts={podcasts} isAdmin={isAdmin} />;
}
