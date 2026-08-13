// Screenshot the BUILT site with no server running.
//
// WHY THIS EXISTS ALONGSIDE shot.mjs. That one needs a dev server running and
// screenshots whatever the dev server renders. This one needs no server at all
// and screenshots the built output — what actually ships. Use it to check a
// production build, or when no dev server is up.
//
// It is NOT a workaround for shot.mjs being unreachable. It was first written
// under that belief, which was wrong: shot.mjs failed only because its default
// URL was 127.0.0.1 and `astro dev` binds the IPv6 loopback (::1). Use
// localhost and shot.mjs works fine. That correction is kept here because the
// wrong version of this comment is what would send the next person hunting a
// sandbox that does not exist.
//
// Run `npm run build` first; this reads dist/, it does not create it.
//
// Usage:
//   node scripts/shot-dist.mjs <route> <outfile> [width] [height] [fullPage]
//   node scripts/shot-dist.mjs / .screenshots/home.png 1280 900 true
//   node scripts/shot-dist.mjs /uk/ .screenshots/uk.png 390 844 false
import { chromium } from 'playwright';
import { readFile, mkdir } from 'node:fs/promises';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const ORIGIN = 'http://dist.local';

const [route = '/', out = '.screenshots/dist.png', w = '1280', h = '900', full = 'true'] =
  process.argv.slice(2);

const TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon',
  '.xml': 'application/xml', '.txt': 'text/plain',
};

await mkdir(dirname(resolve(ROOT, out)), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: +w, height: +h } });

const missing = [];
await page.route('**/*', async (r) => {
  const url = new URL(r.request().url());
  // Anything off our fake origin is a real third party — today only the flag
  // CDN in the language switcher. Abort rather than wait on the network: the
  // point of this script is the layout, and a hanging request delays every
  // screenshot by the full timeout.
  if (url.origin !== ORIGIN) return r.abort();
  let p = decodeURIComponent(url.pathname);
  if (p.endsWith('/')) p += 'index.html';
  else if (!extname(p)) p += '/index.html';
  try {
    const body = await readFile(join(DIST, p));
    await r.fulfill({
      status: 200,
      body,
      headers: { 'content-type': TYPES[extname(p)] ?? 'application/octet-stream' },
    });
  } catch {
    missing.push(p);
    await r.fulfill({ status: 404, body: '' });
  }
});

const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.goto(ORIGIN + route, { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(700);
await page.screenshot({ path: resolve(ROOT, out), fullPage: full === 'true' });
await browser.close();

console.log(`${route} -> ${out}  (${w}x${h}, fullPage=${full})`);
if (missing.length) console.log('missing from dist/:\n  ' + [...new Set(missing)].join('\n  '));
console.log(errors.length ? 'page errors:\n  ' + errors.join('\n  ') : 'no page errors');
