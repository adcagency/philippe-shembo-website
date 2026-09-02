export const contactPage = {
  key: 'contact',
  fr: {
    title: 'Contact | Ministère de l’Apôtre Philippe A. Shembo',
    description: 'Contactez le ministère de l’Apôtre Philippe A. Shembo pour vos invitations, conférences, questions pastorales ou demandes officielles.',
    ogTitle: 'Contact | Ministère de l’Apôtre Philippe A. Shembo',
    ogDescription: 'Contactez le ministère de l’Apôtre Philippe A. Shembo pour vos invitations, conférences ou demandes officielles.',
    bodyHtml: `      <section class="section section--sand"><div class="shell">
        <div class="contact-box">
          <p class="eyebrow">Contact</p>
          <h1>Écrivez-nous</h1>
          <p class="section-intro">Pour toute demande officielle, invitation, question pastorale ou renseignement, vous pouvez renseigner ce formulaire ou écrire directement à <a href="mailto:contact@philippeshembo.com">contact@philippeshembo.com</a>.</p>
          
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
              <textarea id="message" name="message" required rows="5" placeholder="Votre message..."></textarea>
            </div>
            <button type="submit" class="button">Envoyer le message</button>
            <p class="form-note">Les champs marqués d'un * sont obligatoires.</p>
          </form>
        </div>
      </div></section>`
  },
  en: {
    title: 'Contact | Apostle Philippe A. Shembo’s Ministry',
    description: 'Contact Apostle Philippe A. Shembo’s ministry for speaking invitations, conferences, pastoral questions or official inquiries.',
    ogTitle: 'Contact | Apostle Philippe A. Shembo’s Ministry',
    ogDescription: 'Contact Apostle Philippe A. Shembo’s ministry for speaking invitations, conferences or official inquiries.',
    bodyHtml: `      <section class="section section--sand"><div class="shell">
        <div class="contact-box">
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
              <textarea id="message" name="message" required rows="5" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" class="button">Send message</button>
            <p class="form-note">Fields marked with * are required.</p>
          </form>
        </div>
      </div></section>`
  }
};
