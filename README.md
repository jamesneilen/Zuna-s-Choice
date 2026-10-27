# Zuna’s Choice

Node.js 22 or newer is required.

```sh
npm ci
npx playwright install chromium
npm run dev
```

## Production build

```sh
SITE_URL=https://your-production-domain.example npm run build
```

Replace the example with the actual public origin. `SITE_URL` is optional for previews; without it, the build omits canonical URLs and the sitemap rather than publishing an invented domain.

The build runs Vite, then Node and React prerender all five pages in English and French. Publish the complete `dist/` folder. Pages such as `/product/` and `/fr/product/` have their own `index.html`, metadata and rendered content, so static hosting does not need an SPA fallback for these routes. Older hash links are normalized by the app. Unknown URLs normalize to Home; hosts may serve `404.html` for unknown paths.

Production builds do not require a browser. Browser tests use bundled Playwright Chromium, or `/usr/bin/chromium` where available. To select an installed browser, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

## Checks

```sh
npm run lint
npm run build
npm test
```

The GitHub Actions workflow performs these checks on pushes and pull requests. Test messages are intercepted and never sent to WhatsApp.

## Product content

Business contact details live in `src/data/productData.ts`; English and French copy lives in `src/i18n/translations.ts`. Precise nutrition figures are withheld until approved labeling is supplied. Current images show serving suggestions; actual pouch photography is still required before publishing a packaging gallery.
