import { test, expect } from '@playwright/test';
import axe from 'axe-core';
import { translations } from '../src/i18n/translations';
import { pagePath } from '../src/routing';

for (const width of [320, 1440]) {
  for (const language of ['en', 'fr'] as const) {
    test(`mascot placements: ${language}, ${width}px`, async ({ page }, testInfo) => {
      test.setTimeout(90000);
      const t = translations[language];
      await page.setViewportSize({ width, height: 900 });
      await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
      await page.goto(pagePath('home', language));
      const mascot = page.locator('main img[data-brand-mascot]');
      await mascot.scrollIntoViewIfNeeded();
      await expect(mascot).toBeVisible();
      await expect(mascot).toHaveAttribute('alt', '');
      await expect(mascot).toHaveAttribute('aria-hidden', 'true');
      await expect.poll(() => mascot.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      await expect(page.locator('.home-hero img').first()).toHaveAttribute('src', /african_mother_baby/);
      await expect(page.locator('main img[src*="cereal_bowl_spoon"]')).toHaveCount(2);
      await mascot.locator('..').screenshot({ path: testInfo.outputPath('preparation-tip.png') });

      await page.getByRole('button', { name: t.nav.calculator, exact: true }).click();
      const dialog = page.getByRole('dialog');
      await expect(dialog.locator('img[data-brand-mascot]')).toBeVisible();
      expect(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      await dialog.screenshot({ path: testInfo.outputPath('calculator.png') });
      await page.addScriptTag({ content: axe.source });
      const violations = await page.evaluate(async () => (await (window as any).axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
      })).violations.map((v: any) => v.id));
      expect(violations).toEqual([]);
      await page.keyboard.press('Escape');

      await page.goto(pagePath('contact', language));
      const inputs = page.locator('form input');
      await inputs.nth(0).fill('Audit User');
      await inputs.nth(1).fill('audit@example.com');
      await inputs.nth(2).fill('+237651406400');
      await page.locator('form textarea').fill('Please confirm availability.');
      await page.getByRole('button', { name: t.contactPage.sendBtn, exact: true }).click();
      await expect(page.getByRole('heading', { name: t.contactPage.successTitle, exact: true })).toBeFocused();
      await expect(page.locator('main img[data-brand-mascot]')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.locator('main img[data-brand-mascot]').locator('..').screenshot({ path: testInfo.outputPath('contact-ready.png') });
    });
  }
}
