// End-to-end test for the apply form, in a real browser.
//
// WHY THIS EXISTS. The form's failure mode is silent and expensive: it once
// showed a success screen while discarding the application, so an operator
// believed they had applied and nobody ever found out they had. Every guard
// added since lives in a <script> tag that no other test in this repo executes.
// Reading the source cannot tell you whether the request carries the fields, or
// whether a rejected POST still says "thank you".
//
// No live form service is needed. Playwright intercepts the POST, so the test
// inspects exactly what the browser tried to send and answers however it likes.
//
// Starts its own dev server on a spare port with known env values, because the
// endpoint is inlined at build time and the point is to check what a visitor
// actually gets.
//
// Usage: node scripts/test-apply-form.mjs
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';

const LIBS = join(homedir(), '.local/chromium-deps/usr/lib/x86_64-linux-gnu');
const PORT = 4399;                       // not 4321: never fight a dev server the user is using
const BASE = `http://127.0.0.1:${PORT}`;
const ENDPOINT = 'https://example.invalid/form-endpoint';
const KEY = 'test-access-key-0000';

let checks = 0;
const failures = [];
const check = (label, ok, detail = '') => {
  checks++;
  if (!ok) failures.push(detail ? `${label}\n      ${detail}` : label);
};

const server = spawn('npx', ['astro', 'dev', '--port', String(PORT), '--host', '127.0.0.1'], {
  cwd: join(import.meta.dirname, '..'),
  env: {
    ...process.env,
    PUBLIC_FORM_ENDPOINT: ENDPOINT,
    PUBLIC_FORM_KEY: KEY,
    PUBLIC_CONTACT_EMAIL: 'dmytro@swiftsecured.com',
  },
  stdio: 'ignore',
});

const cleanup = () => { try { server.kill('SIGTERM'); } catch {} };
process.on('exit', cleanup);
process.on('SIGINT', () => { cleanup(); process.exit(1); });

async function waitForServer(timeoutMs = 90000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(`${BASE}/apply/`);
      if (r.ok) return true;
    } catch {}
    await new Promise(r => setTimeout(r, 500));
  }
  return false;
}

// All four required fields. Miss one and reportValidity() blocks the submit,
// which looks exactly like a broken form from the outside — that is how the
// first version of this test failed.
const fill = async (page) => {
  await page.fill('#name', 'Test Operator');
  await page.fill('#email', 'operator@example.com');
  await page.fill('#website', 'https://example.com');
  await page.fill('#jurisdiction', 'Curaçao');
};

if (!await waitForServer()) {
  console.error('dev server did not start on ' + BASE);
  process.exit(1);
}

const browser = await chromium.launch({
  env: { ...process.env, LD_LIBRARY_PATH: `${LIBS}:${process.env.LD_LIBRARY_PATH ?? ''}` },
});
const page = await browser.newPage();

// ---------------------------------------------------------------- happy path
let captured = null;
await page.route(ENDPOINT, async (route) => {
  const req = route.request();
  captured = { method: req.method(), headers: req.headers(), body: req.postData() ?? '' };
  await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
});

await page.goto(`${BASE}/apply/`, { waitUntil: 'networkidle' });
await fill(page);
await page.click('button[type="submit"]');
await page.waitForTimeout(1200);

check('the form actually posts to the configured endpoint', captured !== null,
  'no request was intercepted — the form may not have submitted at all');
if (captured) {
  check('it posts with POST', captured.method === 'POST', captured.method);
  check('it asks for a JSON response', (captured.headers['accept'] ?? '').includes('application/json'),
    captured.headers['accept']);
  check('the operator name is in the payload', captured.body.includes('Test Operator'));
  check('the operator email is in the payload', captured.body.includes('operator@example.com'));
  check('the website is in the payload', captured.body.includes('https://example.com'));
  check('the access key is sent when PUBLIC_FORM_KEY is set',
    captured.body.includes('access_key') && captured.body.includes(KEY),
    'Web3Forms would reject this submission');
}
check('a 2xx shows the success screen',
  await page.locator('[data-apply-success]').isVisible());
check('a 2xx hides the form', !(await page.locator('[data-apply-form]').isVisible()));

// ------------------------------------- an incomplete form must not be sent
await page.unroute(ENDPOINT);
let sentIncomplete = false;
await page.route(ENDPOINT, route => { sentIncomplete = true; route.abort(); });
await page.goto(`${BASE}/apply/`, { waitUntil: 'networkidle' });
await page.fill('#name', 'Half Filled');          // deliberately leave the rest
await page.click('button[type="submit"]');
await page.waitForTimeout(800);
check('an incomplete form is not submitted', !sentIncomplete,
  'a half-filled application reached the endpoint');
check('an incomplete form does not show success',
  !(await page.locator('[data-apply-success]').isVisible()));

// ------------------------------------------------- a rejected POST must not lie
await page.unroute(ENDPOINT);
await page.route(ENDPOINT, route => route.fulfill({ status: 500, body: 'no' }));
await page.goto(`${BASE}/apply/`, { waitUntil: 'networkidle' });
await fill(page);
await page.click('button[type="submit"]');
await page.waitForTimeout(1200);

check('a 500 does NOT show success',
  !(await page.locator('[data-apply-success]').isVisible()),
  'this is the original bug: telling an operator they applied when they did not');
check('a 500 shows the failure notice',
  await page.locator('[data-apply-error]').isVisible());
check('a 500 keeps the form on screen so nothing typed is lost',
  await page.locator('[data-apply-form]').isVisible());
check('a 500 keeps what the operator typed',
  (await page.inputValue('#email')) === 'operator@example.com');

// --------------------------------------------- unset endpoint must not pretend
await page.goto(`${BASE}/apply/`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.querySelector('[data-apply-form]').dataset.endpoint = '');
let requestMade = false;
await page.route('**/form-endpoint', route => { requestMade = true; route.abort(); });
await fill(page);
await page.click('button[type="submit"]');
await page.waitForTimeout(800);

check('an unset endpoint sends nothing', !requestMade);
check('an unset endpoint does NOT show success',
  !(await page.locator('[data-apply-success]').isVisible()));
check('an unset endpoint shows the fallback notice',
  await page.locator('[data-apply-error]').isVisible());
check('the fallback notice carries a reachable contact address',
  (await page.locator('[data-apply-error]').innerText()).includes('@'),
  'without an address the operator has no route at all');

// ------------------------------------- no key configured must send no key field
await page.unroute('**/form-endpoint');
captured = null;
await page.route(ENDPOINT, async (route) => {
  captured = { body: route.request().postData() ?? '' };
  await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
});
await page.goto(`${BASE}/apply/`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.querySelector('[data-apply-form]').dataset.key = '');
await fill(page);
await page.click('button[type="submit"]');
await page.waitForTimeout(1200);

check('an unset key adds no access_key field',
  captured !== null && !captured.body.includes('access_key'),
  'Formspree receives an unexpected field, and it appears in the email');
check('an unset key still sends the real fields',
  captured !== null && captured.body.includes('operator@example.com'));

await browser.close();
cleanup();

console.log(`${checks} checks run`);
if (failures.length) {
  console.log(`\n${failures.length} FAILED:`);
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
console.log('all passed — the form submits, and it never claims a success it did not get');
