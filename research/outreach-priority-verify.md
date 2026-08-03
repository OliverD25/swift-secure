# First wave — verify every line before sending

1311 domains swept. 102 passed the finding gate. 22 are sendable after mailbox, operator and vendor-cluster dedup.

**Nothing here is trustworthy until it reproduces.** Each finding carries the
exact URL, a `curl` line, and the dev-tools path. If one does not reproduce,
the tool is wrong and the row comes off the list.

Two numbers are shown but must NOT be written in an email, and are marked so:
the consent measurement (taken from a Ukrainian IP, which says nothing about
how the site treats an EU visitor) and the page-weight total (measured against
the wire it ran 3.4x high on one site and 1.8x low on another).

## 1. race365.com — score 17

- brand: Race365   operator: Superstars Entertainment B.V.
- send to: partner@race365.com
- licence: OGL/2024/1296/0547 (active), source: curacao

**broken** — 15 request(s) fail on the homepage, on a third-party host — the fix belongs to their platform vendor
  - `400 https://api.rcintl.io/account/v2/access-token | 404 https://cdn.rcintl.io/assets/desktop/en/home-section-2.json.gz?t=1785757212918 | 404 https://cdn.rcintl.io/assets/desktop/en/home-section-4.json.gz?t=1785757212918`
  - in a browser: Open https://race365.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://api.rcintl.io/account/v2/access-token' | head -1`

**asset** — a single 11.1MB image file loads on the homepage
  - `https://cdn.rcintl.io/ru/web/community-banner.webp`
  - in a browser: Open https://race365.com → F12 → Network → reload → sort by Size
  - from a shell: `curl -sI 'https://cdn.rcintl.io/ru/web/community-banner.webp' | grep -i content-length`

**consent** — 9 tracking host(s) contacted before any consent interaction  *(CONTEXT ONLY — must not appear in the email)*
  - `www.clarity.ms, connect.facebook.net, www.googletagmanager.com, scripts.clarity.ms, www.google-analytics.com`
  - in a browser: Open https://race365.com in a fresh profile → F12 → Network → filter 'www.clarity.ms'

**pageweight** — homepage declares 24.5MB across 290 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 2. casinonavy.com — score 16

- brand: Homepage   operator: JMS Investment Group N.V.
- send to: support@casinonavy.com
- licence: OGL/2024/675/0939 (active), source: curacao

**broken** — 8 request(s) fail on the homepage, 1 on their own domain, 7 on a third-party host
  - `500 https://api.casinonavy.com/api/v1/categories?skipEmpty=true | 500 https://api.casinonavy.com/api/v1/games/vendors | 500 https://api.casinonavy.com/api/v1/games?mobile=false&q=&limit=50&offset=0`
  - in a browser: Open https://casinonavy.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://api.casinonavy.com/api/v1/categories?skipEmpty=true' | head -1`

**pageweight** — homepage declares 2.9MB across 172 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 3. jon.bet — score 16

- brand: jon   operator: Ascend Entertainment N.V.
- send to: partners@jonbet.com
- licence: OGL/2024/1467/0728 (assessment in progress), source: curacao

**broken** — 20 request(s) fail on the homepage, on their own domain
  - `530 https://jonbet.com/api/users/self-limits/start-tracking-time | 530 https://jonbet.com/api/chat_rooms | 530 https://jonbet.com/api/feature-flag-group/users/has-access?name=SportsUsabilityTest1`
  - in a browser: Open https://jon.bet → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://jonbet.com/api/users/self-limits/start-tracking-time' | head -1`

**pageweight** — homepage declares 2.2MB across 144 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 4. winup.io — score 16

- brand: Winup   operator: 3-102-952740 SRL
- send to: support@winup.io
- licence: ALSI-202601062-FI2 (—), source: anjouan

**broken** — 20 request(s) fail on the homepage, 5 on their own domain, 15 on a third-party host
  - `400 https://winup.io/api/v1/bonuses?lang=en&type=promo | 404 https://winup.io/api/v1/reports?report=v2/Reports/LastBets&lang=en&minBet=0&quantity=10 | 400 https://winup.io/api/v1/publicSocketsData?lang=en`
  - in a browser: Open https://winup.io → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://winup.io/api/v1/bonuses?lang=en&type=promo' | head -1`

**consent** — 2 tracking host(s) contacted before any consent interaction  *(CONTEXT ONLY — must not appear in the email)*
  - `www.googletagmanager.com, www.google-analytics.com`
  - in a browser: Open https://winup.io in a fresh profile → F12 → Network → filter 'www.googletagmanager.com'

**pageweight** — homepage declares 2.2MB across 205 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 5. 9winz.com — score 12

- brand: winz   operator: Globis N.V.
- send to: aff@9winz.com
- licence: OGL/2024/1194/0723 (active), source: curacao

**broken** — 12 request(s) fail on the homepage, on their own domain
  - `404 https://www.9winz019.com/widgets-x/icons/casino/colored/play.svg?v=1785752878 | 404 https://www.9winz019.com/widgets-x/icons/casino/colored/play.svg?v=1785752878 | 404 https://www.9winz019.com/widgets-x/icons/casino/colored/play.svg?v=1785752878`
  - in a browser: Open https://9winz.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://www.9winz019.com/widgets-x/icons/casino/colored/play.svg?v=1785752878' | head -1`

**consent** — 10 tracking host(s) contacted before any consent interaction  *(CONTEXT ONLY — must not appear in the email)*
  - `www.googletagmanager.com, www.google-analytics.com, static.hotjar.com, pubads.g.doubleclick.uk.net, script.hotjar.com`
  - in a browser: Open https://9winz.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com'

**pageweight** — homepage declares 5.3MB across 637 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 6. betitor.com — score 12

- brand: Betitor   operator: 3-102-941073 SRL
- send to: support@betitor.com
- licence: ALSI-202509018-FI1 (—), source: anjouan

**broken** — 7 request(s) fail on the homepage, 6 on their own domain, 1 on a third-party host
  - `404 https://betitor.com/content/wp-content/uploads/2026/07/Keno-315x236-1.webp | 404 https://betitor.com/content/wp-content/uploads/2026/07/Dice-315x236-1.webp | 404 https://betitor.com/content/wp-content/uploads/2026/07/Mines-315x236-1.webp`
  - in a browser: Open https://betitor.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://betitor.com/content/wp-content/uploads/2026/07/Keno-315x236-1.webp' | head -1`

**consent** — 2 tracking host(s) contacted before any consent interaction  *(CONTEXT ONLY — must not appear in the email)*
  - `www.googletagmanager.com, www.google-analytics.com`
  - in a browser: Open https://betitor.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com'

**pageweight** — homepage declares 3.9MB across 228 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 7. keeponwin.com — score 12

- brand: Keep On Win   operator: Keep On Entertainment N.V.
- send to: support@keeponwin.com
- licence: OGL/2024/2279/1202 (active), source: curacao

**broken** — 7 request(s) fail on the homepage, on their own domain
  - `404 https://www.keeponwin.com/%3Chttps://app.hoory.com%3E/packs/js/sdk.js | 404 https://www.keeponwin.com/widgets-x/icons/casino/colored/other.svg?v=1785752878 | 404 https://www.keeponwin.com/widgets-x/icons/casino/colored/other.svg?v=1785752878`
  - in a browser: Open https://keeponwin.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://www.keeponwin.com/%3Chttps://app.hoory.com%3E/packs/js/sdk.js' | head -1`

**pageweight** — homepage declares 7.1MB across 441 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 8. nicewinz.com — score 12

- brand: NiceWin   operator: Glory Multimedia B.V.
- send to: info@nicewinz.com
- licence: OGL/2024/1600/0861 (assessment in progress), source: curacao

**broken** — 20 request(s) fail on the homepage, on their own domain
  - `404 https://www.nicewinz.com/x-data/icons/sports/colored/russianpyramid.svg?v=1785339548 | 404 https://www.nicewinz.com/x-data/icons/casino/colored/play.svg?v=1785339548 | 404 https://www.nicewinz.com/x-data/icons/casino/colored/play.svg?v=1785339548`
  - in a browser: Open https://nicewinz.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://www.nicewinz.com/x-data/icons/sports/colored/russianpyramid.svg?v=1785339548' | head -1`

**pageweight** — homepage declares 14.1MB across 645 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 9. spinay.com — score 12

- brand: Spinay   operator: Oranox Ltd
- send to: support@spinay.com
- licence: ALSI-202601012-FI1 (—), source: anjouan

**broken** — 8 request(s) fail on the homepage, on their own domain
  - `404 https://18379spinay.com/mdlr/fonts/raleway-semibold.woff2 | 404 https://18379spinay.com/mdlr/fonts/bitter-regular.woff2 | 404 https://18379spinay.com/mdlr/fonts/fira-sans-condensed-semibold.woff2`
  - in a browser: Open https://spinay.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://18379spinay.com/mdlr/fonts/raleway-semibold.woff2' | head -1`

**pageweight** — homepage declares 0.2MB across 245 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 10. petra.bet — score 11

- brand: petra   operator: Trickless N.V
- send to: marketing@petra.bet
- licence: OGL/2024/139/0125 (assessment in progress), source: curacao

**broken** — 2 request(s) fail on the homepage, on their own domain
  - `404 https://petra.bet/api/_nuxt_icon/ph.json?icons=instagram-logo-duotone | 404 https://petra.bet/api/_nuxt_icon/lucide.json?icons=arrow-up-right`
  - in a browser: Open https://petra.bet → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://petra.bet/api/_nuxt_icon/ph.json?icons=instagram-logo-duotone' | head -1`

**consent** — 5 tracking host(s) contacted before any consent interaction  *(CONTEXT ONLY — must not appear in the email)*
  - `connect.facebook.net, www.googletagmanager.com, www.google-analytics.com, stats.g.doubleclick.net, www.facebook.com`
  - in a browser: Open https://petra.bet in a fresh profile → F12 → Network → filter 'connect.facebook.net'

**pageweight** — homepage declares 7.3MB across 274 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 11. beastone.co — score 10

- brand: Beastone   operator: Beastone N.V.
- send to: general@beastone.co
- licence: OGL/2024/390/0122 (assessment in progress), source: curacao

**asset** — a single 24.4MB media file loads on the homepage
  - `https://beastone.co/_astro/welcome2.DRkjFzaV.mov`
  - in a browser: Open https://beastone.co → F12 → Network → reload → sort by Size
  - from a shell: `curl -sI 'https://beastone.co/_astro/welcome2.DRkjFzaV.mov' | grep -i content-length`

**pageweight** — homepage declares 34.2MB across 29 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 12. riskiiit.com — score 10

- brand: riskiiit   operator: Overcooked Entertainment Ltd.
- send to: support@riskiiit.com
- licence: ALSI-202511044-FI2 (—), source: anjouan

**asset** — a single 39.3MB media file loads on the homepage
  - `https://riskiiit.com/sounds/riskItForTheBiscuit.wav`
  - in a browser: Open https://riskiiit.com → F12 → Network → reload → sort by Size
  - from a shell: `curl -sI 'https://riskiiit.com/sounds/riskItForTheBiscuit.wav' | grep -i content-length`

**pageweight** — homepage declares 54.5MB across 78 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 13. thestakehouse.io — score 10

- brand: The Stake House   operator: The Stake House Affiliates
- send to: partners@thestakehouse.io
- licence: — (—), source: cryptolists

**asset** — a single 23.7MB image file loads on the homepage
  - `https://a.storyblok.com/f/291681349697900/24816969/480ababaae/promotions.svg`
  - in a browser: Open https://thestakehouse.io → F12 → Network → reload → sort by Size
  - from a shell: `curl -sI 'https://a.storyblok.com/f/291681349697900/24816969/480ababaae/promotions.svg' | grep -i content-length`

**pageweight** — homepage declares 56.5MB across 235 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 14. abcfortunazone.com — score 9

- brand: Fortunazone Slots   operator: Altan N.V.
- send to: support@fortunazone.com
- licence: OGL/2024/596/0252 (active), source: curacao

**broken** — 20 request(s) fail on the homepage, on a third-party host — the fix belongs to their platform vendor
  - `404 https://agstatic.com/wlc/icons/theme-wolf/categories/gameshows.svg | 404 https://agstatic.com/wlc/icons/theme-wolf/categories/native.svg | 404 https://agstatic.com/merchants/svg/black/adlunam.svg`
  - in a browser: Open https://abcfortunazone.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://agstatic.com/wlc/icons/theme-wolf/categories/gameshows.svg' | head -1`

**consent** — 8 tracking host(s) contacted before any consent interaction  *(CONTEXT ONLY — must not appear in the email)*
  - `www.googletagmanager.com, www.clarity.ms, mc.yandex.ru, www.google-analytics.com, scripts.clarity.ms`
  - in a browser: Open https://abcfortunazone.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com'

**pageweight** — homepage declares 6.8MB across 376 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 15. atlantivegas.com — score 9

- brand: Atlantivegas   operator: SG International N.V.
- send to: support@atlantivegassupport.com
- licence: OGL/2024/379/0174 (assessment in progress), source: curacao

**broken** — 17 request(s) fail on the homepage, on a third-party host — the fix belongs to their platform vendor
  - `404 https://agstatic.com/wlc/icons/category/topgames.svg | 404 https://agstatic.com/wlc/icons/category/topgames.svg | 404 https://agstatic.com/paysystems/V2/svg/color/dark/macpay_pixpay.svg`
  - in a browser: Open https://atlantivegas.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://agstatic.com/wlc/icons/category/topgames.svg' | head -1`

**consent** — 4 tracking host(s) contacted before any consent interaction  *(CONTEXT ONLY — must not appear in the email)*
  - `www.googletagmanager.com, connect.facebook.net, www.google-analytics.com, www.facebook.com`
  - in a browser: Open https://atlantivegas.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com'

**pageweight** — homepage declares 6.7MB across 360 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 16. bettogames.com — score 9

- brand: Bettogames   operator: 3-102-954365 SRL
- send to: support@bettogames.com
- licence: ALSI-202603002-FI1 (—), source: anjouan

**broken** — 20 request(s) fail on the homepage, on a third-party host — the fix belongs to their platform vendor
  - `404 https://agstatic.com/paysystems/V2/svg/black/vasu_vnd_momo.svg | 404 https://agstatic.com/paysystems/V2/svg/black/vasu_vnd_viettel.svg | 404 https://agstatic.com/paysystems/V2/svg/black/vasu_vnd_banktransfer.svg`
  - in a browser: Open https://bettogames.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://agstatic.com/paysystems/V2/svg/black/vasu_vnd_momo.svg' | head -1`

**pageweight** — homepage declares 1.8MB across 258 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 17. casinityx.com — score 9

- brand: casinityx   operator: 3-102-942477 SRL
- send to: support@casinityx.com
- licence: ALSI-202509036-FI1 (—), source: anjouan

**broken** — 8 request(s) fail on the homepage, on a third-party host — the fix belongs to their platform vendor
  - `404 https://agstatic.com/paysystems/V2/svg/black/betterbro_pse.svg | 404 https://agstatic.com/paysystems/V2/svg/black/betterbro_pse_payout.svg | 404 https://agstatic.com/paysystems/V2/svg/black/betterbro_bre_b_llave_qr_payout.svg`
  - in a browser: Open https://casinityx.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://agstatic.com/paysystems/V2/svg/black/betterbro_pse.svg' | head -1`

**pageweight** — homepage declares 4.8MB across 241 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 18. mollydice.com — score 9

- brand: Mollydice   operator: Satoshi Labs Ltd
- send to: support@mollydice.com
- licence: ALSI-202605020-FI1 (—), source: anjouan

**broken** — 13 request(s) fail on the homepage, on a third-party host — the fix belongs to their platform vendor
  - `404 https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2499626385199476766.png | 404 https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/1093393.png | 404 https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/396548.png`
  - in a browser: Open https://mollydice.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2499626385199476766.png' | head -1`

**consent** — 2 tracking host(s) contacted before any consent interaction  *(CONTEXT ONLY — must not appear in the email)*
  - `www.googletagmanager.com, stats.g.doubleclick.net`
  - in a browser: Open https://mollydice.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com'

**pageweight** — homepage declares 3.3MB across 242 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 19. pro11casino.com — score 9

- brand: Pro11casino   operator: 3-102-947393 SRL
- send to: support@pro11casino.com
- licence: ALSI-202511030-FI2 (—), source: anjouan

**broken** — 12 request(s) fail on the homepage, on a third-party host — the fix belongs to their platform vendor
  - `404 https://agstatic.com/merchants/svg/black/sneaky_slots.svg | 404 https://agstatic.com/merchants/svg/black/gclub.svg | 404 https://agstatic.com/merchants/svg/black/aviatrixdirect.svg`
  - in a browser: Open https://pro11casino.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://agstatic.com/merchants/svg/black/sneaky_slots.svg' | head -1`

**pageweight** — homepage declares 4.1MB across 349 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 20. batcasino.bet — score 8

- brand: Batcasino   operator: 3-102-953033 SRL
- send to: support@batcasino.bet
- licence: ALSI-202602037-FI2 (—), source: anjouan

**broken** — 6 request(s) fail on the homepage, on a third-party host — the fix belongs to their platform vendor
  - `404 https://agstatic.com/merchants/svg/black/gclub.svg | 404 https://agstatic.com/merchants/svg/black/aviatrixdirect.svg | 404 https://agstatic.com/merchants/svg/black/xpg.svg`
  - in a browser: Open https://batcasino.bet → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://agstatic.com/merchants/svg/black/gclub.svg' | head -1`

**consent** — 2 tracking host(s) contacted before any consent interaction  *(CONTEXT ONLY — must not appear in the email)*
  - `www.googletagmanager.com, www.google-analytics.com`
  - in a browser: Open https://batcasino.bet in a fresh profile → F12 → Network → filter 'www.googletagmanager.com'

**pageweight** — homepage declares 8.1MB across 373 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 21. bonkersbet.com — score 8

- brand: BonkersBet.com   operator: Velorum Corporation N.V.
- send to: support@bonkersbet.com
- licence: OGL/2024/1384/0627 (active), source: curacao

**broken** — 3 request(s) fail on the homepage, on their own domain
  - `404 https://bonkersbet.com/api-crm-sessiontracker/device | 404 https://bonkersbet.com/api/cms/file/binary/21/fileName/slots-my-right.png | 404 https://bonkersbet.com/api/cms/file/binary/21/fileName/slots-my-left.png`
  - in a browser: Open https://bonkersbet.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://bonkersbet.com/api-crm-sessiontracker/device' | head -1`

**pageweight** — homepage declares 2.4MB across 88 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 22. oxy.casino — score 8

- brand: OXY   operator: Spiritus Limited
- send to: support@oxy.casino
- licence: ALSI-202603056-FI2 (—), source: anjouan

**asset** — a single 7.3MB image file loads on the homepage
  - `https://oxy.casino/static/09628223-7334-41bd-87f1-f4ed9fd577fb/dd4e35782887b18d4345a98d8c266665.svg`
  - in a browser: Open https://oxy.casino → F12 → Network → reload → sort by Size
  - from a shell: `curl -sI 'https://oxy.casino/static/09628223-7334-41bd-87f1-f4ed9fd577fb/dd4e35782887b18d4345a98d8c266665.svg' | grep -i content-length`

**consent** — 1 tracking host(s) contacted before any consent interaction  *(CONTEXT ONLY — must not appear in the email)*
  - `connect.facebook.net`
  - in a browser: Open https://oxy.casino in a fresh profile → F12 → Network → filter 'connect.facebook.net'

**pageweight** — homepage declares 13.0MB across 212 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`

