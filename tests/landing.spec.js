import { test, expect } from '@playwright/test';

test('French landing has semantic navigation and a single h1', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('nav a[href="#ministry"]')).toBeVisible();
  await expect(page.locator('a.skip-link')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
});

test('English page declares canonical and alternate French page', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/$/);
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveCount(1);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
});
