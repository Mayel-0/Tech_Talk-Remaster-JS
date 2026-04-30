import nodemailer from "nodemailer";

export async function sendContactEmail({
  firstName,
  lastName,
  email,
  number,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  message: string;
}) {
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!contactEmail) {
    throw new Error("Adresse email de destination non configurée.");
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
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to: contactEmail,
    subject: "Nouveau message depuis le formulaire de contact",
    text: `Nom: ${lastName} ${firstName}\nEmail: ${email}\nTéléphone: ${number}\n\nMessage:\n${message}`,
    html: `<p><strong>Nom :</strong> ${lastName} ${firstName}</p>
           <p><strong>Email :</strong> ${email}</p>
           <p><strong>Téléphone :</strong> ${number}</p>
           <p><strong>Message :</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`,
  };

  return transporter.sendMail(mailOptions);
}
