import { test, expect } from '@playwright/test';
import axe from 'axe-core';
import { pages, pagePath } from '../src/routing';
for (const width of [375, 1440]) {
  for (const language of ['en', 'fr'] as const) {
    test(`accessibility: ${language}, ${width}px`, async ({ page }) => {
      test.setTimeout(90000);
      await page.setViewportSize({ width, height: 900 });
      await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
      for (const id of pages) {
        await page.goto(pagePath(id, language));
        await page.addScriptTag({ content: axe.source });
        const violations = await page.evaluate(async () => {
          const result = await (window as any).axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] } });
          return result.violations.map((v: any) => ({ id: v.id, targets: v.nodes.map((node: any) => node.target) }));
        });
        expect(violations, `${id}: ${JSON.stringify(violations)}`).toEqual([]);
      }
    });
  }
}
