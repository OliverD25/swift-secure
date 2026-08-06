# casinonavy.com — free technical check

Run 6 August 2026. Nothing to sign, no reply needed.

We check casino sites and publish what we find. This one is yours, free, whether or not you ever talk to us.

## 8 requests fail when your homepage loads — 4 distinct files

```
404  https://www.casinonavy.com/_vercel/insights/script.js
500  https://api.casinonavy.com/api/v1/categories?skipEmpty=true
500  https://api.casinonavy.com/api/v1/games/vendors
```

These are your game tiles and game modules. A player sees blank space where they expect something.

1 of these are on your own domain and 3 come from `api.casinonavy.com`. The first group is yours to fix; the second is worth forwarding to whoever runs that service for you.

This kind of failure is easy to miss. A missing file produces no error page and no warning, and anyone who has opened the site before is served it from their own cache — so on your team's machines the page looks correct.

You can confirm the first line above in one command:

```
curl -sI 'https://www.casinonavy.com/_vercel/insights/script.js'
```

## Checked, nothing wrong

172 requests on the homepage, below the market median of about 135, HTTPS with HSTS enabled, mobile viewport set correctly, no insecure content on a secure page.


## What we did not check

**On your site specifically, two of our four checks did not run:** the licence register match and the mobile time-to-register measurement. A report only ever contains checks that actually ran — if one is not named above, it did not happen. Both are available free on request.

In general we cannot check anything behind a login, whether your games come from the studios named on the site — that cannot be established from outside, and we do not claim it — or RNG fairness, which needs an accredited lab.

---

Every line above was re-checked against your live site on the day this was sent. If something here no longer reproduces, it was removed before sending rather than left in.

**Swift Secured.** We are new and building the reference list. If this was useful and you want the result public, we issue a verification badge linking to a dated page that states exactly what was and was not checked. **Free for the first six months, and the technical checks stay free — no contract, remove it any time.**

Dmytro
dmytro@swiftsecured.com
