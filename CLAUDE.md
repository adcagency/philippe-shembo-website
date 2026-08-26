# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Bilingual (FR/EN) static ministry landing site for Philippe A. Shembo. No framework, no build/bundler, no template engine — `index.html` (FR, `/`) and `en/index.html` (EN, `/en/`) are two hand-written, independently maintained HTML documents. Any content or structural change must be applied to both files.

Spec and plan (authoritative for editorial rules, placeholder policy, and design tokens): `docs/superpowers/specs/2026-08-26-philippe-shembo-landing-design.md` and `docs/superpowers/plans/2026-08-26-philippe-shembo-landing-implementation.md`.

## Commands

- `npm test` — runs `node --test tests/site-content.test.js` (content-contract checks against `src/data/site-content.js`).
- `npm run test:e2e` — Playwright browser tests (`tests/landing.spec.js`), served against `http://127.0.0.1:4173`. `npx playwright test -g "<name>"` runs a single test by title; add `--project=chromium` to pin one browser.
- `npm run serve` — serves the repo root at port 4173 (used automatically as Playwright's `webServer`, `reuseExistingServer: true`).
- `npm run assets` — runs `scripts/optimize-assets.mjs`, regenerating `public/assets/` from `Ressources/`. Run this after any change to source files under `Ressources/`; `public/assets/` is gitignored and not checked in.

There is no lint/build/typecheck script; CSS and HTML are edited directly.

## Architecture

- `index.html` / `en/index.html` — semantic HTML source of truth. Structure: skip link → sticky header (logo, nav, language switcher) → `main` (hero → metrics → vision → ministry cards → sermons → books → support → biography → contact) → footer. One `h1` per page, section IDs (`ministry`, `sermons`, `books`, `support`, `contact`) are the nav anchor targets and must stay in sync across both languages.
- `src/data/site-content.js` — exports `SITE_CONTENT`: social URLs, the 14-book array, support payment placeholders, contact email. This is **not** wired into the HTML at render time (there's no build step) — it exists as a data contract that `tests/site-content.test.js` asserts against. When editorial data changes, update both this file and the corresponding hardcoded text in both HTML files by hand.
- `src/scripts/site.js` — the only JS, loaded as an ES module. Progressive enhancement only (mobile nav toggle, Escape-to-close, language-switcher links preserving the current `#hash`); must never gate indexable content.
- `src/styles/main.css` — single stylesheet, CSS custom properties for design tokens, no preprocessor.
- `scripts/optimize-assets.mjs` — copies fixed source→output path pairs from `Ressources/` to `public/assets/` and generates `.webp` derivatives via `sharp`. Throws if a required source file is missing. Never edit files under `Ressources/` in place; it's the untouched original asset source.
- `Ressources/` — original, unmodified source assets (photos, logos, motifs, book covers) provided by the client. `public/assets/` is the derived/optimized publish output and is gitignored.

## Editorial/content rules (enforced by tests and spec — do not bypass)

- Business-sensitive values (book titles/descriptions/purchase URLs, bank details, mobile money details, contact email, domain) that aren't confirmed use the literal placeholder string `[À renseigner]`. Never invent plausible-looking values for these.
- Placeholder values must render as plain text, never as an active link (`mailto:`, purchase URL, payment link) — `tests/site-content.test.js` and the plan encode this.
- Never fabricate sermons, testimonials, prices, donation instructions, or biographical claims not present in the supplied spec/biography.
- Only the four official social URLs already in `SITE_CONTENT.social` are used; don't add or guess others.
- Colors are fixed: violet `#4B0082`, gold `#D4AF37`, sand `#EAEAEA`, ink `#1C1C1C`, white `#FFFFFF`. Gold is accent-only, never body text on white (contrast). Headings use Playfair Display, body uses Lato, Antonio only for uppercase labels.
- Any change to one language's markup, nav anchors, or metadata (canonical/hreflang/OG/JSON-LD) needs the mirrored change in the other language's file.
