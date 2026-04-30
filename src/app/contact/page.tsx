import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage({ searchParams }: { searchParams?: { sent?: string } }) {
  const sent = searchParams?.sent === '1'

  return (
    <main className="container views">
      <h2>Contactez-nous</h2>
      {sent && <p className="success-message">Merci, votre message a bien été envoyé.</p>}
      <form id="contactForm" className="contact-form" action="/api/contact" method="post">
        <div className="form-group-top">
          <div className="form-group-side">
            <div className="form-group">
              <label htmlFor="first-name">Nom :</label>
              <input type="text" id="first-name" name="first-name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>
          <div className="form-group-side">
            <div className="form-group">
              <label htmlFor="last-name">Prénom :</label>
              <input type="text" id="last-name" name="last-name" required />
            </div>
            <div className="form-group">
              <label htmlFor="number">N° de tél :</label>
              <input type="text" id="number" name="number" required />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message :</label>
          <textarea id="message" name="message" rows={5} required></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
      <div className="backgroundSVG contact">
        <img src="/svg/background.svg" alt="Background" />
        <img src="/svg/background.svg" alt="Background" />
      </div>
    </main>
  )
}
