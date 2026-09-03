// tests/landing.spec.js
import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/', lang: 'fr' },
  { path: '/a-propos/', lang: 'fr' },
  { path: '/espace-medias/', lang: 'fr' },
  { path: '/bibliographie/', lang: 'fr' },
  { path: '/soutenir/', lang: 'fr' },
  { path: '/contact/', lang: 'fr' },
  { path: '/en/', lang: 'en' },
  { path: '/en/about/', lang: 'en' },
  { path: '/en/media/', lang: 'en' },
  { path: '/en/bibliography/', lang: 'en' },
  { path: '/en/support/', lang: 'en' },
  { path: '/en/contact/', lang: 'en' }
];

for (const { path: pagePath, lang } of PAGES) {
  test(`${pagePath} has a single h1, skip link, correct lang and canonical`, async ({ page }) => {
    await page.goto(pagePath);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('a.skip-link')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });
}

const LANGUAGE_PAIRS = [
  ['/', '/en/'],
  ['/a-propos/', '/en/about/'],
  ['/espace-medias/', '/en/media/'],
  ['/bibliographie/', '/en/bibliography/'],
  ['/soutenir/', '/en/support/'],
  ['/contact/', '/en/contact/']
];

for (const [frPath, enPath] of LANGUAGE_PAIRS) {
  test(`language switch on ${frPath} maps to ${enPath}`, async ({ page }) => {
    await page.goto(frPath);
    await expect(page.locator('.language a', { hasText: 'EN' })).toHaveAttribute('href', enPath);
    await page.goto(enPath);
    await expect(page.locator('.language a', { hasText: 'FR' })).toHaveAttribute('href', frPath);
  });
}

test('French home nav has no anchor links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav a[href^="#"]')).toHaveCount(0);
});

test('nav highlights the current page with aria-current', async ({ page }) => {
  await page.goto('/a-propos/');
  await expect(page.locator('nav ul a[href="/a-propos/"]')).toHaveAttribute('aria-current', 'page');
});

test('mobile view has hamburger menu at extreme right with language selector inside', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  const menuButton = page.locator('[data-menu-button]');
  await expect(menuButton).toBeVisible();

  // Language selector is inside navigation
  const nav = page.locator('[data-navigation]');
  await expect(nav.locator('.language')).toHaveCount(1);

  // Navigation is closed by default
  await expect(nav).toHaveAttribute('data-open', 'false');

  // Verify hamburger button is positioned at the right side of header
  const headerBox = await page.locator('.header-inner').boundingBox();
  const btnBox = await menuButton.boundingBox();
  expect(btnBox.x + btnBox.width).toBeGreaterThan(headerBox.x + headerBox.width - 40);

  // Click hamburger opens navigation and shows language selector
  await menuButton.click();
  await expect(nav).toHaveAttribute('data-open', 'true');
  await expect(nav.locator('.language')).toBeVisible();
});

