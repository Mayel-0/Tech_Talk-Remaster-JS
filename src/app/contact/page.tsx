export default function ContactPage() {
  return (
    <main className="container views">
      <h2>Contactez-nous</h2>
      <form id="contactForm" className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} required></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
      <div className="backgroundSVG">
      </div>
    </main>
  )
}
