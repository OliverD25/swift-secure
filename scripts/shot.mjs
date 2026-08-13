// Headless screenshot helper for server-side visual checks.
//
// The Chromium bundle needs libs that are not installed system-wide (no root on
// this box). They live unpacked under ~/.local/chromium-deps, and the dynamic
// linker only reads LD_LIBRARY_PATH at process start -- so it is injected into
// the browser child process here rather than relying on the caller's shell.
//
// Usage: node scripts/shot.mjs <url> [outfile] [width] [height]
//
// USE localhost, NOT 127.0.0.1. `astro dev` binds the IPv6 loopback (::1) and
// nothing at all listens on the IPv4 one, so 127.0.0.1:4321 is refused while
// localhost:4321 returns 200 from the same shell in the same second. The
// default below used to be 127.0.0.1, which made this script look broken on
// Windows and cost an afternoon: three separate "the shell cannot reach the
// dev server" theories, all wrong, for a hostname.
//   Get-NetTCPConnection -LocalPort 4321   ->  LocalAddress ::1, State Listen
import { chromium } from 'playwright';
import { homedir } from 'node:os';
import { join } from 'node:path';

const LIBS = join(homedir(), '.local/chromium-deps/usr/lib/x86_64-linux-gnu');

const [url = 'http://localhost:4321/', out = '.screenshots/shot.png',
       w = '1280', h = '800'] = process.argv.slice(2);

const browser = await chromium.launch({
  env: { ...process.env, LD_LIBRARY_PATH: `${LIBS}:${process.env.LD_LIBRARY_PATH ?? ''}` },
});
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
await page.screenshot({ path: out, fullPage: true });
const errors = [];
page.on('console', m => m.type() === 'error' && errors.push(m.text()));
await browser.close();
console.log(`${res.status()} ${url} -> ${out}`);
if (errors.length) console.log('console errors:\n' + errors.join('\n'));
