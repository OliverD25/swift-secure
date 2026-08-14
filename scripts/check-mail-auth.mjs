// Check that swiftsecured.com can actually send authenticated mail.
//
//   node scripts/check-mail-auth.mjs
//   node scripts/check-mail-auth.mjs somedomain.com
//
// Run this before every outreach wave. Cold email from a domain whose records
// are wrong does not bounce loudly — it is quietly filed as spam, and by the
// time anyone notices, the domain's reputation is already spent.
//
// The three record types, in plain terms:
//   SPF   - lists which servers may send mail for the domain
//   DKIM  - a cryptographic signature proving a message was not forged
//   DMARC - tells receivers what to do when SPF and DKIM disagree
//
// "Present" is not the same as "correct". The failures this catches are the
// ones that look fine to the eye:
//   * two SPF records instead of one, which is a permanent failure by the
//     specification - receivers do not pick the better one, they reject both
//   * an SPF chain needing more than 10 DNS lookups, which is also a hard
//     failure and creeps up silently as services are added
//   * a DKIM record that exists but carries an empty or truncated key
//   * DNS answers that differ between resolvers, meaning a change has not
//     finished propagating and some receivers still see the old records
import { Resolver } from 'node:dns/promises'

const domain = process.argv[2] ?? 'swiftsecured.com'

// Three independent public resolvers. Agreement across all three is the
// evidence that a record has propagated everywhere, not just where we looked.
const RESOLVERS = [
  ['Google', '8.8.8.8'],
  ['Cloudflare', '1.1.1.1'],
  ['Quad9', '9.9.9.9'],
]

// Selectors used by the common providers. Zoho signs with "zmail".
const DKIM_SELECTORS = ['zmail', 'zoho', 'default', 's1', 's2', 'selector1', 'selector2', 'google', 'k1']

// Mechanisms that each cost one DNS lookup. The limit is 10 for the whole
// chain, including anything reached through an include.
const LOOKUP_MECHANISMS = /^(include:|a$|a:|mx$|mx:|ptr|exists:|redirect=)/

let failures = 0
let warnings = 0
const line = (ok, label, detail) => {
  const mark = ok === true ? '  PASS' : ok === false ? '  FAIL' : '  WARN'
  if (ok === false) failures++
  if (ok === null) warnings++
  console.log(`${mark}  ${label}${detail ? `\n        ${detail}` : ''}`)
}

function makeResolver(ip) {
  const r = new Resolver({ timeout: 5000, tries: 2 })
  r.setServers([ip])
  return r
}

async function txt(resolver, name) {
  try {
    // Node returns each record as an array of strings, because DNS splits
    // long values into 255-character chunks. Joining them is required.
    return (await resolver.resolveTxt(name)).map((chunks) => chunks.join(''))
  } catch {
    return []
  }
}

async function countSpfLookups(resolver, record, depth = 0, seen = new Set()) {
  if (depth > 5) return 0
  let n = 0
  for (const term of record.split(/\s+/)) {
    if (!LOOKUP_MECHANISMS.test(term.replace(/^[+~?-]/, ''))) continue
    n++
    const m = term.match(/^[+~?-]?(?:include:|redirect=)(.+)$/)
    if (m && !seen.has(m[1])) {
      seen.add(m[1])
      const nested = (await txt(resolver, m[1])).find((t) => t.toLowerCase().startsWith('v=spf1'))
      if (nested) n += await countSpfLookups(resolver, nested, depth + 1, seen)
    }
  }
  return n
}

console.log(`checking mail authentication for ${domain}\n`)

const primary = makeResolver(RESOLVERS[0][1])

// ---- MX: is mail even routed anywhere ----
let mx = []
try {
  mx = await primary.resolveMx(domain)
} catch {}
line(mx.length > 0, 'MX records exist (mail is routed somewhere)',
  mx.length ? mx.sort((a, b) => a.priority - b.priority).map((r) => `${r.priority} ${r.exchange}`).join(', ')
            : 'no MX record — this domain cannot receive mail at all')

// ---- SPF ----
const rootTxt = await txt(primary, domain)
const spfRecords = rootTxt.filter((t) => t.toLowerCase().startsWith('v=spf1'))

line(spfRecords.length === 1, `exactly one SPF record (found ${spfRecords.length})`,
  spfRecords.length === 0 ? 'no SPF record — receivers cannot tell which servers may send as you'
  : spfRecords.length > 1 ? 'more than one SPF record is a permanent failure: receivers reject both rather than choosing'
  : spfRecords[0])

if (spfRecords.length === 1) {
  const spf = spfRecords[0]
  const ending = spf.trim().split(/\s+/).pop()
  line(/^[~-]all$/.test(ending), `SPF ends with a policy (${ending})`,
    /^[~-]all$/.test(ending) ? '~all is softfail, -all is hard reject; either is fine, both are stricter than +all'
      : `ending "${ending}" leaves the record open — mail from any server can claim to be you`)

  const lookups = await countSpfLookups(primary, spf)
  line(lookups <= 10, `SPF needs ${lookups} DNS lookups (limit is 10)`,
    lookups > 10 ? 'over the limit is a permanent failure; every receiver rejects the check'
      : lookups >= 8 ? 'close to the limit — adding one more mail service could break it'
      : 'comfortable headroom')
  if (lookups >= 8 && lookups <= 10) warnings++
}

// ---- DKIM ----
let dkimFound = null
for (const sel of DKIM_SELECTORS) {
  const recs = await txt(primary, `${sel}._domainkey.${domain}`)
  // Must declare v=DKIM1. An earlier version also accepted any record merely
  // containing "p=", and that reported example.com as having a Zoho signing key
  // — a false PASS on the one check whose whole job is to catch a missing
  // signature. Wildcard TXT records make this easy to hit by accident.
  const rec = recs.find((t) => /(^|;)\s*v=dkim1\b/i.test(t))
  if (rec) { dkimFound = { sel, rec }; break }
}
line(Boolean(dkimFound), 'DKIM signing key published',
  dkimFound ? `selector "${dkimFound.sel}"`
            : `no key at any known selector (${DKIM_SELECTORS.join(', ')}) — messages carry no signature`)

if (dkimFound) {
  const key = (dkimFound.rec.match(/p=([A-Za-z0-9+/=]*)/) ?? [])[1] ?? ''
  const bytes = Math.floor((key.length * 3) / 4)
  line(key.length > 0, 'DKIM key is not empty',
    key.length ? `${key.length} base64 characters, about ${bytes} bytes`
               : 'p= is empty, which is how a revoked key looks — signatures will fail')
  // A 1024-bit RSA public key in this format is roughly 216 characters; a
  // 2048-bit one is roughly 392.
  line(key.length >= 200, 'DKIM key is a plausible length (>=200 chars)',
    key.length >= 200 ? 'consistent with a 1024-bit key or larger'
      : 'shorter than a valid RSA public key — likely truncated when it was pasted into DNS')
  if (key.length >= 200) {
    line(key.length >= 380 ? true : null, 'DKIM key strength',
      key.length >= 380
        ? 'about 2048-bit, the current recommendation'
        : 'about 1024-bit. Accepted by every receiver today, but 2048-bit is the current '
          + 'recommendation. Zoho can reissue at 2048; worth doing before volume grows, not urgent')
  }
}

// ---- DMARC ----
const dmarcRecs = await txt(primary, `_dmarc.${domain}`)
const dmarc = dmarcRecs.find((t) => t.toLowerCase().startsWith('v=dmarc1'))
line(Boolean(dmarc), 'DMARC record published', dmarc ?? 'missing — receivers have no instructions and many treat that as untrusted')

if (dmarc) {
  const policy = (dmarc.match(/\bp=([a-z]+)/i) ?? [])[1] ?? ''
  line(['none', 'quarantine', 'reject'].includes(policy) ? true : false, `DMARC policy is p=${policy || 'MISSING'}`,
    policy === 'none' ? 'monitor only: nothing is rejected on your behalf. Correct while starting out, tighten later'
      : policy ? 'an enforcing policy' : 'p= is required and absent')
  const rua = /\brua=/.test(dmarc)
  line(rua ? true : null, 'DMARC reports have somewhere to go (rua=)',
    rua ? 'receivers will send reports on who is sending as you'
        : 'no rua address: you will never learn if someone forges your domain')
}

// ---- Agreement across resolvers ----
const snapshots = []
for (const [name, ip] of RESOLVERS) {
  const r = makeResolver(ip)
  snapshots.push({
    name,
    spf: (await txt(r, domain)).filter((t) => t.toLowerCase().startsWith('v=spf1')).sort().join('|'),
    dmarc: (await txt(r, `_dmarc.${domain}`)).filter((t) => t.toLowerCase().startsWith('v=dmarc1')).sort().join('|'),
    dkim: dkimFound ? (await txt(r, `${dkimFound.sel}._domainkey.${domain}`)).sort().join('|') : '',
  })
}
const agree = ['spf', 'dmarc', 'dkim'].every((k) => new Set(snapshots.map((s) => s[k])).size === 1)
line(agree, 'all three resolvers return the same records',
  agree ? RESOLVERS.map(([n]) => n).join(', ') + ' agree — the records have propagated'
        : 'resolvers disagree; a recent change has not finished propagating, so some receivers still see the old records')

console.log(`\n${failures} failure(s), ${warnings} warning(s)`)
if (failures) {
  console.log('Mail from this domain is at risk of being filtered. Fix the failures above before sending.')
  process.exit(1)
}
console.log('Authentication is correctly configured for sending.')
