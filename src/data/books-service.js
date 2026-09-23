// src/data/books-service.js
import fs from 'node:fs';
import path from 'node:path';

const BOOKS_DIR = path.join(process.cwd(), 'content', 'books');

/**
 * Récupère tous les ouvrages triés par ordre d'affichage
 * @returns {Array<{ order: number, title: string, description: string, image: string, url: string, status: string }>}
 */
export function getBooks() {
  if (!fs.existsSync(BOOKS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BOOKS_DIR).filter((f) => f.endsWith('.json'));

  const books = files.map((file) => {
    const raw = fs.readFileSync(path.join(BOOKS_DIR, file), 'utf8');
    return JSON.parse(raw);
  });

  return books.sort((a, b) => (a.order || 0) - (b.order || 0));
}
