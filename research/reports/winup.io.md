# winup.io — technical check

Checked 3 August 2026 from Germany. Swift Secure.

We look at newly licensed casinos and check a few things from the outside. This
is free and there is nothing to sign. Two findings below, then the list of what
we checked and found fine.

---

## 1. Payment method icons are not loading

**What happens.** Requests for payment-method icons return your homepage HTML
instead of an image:

```
https://winup.io/paysystems/V2/svg/black/aninda2_banka.svg
  -> 302 to /en/paysystems/V2/svg/black/aninda2_banka.svg
  -> 200, content-type: text/html; charset=UTF-8, 87,390 bytes
  -> body begins <!DOCTYPE html>
```

The same for `aninda2_papara.svg` and `betterbro_pix.svg`. We checked these
three directly with curl, outside the browser, to be sure it was not something
on our side. **38 requests failed during a single homepage load**, and the
console recorded 38 matching errors.

**Why it matters.** These are the logos players look for when choosing how to
deposit — Papara, bank transfer, Pix. A missing logo at that moment reads as a
broken or untrustworthy payment step.

There is a second cost. Because the server answers with the full homepage rather
than a 404, the browser downloads roughly 87 KB per missing icon instead of a
few hundred bytes.

**Why you may not have seen it.** Missing images fail quietly — no error page,
nothing in the interface except a blank space. Anyone who has visited before is
likely serving them from cache.

**Where to look.** The redirect adds a locale prefix (`/en/`) to the asset path,
and the rewrite rule that serves the SPA appears to be catching those paths
before the static file handler does. Likely a routing order issue rather than
missing files.

---

## 2. Analytics load before any consent interaction

**What we measured.** Loading the homepage from a German IP with a German
browser locale, and clicking nothing at all, two hosts received requests:

- `www.googletagmanager.com`
- `www.google-analytics.com`

We found no consent gate on the page. The word "cookie" appears in your
JavaScript (`WlcCookie`, `document.cookie`) but we did not find a banner asking
the visitor to agree before those requests were made.

**What this is and is not.** This is a measurement, not a legal opinion — we are
not lawyers. Whether it matters depends on how your tags are configured; Google
Consent Mode, for example, can send requests that carry no identifiers. If you
take EU traffic it is worth someone confirming which of those is happening.

**Why you may not have seen it.** Tag managers are usually added once, by
marketing, and nobody re-checks afterwards what fires before the banner — or
whether the banner exists on every market's version of the site.

---

## What we checked and found no problem with

Listing these because a report that only shows problems is not a check, it is a
sales pitch.

| | Result |
| :--- | :--- |
| Site reachable from Germany | Yes, HTTP 200 in 0.23s |
| Homepage weight | 185 requests, 2.1 MB — below the median for sites we scan |
| Time to first render | 1.8s, fully settled at 7.8s |
| HTTPS and HSTS | Present |
| Mobile viewport tag | Present |
| Third-party hosts | 5 — low, and none unexpected |
| Mixed content | None |

---

## What we did not check

- Anything requiring an account. No deposits, no withdrawals, no bonus terms.
- Whether games come from the studios named on the site. That cannot be
  determined from outside, and we do not claim it.
- Game fairness or RTP. That needs an accredited testing lab, which we are not.

---

## Who we are

Swift Secure checks casino licences against regulator registers and looks for
this kind of technical problem from the outside. We are new.

If the report was useful and you want the result public, we issue a badge that
links to a dated page stating exactly what was checked and what was not —
including the sections above. It is free for the first operators, there is no
contract, and you can remove it whenever you like.

Either way, no reply needed. If you would like the raw request log for the 38
failures, ask and we will send it.
