// src/data/site-content.js
import fs from 'node:fs';
import path from 'node:path';
import { getBooks } from './books-service.js';

const SETTINGS_FILE = path.join(process.cwd(), 'content', 'settings', 'general.json');

function loadSettings() {
  if (fs.existsSync(SETTINGS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    } catch {
      // Fallback en cas d'erreur de lecture
    }
  }
  return {
    social: {
      facebook: 'https://www.facebook.com/PasteurPhilippeShembo',
      instagram: 'https://www.instagram.com/pasteur.philippe.a.shembo/',
      linkedin: 'https://www.linkedin.com/in/philippe-a-shembo-28920733b/',
      youtube: 'https://www.youtube.com/@andyphilippeshembo',
      whatsapp: 'https://whatsapp.com/channel/0029Vb8JW7mDp2Q7RdPrVh3o'
    },
    support: {
      bank: { bank: 'À venir', holder: 'À venir', iban: 'À venir', swift: 'À venir' },
      mobileMoney: { operator: 'À venir', number: 'À venir', beneficiary: 'À venir' },
      other: { name: 'À venir', url: 'À venir', currency: 'À venir' }
    },
    contact: { email: 'contact@philippeshembo.com' }
  };
}

const settings = loadSettings();

export const SITE_CONTENT = {
  social: settings.social,
  books: getBooks(),
  support: settings.support,
  contact: settings.contact
};
