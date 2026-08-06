# race365.com — free technical check

Run 6 August 2026. Nothing to sign, no reply needed.

We check casino sites and publish what we find. This one is yours, free, whether or not you ever talk to us.

## 15 requests fail when your homepage loads

```
400  https://api.rcintl.io/account/v2/access-token
404  https://cdn.rcintl.io/assets/desktop/en/home-section-2.json.gz?t=1785757212918
404  https://cdn.rcintl.io/assets/desktop/en/home-section-4.json.gz?t=1785757212918
```

All of them are served from `api.rcintl.io`, not from your own servers. That usually means the fix belongs to your platform provider rather than to your team — worth forwarding to them with this list.

This kind of failure is easy to miss. A missing file produces no error page and no warning, and anyone who has opened the site before is served it from their own cache — so on your team's machines the page looks correct.

You can confirm the first line above in one command:

```
curl -sI 'https://api.rcintl.io/account/v2/access-token'
```

## A single 11.1 MB image loads on your homepage

```
https://cdn.rcintl.io/ru/web/community-banner.webp
  11.1 MB
```

On a mobile connection this one file takes most of the time before the page is usable. Most players arrive from a phone, often on a weak signal.

There are more behind it: 3.6 MB, 3.6 MB.

Usually fixable the same afternoon — compress it, or load it after the page is interactive instead of before.

To confirm the size yourself:

```
curl -sI 'https://cdn.rcintl.io/ru/web/community-banner.webp' | grep -i content-length
```

## Checked, nothing wrong

Mobile viewport set correctly, no insecure content on a secure page.


## What we did not check

**On your site specifically, two of our four checks did not run:** the licence register match and the mobile time-to-register measurement. A report only ever contains checks that actually ran — if one is not named above, it did not happen. Both are available free on request.

In general we cannot check anything behind a login, whether your games come from the studios named on the site — that cannot be established from outside, and we do not claim it — or RNG fairness, which needs an accredited lab.

---

Every line above was re-checked against your live site on the day this was sent. If something here no longer reproduces, it was removed before sending rather than left in.

**Swift Secured.** We are new and building the reference list. If this was useful and you want the result public, we issue a verification badge linking to a dated page that states exactly what was and was not checked. **Free for the first six months, and the technical checks stay free — no contract, remove it any time.**

[YOUR NAME]
[REPLY ADDRESS]
