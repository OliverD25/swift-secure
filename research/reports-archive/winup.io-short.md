# winup.io — technical check

Checked 3 August 2026 from Germany. Free, nothing to sign.

## Your payment icons return HTML instead of images

```
https://winup.io/paysystems/V2/svg/black/aninda2_banka.svg
  -> 200, content-type: text/html, 87 KB — your homepage
```

Same for `aninda2_papara.svg` and `betterbro_pix.svg`. **38 requests failed on
one homepage load.** Verified with curl, outside the browser.

Players get blank spaces where the Papara, bank transfer and Pix logos should
be — at the moment they choose how to deposit.

This is easy to miss. A missing image produces no error page and no warning, and
anyone who has opened the site before is served the icons from their own cache —
so on your team's machines the page looks correct.

The redirect adds `/en/` to the asset path, so the SPA rewrite is probably
catching it before the static file handler.

## Smaller: analytics load before any consent

Google Tag Manager and Google Analytics received requests from a German IP with
nothing clicked and no consent banner on the page. Not a legal opinion — we are
not lawyers — but worth confirming how your tags are configured if you take EU
traffic.

## Checked, no problem

185 requests and 2.1 MB (below our median), HTTPS with HSTS, mobile viewport
present, 5 third-party hosts, no mixed content.

## Not checked

Anything behind a login. Whether games come from the studios named on the site —
that cannot be determined from outside and we do not claim it. RNG fairness,
which needs an accredited lab.

---

Swift Secure. We are new. If this was useful and you want the result public, we
issue a badge linking to a dated page stating exactly what was and was not
checked. Free for the first operators, no contract, remove it any time.

No reply needed.
