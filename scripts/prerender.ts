import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { pagePath, pages } from '../src/routing';
import { translations } from '../src/i18n/translations';

const { render } = await import(pathToFileURL(resolve('work/ssr/entry-server.js')).href);
const configuredUrl = process.env.SITE_URL?.trim();
const origin = configuredUrl ? new URL(configuredUrl).origin : '';
if (origin && !origin.startsWith('https://')) throw new Error('SITE_URL must use HTTPS.');
const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
const template = (await readFile('dist/index.html', 'utf8'))
  .replace(/<link rel="(?:canonical|alternate)"[^>]*>/g, '')
  .replace(/<meta property="og:url"[^>]*>/g, '');
if (!template.includes('<!--app-start-->')) throw new Error('Missing app template marker; run the Vite build first.');
const paths: string[] = [];
for (const language of ['en', 'fr'] as const) {
  const t = translations[language];
  const descriptions = { home: t.hero.subtitle, product: t.productPage.subtitle, nutrition: t.nutritionPage.heroSubtitle, story: t.storyPage.heroSubtitle, contact: t.contactPage.heroSubtitle };
  for (const id of pages) {
    const path = pagePath(id, language);
    const title = `${t.nav[id]} | Zuna's Choice`;
    let html = template.replace('<html lang="en">', `<html lang="${language}">`)
      .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
      .replace(/<!--app-start-->[\s\S]*?<!--app-end-->/, `<!--app-start--><div id="root">${render(id, language)}</div><!--app-end-->`);
    const meta = (attribute: string, key: string, content: string) => {
      const tag = `<meta ${attribute}="${key}" content="${escape(content)}" />`;
      const pattern = new RegExp(`<meta ${attribute}="${key}"[^>]*>`);
      html = pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `${tag}\n</head>`);
    };
    meta('name', 'description', descriptions[id]);
    meta('property', 'og:title', title);
    meta('property', 'og:description', descriptions[id]);
    meta('property', 'og:locale', language === 'fr' ? 'fr_CM' : 'en_CM');
    meta('property', 'og:image', `${origin}/assets/share.jpg`);
    meta('name', 'twitter:title', title);
    meta('name', 'twitter:description', descriptions[id]);
    meta('name', 'twitter:image', `${origin}/assets/share.jpg`);
    if (origin) {
      meta('property', 'og:url', origin + path);
      const links = `<link rel="canonical" href="${escape(origin + path)}" />\n` + (['en', 'fr'] as const).map(locale => `<link rel="alternate" hreflang="${locale}" href="${escape(origin + pagePath(id, locale))}" />`).join('\n');
      html = html.replace('</head>', links + '\n</head>');
    }
    await mkdir(`dist${path}`, { recursive: true });
    await writeFile(`dist${path}index.html`, html);
    paths.push(path);
  }
}
await writeFile('dist/404.html', (await readFile('dist/index.html', 'utf8')).replace('<title>', '<meta name="robots" content="noindex"><title>'));
if (origin) {
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${escape(origin + path)}</loc></url>`).join('')}</urlset>`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
} else {
  await rm('dist/sitemap.xml', { force: true });
  await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n');
  console.info('SITE_URL is unset: static pages generated; canonical URLs and sitemap await the production domain.');
}
console.info(`Prerendered ${paths.length} pages in Node.`);
