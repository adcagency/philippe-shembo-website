export const contactPage = {
  key: 'contact',
  fr: {
    title: 'Contact | Ministère de l’Apôtre Philippe A. Shembo',
    description: 'Contactez le ministère de l’Apôtre Philippe A. Shembo pour vos invitations, conférences, questions pastorales ou demandes officielles.',
    ogTitle: 'Contact | Ministère de l’Apôtre Philippe A. Shembo',
    ogDescription: 'Contactez le ministère de l’Apôtre Philippe A. Shembo pour vos invitations, conférences ou demandes officielles.',
    bodyHtml: `      <section class="section section--sand"><div class="shell">
        <div class="contact-box">
          
          <h1>Écrivez-nous</h1>
          <p class="section-intro">Pour toute demande officielle, invitation, question pastorale ou renseignement, vous pouvez renseigner ce formulaire ou écrire directement à <a href="mailto:contact@philippeshembo.com">contact@philippeshembo.com</a>.</p>
          
          <form action="https://api.staticforms.dev/submit" method="post" class="contact-form">
            <input type="hidden" name="apiKey" value="sf_8f25a79e606fb51b92408a63">
            <input type="hidden" name="subject" value="Nouveau message depuis le site Philippe Shembo">
            <input type="hidden" name="redirectTo" value="https://philippeshembo.com/contact/?success=true">
            <label for="contact-honeypot" class="visually-hidden"></label>
            <input type="text" name="honeypot" id="contact-honeypot" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">
            
            <div class="form-group">
              <label for="name">Nom complet <span aria-hidden="true">*</span></label>
              <input type="text" id="name" name="name" required autocomplete="name" aria-required="true" placeholder="Votre nom">
            </div>
            <div class="form-group">
              <label for="email">Adresse email <span aria-hidden="true">*</span></label>
              <input type="email" id="email" name="email" required autocomplete="email" aria-required="true" placeholder="votre.email@exemple.com">
            </div>
            <div class="form-group">
              <label for="message">Message <span aria-hidden="true">*</span></label>
              <textarea id="message" name="message" required aria-required="true" rows="5" placeholder="Votre message..."></textarea>
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
          <h1>Write to us</h1>
          <p class="section-intro">For official inquiries, ministry invitations, or pastoral information, you can use this form or reach out directly to <a href="mailto:contact@philippeshembo.com">contact@philippeshembo.com</a>.</p>
          
          <form action="https://api.staticforms.dev/submit" method="post" class="contact-form">
            <input type="hidden" name="apiKey" value="sf_8f25a79e606fb51b92408a63">
            <input type="hidden" name="subject" value="New message from Philippe Shembo website">
            <input type="hidden" name="redirectTo" value="https://philippeshembo.com/en/contact/?success=true">
            <label for="en-contact-honeypot" class="visually-hidden">Do not fill this field</label>
            <input type="text" name="honeypot" id="en-contact-honeypot" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">
            
            <div class="form-group">
              <label for="name">Full name <span aria-hidden="true">*</span></label>
              <input type="text" id="name" name="name" required autocomplete="name" aria-required="true" placeholder="Your name">
            </div>
            <div class="form-group">
              <label for="email">Email address <span aria-hidden="true">*</span></label>
              <input type="email" id="email" name="email" required autocomplete="email" aria-required="true" placeholder="your.email@example.com">
            </div>
            <div class="form-group">
              <label for="message">Message <span aria-hidden="true">*</span></label>
              <textarea id="message" name="message" required aria-required="true" rows="5" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" class="button">Send message</button>
            <p class="form-note">Fields marked with * are required.</p>
          </form>
        </div>
      </div></section>`
  }
};
