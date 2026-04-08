"use server"

import { createClient } from "../supabase/server"
import { createAdminClient } from "../supabase/admin"
import { redirect } from "next/navigation"

export async function signInWithMagicLink(formData: FormData) {
    const email = formData.get('email') as string

    const supabase = await createClient()

    const admin = createAdminClient()
    const { data: existingProfile } = await admin
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single()

    if (!existingProfile) {
        return {
            error: 'Compte introuvable',
            isNewUser: true
        }
    }

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
        }
    })

    if (error) {
        return { error: 'Impossible d\'envoyer le lien. Veuillez réessayer.' }
    }

    return { success: true }
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
