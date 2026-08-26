# Open Graph images required

These files are **not yet provided** and must not be fabricated. Add them here before enabling social sharing previews:

- `philippe-shembo-fr.png` — 1200×630, French title/description overlay, used by `og:image` on `/`.
- `philippe-shembo-en.png` — 1200×630, English title/description overlay, used by `og:image` on `/en/`.

Source the portrait/logo/motif from `Ressources/` only. Once supplied, wire `og:image` (and `twitter:image` if added) into both `index.html` and `en/index.html`, and reference the same files from `public/sitemap.xml` if image sitemaps are added later.
