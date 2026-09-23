// src/data/sermons-service.js
import fs from 'node:fs';
import path from 'node:path';

const SERMONS_DIR = path.join(process.cwd(), 'content', 'sermons');

/**
 * Récupère tous les sermons triés par ordre
 * @returns {Array<{ order: number, slug: string, youtubeId: string, tagFr: string, tagEn: string, titleFr: string, titleEn: string, descFr: string, descEn: string }>}
 */
export function getSermons() {
  if (!fs.existsSync(SERMONS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(SERMONS_DIR).filter((f) => f.endsWith('.json'));

  const sermons = files.map((file) => {
    const raw = fs.readFileSync(path.join(SERMONS_DIR, file), 'utf8');
    return JSON.parse(raw);
  });

  return sermons.sort((a, b) => (a.order || 0) - (b.order || 0));
}
