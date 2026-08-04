# oxy.casino — free technical check

Run 4 August 2026. Nothing to sign, no reply needed.

We check casino sites and publish what we find. This one is yours, free, whether or not you ever talk to us.

## A single 7.3 MB image loads on your homepage

```
https://oxy.casino/static/09628223-7334-41bd-87f1-f4ed9fd577fb/dd4e35782887b18d4345a98d8c266665.svg
  7.3 MB
```

On a mobile connection this one file takes most of the time before the page is usable. Most players arrive from a phone, often on a weak signal.

Usually fixable the same afternoon — compress it, or load it after the page is interactive instead of before.

To confirm the size yourself:

```
curl -sI 'https://oxy.casino/static/09628223-7334-41bd-87f1-f4ed9fd577fb/dd4e35782887b18d4345a98d8c266665.svg' | grep -i content-length
```

## Checked, nothing wrong

HTTPS with HSTS enabled, mobile viewport set correctly, no insecure content on a secure page.


## What we did not check

**On your site specifically, two of our four checks did not run:** the licence register match and the mobile time-to-register measurement. A report only ever contains checks that actually ran — if one is not named above, it did not happen. Both are available free on request.

In general we cannot check anything behind a login, whether your games come from the studios named on the site — that cannot be established from outside, and we do not claim it — or RNG fairness, which needs an accredited lab.

---

Every line above was re-checked against your live site on the day this was sent. If something here no longer reproduces, it was removed before sending rather than left in.

**Swift Secure.** We are new and building the reference list. If this was useful and you want the result public, we issue a verification badge linking to a dated page that states exactly what was and was not checked. **Free for the first six months, and the technical checks stay free — no contract, remove it any time.**

[YOUR NAME]
[REPLY ADDRESS]
