import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = [
  '/',
  '/a-propos/',
  '/espace-medias/',
  '/bibliographie/',
  '/soutenir/',
  '/contact/',
  '/mentions-legales/',
  '/en/',
  '/en/about/',
  '/en/media/',
  '/en/bibliography/',
  '/en/support/',
  '/en/contact/',
  '/en/legal/'
];

for (const pagePath of PAGES) {
  test(`${pagePath} has no detectable WCAG a11y violations`, async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(pagePath);
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
}
