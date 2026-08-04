# winup.io — free technical check

Run 4 August 2026. Nothing to sign, no reply needed.

We check casino sites and publish what we find. This one is yours, free, whether or not you ever talk to us.

## 38 requests fail when your homepage loads — 20 distinct files

```
400  https://winup.io/api/v1/bonuses?lang=en&type=promo
404  https://winup.io/api/v1/reports?report=v2/Reports/LastBets&lang=en&minBet=0&quantity=10
400  https://winup.io/api/v1/publicSocketsData?lang=en
```

These are the payment-method icons on your deposit screen. A player sees blank space where they expect something.

5 of these are on your own domain and 15 come from `agstatic.com`. The first group is yours to fix; the second is worth forwarding to whoever runs that service for you.

This kind of failure is easy to miss. A missing file produces no error page and no warning, and anyone who has opened the site before is served it from their own cache — so on your team's machines the page looks correct.

You can confirm any line above in one command:

```
curl -sI 'https://winup.io/api/v1/bonuses?lang=en&type=promo'
```

## Checked, nothing wrong

HTTPS with HSTS enabled, mobile viewport set correctly, no insecure content on a secure page.


## What we did not check

**On your site specifically, two of our four checks did not run:** the licence register match and the mobile time-to-register measurement. A report only ever contains checks that actually ran — if one is not named above, it did not happen. Both are available free on request.

In general we cannot check anything behind a login, whether your games come from the studios named on the site — that cannot be established from outside, and we do not claim it — or RNG fairness, which needs an accredited lab.

---

Every line above was re-checked against your live site on the day this was sent. If something here no longer reproduces, it was removed before sending rather than left in.

**Swift Secured.** We are new and building the reference list. If this was useful and you want the result public, we issue a verification badge linking to a dated page that states exactly what was and was not checked. **Free for the first six months, and the technical checks stay free — no contract, remove it any time.**

[YOUR NAME]
[REPLY ADDRESS]
