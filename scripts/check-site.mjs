// Post-build audit for the static site in ./dist.
//
//   npm run build
//   npm i --no-save playwright @axe-core/playwright && npx playwright install chromium
//   node scripts/check-site.mjs
//
// Checks every built page for:
//   - SEO basics: <html lang>, title, meta description, canonical, Open Graph / Twitter image
//   - WCAG 2.1 A/AA violations (axe-core) at 375px and 1280px
//   - no horizontal scroll at 375px
//   - 44×44px minimum tap targets at 375px (inline links inside running text are exempt)
// Writes screenshots to ./audit/ and exits non-zero on any failure.

import { spawn } from 'node:child_process';
import { readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const DIST = 'dist';
const PORT = 4329;
const BASE = `http://localhost:${PORT}`;
const MIN_TAP = 44;

function routes(dir = DIST) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return routes(p);
    if (f !== 'index.html') return [];
    const r = '/' + relative(DIST, dir).split(sep).join('/');
    return [r === '/' ? '/' : r + '/'];
  });
}

async function waitForServer(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try { if ((await fetch(url)).ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`preview server did not start at ${url}`);
}

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'ignore' });
const failures = [];
const fail = (route, msg) => failures.push(`${route}: ${msg}`);

try {
  await waitForServer(BASE + '/');
  for (const f of ['/robots.txt', '/sitemap-index.xml', '/og-default.png', '/favicon.ico', '/favicon.svg', '/apple-touch-icon.png']) {
    const res = await fetch(BASE + f);
    if (!res.ok) fail(f, `HTTP ${res.status}`);
  }

  if (!existsSync('audit')) mkdirSync('audit');
  const browser = await chromium.launch();
  const pages = routes();
  console.log(`Auditing ${pages.length} pages: ${pages.join(', ')}`);

  for (const route of pages) {
    const slug = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_|_$/g, '');

    // ---- Mobile 375px ----
    const mobile = await browser.newPage({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
    await mobile.goto(BASE + route, { waitUntil: 'networkidle' });

    const seo = await mobile.evaluate(() => ({
      lang: document.documentElement.lang,
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content ?? '',
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? '',
      og: document.querySelector('meta[property="og:image"]')?.content ?? '',
      tw: document.querySelector('meta[name="twitter:card"]')?.content ?? '',
      h1: document.querySelectorAll('h1').length,
    }));
    if (!seo.lang) fail(route, 'missing <html lang>');
    if (!seo.title) fail(route, 'missing <title>');
    if (seo.desc.length < 50 || seo.desc.length > 160) fail(route, `meta description length ${seo.desc.length} (want 50–160)`);
    if (!seo.canonical.startsWith('https://pechgroup.com/')) fail(route, `bad canonical "${seo.canonical}"`);
    if (!seo.og || !seo.tw) fail(route, 'missing og:image or twitter:card');
    if (seo.h1 !== 1) fail(route, `${seo.h1} <h1> elements (want 1)`);

    const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) fail(route, `horizontal scroll at 375px (${overflow}px overflow)`);

    const smallTargets = await mobile.evaluate((min) => {
      const out = [];
      const sel = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button]';
      for (const el of document.querySelectorAll(sel)) {
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none' || el.closest('[hidden]')) continue;
        if (el.classList.contains('skip-link')) continue; // off-screen until focused
        // WCAG 2.5.8 inline exception: links flowing inside a sentence.
        if (el.tagName === 'A' && cs.display === 'inline' && el.closest('p, li, label, span.todo')) continue;
        let box = el.getBoundingClientRect();
        if ((el.type === 'checkbox' || el.type === 'radio') && el.closest('label')) {
          box = el.closest('label').getBoundingClientRect();
        }
        if (box.width === 0 && box.height === 0) continue;
        if (box.width < min - 0.5 || box.height < min - 0.5) {
          out.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40)}" ${Math.round(box.width)}×${Math.round(box.height)}`);
        }
      }
      return out;
    }, MIN_TAP);
    for (const s of smallTargets) fail(route, `tap target < ${MIN_TAP}px: ${s}`);

    const axeMobile = await new AxeBuilder({ page: mobile }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    for (const v of axeMobile.violations) {
      fail(route, `axe[375] ${v.id} (${v.impact}): ${v.help} — ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
    }
    await mobile.screenshot({ path: `audit/${slug}-375.png`, fullPage: true });

    // Mobile menu opens and exposes links
    const burger = mobile.locator('.hdr__burger');
    if (await burger.isVisible()) {
      await burger.click();
      if ((await burger.getAttribute('aria-expanded')) !== 'true') fail(route, 'mobile menu did not open');
      const menuOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (menuOverflow > 0) fail(route, `horizontal scroll with mobile menu open (${menuOverflow}px)`);
    }
    await mobile.close();

    // ---- Desktop 1280px ----
    const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await desktop.goto(BASE + route, { waitUntil: 'networkidle' });
    const axeDesktop = await new AxeBuilder({ page: desktop }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    for (const v of axeDesktop.violations) {
      fail(route, `axe[1280] ${v.id} (${v.impact}): ${v.help} — ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
    }
    await desktop.screenshot({ path: `audit/${slug}-1280.png`, fullPage: true });
    await desktop.close();
    console.log(`  ✓ audited ${route}`);
  }
  await browser.close();
} finally {
  server.kill();
}

if (failures.length) {
  console.error(`\n${failures.length} issue(s):\n` + failures.map((f) => '  ✗ ' + f).join('\n'));
  process.exit(1);
}
console.log('\nAll checks passed.');
