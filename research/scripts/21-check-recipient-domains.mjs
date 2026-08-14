// Will these addresses accept mail? Checks the recipient domains, not the sites.
//
//   node research/scripts/21-check-recipient-domains.mjs
//   node research/scripts/21-check-recipient-domains.mjs --source research/master-outreach-list.csv
//
// WHY THIS EXISTS, AND WHY 20-recheck-live.py IS NOT IT.
//
// That script asks "does the casino's website load". That is the right question
// for the directory and the wrong one for a sending list, and the difference is
// not academic. Checking the master outreach list produced nine addresses that
// looked dead, and on inspection:
//
//   * three had a port in the domain column - "melbet.org:443" is not a
//     hostname, so DNS failed on a site that is fine
//   * several addresses live on a different domain from the casino entirely.
//     affiliates@13aff.com is the affiliate programme for 13spins.com, and
//     grizzly.online is answered by affiliate@grizzly.bingo
//
// An email bounces when ITS OWN domain cannot receive mail. That is decided by
// MX records. A casino whose website is geo-blocked, parked, or simply slow can
// still read mail perfectly, and an address on a healthy domain is safe to write
// to even when the brand's site is down.
//
// Bounces are the fastest way to destroy a sending domain: they are the clearest
// possible signal that a sender has no permission, because legitimate senders
// have valid addresses. A few per cent is tolerated; ten per cent is fatal, and
// swiftsecured.com is also where the badge and the whole brand live.
//
// Writes a dated report and never modifies the source.
import { Resolver } from 'node:dns/promises'
import { readFileSync, writeFileSync } from 'node:fs'
import { join, resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const argv = process.argv.slice(2)
const arg = (name, fallback) => {
  const i = argv.indexOf(name)
  return i === -1 ? fallback : argv[i + 1]
}
const SRC = join(ROOT, arg('--source', 'research/master-outreach-list.csv'))
const STAMP = arg('--date', new Date().toISOString().slice(0, 10))
const LIMIT = Number(argv.find((a) => /^\d+$/.test(a)) ?? 0)
const DEST = join(ROOT, 'research',
  `${basename(SRC, '.csv')}-recipients-${STAMP}${LIMIT ? '.partial' : ''}.csv`)

// Minimal CSV reader. The address and domain columns are plain, and pulling in
// a dependency for this would be the larger risk.
function readCsv(path) {
  const text = readFileSync(path, 'utf8')
  const rows = []
  let field = '', row = [], quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (c === '"') quoted = false
      else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
    else if (c !== '\r') field += c
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  const header = rows.shift()
  return rows.filter((r) => r.length > 1).map((r) =>
    Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])))
}

const rows = readCsv(SRC)
const emailCol = ['email', 'contact_email'].find((c) => c in (rows[0] ?? {}))
if (!emailCol) {
  console.error(`${basename(SRC)} has no email column`)
  process.exit(1)
}

// One DNS check per recipient domain, not per row. Many casinos share one
// affiliate programme domain, and asking about it 40 times tells us nothing new.
const byDomain = new Map()
for (const r of rows) {
  const addr = (r[emailCol] ?? '').trim().toLowerCase()
  if (!addr || !addr.includes('@')) continue
  const dom = addr.split('@').pop().replace(/[>,;].*$/, '').trim()
  if (!dom) continue
  if (!byDomain.has(dom)) byDomain.set(dom, { addresses: new Set(), brands: new Set() })
  byDomain.get(dom).addresses.add(addr)
  byDomain.get(dom).brands.add(r.brand || r.domain || '')
}
let domains = [...byDomain.keys()].sort()
if (LIMIT) {
  domains = domains.slice(0, LIMIT)
  console.log(`LIMITED RUN: ${domains.length} domains -> ${basename(DEST)} (the full report is untouched)`)
}
console.log(`${rows.length} rows carry ${[...byDomain.values()].reduce((n, v) => n + v.addresses.size, 0)} unique addresses across ${byDomain.size} recipient domains`)
console.log(`checking ${domains.length} domains...\n`)

const resolver = new Resolver({ timeout: 5000, tries: 2 })
resolver.setServers(['8.8.8.8', '1.1.1.1'])

async function classify(domain) {
  let mx = []
  try {
    mx = await resolver.resolveMx(domain)
  } catch (e) {
    // No MX is not automatically fatal. RFC 5321 says a receiver may fall back
    // to the A record, and some small operators rely on exactly that.
    try {
      const a = await resolver.resolve4(domain)
      if (a.length) return { verdict: 'accepts (A record, no MX)', detail: a[0], mx: '' }
    } catch {}
    const code = e && e.code ? e.code : 'ERROR'
    return {
      verdict: code === 'ENOTFOUND' || code === 'ENODATA' ? 'WILL BOUNCE' : 'unknown',
      detail: code === 'ENOTFOUND' ? 'domain does not exist'
        : code === 'ENODATA' ? 'domain exists but publishes no mail server and no A record'
        : `lookup failed: ${code}`,
      mx: '',
    }
  }
  const best = mx.sort((a, b) => a.priority - b.priority)[0]
  return { verdict: 'accepts mail', detail: `${mx.length} mail server(s)`, mx: best.exchange }
}

const out = []
let done = 0
const CONCURRENCY = 20
const queue = [...domains]
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) {
    const d = queue.shift()
    const info = byDomain.get(d)
    const res = await classify(d)
    out.push({
      recipient_domain: d,
      verdict: res.verdict,
      detail: res.detail,
      mail_server: res.mx,
      addresses: [...info.addresses].join(' '),
      address_count: info.addresses.size,
      brands: [...info.brands].filter(Boolean).slice(0, 4).join(' | '),
    })
    if (++done % 100 === 0) console.log(`  ${done}/${domains.length}`)
  }
}))

out.sort((a, b) => a.recipient_domain.localeCompare(b.recipient_domain))
const header = Object.keys(out[0])
const esc = (v) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v))
writeFileSync(DEST, [header.join(','), ...out.map((r) => header.map((h) => esc(r[h])).join(','))].join('\n'), 'utf8')

const bounce = out.filter((r) => r.verdict === 'WILL BOUNCE')
const unknown = out.filter((r) => r.verdict === 'unknown')
const ok = out.filter((r) => r.verdict.startsWith('accepts'))
const bounceAddrs = bounce.reduce((n, r) => n + r.address_count, 0)
const totalAddrs = out.reduce((n, r) => n + r.address_count, 0)

console.log(`\naccepts mail : ${ok.length} domains`)
console.log(`WILL BOUNCE  : ${bounce.length} domains, ${bounceAddrs} addresses`)
console.log(`unknown      : ${unknown.length} domains (temporary DNS failure — re-run before deciding)`)
console.log(`\nbounce rate if sent as-is: ${((bounceAddrs / totalAddrs) * 100).toFixed(1)}% of ${totalAddrs} addresses`)
console.log('  under ~2% is normal, ~5% is a warning, 10% burns the sending domain')
if (bounce.length) {
  console.log('\ndomains that cannot receive mail:')
  for (const r of bounce.slice(0, 25)) console.log(`  ${r.recipient_domain.padEnd(34)} ${r.detail}`)
  if (bounce.length > 25) console.log(`  ...and ${bounce.length - 25} more, all listed in the report`)
}
console.log(`\nwrote -> ${DEST.replace(ROOT, '.')}`)
console.log(`${basename(SRC)} was NOT modified.`)
