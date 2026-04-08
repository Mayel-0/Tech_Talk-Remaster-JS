import { getAllPodcasts } from "@/lib/actions/podcasts";
import { NextResponse } from "next/server";

export async function GET() {
    const podcasts = await getAllPodcasts()

    return NextResponse.json(podcasts);
}