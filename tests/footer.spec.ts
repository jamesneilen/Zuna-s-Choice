import { test, expect } from '@playwright/test';
import { pages, pagePath } from '../src/routing';
import { translations } from '../src/i18n/translations';

for (const width of [375, 1440]) {
  for (const language of ['en', 'fr'] as const) {
    test(`footer quick links navigate to the top: ${language}, ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 812 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
      await page.goto(pagePath('home', language));
      for (const destination of [...pages.slice(1), 'home', 'home'] as const) {
        const link = page.getByRole('navigation', { name: translations[language].footer.quickLinks }).getByRole('link', { name: translations[language].nav[destination], exact: true });
        await link.scrollIntoViewIfNeeded();
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
        await link.click();
        await expect(page).toHaveURL(pagePath(destination, language));
        expect(await page.evaluate(() => window.scrollY)).toBeLessThan(5);
        await expect(page.locator('main h1')).toBeFocused();
        await expect(link).toHaveAttribute('aria-current', 'page');
      }
    });
  }
}
