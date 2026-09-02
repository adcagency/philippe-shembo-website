---
name: Philippe A. Shembo Ministry
description: Dignified, bilingual editorial design system for the ministry of Pastor Philippe A. Shembo
colors:
  primary: "#4B0082"
  primary-dark: "#22003D"
  primary-deep: "#160029"
  primary-light: "#6B1D9E"
  primary-gradient-start: "#2D0052"
  primary-gradient-mid: "#570096"
  primary-surface-dark: "#1A0030"
  accent-gold: "#D4AF37"
  accent-gold-light: "#F2E3B3"
  accent-gold-dark: "#B59022"
  sand: "#F8F6F2"
  sand-muted: "#ECE8E1"
  neutral-ink: "#1A1625"
  neutral-paper: "#FFFFFF"
  neutral-muted: "#575260"
  neutral-footer-muted: "#D8D2DE"
  neutral-footer-sub: "#AFA8B8"
  neutral-line: "#E3DDD5"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.8rem, 7vw, 5.2rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.1rem, 4.5vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.4rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Cinzel, Plus Jakarta Sans, Georgia, serif"
    fontSize: "0.88rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.14em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4rem"
  xxl: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.accent-gold}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1.6rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-paper}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1.6rem"
  button-ghost-dark:
    backgroundColor: "transparent"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1.6rem"
  card-overview:
    backgroundColor: "{colors.neutral-paper}"
    rounded: "{rounded.md}"
    padding: "2rem"
---

# Design System: Philippe A. Shembo Ministry

## Overview

**Creative North Star: "The Pastoral Sanctuary"**

The visual language balances sacred dignity, intellectual depth, and warm accessibility. It avoids the flashiness and aggressive commercialism of modern televangelism in favor of an enduring, bookish elegance worthy of an apostolic teacher and author.

Deep royal violet surfaces evoke spiritual depth and solemnity, balanced by warm, tactile sand and crisp paper canvases. Champagne gold acts as a deliberate accent—bringing light and focus to key calls-to-action, badges, and portrait frames without descending into ostentation.

**Key Characteristics:**
- Noble color harmony: deep imperial violet (`#22003D`, `#4B0082`) grounded by natural sand (`#F8F6F2`) and refined gold (`#D4AF37`).
- Stately typography: majestic *Cormorant Garamond* editorial serif headings paired with clean, highly legible *Plus Jakarta Sans* body text and refined *Cinzel* section tags.
- Tactile and refined depth: soft ambient shadows (`0 10px 30px rgba(26, 22, 37, 0.1)`), gentle golden glows on interactive focus, and smooth 250ms spring transitions.
- Uncompromising truthfulness: strict use of clear placeholders (`[À renseigner]`) for unconfirmed data, avoiding fabricated claims or artificial hype.

## Colors

The palette draws upon noble ecclesiastical tones, balancing deep violet substrates with warm parchment neutrals and restrained gold accents.

### Primary
- **Imperial Royal Violet** (`#4B0082` / `--violet`): The core brand color representing pastoral authority and spiritual depth.
- **Deep Midnight Violet** (`#22003D` / `--violet-dark`): Used for header chrome, hero backdrops, and dark section containers.
- **Abyssal Violet** (`#160029` / `--violet-deep`): Used in radial gradients to ground the visual weight of dark surfaces.
- **Vibrant Amethyst** (`#6B1D9E` / `--violet-light`): Used for hover interactions and link highlights.
- **Twilight Violet Gradient** (`#2D0052` / `--violet-gradient-start`): Radial gradient focal color in footer and hero lighting.
- **Luminous Violet** (`#570096` / `--violet-gradient-mid`): Top-left light source in featured sermon cards.
- **Velvet Shadow Violet** (`#1A0030` / `--violet-surface-dark`): Bottom-right base in featured sermon cards.

### Secondary
- **Champagne Gold** (`#D4AF37` / `--gold`): Used exclusively for primary buttons, focus rings, and key border accents.
- **Luminous Pale Gold** (`#F2E3B3` / `--gold-light`): Used for eyebrow text on dark backgrounds and subtle hover states.
- **Antique Deep Gold** (`#B59022` / `--gold-dark`): Used for iconography and high-contrast gold elements.

### Neutral
- **Natural Sand Paper** (`#F8F6F2` / `--sand`): Warm alternative section background creating comfortable reading warmth.
- **Muted Sand** (`#ECE8E1` / `--sand-muted`): Soft divider and container background.
- **Midnight Ink** (`#1A1625` / `--ink`): High-legibility deep neutral for primary text on light backgrounds.
- **Pure Paper** (`#FFFFFF` / `--paper`): Clean card and page substrate.
- **Slate Muted** (`#575260` / `--muted`): Secondary body and metadata text.
- **Footer Muted Violet** (`#D8D2DE` / `--text-footer-muted`): Primary footer text and copyright.
- **Footer Subdued** (`#AFA8B8` / `--text-footer-sub`): Secondary footer navigation links and legal text.
- **Hairline Border** (`#E3DDD5` / `--line`): Subtle structural border for light surface cards.

### Named Rules
**The Gold Rarity Rule.** Champagne gold is an accent and sacred highlight; it occupies ≤10% of any surface and is never used as body text on light backgrounds due to contrast requirements.

**The Section Alternation Rule.** Long-form content flows between warm light sections (`--sand`, `--paper`) and resonant dark violet sections (`--violet-dark`) to establish clear rhythm without visual fatigue.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, serif fallback)  
**Body Font:** Plus Jakarta Sans (with system-ui, -apple-system, sans-serif fallback)  
**Label/Eyebrow Font:** Cinzel (with Plus Jakarta Sans, Georgia, serif fallback)

**Character:** Classique, posé et épuré. *Cormorant Garamond* apporte un contraste d'épaisseur élégant et une dignité sans fioritures aux grands titres, *Plus Jakarta Sans* offre une clarté géométrique moderne et fluide pour le corps de texte, et *Cinzel* (700 en capitales) assure une netteté sculptée et classique pour les surtitres.

### Hierarchy
- **Display** (700 weight, `clamp(2.8rem, 7vw, 5.2rem)`, line-height 1.02, letter-spacing -0.02em): Hero statements and high-impact page titles.
- **Headline** (700 weight, `clamp(2.1rem, 4.5vw, 3.6rem)`, line-height 1.1, letter-spacing -0.01em): Primary section titles.
- **Title Large** (700 weight, `1.6rem`, line-height 1.2): Prominent feature cards and action modules.
- **Title** (700 weight, `1.4rem`, line-height 1.2): Standard cards and quote blocks.
- **Lead / Intro** (400 weight, `1.15rem` to `1.2rem`, line-height 1.7): Section introductory paragraphs and hero summaries.
- **Body** (400 weight, `1.05rem`, line-height 1.65): Standard editorial prose, capped at 65–75ch for optimal reading comfort.
- **Body Small** (400/600 weight, `0.95rem` to `0.98rem`, line-height 1.5): Navigation links, footer text, legal details, and secondary metadata.
- **Label / Eyebrow** (700/800 weight, `0.85rem` to `0.88rem`, line-height 1, letter-spacing 0.14em, uppercase): Section category tags, status pills, and badge markers.

### Named Rules
**The Tri-Type Distinction Rule.** Never mix the roles of the three type families: Cinzel is strictly for uppercase labels, Cormorant Garamond strictly for headings/quotes, and Plus Jakarta Sans for all body copy and metadata.

## Layout

The spatial model uses a centralized shell container with responsive fluid margins and standard vertical rhythm:

- **Shell Container:** `width: min(calc(100% - 3rem), 76rem)` centered with `margin-inline: auto`.
- **Section Spacing:** Generous 6rem (96px) vertical padding on desktop, scaling to 3.5rem (56px) on mobile.
- **Grid Systems:** 
  - 2-column asymmetric split (`1.1fr 0.9fr`) for hero and portrait features above 680px.
  - Multi-column auto-fit grids for ministry cards, books showcase, and support tiers.
- **Breakpoints:** Fluid scaling with key media breakpoints at `680px` (tablet/desktop column switch) and `960px` (expanded navigation).

## Elevation & Depth

Depth is established through soft ambient shadows on light surfaces and luminous gold ambient halos on dark violet surfaces. Flat surfaces remain calm at rest and elevate subtly upon interaction.

### Shadow Vocabulary
- **Subtle Rest** (`box-shadow: 0 4px 12px rgba(26, 22, 37, 0.06)`): Default state for overview cards and quote blocks.
- **Hover Lift** (`box-shadow: 0 10px 30px rgba(26, 22, 37, 0.1)`): Interactive hover elevation for clickable cards.
- **Prominent Focal** (`box-shadow: 0 20px 48px rgba(26, 22, 37, 0.16)`): Modal menus, hero portrait frames, and book showcases.
- **Gold Radiance** (`box-shadow: 0 0 30px rgba(212, 175, 55, 0.25)`): Ambient sacred glow around portrait frames and gold hover buttons.

### Named Rules
**The Rest-to-Lift Rule.** Cards and buttons rest on hairline borders with minimal elevation, lifting `-3px` to `-5px` with deepened shadows and intensified gold borders only upon active user hover.

## Shapes

- **Form Language:** Architectural, measured, and dignified.
- **Corner Radii:**
  - Small (`6px` / `--radius-sm`): Buttons, skip-links, social tags, and navigation items.
  - Medium (`12px` / `--radius-md`): Standard cards, quotes, and dropdown menus.
  - Large (`20px` / `--radius-lg`): Hero portrait frames and featured showcase cards.
- **Borders:** Consistent 1px solid hairline (`#E3DDD5` on light surfaces, `rgba(212, 175, 55, 0.35)` on dark surfaces).

## Components

### Buttons
- **Shape:** Gently rounded corners (`6px` radius).
- **Primary:** Gold gradient (`linear-gradient(135deg, #E5C358 0%, #D4AF37 100%)`), dark ink text (`#1A1625`), 800 weight, padded `0.85rem 1.6rem`, minimum height 52px.
- **Hover / Focus:** Lifts `-3px`, gradient brightens to `#F3E098`, glowing gold shadow expands (`0 8px 25px rgba(212, 175, 55, 0.45)`). Focus visible displays 3px solid gold outline with 4px offset.
- **Ghost (Dark Surface):** Transparent background with `rgba(255, 255, 255, 0.6)` border and white text; hovers to full white background with dark violet text.
- **Ghost (Light Surface):** Transparent background with `#22003D` border and dark violet text; hovers to solid violet background with white text.

### Cards / Containers
- **Corner Style:** Medium radius (`12px`).
- **Background:** Crisp pure paper (`#FFFFFF`) on light sections; deep gradient (`#22003D` to `#160029`) on dark sections.
- **Border:** 1px solid line (`#E3DDD5` or `rgba(212, 175, 55, 0.4)`).
- **Internal Padding:** `2rem` (32px) to `2.5rem` (40px).
- **Hover Behavior:** Translates `-4px` vertically with deepened shadow.

### Navigation Bar
- **Sticky Chrome:** Pinned to top with `backdrop-filter: blur(16px)` and `rgba(34, 0, 61, 0.92)` translucent midnight violet background.
- **Links:** 600 weight, `#FFFFFF` with gold hover transitions. Active link marked by `aria-current="page"` with left/bottom gold indicator bar.
- **Language Switcher:** Rounded pill dropdown (`20px` radius) with current language code, label, and animated chevron.

### Social Pills
- **Style:** Compact pill tags (`20px` radius) with sand background (`#F8F6F2`) and subtle violet border (`rgba(75, 0, 130, 0.25)`).
- **Hover:** Transitions to solid violet background with white text.

## Do's and Don'ts

### Do:
- **Do** maintain strict WCAG AA contrast (≥4.5:1 for body copy, ≥3:1 for graphical UI elements).
- **Do** preserve the exact placeholder string `[À renseigner]` for unconfirmed bank, contact, or book details.
- **Do** keep animations crisp and bounded between 200ms and 250ms with `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Do** ensure 100% feature and visual parity between French and English page mirrors.
- **Do** respect `prefers-reduced-motion` across all transitions and transforms.

### Don't:
- **Don't** use gold (`#D4AF37`) as body text color on white or sand backgrounds.
- **Don't** introduce carousels, auto-playing videos, or ticker counters into the hero.
- **Don't** fabricate testimonials, partner logos, sermons, or statistical metrics.
- **Don't** add client-side JavaScript that blocks rendering or hides indexable HTML content.
- **Don't** alter the original assets under `Ressources/`; always generate optimized WebP derivatives into `public/assets/`.
