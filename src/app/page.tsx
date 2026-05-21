import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { getLastPodcast, getAllPodcasts, deletePodcast } from "@/lib/actions/podcasts";
import { createClient } from "@/lib/supabase/server";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Accueil",
};

export default async function Home() {
  noStore();

  const [podcast, podcasts] = await Promise.all([
    getLastPodcast(),
    getAllPodcasts(),
  ]);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    isAdmin = profile?.role === 'admin';
  }

  return <HomeClient podcast={podcast} podcasts={podcasts} isAdmin={isAdmin} />;
}
