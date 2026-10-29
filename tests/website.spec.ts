import { test, expect } from '@playwright/test';
import { pages, pagePath } from '../src/routing';

test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
});

for (const width of [320, 375, 768, 1280, 1440]) {
  for (const language of ['en', 'fr'] as const) {
    test(`layouts and direct URLs: ${language}, ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 812 });
      for (const id of pages) {
        await page.goto(pagePath(id, language));
        await expect(page.locator('html')).toHaveAttribute('lang', language);
        await expect(page.locator('main h1')).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await expect(page.locator('a[href="mailto:info@zunaschoice.cm"]').first()).toBeAttached();
        await expect(page.locator('a[href="mailto:hello@zunaschoice.cm"]')).toHaveCount(0);
        if (width >= 1280) {
          await expect(page.getByRole('navigation', { name: language === 'fr' ? 'Navigation principale' : 'Main navigation' })).toBeVisible();
        }
        if (id === 'home') {
          await expect(page.locator('main img[src$="/zuna-logo.webp"]')).toHaveCount(0);
          await expect(page.locator('main img').first()).toHaveAttribute('src', /african_mother_baby/);
          const photoSources = await page.locator('main img').evaluateAll(images => images.map(image => image.getAttribute('src')));
          expect(new Set(photoSources).size).toBe(photoSources.length);
          const caption = await page.getByText(language === 'fr' ? 'De l’attention à chaque cuillerée.' : 'Care in every spoonful.', { exact: true }).boundingBox();
          const badge = await page.locator('main .absolute.-bottom-4').first().boundingBox();
          expect(caption && badge && caption.y >= badge.y + badge.height).toBeTruthy();
        }
      }
    });
  }
}

test('mobile order summary stays inside its card and restores menu focus', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/');
  const trigger = page.locator('[data-menu-trigger]');
  await trigger.click();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(page.locator('#mobile-navigation')).toHaveCount(0);
  await trigger.click();
  await page.locator('#mobile-navigation').getByRole('button', { name: 'Order Now', exact: false }).click();
  const dialog = page.getByRole('dialog');
  const card = await dialog.locator('div.p-4.space-y-4').boundingBox();
  const price = await dialog.locator('span.text-xl').boundingBox();
  expect(card && price && price.x + price.width <= card.x + card.width).toBeTruthy();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

test('routing, active links, focus, language persistence and legacy links', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Our Product', exact: true }).click();
  await expect(page).toHaveURL(/\/product\/$/);
  await expect(page.locator('main h1')).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Our Product', exact: true })).toHaveAttribute('aria-current', 'page');
  await page.getByRole('button', { name: 'Passer au Français' }).click();
  await expect(page).toHaveURL(/\/fr\/product\/$/);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await page.goto('/#story');
  await expect(page).toHaveURL(/\/fr\/story\/$/);
  await page.goto('/#not-a-page');
  await expect(page).toHaveURL(/\/fr\/$/);
  await page.goto('/#order');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.reload();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('contact validates phone, focuses confirmation and preserves edits', async ({ page }) => {
  await page.goto('/contact/');
  const inputs = page.locator('form input');
  await inputs.nth(0).fill('Audit User');
  await inputs.nth(1).fill('audit@example.com');
  await inputs.nth(2).fill('   ');
  await page.locator('form textarea').fill('Please confirm availability.');
  await page.getByRole('button', { name: 'Prepare WhatsApp Message' }).click();
  await expect(page.getByRole('alert')).toContainText('valid phone');
  await expect(inputs.nth(2)).toBeFocused();
  await inputs.nth(2).fill('+237 651 406 400');
  await page.getByRole('button', { name: 'Prepare WhatsApp Message' }).click();
  await expect(page.getByRole('heading', { name: 'Your Message Is Ready' })).toBeFocused();
  await page.getByRole('button', { name: 'Edit message' }).click();
  await expect(page.locator('form input').first()).toBeFocused();
  await expect(page.locator('form textarea')).toHaveValue('Please confirm availability.');
});

test('orders validate essential details and encode the confirmed contact', async ({ page }) => {
  await page.goto('/#order');
  await page.evaluate(() => { window.open = ((url: string | URL) => { (window as any).auditUrl = String(url); return null; }) as typeof window.open; });
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: 'Send Order via WhatsApp', exact: true }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  expect(await page.evaluate(() => (window as any).auditUrl)).toBeUndefined();
  await dialog.locator('input').nth(0).fill('User & Family');
  await dialog.locator('input').nth(1).fill('Douala');
  await dialog.getByRole('button', { name: 'Send Order via WhatsApp', exact: true }).click();
  const url = await page.evaluate(() => (window as any).auditUrl);
  expect(url).toMatch(/^https:\/\/wa.me\/237651406400\?text=/);
  expect(decodeURIComponent(url)).toContain('User & Family');
});

test('prerendered HTML exposes real content and localized metadata without JavaScript', async ({ request }) => {
  for (const [url, locale] of [['/product/', 'en'], ['/fr/product/', 'fr']]) {
    const response = await request.get(url);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(`<html lang="${locale}"`);
    expect(html).toContain('<h1');
    expect(html).toContain(locale === 'fr' ? 'refermable' : 'resealable');
    expect(html).not.toContain('127.0.0.1');
    expect(html).toContain('info@zunaschoice.cm');
  }
});

test('nutrition is qualitative, localized and contains no unverified panel', async ({ page }) => {
  for (const locale of ['en', 'fr'] as const) {
    await page.goto(pagePath('nutrition', locale));
    await expect(page.locator('main table')).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText('14.8');
    await expect(page.locator('main')).not.toContainText('Wheat (Glucides');
    await expect(page.locator('main')).not.toContainText('Soybeans (Protéines');
  }
});

test('200% text enlargement does not overflow the header', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
