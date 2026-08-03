"""Rank audited casinos into a first-wave outreach list.

Reads the Phase A sweep (research/audit-sweep-battlefield.json) and joins it to
master-outreach-list.csv for brand, operator, licence and contact address.

Three outputs:

  research/outreach-priority.csv        the full ranked pool, machine-readable
  research/outreach-priority-verify.md  the top slice, written to be CHECKED BY
                                        HAND before anything is sent
  research/outreach-harvest-queue.csv   ranked domains with NO address yet, so
                                        the contact harvest works best-first

The verify document is the point. Every finding carries the exact URL and a
copy-paste command that reproduces it, because a priority list nobody has
checked is how this project has repeatedly shipped a confident wrong number.
Ranking on a measurement is not the same as trusting it.

Usage: python research/scripts/14-priority-list.py [top_n]
"""
import csv
import json
import pathlib
import re
import sys
from collections import Counter, defaultdict

ROOT = pathlib.Path(__file__).resolve().parents[2]
SWEEP = ROOT / "research" / "audit-sweep-battlefield.json"
MASTER = ROOT / "research" / "master-outreach-list.csv"
OUT_CSV = ROOT / "research" / "outreach-priority.csv"
OUT_MD = ROOT / "research" / "outreach-priority-verify.md"
OUT_QUEUE = ROOT / "research" / "outreach-harvest-queue.csv"

TOP_N = int(sys.argv[1]) if len(sys.argv) > 1 else 40
MB = 1024  # transferKB and heaviestAssets[].kb are both in KB

# ---------------------------------------------------------------- what ranks
#
# ONE RULE DECIDES EVERYTHING HERE: a signal may rank only if the sweep cannot
# OVERSTATE it. An understated finding is one the operator confirms and then
# finds more of. An overstated one is disproved in a minute and there is no
# second email.
#
# That rule cost the first version of this file its headline signal. Page weight
# was scored and quoted as "at least 24.8MB", on the reasoning that summing
# content-length can only miss bytes, never invent them. Measured instead of
# reasoned, with CDP Network.dataReceived counting what actually crossed the
# wire against what the headers declared:
#
#   789bet.sc     declared 275.1MB   actually received  80.3MB
#   race365.com   declared  24.5MB   actually received  45.2MB
#
# It goes BOTH ways. 789bet.sc declares 275MB because its homepage requests a
# 261MB video, and a browser range-requests video rather than downloading it —
# so the total overstates by 3.4x. race365.com understates because compressed
# responses often carry no content-length at all. "At least 24.8MB" was simply
# not true, and it was the number this list sorted on.
#
# What survives is the single largest declared asset. It is one file, one URL,
# one `curl -sI` — race365.com's banner verified at exactly 11,662,770 bytes.
# The total is still printed as context and is never scored or quoted.

WEIGHTS = {
    "broken_own_host": 6,     # a genuine failure on a URL the casino itself serves
    "broken_third_party": 3,  # genuine, but the fix belongs to their platform vendor
    "broken_functional": 4,   # the failing path is an API or JS module, not a picture
    "broken_volume": 1,       # per failure beyond the first, capped at 6
    "asset_20mb": 8,          # one declared file over 20MB
    "asset_5mb": 6,           # one declared file over 5MB (not cumulative)
    "page_10mb": 2,           # total over 10MB — adds only, never selects
}
BROKEN_CAP = 6

# Requests to these hosts are dropped before anything is counted.
#
# A headless browser with no cookies and no consent state gets 400s and 404s from
# ad and analytics beacons as a matter of course. That is our shape, not the
# casino's defect, and on 15 of 150 remeasured sites with breakage EVERY genuine
# failure was on a host in this list.
TRACKER = re.compile(
    r"google-analytics|googletagmanager|doubleclick|facebook|fbevents|hotjar|"
    r"clarity\.ms|yandex|tiktok|snapchat|criteo|taboola|outbrain|mixpanel|"
    r"amplitude|segment|contentsquare|mouseflow|fullstory|smartlook|luckyorange|"
    r"tawk\.to|kumulos|stape\.io|matomo|adnxs|adsrvr|sentry\.io|"
    r"intercom|crisp\.chat|livechat|zendesk|onesignal|pushwoosh|braze|"
    r"appsflyer|branch\.io", re.I)

# A 4xx here is a broken feature, not a missing decoration. "Your bonus API
# returns 400" is acted on today; "a sports icon 404s" is filed and forgotten.
FUNC_HINT = ("/api/", "/rpc/", "graphql", "/auth", "/user", "/session", "/wallet",
             "/payment", "/deposit", "/cashier", "/game", "/launch", "remoteentry",
             "/bonus", "/promo", "/socket", "/lobby", "/sport")
ASSET_EXT = (".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".woff", ".woff2",
             ".ttf", ".ico", ".css", ".avif")

PARKED = re.compile(
    r"domain (name )?is (registered|for sale)|buy it now|parked|coming soon|"
    r"under construction|godaddy|namecheap|sedo|netim|afternic|dan\.com", re.I)

# A measurement worded perfectly still reads as a threat report when it lands in
# an abuse@ or legal@ queue.
HOSTILE_MAILBOX = re.compile(
    r"^(legal|abuse|privacy|complaints?|dpo|compliance|security|payments?)", re.I)
PLACEHOLDER_MAILBOX = re.compile(
    r"^(john_doe|jane_doe|example|your|you|name|email|user|test|noreply|no-reply|"
    r"donotreply|cola)$", re.I)


def stem(host: str) -> str:
    """First label of a hostname, letters only. '18379spinay.com' -> 'spinay'."""
    return re.sub(r"[^a-z]", "", host.lower().replace("www.", "").split(".")[0])


def host_of(url: str) -> str:
    m = re.match(r"https?://([^/:?#]+)", url or "")
    return m.group(1).lower() if m else ""


def parse_failures(rec: dict) -> list[dict]:
    """Quotable failures only: refusals already excluded upstream, trackers here.

    Own-host detection uses stem containment rather than the stored
    brokenOwnHost/brokenThirdParty counts. Those test endsWith(last two labels),
    which reads a numbered mirror as somebody else's server — 9winz.com fails on
    www.9winz019.com, and spinay.com on 18379spinay.com. Both are the casino's
    own infrastructure and both were being scored as a vendor's problem.
    """
    site = stem(rec["domain"])
    out = []
    for entry in rec.get("brokenReal20") or []:
        status, _, url = entry.partition(" ")
        if not url or TRACKER.search(url):
            continue
        h = host_of(url)
        path = url.split("?")[0].lower()
        out.append({
            "status": status,
            "url": url,
            "host": h,
            "own": bool(site) and (site in stem(h) or stem(h) in site),
            "func": any(k in url.lower() for k in FUNC_HINT) and not path.endswith(ASSET_EXT),
        })
    return out


def score(rec: dict) -> tuple[int, list[dict], list[dict]]:
    """Return (points, findings, quotable_failures). Zero points means not ranked."""
    pts = 0
    found = []
    q = parse_failures(rec)
    broken = rec.get("brokenReal", 0) or 0
    assets = rec.get("heaviestAssets") or []
    biggest = assets[0] if assets else None
    kb_total = rec.get("transferKB", 0) or 0

    own_q = sum(1 for f in q if f["own"])
    func_q = sum(1 for f in q if f["func"])

    # --- gates. Nothing else may select a domain. This is "never pad a report"
    # made mechanical: two missing provider logos is not worth an email.
    gate_broken = (broken >= 3 and len(q) >= 1) or (broken >= 2 and any(f["own"] and f["func"] for f in q))
    gate_asset = bool(biggest) and biggest["kb"] >= 5 * MB
    if not (gate_broken or gate_asset):
        return 0, [], q

    if gate_broken:
        pts += WEIGHTS["broken_own_host"] if own_q else WEIGHTS["broken_third_party"]
        if func_q:
            pts += WEIGHTS["broken_functional"]
        pts += min(broken - 1, BROKEN_CAP) * WEIGHTS["broken_volume"]
        where = (f"{own_q} on their own domain, {len(q) - own_q} on a third-party host"
                 if own_q and len(q) > own_q else
                 "on their own domain" if own_q else
                 "on a third-party host — the fix belongs to their platform vendor")
        first = q[0]
        found.append({
            "area": "broken",
            "emailable": True,
            "headline": f"{len(q)} request(s) fail on the homepage, {where}",
            "detail": " | ".join(f"{f['status']} {f['url']}" for f in q[:3]),
            "verify": f"curl -sI '{first['url']}' | head -1",
            "verify_ui": f"Open https://{rec['domain']} → F12 → Network → reload → sort by Status",
        })

    if gate_asset:
        pts += WEIGHTS["asset_20mb"] if biggest["kb"] >= 20 * MB else WEIGHTS["asset_5mb"]
        if kb_total >= 10 * MB:
            pts += WEIGHTS["page_10mb"]
        found.append({
            "area": "asset",
            "emailable": True,
            # One file, one URL, one check. Never the page total — that number
            # can overstate by 3.4x on a site that streams video.
            "headline": f"a single {biggest['kb'] / MB:.1f}MB {biggest['type']} file loads on the homepage",
            "detail": biggest["url"],
            "verify": f"curl -sI '{biggest['url']}' | grep -i content-length",
            "verify_ui": f"Open https://{rec['domain']} → F12 → Network → reload → sort by Size",
        })

    # Context only. Never scored, never quoted — see the comment above WEIGHTS.
    trackers = rec.get("trackersBeforeConsent") or []
    if trackers and not rec.get("hasConsentUI"):
        found.append({
            "area": "consent",
            "emailable": False,
            "headline": f"{len(trackers)} tracking host(s) contacted before any consent interaction",
            "detail": ", ".join(trackers[:5]),
            "verify": "",
            "verify_ui": f"Open https://{rec['domain']} in a fresh profile → F12 → Network → filter '{trackers[0]}'",
        })
    if kb_total:
        found.append({
            "area": "pageweight",
            "emailable": False,
            "headline": f"homepage declares {kb_total / MB:.1f}MB across {rec.get('requestCount', 0)} requests",
            "detail": "content-length sum — measured against the wire it was 3.4x high on 789bet.sc and 1.8x low on race365.com",
            "verify": "",
            "verify_ui": "",
        })
    return pts, found, q


def mailbox_problem(email: str, domain: str) -> str:
    """Reason this address must not be used, or '' if it is fine."""
    e = (email or "").strip().lower()
    if not e or "@" not in e:
        return "no address"
    local, _, host = e.partition("@")
    if HOSTILE_MAILBOX.match(local):
        return f"hostile inbox ({local}@) — a measurement reads as a threat report here"
    if PLACEHOLDER_MAILBOX.match(local):
        return f"placeholder address ({e})"
    # 13 of 132 addressed rows point at a different company: fatbets.com ->
    # support@gamdom.com, caposino.com -> support@mangodorado.com. These came
    # from affiliate-page scraping. Sending one casino's broken-module list to a
    # competitor's support desk is the most damaging first email available.
    if stem(host) not in stem(domain) and stem(domain) not in stem(host):
        return f"address is on a different company's domain ({host}) — confirm the pairing by hand first"
    return ""


def norm_operator(op: str) -> str:
    o = (op or "").lower()
    o = re.sub(r"\b(n\.?v\.?|b\.?v\.?|ltd|limited|srl|llc|inc|s\.?a\.?)\b", "", o)
    return re.sub(r"[^a-z0-9]", "", o)


def main() -> None:
    if not SWEEP.exists():
        raise SystemExit(f"sweep not found: {SWEEP}\nRun crawler/audit-probe.mjs first.")

    sweep = {r["domain"]: r for r in json.loads(SWEEP.read_text(encoding="utf8"))}
    master = list(csv.DictReader(MASTER.open(encoding="utf8")))
    by_domain = {r["domain"].strip().lower(): r for r in master if r["domain"].strip()}

    # Records measured before the refusal fix and the heaviest-asset capture read
    # their missing fields as zero, silently deleting every finding they have.
    # Name them and write the re-measure list rather than scoring them.
    stale = sorted({
        d for d, r in sweep.items()
        if r.get("ok") and (
            (r.get("brokenRequests", 0) and "brokenReal" not in r)
            or ((r.get("transferKB") or 0) >= 5 * MB and "heaviestAssets" not in r))
    })
    if stale:
        (ROOT / "research" / "remeasure-targets.txt").write_text("\n".join(stale) + "\n", encoding="utf8")
    stale_set = set(stale)

    rows, dropped = [], Counter()
    for domain, rec in sweep.items():
        m = by_domain.get(domain, {})
        flag = m.get("flag") or ""
        if "DO NOT EMAIL" in flag:
            dropped["revoked licence"] += 1
            continue
        if "verify this is really the casino" in flag or m.get("confidence") == "low":
            dropped["low-confidence redirect"] += 1
            continue
        if not rec.get("ok"):
            dropped["not readable (refused or failed — re-measure, do not rank)"] += 1
            continue
        if domain in stale_set:
            dropped["measured before a fix its finding depends on"] += 1
            continue
        # Parking pages, registrar stubs and geo interstitials measured as
        # homepages. jugabet.com.ec serves a Netim registrar page.
        if (rec.get("requestCount") or 0) < 15 or PARKED.search(rec.get("title") or ""):
            dropped["parking page or interstitial, not a casino homepage"] += 1
            continue

        pts, findings, q = score(rec)
        if not pts:
            continue
        email = (m.get("email") or "").strip()
        rows.append({
            "domain": domain, "score": pts, "findings": findings,
            "emailable": [f for f in findings if f["emailable"]],
            "brand": m.get("brand", ""), "operator": m.get("operator", ""),
            "email": email, "mail_problem": mailbox_problem(email, domain),
            "licence": m.get("licence", ""), "licence_status": m.get("licence_status", ""),
            "source": m.get("source", ""),
            "cluster": f"{(rec.get('brokenGroups') or [['', 0]])[0][0]}|{q[0]['host'] if q else ''}",
        })

    rows.sort(key=lambda r: (-r["score"], r["domain"]))

    # --- dedup, in order: one mailbox, one operator, at most 3 per vendor bug.
    # A Curacao B2C licence covers a whole brand roster, so one company
    # legitimately appears under many domains — ten separate emails read as a
    # mail-merge. The cluster cap exists because one wrong assumption about a
    # shared platform bug (the agstatic.com /paysystems/ cluster spans many
    # brands) would otherwise burn every one of them at once.
    seen_mail, seen_op, cluster_n = set(), set(), Counter()
    for r in rows:
        r["send"] = ""
        if not r["emailable"]:
            r["send"] = "no emailable finding"
            continue
        if r["mail_problem"]:
            r["send"] = r["mail_problem"]
            continue
        mail = r["email"].lower()
        op = norm_operator(r["operator"]) or stem(r["domain"])
        if mail in seen_mail:
            r["send"] = "duplicate mailbox"
        elif op in seen_op:
            r["send"] = f"same operator as an earlier row ({r['operator'] or 'blank — matched on brand stem'})"
        elif cluster_n[r["cluster"]] >= 3:
            r["send"] = "3 already queued with the same vendor-side failure"
        else:
            seen_mail.add(mail)
            seen_op.add(op)
            cluster_n[r["cluster"]] += 1
            r["send"] = "SEND"

    wave = [r for r in rows if r["send"] == "SEND"]
    queue = [r for r in rows if r["send"] == "no address" or r["mail_problem"] == "no address"]

    # --- outputs -----------------------------------------------------------
    with OUT_CSV.open("w", encoding="utf8", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["rank", "domain", "score", "send", "areas", "n_emailable", "headline",
                    "brand", "operator", "email", "mail_problem", "licence", "licence_status", "source"])
        for i, r in enumerate(rows, 1):
            w.writerow([i, r["domain"], r["score"], r["send"],
                        "+".join(sorted({f["area"] for f in r["emailable"]})),
                        len(r["emailable"]),
                        r["emailable"][0]["headline"] if r["emailable"] else "",
                        r["brand"], r["operator"], r["email"], r["mail_problem"],
                        r["licence"], r["licence_status"], r["source"]])

    with OUT_QUEUE.open("w", encoding="utf8", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["rank", "domain", "score", "headline", "brand", "operator", "source"])
        for i, r in enumerate(queue, 1):
            w.writerow([i, r["domain"], r["score"],
                        r["emailable"][0]["headline"] if r["emailable"] else "",
                        r["brand"], r["operator"], r["source"]])

    lines = [
        "# First wave — verify every line before sending",
        "",
        f"{len(sweep)} domains swept. {len(rows)} passed the finding gate. "
        f"{len(wave)} are sendable after mailbox, operator and vendor-cluster dedup.",
        "",
        "**Nothing here is trustworthy until it reproduces.** Each finding carries the",
        "exact URL, a `curl` line, and the dev-tools path. If one does not reproduce,",
        "the tool is wrong and the row comes off the list.",
        "",
        "Two numbers are shown but must NOT be written in an email, and are marked so:",
        "the consent measurement (taken from a Ukrainian IP, which says nothing about",
        "how the site treats an EU visitor) and the page-weight total (measured against",
        "the wire it ran 3.4x high on one site and 1.8x low on another).",
        "",
    ]
    for i, r in enumerate(wave[:TOP_N], 1):
        lines += [
            f"## {i}. {r['domain']} — score {r['score']}",
            "",
            f"- brand: {r['brand'] or '—'}   operator: {r['operator'] or '—'}",
            f"- send to: {r['email']}",
            f"- licence: {r['licence'] or '—'} ({r['licence_status'] or '—'}), source: {r['source']}",
            "",
        ]
        for f in r["findings"]:
            tag = "" if f["emailable"] else "  *(CONTEXT ONLY — must not appear in the email)*"
            lines.append(f"**{f['area']}** — {f['headline']}{tag}")
            if f["detail"]:
                lines.append(f"  - `{f['detail']}`")
            if f["verify_ui"]:
                lines.append(f"  - in a browser: {f['verify_ui']}")
            if f["verify"]:
                lines.append(f"  - from a shell: `{f['verify']}`")
            lines.append("")
        lines.append("")
    OUT_MD.write_text("\n".join(lines), encoding="utf8")

    # --- console -----------------------------------------------------------
    readable = sum(1 for r in sweep.values() if r.get("ok"))
    print(f"=== {len(sweep)} swept, {readable} readable ===")
    for reason, n in dropped.most_common():
        print(f"  dropped {n:>5}  {reason}")
    print(f"\n{len(rows)} passed the finding gate")
    print(f"{len(wave)} SENDABLE after dedup")
    print(f"{len(queue)} ranked but have no address — see outreach-harvest-queue.csv")
    blocked = Counter(r["send"] for r in rows if r["send"] not in ("SEND", ""))
    if blocked:
        print("\nheld back:")
        for reason, n in blocked.most_common(6):
            print(f"  {n:>5}  {reason}")
    print(f"\nwrote {OUT_CSV.name}, {OUT_MD.name}, {OUT_QUEUE.name}")


if __name__ == "__main__":
    main()
