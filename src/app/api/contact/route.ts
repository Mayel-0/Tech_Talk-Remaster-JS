import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

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

  const contactEmail = process.env.CONTACT_EMAIL;
  if (!contactEmail) {
    return NextResponse.json(
      { error: "Adresse email de destination non configurée." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Formulaire TechTalk" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
    to: contactEmail,
    subject: "Nouveau message depuis le formulaire de contact",
    text: `Nom: ${lastName} ${firstName}\nEmail: ${email}\nTéléphone: ${number}\n\nMessage:\n${message}`,
    html: `<p><strong>Nom :</strong> ${lastName} ${firstName}</p>
           <p><strong>Email :</strong> ${email}</p>
           <p><strong>Téléphone :</strong> ${number}</p>
           <p><strong>Message :</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.redirect(new URL("/contact?sent=1", request.url));
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return NextResponse.json(
      { error: "Impossible d'envoyer le message." },
      { status: 500 },
    );
  }
}
