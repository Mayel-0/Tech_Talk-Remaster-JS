"use server"

import { createClient } from "../supabase/server"
import { createAdminClient } from "../supabase/admin"
import { redirect } from "next/navigation"

export type Podcast = {
    id: string
    title: string
    description: string | null
    youtube_url: string | null
    name_intervenant: string | null
    date: string | null
    created_at: string
}

export async function getAllPodcasts(): Promise<Podcast[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('date', { ascending: false })

    if (error) return []

    return data
}

export async function getPodcastById(id: string): Promise<Podcast | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return null

    return data
}

export async function createPodcast(formData: FormData) {
    const supabase = createAdminClient()

    const { error } = await supabase
        .from('podcasts')
        .insert({
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            youtube_url: formData.get('youtube_url') as string,
            name_intervenant: formData.get('name_intervenant') as string,
            date: formData.get('date') as string,
        })

    if (error) throw new Error(error.message)

    redirect('/podcast')
}

export async function updatePodcast(id: string, formData: FormData) {
    const supabase = createAdminClient()

    const { error } = await supabase
        .from('podcasts')
        .update({
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            youtube_url: formData.get('youtube_url') as string,
            name_intervenant: formData.get('name_intervenant') as string,
            date: formData.get('date') as string,
        })
        .eq('id', id)

    if (error) throw new Error(error.message)

    redirect('/podcast')
}

export async function deletePodcast(id: string) {
    const supabase = createAdminClient()

    const { error } = await supabase
        .from('podcasts')
        .delete()
        .eq('id', id)

    if (error) return { error: error.message }

    return { success: true }
}
