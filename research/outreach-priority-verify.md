# First-wave outreach — verify before sending

Ranked from 1311 audited domains; 752 produced at least one finding.
Showing the top 40 after keeping only one domain per operator.

**Check these by hand.** Every line below is a measurement this project has
been wrong about before. The `curl` command and the dev-tools path reproduce
each finding directly — if one does not reproduce, the tool is wrong and the
row must come off the list.

A note on direction: the sweep runs six pages at once behind one IP, so a
page that did not settle inside 6 seconds is counted LOW. Numbers here are a
floor. Finding more by hand confirms the tool; finding fewer does not.

## 1. race365.com  — score 22

- brand: Race365   operator: Superstars Entertainment B.V.
- contact: **no address harvested**
- licence: OGL/2024/1296/0547 (active), source: curacao

**broken** — 15 genuine request failure(s) on the homepage (all on a third-party host — the fix belongs to their platform vendor)
  - detail: `400 https://api.rcintl.io/account/v2/access-token | 404 https://cdn.rcintl.io/assets/desktop/en/home-section-2.json.gz?t=1785757212918 | 404 https://cdn.rcintl.io/assets/desktop/en/home-section-4.json.gz?t=1785757212918`
  - classified: {'other': 1, 'functional': 14}
  - check in browser: Open https://race365.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://api.rcintl.io/account/v2/access-token' | head -1`

**weight** — at least 24.5MB and 290 requests to load the homepage
  - detail: `largest single file: 11.1MB image — https://cdn.rcintl.io/ru/web/community-banner.webp`
  - check in browser: Open https://race365.com → F12 → Network → reload → sort by Size
  - check from shell: `curl -sI 'https://cdn.rcintl.io/ru/web/community-banner.webp' | grep -i content-length`

**consent** — 9 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.clarity.ms, connect.facebook.net, www.googletagmanager.com, scripts.clarity.ms, www.google-analytics.com`
  - check in browser: Open https://race365.com in a fresh profile → F12 → Network → filter 'www.clarity.ms' → it fires with no banner clicked


## 2. donebets.com  — score 20

- brand: Loading   operator: 3-102-952932 SRL
- contact: **no address harvested**
- licence: ALSI-202604027-FI2 (—), source: anjouan

**broken** — 11 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://donebets.com/api/cmsgateway/api/v1.0/AssetsSite/aae91d2d-a12b-4ccc-a7cd-e48bfb6ec616.webp?width=692&height=336&Quality=90&format=webp | 404 https://donebets.com/api/cmsgateway/api/v1.0/AssetsSite/5957cbbc-b03a-4035-88f3-9041ce955b21 | 404 https://donebets.com/api/cmsgateway/api/v1.0/AssetsSite/a3aeee96-a9c8-41b6-9c62-b651439a95e7`
  - excluded from the count: 1 refusal(s) aimed at our crawler (401/403/429/451 or a bot check)
  - classified: {'functional': 11}
  - check in browser: Open https://donebets.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://donebets.com/api/cmsgateway/api/v1.0/AssetsSite/aae91d2d-a12b-4ccc-a7cd-e48bfb6ec616.webp?width=692&height=336&Quality=90&format=webp' | head -1`

**weight** — at least 12.5MB and 295 requests to load the homepage
  - detail: `10 distinct third-party hosts`
  - check in browser: Open https://donebets.com → F12 → Network → reload → sort by Size


## 3. metaigaming.io  — score 19

- brand: Meta System   operator: Middle Kang B.V.
- contact: **no address harvested**
- licence: OGL/2024/2267/1181 (assessment in progress), source: curacao

**broken** — 22 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://metaigaming.io/jogos-slots?_rsc=1x2gj | 404 https://metaigaming.io/cassino-ao-vivo?_rsc=1x2gj | 404 https://metaigaming.io/mines?_rsc=1x2gj`
  - classified: {'other': 17, 'functional': 3}
  - check in browser: Open https://metaigaming.io → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://metaigaming.io/jogos-slots?_rsc=1x2gj' | head -1`

**weight** — at least 9.3MB and 310 requests to load the homepage
  - detail: `10 distinct third-party hosts`
  - check in browser: Open https://metaigaming.io → F12 → Network → reload → sort by Size

**consent** — 2 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, connect.facebook.net`
  - check in browser: Open https://metaigaming.io in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 4. betplatino.co  — score 18

- brand: Betplatino   operator: Trickless N.V
- contact: **no address harvested**
- licence: OGL/2024/139/0125 (assessment in progress), source: curacao

**broken** — 2 genuine request failure(s) on the homepage (1 on their own domain, 1 on a third-party host)
  - detail: `400 https://v.byads.co/d/.js?oref=&ourl=https%3A%2F%2Fwww.betplatino.co%2F&opt=Betplatino&vtm=1785756858109 | 404 https://wallet.betplatino.co/c/listadoVentanas.aspx?company=BPCO&lobby=MARKETING`
  - classified: {'functional': 2}
  - check in browser: Open https://betplatino.co → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://v.byads.co/d/.js?oref=&ourl=https%3A%2F%2Fwww.betplatino.co%2F&opt=Betplatino&vtm=1785756858109' | head -1`

**weight** — at least 11.5MB and 334 requests to load the homepage
  - detail: `32 distinct third-party hosts`
  - check in browser: Open https://betplatino.co → F12 → Network → reload → sort by Size

**mixed** — 1 subresource(s) requested over plain http:// on an https:// page
  - detail: `Browsers block or warn on these`
  - check in browser: Open https://betplatino.co → F12 → Console → look for mixed-content warnings

**consent** — 7 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, ad.doubleclick.net, connect.facebook.net, www.google.com, googleads.g.doubleclick.net`
  - check in browser: Open https://betplatino.co in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 5. godbunny.com  — score 18

- brand: GodBunny   operator: Godbunny B.V.
- contact: **no address harvested**
- licence: OGL/2024/199/0868 (active), source: curacao

**broken** — 55 genuine request failure(s) on the homepage (1 on their own domain, 54 on a third-party host)
  - detail: `404 https://agstatic.com/category/plinkogames.png | 404 https://agstatic.com/category/lobbygame.png | 404 https://agstatic.com/category/bingogame.png`
  - classified: {'asset': 20}
  - check in browser: Open https://godbunny.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://agstatic.com/category/plinkogames.png' | head -1`

**weight** — at least 10.1MB and 552 requests to load the homepage
  - detail: `7 distinct third-party hosts`
  - check in browser: Open https://godbunny.com → F12 → Network → reload → sort by Size

**consent** — 3 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, www.google-analytics.com, godbunny.com`
  - check in browser: Open https://godbunny.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 6. luckybet.co  — score 18

- brand: LuckyBet   operator: LBC Enterprises B.V.
- contact: **no address harvested**
- licence: OGL/2024/1221/0500 (assessment in progress), source: curacao

**broken** — 42 genuine request failure(s) on the homepage (all on a third-party host — the fix belongs to their platform vendor)
  - detail: `404 https://agstatic.com/wlc/icons/european/v1/blog.svg | 404 https://agstatic.com/wlc/icons/european/v1/loyalty.svg | 404 https://agstatic.com/wlc/icons/european/v1/affiliate.svg`
  - excluded from the count: 1 refusal(s) aimed at our crawler (401/403/429/451 or a bot check)
  - classified: {'asset': 20}
  - check in browser: Open https://luckybet.co → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://agstatic.com/wlc/icons/european/v1/blog.svg' | head -1`

**weight** — at least 49.8MB and 486 requests to load the homepage
  - detail: `largest single file: 7.5MB image — https://res.cloudinary.com/djkersugp/image/upload/v1763005282/Banner_i6xt7g.png`
  - check in browser: Open https://luckybet.co → F12 → Network → reload → sort by Size
  - check from shell: `curl -sI 'https://res.cloudinary.com/djkersugp/image/upload/v1763005282/Banner_i6xt7g.png' | grep -i content-length`

**consent** — 4 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, connect.facebook.net, www.facebook.com, stats.g.doubleclick.net`
  - check in browser: Open https://luckybet.co in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 7. fatbets.com  — score 17

- brand: Gamdom   operator: Fatbets Ltd
- contact: support@gamdom.com
- licence: ALSI-202508054-FI2 (—), source: anjouan

**broken** — 9 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://fatbets.com/_proxied/games/towers/remoteEntry.js?v=v6ze5w7gy4 | 404 https://fatbets.com/_proxied/games/mines/remoteEntry.js?v=jg8yfpgjvne | 404 https://fatbets.com/_proxied/games/chicken/remoteEntry.js?v=mpr26yglv8b`
  - excluded from the count: 1 refusal(s) aimed at our crawler (401/403/429/451 or a bot check)
  - classified: {'functional': 9}
  - check in browser: Open https://fatbets.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://fatbets.com/_proxied/games/towers/remoteEntry.js?v=v6ze5w7gy4' | head -1`

**consent** — 14 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, cnv.event.prod.bidr.io, ad.doubleclick.net, www.clarity.ms, www.google.com`
  - check in browser: Open https://fatbets.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 8. nicewinz.com  — score 17

- brand: NiceWin   operator: Glory Multimedia B.V.
- contact: **no address harvested**
- licence: OGL/2024/1600/0861 (assessment in progress), source: curacao

**broken** — 21 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://www.nicewinz.com/x-data/icons/sports/colored/russianpyramid.svg?v=1785339548 | 404 https://www.nicewinz.com/x-data/icons/casino/colored/play.svg?v=1785339548 | 404 https://www.nicewinz.com/x-data/icons/casino/colored/play.svg?v=1785339548`
  - classified: {'other': 20}
  - check in browser: Open https://nicewinz.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://www.nicewinz.com/x-data/icons/sports/colored/russianpyramid.svg?v=1785339548' | head -1`

**weight** — at least 14.1MB and 645 requests to load the homepage
  - detail: `6 distinct third-party hosts`
  - check in browser: Open https://nicewinz.com → F12 → Network → reload → sort by Size


## 9. oxy.casino  — score 17

- brand: OXY   operator: Spiritus Limited
- contact: support@oxy.casino
- licence: ALSI-202603056-FI2 (—), source: anjouan

**broken** — 1 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://oxy.casino/api/meta/settings/definitions/07258158-f9f9-4a52-8935-c3bee232f24e/instance?projectScope=9a8fd9c6-a4c1-4360-9934-c6ac9f071266`
  - excluded from the count: 4 refusal(s) aimed at our crawler (401/403/429/451 or a bot check)
  - classified: {'functional': 1}
  - check in browser: Open https://oxy.casino → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://oxy.casino/api/meta/settings/definitions/07258158-f9f9-4a52-8935-c3bee232f24e/instance?projectScope=9a8fd9c6-a4c1-4360-9934-c6ac9f071266' | head -1`

**weight** — at least 13.0MB and 212 requests to load the homepage
  - detail: `largest single file: 7.3MB image — https://oxy.casino/static/09628223-7334-41bd-87f1-f4ed9fd577fb/dd4e35782887b18d4345a98d8c266665.svg`
  - check in browser: Open https://oxy.casino → F12 → Network → reload → sort by Size
  - check from shell: `curl -sI 'https://oxy.casino/static/09628223-7334-41bd-87f1-f4ed9fd577fb/dd4e35782887b18d4345a98d8c266665.svg' | grep -i content-length`

**consent** — 1 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `connect.facebook.net`
  - check in browser: Open https://oxy.casino in a fresh profile → F12 → Network → filter 'connect.facebook.net' → it fires with no banner clicked


## 10. slapperzz.com  — score 17

- brand: Slapperzz   operator: 3-102-942611 SRL
- contact: support@slapperzz.com
- licence: ALSI-202509041-FI1 (—), source: anjouan

**broken** — 24 genuine request failure(s) on the homepage (all on a third-party host — the fix belongs to their platform vendor)
  - detail: `404 https://agstatic.com/paysystems/V2/svg/black/crederes_applepay.svg | 404 https://agstatic.com/paysystems/V2/svg/black/paymentmodule_spectrepay_trusted.svg | 404 https://agstatic.com/paysystems/V2/svg/black/gatewaycrypto_ada.svg`
  - classified: {'asset': 20}
  - check in browser: Open https://slapperzz.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://agstatic.com/paysystems/V2/svg/black/crederes_applepay.svg' | head -1`

**weight** — at least 42.7MB and 537 requests to load the homepage
  - detail: `8 distinct third-party hosts`
  - check in browser: Open https://slapperzz.com → F12 → Network → reload → sort by Size

**consent** — 5 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, stats.g.doubleclick.net, ad.doubleclick.net, googleads.g.doubleclick.net, www.google.com`
  - check in browser: Open https://slapperzz.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 11. winup.io  — score 17

- brand: Winup   operator: 3-102-952740 SRL
- contact: support@winup.io
- licence: ALSI-202601062-FI2 (—), source: anjouan

**broken** — 38 genuine request failure(s) on the homepage (5 on their own domain, 33 on a third-party host)
  - detail: `400 https://winup.io/api/v1/bonuses?lang=en&type=promo | 404 https://winup.io/api/v1/reports?report=v2/Reports/LastBets&lang=en&minBet=0&quantity=10 | 400 https://winup.io/api/v1/publicSocketsData?lang=en`
  - classified: {'functional': 5, 'asset': 15}
  - check in browser: Open https://winup.io → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://winup.io/api/v1/bonuses?lang=en&type=promo' | head -1`

**consent** — 2 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, www.google-analytics.com`
  - check in browser: Open https://winup.io in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 12. xtp.com  — score 17

- brand: XTP   operator: Entretenimiento Rojo B.V.
- contact: **no address harvested**
- licence: OGL/2024/1100/0505 (assessment in progress), source: curacao

**broken** — 20 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `406 https://api.xtp.com/market/sports/upcoming-matches-by-time?competition_id=019eea6c-0c67-7525-98f0-e5f698204e37&live_filter=no_live&limit=5&main_markets=true | 406 https://api.xtp.com/market/sports/upcoming-matches-by-time?competition_id=019af0a0-db6c-7b1c-ad6e-67522951ff55&live_filter=no_live&limit=5&main_markets=true | 406 https://api.xtp.com/market/sports/upcoming-matches-by-time?competition_id=019eef99-5b23-7da0-842c-616d97653da6&live_filter=no_live&limit=5&main_markets=true`
  - classified: {'other': 15, 'functional': 5}
  - check in browser: Open https://xtp.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://api.xtp.com/market/sports/upcoming-matches-by-time?competition_id=019eea6c-0c67-7525-98f0-e5f698204e37&live_filter=no_live&limit=5&main_markets=true' | head -1`

**consent** — 7 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, www.clarity.ms, www.google-analytics.com, scripts.clarity.ms, i.clarity.ms`
  - check in browser: Open https://xtp.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 13. casinonavy.com  — score 16

- brand: Homepage   operator: JMS Investment Group N.V.
- contact: **no address harvested**
- licence: OGL/2024/675/0939 (active), source: curacao

**broken** — 8 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `500 https://api.casinonavy.com/api/v1/categories?skipEmpty=true | 500 https://api.casinonavy.com/api/v1/games/vendors | 500 https://api.casinonavy.com/api/v1/games?mobile=false&q=&limit=50&offset=0`
  - classified: {'functional': 7, 'other': 1}
  - check in browser: Open https://casinonavy.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://api.casinonavy.com/api/v1/categories?skipEmpty=true' | head -1`


## 14. ganalucas.com  — score 16

- brand: Spotless Serenity Stays Inc.   operator: W&C N.V.
- contact: **no address harvested**
- licence: OGL/2024/922/0638 (active), source: curacao

**broken** — 1 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `400 https://ganalucas.com/api/reviews`
  - classified: {'functional': 1}
  - check in browser: Open https://ganalucas.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://ganalucas.com/api/reviews' | head -1`

**weight** — at least 11.4MB and 33 requests to load the homepage
  - detail: `largest single file: 9.7MB media — https://ganalucas.com/assets/lake-house-horizontal-desktop.mp4`
  - check in browser: Open https://ganalucas.com → F12 → Network → reload → sort by Size
  - check from shell: `curl -sI 'https://ganalucas.com/assets/lake-house-horizontal-desktop.mp4' | grep -i content-length`


## 15. gekipachi.com  — score 16

- brand: アツパチ   operator: Lucifer N.V.
- contact: **no address harvested**
- licence: OGL/2024/1635/0968 (active), source: curacao

**broken** — 2 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://www.gekipachi.com/assets/undefined | 404 https://www.gekipachi.com/assets/undefined`
  - classified: {'other': 2}
  - check in browser: Open https://gekipachi.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://www.gekipachi.com/assets/undefined' | head -1`

**weight** — at least 86.1MB and 126 requests to load the homepage
  - detail: `largest single file: 13.3MB image — https://minio.baiqingge.com/image/pachi-atsu/user/11103/20260521/287699899f59491c822f415265ce2952.png`
  - check in browser: Open https://gekipachi.com → F12 → Network → reload → sort by Size
  - check from shell: `curl -sI 'https://minio.baiqingge.com/image/pachi-atsu/user/11103/20260521/287699899f59491c822f415265ce2952.png' | grep -i content-length`

**consent** — 4 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, connect.facebook.net, www.google-analytics.com, www.facebook.com`
  - check in browser: Open https://gekipachi.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 16. jonbet.io  — score 16

- brand: jonbet   operator: Ascend Entertainment N.V.
- contact: **no address harvested**
- licence: OGL/2024/1467/0728 (assessment in progress), source: curacao

**broken** — 33 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `530 https://jonbet.io/api/country | 530 https://jonbet.io/api/chat_rooms | 530 https://jonbet.io/api/feature-flag-group/users/has-access?name=consent-to-move-funds`
  - classified: {'functional': 20}
  - check in browser: Open https://jonbet.io → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://jonbet.io/api/country' | head -1`


## 17. jun88.id  — score 16

- brand: Jun88 Trang chủ chính thức Jun88.com   operator: Cyber Labs B.V.
- contact: **no address harvested**
- licence: OGL/2024/1696/1055 (active), source: curacao

**broken** — 1 genuine request failure(s) on the homepage (all on a third-party host — the fix belongs to their platform vendor)
  - detail: `400 https://conn.webpush.theengagelab.com/v1/auth?user_str=msd5mzis1tgsd&appkey=feb6316f884e41bc9f4883e1&is_temporary=n`
  - classified: {'functional': 1}
  - check in browser: Open https://jun88.id → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://conn.webpush.theengagelab.com/v1/auth?user_str=msd5mzis1tgsd&appkey=feb6316f884e41bc9f4883e1&is_temporary=n' | head -1`

**weight** — at least 97.0MB and 367 requests to load the homepage
  - detail: `largest single file: 96.5MB media — https://media.89jjun88.com/public/k36/site-daisu/jun88ds.mp4`
  - check in browser: Open https://jun88.id → F12 → Network → reload → sort by Size
  - check from shell: `curl -sI 'https://media.89jjun88.com/public/k36/site-daisu/jun88ds.mp4' | grep -i content-length`

**consent** — 3 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `api.jun88.id, www.googletagmanager.com, www.google-analytics.com`
  - check in browser: Open https://jun88.id in a fresh profile → F12 → Network → filter 'api.jun88.id' → it fires with no banner clicked


## 18. tomcasino.net  — score 16

- brand: Tomcasino   operator: 3-102-941391 SRL
- contact: **no address harvested**
- licence: ALSI-202511019-FI1 (—), source: anjouan

**broken** — 92 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://tomcasino.net/_next/image?url=https%3A%2F%2Feffective-cdn.com%2Fstorage%2Fstatic%2FCasinoMobule%2Fpragmatic%2F220-350-webp%2Fvs20starlightx.webp&w=256&q=85 | 404 https://tomcasino.net/_next/image?url=https%3A%2F%2Feffective-cdn.com%2Fstorage%2Fstatic%2FCasinoMobule%2Fpragmatic%2F220-350-webp%2Fvs20gtsofhades.webp&w=256&q=85 | 404 https://tomcasino.net/_next/image?url=https%3A%2F%2Feffective-cdn.com%2Fstorage%2Fstatic%2FCasinoMobule%2Fpragmatic%2F220-350-webp%2Fvs20swbonsup.webp&w=256&q=85`
  - classified: {'other': 20}
  - check in browser: Open https://tomcasino.net → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://tomcasino.net/_next/image?url=https%3A%2F%2Feffective-cdn.com%2Fstorage%2Fstatic%2FCasinoMobule%2Fpragmatic%2F220-350-webp%2Fvs20starlightx.webp&w=256&q=85' | head -1`

**weight** — at least 5.6MB and 506 requests to load the homepage
  - detail: `largest single file: 2.9MB media — https://tomcasino.net/audio/track1.mp3`
  - check in browser: Open https://tomcasino.net → F12 → Network → reload → sort by Size
  - check from shell: `curl -sI 'https://tomcasino.net/audio/track1.mp3' | grep -i content-length`

**consent** — 5 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, t.contentsquare.net, mc.yandex.ru, www.google-analytics.com, c.ba.contentsquare.net`
  - check in browser: Open https://tomcasino.net in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 19. jurassino.com  — score 15

- brand: jurassino   operator: GTW B.V.
- contact: **no address harvested**
- licence: OGL/2024/250/0115 (assessment in progress), source: curacao

**broken** — 6 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `400 https://jurassino.com/api/profile/getlanguage?url=%2F | 400 https://jurassino.com/api/game/GetGameVendorCountryRestrictionsByCountry | 400 https://jurassino.com/api/profile/getlanguage?url=%2F`
  - classified: {'functional': 6}
  - check in browser: Open https://jurassino.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://jurassino.com/api/profile/getlanguage?url=%2F' | head -1`


## 20. betanic.com  — score 14

- brand: Games   operator: Kitsilano Limitada
- contact: **no address harvested**
- licence: ALSI-202508065-FI2 (—), source: anjouan

**broken** — 1 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://api.betanic.com/site-settings`
  - classified: {'other': 1}
  - check in browser: Open https://betanic.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://api.betanic.com/site-settings' | head -1`

**weight** — at least 27.4MB and 184 requests to load the homepage
  - detail: `largest single file: 9.9MB script — https://betanic.com/static/js/main.be1290f5.js`
  - check in browser: Open https://betanic.com → F12 → Network → reload → sort by Size
  - check from shell: `curl -sI 'https://betanic.com/static/js/main.be1290f5.js' | grep -i content-length`


## 21. castle.com  — score 14

- brand: Castle   operator: Broken Tentacle Ltd
- contact: partners@castle.com
- licence: ALSI-202602048-FI2 (—), source: anjouan

**broken** — 1 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `400 https://api.castle.com/users/get-ip`
  - classified: {'functional': 1}
  - check in browser: Open https://castle.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://api.castle.com/users/get-ip' | head -1`

**weight** — at least 13.7MB and 123 requests to load the homepage
  - detail: `largest single file: 2.8MB fetch — https://assets.castle.com/three/assets/locations/arena/arena_vfinal.meshopt.glb`
  - check in browser: Open https://castle.com → F12 → Network → reload → sort by Size
  - check from shell: `curl -sI 'https://assets.castle.com/three/assets/locations/arena/arena_vfinal.meshopt.glb' | grep -i content-length`


## 22. coinebet.com  — score 14

- brand: coinebet   operator: Rail Solutions Group B.V.
- contact: **no address harvested**
- licence: OGL/2024/788/0550 (assessment in progress), source: curacao

**broken** — 3 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://coinebet.com/api/chat/v1/chat-enabled | 404 https://coinebet.com/box.png | 404 https://coinebet.com/api/chat/v1/channels`
  - excluded from the count: 2 refusal(s) aimed at our crawler (401/403/429/451 or a bot check)
  - classified: {'functional': 2, 'asset': 1}
  - check in browser: Open https://coinebet.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://coinebet.com/api/chat/v1/chat-enabled' | head -1`

**weight** — at least 6.4MB and 160 requests to load the homepage
  - detail: `10 distinct third-party hosts`
  - check in browser: Open https://coinebet.com → F12 → Network → reload → sort by Size


## 23. fgfox.com  — score 14

- brand: fgfox   operator: FairGame G.P. N.V.
- contact: **no address harvested**
- licence: OGL/2024/1673/0915 (active), source: curacao

**broken** — 2 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `406 https://fgfox.com/api/gpt/jet-bird/public/api/v1/feature/state | 404 https://fgfox.com/src/assets/images/blockedCountryBg.webp`
  - classified: {'functional': 1, 'asset': 1}
  - check in browser: Open https://fgfox.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://fgfox.com/api/gpt/jet-bird/public/api/v1/feature/state' | head -1`

**weight** — at least 9.1MB and 170 requests to load the homepage
  - detail: `22 distinct third-party hosts`
  - check in browser: Open https://fgfox.com → F12 → Network → reload → sort by Size

**consent** — 7 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `fgfox.com, www.googletagmanager.com, static.hotjar.com, web-sdk.smartlook.com, script.hotjar.com`
  - check in browser: Open https://fgfox.com in a fresh profile → F12 → Network → filter 'fgfox.com' → it fires with no banner clicked


## 24. gamealotroyale.com  — score 14

- brand: Gamealotroyale   operator: 3-102-954988 SRL
- contact: support@gamealotroyale.com
- licence: ALSI-202602051-FI2 (—), source: anjouan

**broken** — 27 genuine request failure(s) on the homepage (all on a third-party host — the fix belongs to their platform vendor)
  - detail: `404 https://agstatic.com/wlc/icons/european/v3/top10.svg | 404 https://agstatic.com/wlc/icons/european/v3/top10.svg | 404 https://agstatic.com/merchants/svg/black/gclub.svg`
  - classified: {'asset': 20}
  - check in browser: Open https://gamealotroyale.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://agstatic.com/wlc/icons/european/v3/top10.svg' | head -1`

**weight** — at least 11.2MB and 474 requests to load the homepage
  - detail: `5 distinct third-party hosts`
  - check in browser: Open https://gamealotroyale.com → F12 → Network → reload → sort by Size

**consent** — 2 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, www.google-analytics.com`
  - check in browser: Open https://gamealotroyale.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 25. ganare.com  — score 14

- brand: Ganare   operator: Born Champion Entertainment Ltd
- contact: **no address harvested**
- licence: ALSI-202604031-FI2 (—), source: anjouan

**broken** — 2 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://api.ganare.com/api/v1/system/get-all-currency | 404 https://api.ganare.com/api/v1/system/get-game-settings`
  - excluded from the count: 1 refusal(s) aimed at our crawler (401/403/429/451 or a bot check)
  - classified: {'functional': 2}
  - check in browser: Open https://ganare.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://api.ganare.com/api/v1/system/get-all-currency' | head -1`

**weight** — at least 9.1MB and 112 requests to load the homepage
  - detail: `largest single file: 2.9MB script — https://ganare.com/assets/index-Cv58Dt2B.js`
  - check in browser: Open https://ganare.com → F12 → Network → reload → sort by Size
  - check from shell: `curl -sI 'https://ganare.com/assets/index-Cv58Dt2B.js' | grep -i content-length`

**consent** — 7 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, connect.facebook.net, ad.doubleclick.net, googleads.g.doubleclick.net, www.google.com`
  - check in browser: Open https://ganare.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 26. gangabet.mx  — score 14

- brand: GANGABET Apuestas y   operator: OW Internacional Ltd
- contact: **no address harvested**
- licence: ALSI-202512013-FI1 (—), source: anjouan

**broken** — 2 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://gangabet.mx/api//media/games_home_assets/lateral-images/banner-home-left.jpg | 404 https://gangabet.mx/api//media/games_home_assets/lateral-images/banner-home-right.jpg`
  - classified: {'asset': 2}
  - check in browser: Open https://gangabet.mx → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://gangabet.mx/api//media/games_home_assets/lateral-images/banner-home-left.jpg' | head -1`

**weight** — at least 46.4MB and 256 requests to load the homepage
  - detail: `8 distinct third-party hosts`
  - check in browser: Open https://gangabet.mx → F12 → Network → reload → sort by Size

**consent** — 2 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `connect.facebook.net, www.facebook.com`
  - check in browser: Open https://gangabet.mx in a fresh profile → F12 → Network → filter 'connect.facebook.net' → it fires with no banner clicked


## 27. keeponwin.com  — score 14

- brand: Keep On Win   operator: Keep On Entertainment N.V.
- contact: **no address harvested**
- licence: OGL/2024/2279/1202 (active), source: curacao

**broken** — 7 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://www.keeponwin.com/%3Chttps://app.hoory.com%3E/packs/js/sdk.js | 404 https://www.keeponwin.com/widgets-x/icons/casino/colored/other.svg?v=1785752878 | 404 https://www.keeponwin.com/widgets-x/icons/casino/colored/other.svg?v=1785752878`
  - classified: {'other': 7}
  - check in browser: Open https://keeponwin.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://www.keeponwin.com/%3Chttps://app.hoory.com%3E/packs/js/sdk.js' | head -1`

**weight** — at least 7.1MB and 441 requests to load the homepage
  - detail: `7 distinct third-party hosts`
  - check in browser: Open https://keeponwin.com → F12 → Network → reload → sort by Size


## 28. orobet.cl  — score 14

- brand: Orobet   operator: SUVYD B.V.
- contact: **no address harvested**
- licence: OGL/2024/846/0501 (assessment in progress), source: curacao

**broken** — 3 genuine request failure(s) on the homepage (1 on their own domain, 2 on a third-party host)
  - detail: `404 https://orobet.cl/dc/img/site/footer_min_age_logo_light_theme?lang=es-cl&ck=1785500563 | 404 https://sport-iframe.gjrjffdilpf.com/content/uploads/icons/CL27B1/loader.svg | 404 https://sport-iframe.gjrjffdilpf.com/content/uploads/icons/CL27B1/loader.svg`
  - excluded from the count: 2 refusal(s) aimed at our crawler (401/403/429/451 or a bot check)
  - classified: {'other': 1, 'asset': 2}
  - check in browser: Open https://orobet.cl → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://orobet.cl/dc/img/site/footer_min_age_logo_light_theme?lang=es-cl&ck=1785500563' | head -1`

**weight** — at least 10.3MB and 512 requests to load the homepage
  - detail: `19 distinct third-party hosts`
  - check in browser: Open https://orobet.cl → F12 → Network → reload → sort by Size

**consent** — 5 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, static.hotjar.com, stats.g.doubleclick.net, script.hotjar.com, content.hotjar.io`
  - check in browser: Open https://orobet.cl in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 29. vivaro.me  — score 14

- brand: Feed   operator: Radon B.V.
- contact: **no address harvested**
- licence: OGL/2024/802/0282 (assessment in progress), source: curacao

**broken** — 1 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://www.vivaro.me/fs/userFiles-v2/social-18774643/media/group-1321314735-17803852728003.svg`
  - classified: {'asset': 1}
  - check in browser: Open https://vivaro.me → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://www.vivaro.me/fs/userFiles-v2/social-18774643/media/group-1321314735-17803852728003.svg' | head -1`

**weight** — at least 17.1MB and 624 requests to load the homepage
  - detail: `largest single file: 2.3MB media — https://storage.vivaro.me/streams/1782377427_cf9dc0c9-ce68-4762-a103-9f0b3ddb5818/Default/HLS/1782377427_cf9dc0c9-ce68-4762-a103-9f0b3ddb5818_1080p_00002.ts`
  - check in browser: Open https://vivaro.me → F12 → Network → reload → sort by Size
  - check from shell: `curl -sI 'https://storage.vivaro.me/streams/1782377427_cf9dc0c9-ce68-4762-a103-9f0b3ddb5818/Default/HLS/1782377427_cf9dc0c9-ce68-4762-a103-9f0b3ddb5818_1080p_00002.ts' | grep -i content-length`

**mixed** — 1 subresource(s) requested over plain http:// on an https:// page
  - detail: `Browsers block or warn on these`
  - check in browser: Open https://vivaro.me → F12 → Console → look for mixed-content warnings

**consent** — 2 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, www.google-analytics.com`
  - check in browser: Open https://vivaro.me in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 30. 9winz.com  — score 13

- brand: winz   operator: Globis N.V.
- contact: **no address harvested**
- licence: OGL/2024/1194/0723 (active), source: curacao

**broken** — 12 genuine request failure(s) on the homepage (all on a third-party host — the fix belongs to their platform vendor)
  - detail: `404 https://www.9winz019.com/widgets-x/icons/casino/colored/play.svg?v=1785752878 | 404 https://www.9winz019.com/widgets-x/icons/casino/colored/play.svg?v=1785752878 | 404 https://www.9winz019.com/widgets-x/icons/casino/colored/play.svg?v=1785752878`
  - classified: {'other': 12}
  - check in browser: Open https://9winz.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://www.9winz019.com/widgets-x/icons/casino/colored/play.svg?v=1785752878' | head -1`

**weight** — at least 5.3MB and 637 requests to load the homepage
  - detail: `35 distinct third-party hosts`
  - check in browser: Open https://9winz.com → F12 → Network → reload → sort by Size

**consent** — 10 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, www.google-analytics.com, static.hotjar.com, pubads.g.doubleclick.uk.net, script.hotjar.com`
  - check in browser: Open https://9winz.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 31. betitor.com  — score 13

- brand: Betitor   operator: 3-102-941073 SRL
- contact: **no address harvested**
- licence: ALSI-202509018-FI1 (—), source: anjouan

**broken** — 7 genuine request failure(s) on the homepage (6 on their own domain, 1 on a third-party host)
  - detail: `404 https://betitor.com/content/wp-content/uploads/2026/07/Keno-315x236-1.webp | 404 https://betitor.com/content/wp-content/uploads/2026/07/Dice-315x236-1.webp | 404 https://betitor.com/content/wp-content/uploads/2026/07/Mines-315x236-1.webp`
  - classified: {'asset': 6, 'other': 1}
  - check in browser: Open https://betitor.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://betitor.com/content/wp-content/uploads/2026/07/Keno-315x236-1.webp' | head -1`

**consent** — 2 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, www.google-analytics.com`
  - check in browser: Open https://betitor.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 32. dustbit.com  — score 13

- brand: Dustbit   operator: Oxilium Limited
- contact: support@dustbit.com
- licence: ALSI-202509012-FI1 (—), source: anjouan

**broken** — 1 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `400 https://gateway.dustbit.com/pm/api/Players/RefreshToken`
  - excluded from the count: 1 refusal(s) aimed at our crawler (401/403/429/451 or a bot check)
  - classified: {'functional': 1}
  - check in browser: Open https://dustbit.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://gateway.dustbit.com/pm/api/Players/RefreshToken' | head -1`

**weight** — at least 7.9MB and 290 requests to load the homepage
  - detail: `19 distinct third-party hosts`
  - check in browser: Open https://dustbit.com → F12 → Network → reload → sort by Size

**consent** — 7 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, t.contentsquare.net, stats.g.doubleclick.net, ad.doubleclick.net, googleads.g.doubleclick.net`
  - check in browser: Open https://dustbit.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 33. elitebet.io  — score 13

- brand: elitebet   operator: R. Bostock Enterprises B.V.
- contact: **no address harvested**
- licence: OGL/2024/1067/0640 (active), source: curacao

**broken** — 4 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `483 https://api.elitebet.io/api/v1/cms/onboarding | 483 https://api.elitebet.io/api/v1/cms/settings | 483 https://api.elitebet.io/api/v1/cms/cookies-settings`
  - classified: {'functional': 4}
  - check in browser: Open https://elitebet.io → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://api.elitebet.io/api/v1/cms/onboarding' | head -1`


## 34. gaming-panda.com  — score 13

- brand: Gaming Panda   operator: Pistis Trade N.V.
- contact: **no address harvested**
- licence: OGL/2024/1670/1153 (active), source: curacao

**broken** — 1 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://www.gaming-panda.com/_vercel/insights/script.js`
  - classified: {'other': 1}
  - check in browser: Open https://gaming-panda.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://www.gaming-panda.com/_vercel/insights/script.js' | head -1`

**weight** — at least 48.6MB and 178 requests to load the homepage
  - detail: `3 distinct third-party hosts`
  - check in browser: Open https://gaming-panda.com → F12 → Network → reload → sort by Size

**consent** — 2 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, www.google-analytics.com`
  - check in browser: Open https://gaming-panda.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 35. kaahaus.com  — score 13

- brand: Tervetuloa Kaahaus Kasinolle   operator: Fruity Entertainment N.V.
- contact: **no address harvested**
- licence: OGL/2024/1487/0729 (assessment in progress), source: curacao

**broken** — 3 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://kaahaus.com/api/financial-config?locale=fi | 404 https://kaahaus.com/api/balance-warning-popup?theme=Dark&userRoles=&bonusCodes=&btagCodes=&isAuthenticated=0&isIdentified=0 | 404 https://kaahaus.com/api/financial-config?locale=fi`
  - classified: {'functional': 3}
  - check in browser: Open https://kaahaus.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://kaahaus.com/api/financial-config?locale=fi' | head -1`

**consent** — 7 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, www.clarity.ms, scripts.clarity.ms, www.google-analytics.com, c.clarity.ms`
  - check in browser: Open https://kaahaus.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 36. luminous.casino  — score 13

- brand: Luminous   operator: LuminousCompany Ltd.
- contact: support@luminous.casino
- licence: ALSI-202601036-FI1 (—), source: anjouan

**broken** — 1 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://luminous.casino/api/meta/settings/definitions/07258158-f9f9-4a52-8935-c3bee232f24e/instance?projectScope=76537c5b-9a9d-47ce-9aad-3d35701efd3e`
  - excluded from the count: 2 refusal(s) aimed at our crawler (401/403/429/451 or a bot check)
  - classified: {'functional': 1}
  - check in browser: Open https://luminous.casino → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://luminous.casino/api/meta/settings/definitions/07258158-f9f9-4a52-8935-c3bee232f24e/instance?projectScope=76537c5b-9a9d-47ce-9aad-3d35701efd3e' | head -1`

**weight** — at least 6.3MB and 239 requests to load the homepage
  - detail: `9 distinct third-party hosts`
  - check in browser: Open https://luminous.casino → F12 → Network → reload → sort by Size

**consent** — 2 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `connect.facebook.net, mc.yandex.ru`
  - check in browser: Open https://luminous.casino in a fresh profile → F12 → Network → filter 'connect.facebook.net' → it fires with no banner clicked


## 37. top.casino  — score 13

- brand: Online betting   operator: Cre8 B.V.
- contact: **no address harvested**
- licence: OGL/2024/375/0657 (assessment in progress), source: curacao

**broken** — 4 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://top.casino/static/iolite/icons/fc-1.webp | 404 https://top.casino/static/iolite/icons/karbi-anglong-morning-star.webp | 404 https://top.casino/static/iolite/icons/raengdai.webp`
  - classified: {'asset': 4}
  - check in browser: Open https://top.casino → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://top.casino/static/iolite/icons/fc-1.webp' | head -1`

**weight** — at least 5.7MB and 510 requests to load the homepage
  - detail: `6 distinct third-party hosts`
  - check in browser: Open https://top.casino → F12 → Network → reload → sort by Size

**consent** — 3 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `static.hotjar.com, script.hotjar.com, content.hotjar.io`
  - check in browser: Open https://top.casino in a fresh profile → F12 → Network → filter 'static.hotjar.com' → it fires with no banner clicked


## 38. zipangcasino.com  — score 13

- brand: ジパングカジノ｜24時間日本語サポートのオンラインカジノ   operator: Osmila N.V.
- contact: **no address harvested**
- licence: OGL/2024/1276/0583 (active), source: curacao

**broken** — 1 genuine request failure(s) on the homepage (all on their own domain)
  - detail: `404 https://www.zipangcasino.com/ja/css/swipable-elements.css`
  - classified: {'asset': 1}
  - check in browser: Open https://zipangcasino.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://www.zipangcasino.com/ja/css/swipable-elements.css' | head -1`

**weight** — at least 31.1MB and 308 requests to load the homepage
  - detail: `largest single file: 2.1MB image — https://www.zipangcasino.com/ja/2024-07/new%20banner%203.png`
  - check in browser: Open https://zipangcasino.com → F12 → Network → reload → sort by Size
  - check from shell: `curl -sI 'https://www.zipangcasino.com/ja/2024-07/new%20banner%203.png' | grep -i content-length`

**consent** — 2 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, www.google-analytics.com`
  - check in browser: Open https://zipangcasino.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 39. abcfortunazone.com  — score 12

- brand: Fortunazone Slots   operator: Altan N.V.
- contact: **no address harvested**
- licence: OGL/2024/596/0252 (active), source: curacao

**broken** — 60 genuine request failure(s) on the homepage (all on a third-party host — the fix belongs to their platform vendor)
  - detail: `404 https://agstatic.com/wlc/icons/theme-wolf/categories/gameshows.svg | 404 https://agstatic.com/wlc/icons/theme-wolf/categories/native.svg | 404 https://agstatic.com/merchants/svg/black/adlunam.svg`
  - classified: {'asset': 20}
  - check in browser: Open https://abcfortunazone.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://agstatic.com/wlc/icons/theme-wolf/categories/gameshows.svg' | head -1`

**weight** — at least 6.8MB and 376 requests to load the homepage
  - detail: `13 distinct third-party hosts`
  - check in browser: Open https://abcfortunazone.com → F12 → Network → reload → sort by Size

**consent** — 8 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `www.googletagmanager.com, www.clarity.ms, mc.yandex.ru, www.google-analytics.com, scripts.clarity.ms`
  - check in browser: Open https://abcfortunazone.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com' → it fires with no banner clicked


## 40. anubet.com  — score 12

- brand: AnuBet   operator: Hexiro Ltd
- contact: **no address harvested**
- licence: ALSI-202509043-FI1 (—), source: anjouan

**broken** — 2 genuine request failure(s) on the homepage (1 on their own domain, 1 on a third-party host)
  - detail: `400 https://embed.tawk.to/,/, | 400 https://platformv2.anubet.com/api/v1/user/refresh`
  - excluded from the count: 2 refusal(s) aimed at our crawler (401/403/429/451 or a bot check)
  - classified: {'other': 1, 'functional': 1}
  - check in browser: Open https://anubet.com → F12 → Network → reload → sort by Status
  - check from shell: `curl -sI 'https://embed.tawk.to/,/,' | head -1`

**consent** — 5 tracking host(s) contacted before any consent interaction  *(RANK ONLY — do not put this in the email)*
  - detail: `t.contentsquare.net, www.googletagmanager.com, c.ba.contentsquare.net, k.ba.contentsquare.net, stats.g.doubleclick.net`
  - check in browser: Open https://anubet.com in a fresh profile → F12 → Network → filter 't.contentsquare.net' → it fires with no banner clicked

