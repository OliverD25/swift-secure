# First wave — verify every line before sending

1311 domains swept. 102 passed the finding gate. 12 are sendable after mailbox, operator and vendor-cluster dedup.

**Nothing here is trustworthy until it reproduces.** Each finding carries the
exact URL, a `curl` line, and the dev-tools path. If one does not reproduce,
the tool is wrong and the row comes off the list.

Two numbers are shown but must NOT be written in an email, and are marked so:
the consent measurement (taken from a Ukrainian IP, which says nothing about
how the site treats an EU visitor) and the page-weight total (measured against
the wire it ran 3.4x high on one site and 1.8x low on another).

## 1. winup.io — score 16

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


## 2. spinay.com — score 12

- brand: Spinay   operator: Oranox Ltd
- send to: support@spinay.com
- licence: ALSI-202601012-FI1 (—), source: anjouan

**broken** — 8 request(s) fail on the homepage, on their own domain
  - `404 https://18379spinay.com/mdlr/fonts/raleway-semibold.woff2 | 404 https://18379spinay.com/mdlr/fonts/bitter-regular.woff2 | 404 https://18379spinay.com/mdlr/fonts/fira-sans-condensed-semibold.woff2`
  - in a browser: Open https://spinay.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://18379spinay.com/mdlr/fonts/raleway-semibold.woff2' | head -1`

**pageweight** — homepage declares 0.2MB across 245 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 3. riskiiit.com — score 10

- brand: riskiiit   operator: Overcooked Entertainment Ltd.
- send to: support@riskiiit.com
- licence: ALSI-202511044-FI2 (—), source: anjouan

**asset** — a single 39.3MB media file loads on the homepage
  - `https://riskiiit.com/sounds/riskItForTheBiscuit.wav`
  - in a browser: Open https://riskiiit.com → F12 → Network → reload → sort by Size
  - from a shell: `curl -sI 'https://riskiiit.com/sounds/riskItForTheBiscuit.wav' | grep -i content-length`

**pageweight** — homepage declares 54.5MB across 78 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 4. bettogames.com — score 9

- brand: Bettogames   operator: 3-102-954365 SRL
- send to: support@bettogames.com
- licence: ALSI-202603002-FI1 (—), source: anjouan

**broken** — 20 request(s) fail on the homepage, on a third-party host — the fix belongs to their platform vendor
  - `404 https://agstatic.com/paysystems/V2/svg/black/vasu_vnd_momo.svg | 404 https://agstatic.com/paysystems/V2/svg/black/vasu_vnd_viettel.svg | 404 https://agstatic.com/paysystems/V2/svg/black/vasu_vnd_banktransfer.svg`
  - in a browser: Open https://bettogames.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://agstatic.com/paysystems/V2/svg/black/vasu_vnd_momo.svg' | head -1`

**pageweight** — homepage declares 1.8MB across 258 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 5. casinityx.com — score 9

- brand: casinityx   operator: 3-102-942477 SRL
- send to: support@casinityx.com
- licence: ALSI-202509036-FI1 (—), source: anjouan

**broken** — 8 request(s) fail on the homepage, on a third-party host — the fix belongs to their platform vendor
  - `404 https://agstatic.com/paysystems/V2/svg/black/betterbro_pse.svg | 404 https://agstatic.com/paysystems/V2/svg/black/betterbro_pse_payout.svg | 404 https://agstatic.com/paysystems/V2/svg/black/betterbro_bre_b_llave_qr_payout.svg`
  - in a browser: Open https://casinityx.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://agstatic.com/paysystems/V2/svg/black/betterbro_pse.svg' | head -1`

**pageweight** — homepage declares 4.8MB across 241 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 6. gamealotroyale.com — score 9

- brand: Gamealotroyale   operator: 3-102-954988 SRL
- send to: support@gamealotroyale.com
- licence: ALSI-202602051-FI2 (—), source: anjouan

**broken** — 20 request(s) fail on the homepage, on a third-party host — the fix belongs to their platform vendor
  - `404 https://agstatic.com/wlc/icons/european/v3/top10.svg | 404 https://agstatic.com/wlc/icons/european/v3/top10.svg | 404 https://agstatic.com/merchants/svg/black/gclub.svg`
  - in a browser: Open https://gamealotroyale.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://agstatic.com/wlc/icons/european/v3/top10.svg' | head -1`

**consent** — 2 tracking host(s) contacted before any consent interaction  *(CONTEXT ONLY — must not appear in the email)*
  - `www.googletagmanager.com, www.google-analytics.com`
  - in a browser: Open https://gamealotroyale.com in a fresh profile → F12 → Network → filter 'www.googletagmanager.com'

**pageweight** — homepage declares 11.2MB across 474 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 7. mollydice.com — score 9

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


## 8. pro11casino.com — score 9

- brand: Pro11casino   operator: 3-102-947393 SRL
- send to: support@pro11casino.com
- licence: ALSI-202511030-FI2 (—), source: anjouan

**broken** — 12 request(s) fail on the homepage, on a third-party host — the fix belongs to their platform vendor
  - `404 https://agstatic.com/merchants/svg/black/sneaky_slots.svg | 404 https://agstatic.com/merchants/svg/black/gclub.svg | 404 https://agstatic.com/merchants/svg/black/aviatrixdirect.svg`
  - in a browser: Open https://pro11casino.com → F12 → Network → reload → sort by Status
  - from a shell: `curl -sI 'https://agstatic.com/merchants/svg/black/sneaky_slots.svg' | head -1`

**pageweight** — homepage declares 4.1MB across 349 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 9. batcasino.bet — score 8

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


## 10. drazze.casino — score 8

- brand: Drazze   operator: Drazze Limited
- send to: partners@drazze.casino
- licence: ALSI-202512040-FI1 (—), source: anjouan

**asset** — a single 9.2MB media file loads on the homepage
  - `https://drazze.casino/storage/banners/6005a827-9786-4be0-892d-fb2d48c73c20.mp4`
  - in a browser: Open https://drazze.casino → F12 → Network → reload → sort by Size
  - from a shell: `curl -sI 'https://drazze.casino/storage/banners/6005a827-9786-4be0-892d-fb2d48c73c20.mp4' | grep -i content-length`

**pageweight** — homepage declares 37.7MB across 178 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`


## 11. oxy.casino — score 8

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


## 12. partybet.ai — score 8

- brand: PartyBet   operator: On Read SRL
- send to: support@partybet.fun
- licence: ALSI-202508060-FI2 (—), source: anjouan

**asset** — a single 19.9MB media file loads on the homepage
  - `https://partybet.bot/assets/partybet-video.mp4`
  - in a browser: Open https://partybet.ai → F12 → Network → reload → sort by Size
  - from a shell: `curl -sI 'https://partybet.bot/assets/partybet-video.mp4' | grep -i content-length`

**pageweight** — homepage declares 23.4MB across 48 requests  *(CONTEXT ONLY — must not appear in the email)*
  - `content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com`

