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
    const errorUrl = new URL("/erreur", request.url);
    errorUrl.searchParams.set("message", "Email et message sont requis.");
    errorUrl.searchParams.set("code", "400");
    return NextResponse.redirect(errorUrl, 303);
  }

  try {
    await sendContactEmail({ firstName, lastName, email, number, message });
    return NextResponse.redirect(new URL("/contact?sent=1", request.url), 303);
  } catch (error) {
    console.error("Erreur envoi email:", error);
    const errorUrl = new URL("/erreur", request.url);
    errorUrl.searchParams.set(
      "message",
      "Impossible d'envoyer le message. Veuillez réessayer plus tard.",
    );
    errorUrl.searchParams.set("code", "500");
    return NextResponse.redirect(errorUrl, 303);
  }
}
