import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/actions/contact";

export async function POST(request: Request) {
  const data = await request.formData();
  const firstName = data.get("first-name")?.toString() ?? "";
  const lastName = data.get("last-name")?.toString() ?? "";
  const email = data.get("email")?.toString() ?? "";
  const number = data.get("number")?.toString() ?? "";
  const message = data.get("message")?.toString() ?? "";

  if (!email || !message) {
    return NextResponse.json(
      { error: "Email et message requis." },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail({ firstName, lastName, email, number, message });
    return NextResponse.redirect(new URL("/contact?sent=1", request.url));
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return NextResponse.json(
      { error: "Impossible d'envoyer le message." },
      { status: 500 },
    );
  }
}
