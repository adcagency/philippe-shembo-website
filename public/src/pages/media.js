// src/pages/media.js
import { getSermons } from '../data/sermons-service.js';

function renderSermonCards(lang) {
  const sermons = getSermons();
  const actionLabel = lang === 'fr' ? 'Regarder sur YouTube →' : 'Watch on YouTube →';

  return sermons.map((sermon) => {
    const title = lang === 'fr' ? sermon.titleFr : sermon.titleEn;
    const tag = lang === 'fr' ? sermon.tagFr : sermon.tagEn;
    const desc = lang === 'fr' ? sermon.descFr : sermon.descEn;

    return `          <a class="sermon-card-modern reveal-on-scroll" href="https://www.youtube.com/watch?v=${sermon.youtubeId}" target="_blank" rel="noopener noreferrer">
            <div class="sermon-media-preview">
              <img class="sermon-thumb" src="https://img.youtube.com/vi/${sermon.youtubeId}/maxresdefault.jpg" alt="${title}" loading="lazy">
              <div class="sermon-overlay" aria-hidden="true"></div>
              <div class="sermon-play-icon" aria-hidden="true">▶</div>
              <span class="sermon-tag">${tag}</span>
            </div>
            <div class="sermon-content-box">
              <h2>${title}</h2>
              <p>${desc}</p>
              <span class="sermon-action-link">${actionLabel}</span>
            </div>
          </a>`;
  }).join('\n\n');
}

export const mediaPage = {
  key: 'media',
  fr: {
    title: 'Apôtre Philippe A. Shembo | Espace Médias & Prédications',
    description: 'Retrouvez l’ensemble des prédications, enseignements et séries vidéo de l’Apôtre Philippe A. Shembo.',
    ogTitle: 'Apôtre Philippe A. Shembo | Espace Médias & Prédications',
    ogDescription: 'Retrouvez l’ensemble des prédications, enseignements et séries vidéo de l’Apôtre Philippe A. Shembo.',
    bodyHtml: `      <section class="section section--violet"><div class="shell">
        <div class="section-header text-center">
          <h1 class="section-title">Prédications, Enseignements &amp; Messages</h1>
          <p class="section-intro">Nourrissez votre foi avec les messages inspirés et les séries d'édification de l’Apôtre Philippe A. Shembo.</p>
        </div>

        <div class="media-filter-pills">
          <span class="filter-pill filter-pill--active">Tous les messages</span>
          <span class="filter-pill">Prédications</span>
          <span class="filter-pill">Enseignements</span>
          <span class="filter-pill">Cultes</span>
          <span class="filter-pill">Prière</span>
        </div>

        <div class="sermon-grid margin-top-md">
${renderSermonCards('fr')}
        </div>

        <div class="media-cta-banner margin-top-md reveal-on-scroll text-center">
          <p class="eyebrow justify-center">Chaîne YouTube Officielle</p>
          <h2>Abonnez-vous pour ne manquer aucune vidéo</h2>
          <p class="section-intro">Rejoignez des milliers d'auditeurs et recevez chaque semaine les nouveaux cultes et enseignements apostoliques.</p>
          <p><a class="button" href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer">S'abonner sur YouTube</a></p>
        </div>
      </div></section>`
  },
  en: {
    title: 'Apostle Philippe A. Shembo | Media & Sermons',
    description: "Watch all sermons, teachings, and video series by Apostle Philippe A. Shembo.",
    ogTitle: 'Apostle Philippe A. Shembo | Media & Sermons',
    ogDescription: "Watch all sermons, teachings, and video series by Apostle Philippe A. Shembo.",
    bodyHtml: `      <section class="section section--violet"><div class="shell">
        <div class="section-header text-center">
          <h1 class="section-title">Sermons, Teachings &amp; Messages</h1>
          <p class="section-intro">Nourish your faith with inspired teachings and video series by Apostle Philippe A. Shembo.</p>
        </div>

        <div class="media-filter-pills">
          <span class="filter-pill filter-pill--active">All messages</span>
          <span class="filter-pill">Sermons</span>
          <span class="filter-pill">Teachings</span>
          <span class="filter-pill">Worship</span>
          <span class="filter-pill">Prayer</span>
        </div>

        <div class="sermon-grid margin-top-md">
${renderSermonCards('en')}
        </div>

        <div class="media-cta-banner margin-top-md reveal-on-scroll text-center">
          <p class="eyebrow justify-center">Official YouTube Channel</p>
          <h2>Subscribe to never miss a message</h2>
          <p class="section-intro">Join thousands of viewers worldwide and receive weekly apostolic messages and sermons.</p>
          <p><a class="button" href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a></p>
        </div>
      </div></section>`
  }
};
