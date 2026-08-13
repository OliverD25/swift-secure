// Screenshot the BUILT site with no server running.
//
// WHY THIS EXISTS ALONGSIDE shot.mjs. That one points a browser at a running
// dev server, which works on the Ubuntu box. On the Windows PC the dev server
// is started by the editor's preview pane and listens somewhere the shell
// cannot reach: curl and Playwright both get ECONNREFUSED on 127.0.0.1:4321
// while the pane itself loads the page perfectly. So the only visual check
// available here was the pane's own screenshot, which needs the pane to be
// on screen, and returns "not compositing frames" when it is hidden.
//
// This takes the third route. It answers every request out of dist/ through
// Playwright's request interception, so nothing listens on a port and nothing
// needs to be visible. It shows the built output — what actually ships —
// rather than the dev server's version of it.
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
