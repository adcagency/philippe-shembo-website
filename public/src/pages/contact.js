export const contactPage = {
  key: 'contact',
  fr: {
    title: 'Philippe A. Shembo | Contact',
    description: 'Contactez le ministère de Philippe A. Shembo ou suivez-le sur les réseaux officiels.',
    ogTitle: 'Philippe A. Shembo | Contact',
    ogDescription: 'Contactez le ministère de Philippe A. Shembo ou suivez-le sur les réseaux officiels.',
    bodyHtml: `      <section class="section section--sand"><div class="shell contact-box">
        <p class="eyebrow">Contact</p>
        <h1>Écrivez-nous</h1>
        <p class="section-intro">Pour toute demande officielle, invitation, question pastorale ou renseignement, vous pouvez utiliser ce formulaire ou écrire directement à <a href="mailto:contact@philippeshembo.com">contact@philippeshembo.com</a>.</p>
        
        <form action="https://api.staticforms.xyz/submit" method="post" class="contact-form">
          <input type="hidden" name="accessKey" value="YOUR_STATICFORMS_ACCESS_KEY">
          <input type="hidden" name="subject" value="Nouveau message depuis le site Philippe Shembo">
          <input type="hidden" name="redirectTo" value="https://VOTRE_DOMAINE.com/contact/?success=true">
          <input type="text" name="honeypot" style="display:none">
          
          <div class="form-group">
            <label for="name">Nom complet <span aria-hidden="true">*</span></label>
            <input type="text" id="name" name="name" required placeholder="Votre nom">
          </div>
          <div class="form-group">
            <label for="email">Adresse email <span aria-hidden="true">*</span></label>
            <input type="email" id="email" name="email" required placeholder="votre.email@exemple.com">
          </div>
          <div class="form-group">
            <label for="message">Message <span aria-hidden="true">*</span></label>
            <textarea id="message" name="message" required rows="5" placeholder="Comment pouvons-nous vous aider ?"></textarea>
          </div>
          <button type="submit" class="button">Envoyer le message</button>
          <p class="form-note">Les champs marqués d'un * sont obligatoires.</p>
        </form>

        <div class="socials margin-top-lg">
          <p class="eyebrow">Réseaux officiels</p>
          <div class="social-pills justify-center" style="gap: 1rem; margin-top: 1rem;">
            <a href="https://chat.whatsapp.com/votre_lien_whatsapp_ici" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://www.facebook.com/PasteurPhilippeShembo" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com/pasteur.philippe.a.shembo/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/in/philippe-a-shembo-28920733b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div></section>`
  },
  en: {
    title: 'Philippe A. Shembo | Contact',
    description: "Contact Philippe A. Shembo's ministry or follow official social channels.",
    ogTitle: 'Philippe A. Shembo | Contact',
    ogDescription: "Contact Philippe A. Shembo's ministry or follow official social channels.",
    bodyHtml: `      <section class="section section--sand"><div class="shell contact-box">
        <p class="eyebrow">Contact</p>
        <h1>Write to us</h1>
        <p class="section-intro">For official inquiries, ministry invitations, or pastoral information, you can use this form or reach out directly to <a href="mailto:contact@philippeshembo.com">contact@philippeshembo.com</a>.</p>
        
        <form action="https://api.staticforms.xyz/submit" method="post" class="contact-form">
          <input type="hidden" name="accessKey" value="YOUR_STATICFORMS_ACCESS_KEY">
          <input type="hidden" name="subject" value="New message from Philippe Shembo website">
          <input type="hidden" name="redirectTo" value="https://VOTRE_DOMAINE.com/en/contact/?success=true">
          <input type="text" name="honeypot" style="display:none">
          
          <div class="form-group">
            <label for="name">Full name <span aria-hidden="true">*</span></label>
            <input type="text" id="name" name="name" required placeholder="Your name">
          </div>
          <div class="form-group">
            <label for="email">Email address <span aria-hidden="true">*</span></label>
            <input type="email" id="email" name="email" required placeholder="your.email@example.com">
          </div>
          <div class="form-group">
            <label for="message">Message <span aria-hidden="true">*</span></label>
            <textarea id="message" name="message" required rows="5" placeholder="How can we help you?"></textarea>
          </div>
          <button type="submit" class="button">Send message</button>
          <p class="form-note">Fields marked with * are required.</p>
        </form>

        <div class="socials margin-top-lg">
          <p class="eyebrow">Official networks</p>
          <div class="social-pills justify-center" style="gap: 1rem; margin-top: 1rem;">
            <a href="https://chat.whatsapp.com/votre_lien_whatsapp_ici" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://www.facebook.com/PasteurPhilippeShembo" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com/pasteur.philippe.a.shembo/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/in/philippe-a-shembo-28920733b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div></section>`
  }
};
