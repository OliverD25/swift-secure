"""Rank audited casinos into a first-wave outreach list.

Reads the Phase A sweep (research/audit-sweep-battlefield.json) and joins it to
master-outreach-list.csv for brand, operator, licence and contact address.

Two outputs, on purpose:

  research/outreach-priority.csv        the full ranked list, machine-readable
  research/outreach-priority-verify.md  the top slice, written to be CHECKED BY
                                        HAND before anything is sent

The second file is the point. Every finding carries the exact URL and a
copy-paste command that reproduces it, because a priority list nobody has
verified is how this project has repeatedly shipped a confident wrong number.
Ranking on a measurement is not the same as trusting it.

Usage: python research/scripts/14-priority-list.py [top_n]
"""
import csv
import json
import pathlib
import sys
from collections import Counter, defaultdict

ROOT = pathlib.Path(__file__).resolve().parents[2]
SWEEP = ROOT / "research" / "audit-sweep-battlefield.json"
MASTER = ROOT / "research" / "master-outreach-list.csv"
OUT_CSV = ROOT / "research" / "outreach-priority.csv"
OUT_MD = ROOT / "research" / "outreach-priority-verify.md"

TOP_N = int(sys.argv[1]) if len(sys.argv) > 1 else 40

# ---------------------------------------------------------------- scoring
# Only signals that the sweep can UNDERSTATE are allowed to carry weight.
#
# The sweep runs six pages at once on one machine behind one IP. Under CPU
# contention a page may not finish inside the fixed 6-second settle wait, so
# requestCount and brokenRequests can come in LOW. transferKB sums content-length
# headers and counts a response without one as zero, so it is a floor. Every one
# of those errors points the same way: the real site is worse than we measured.
#
# That asymmetry is what makes these safe. A finding we understate is a finding
# the operator confirms and then finds more of. A finding we overstate is one
# they disprove in a minute, and we do not get a second email.
WEIGHTS = {
    "broken_own_host": 6,     # a genuine failure on a URL the casino itself serves
    "broken_third_party": 3,  # genuine, but the fix belongs to their platform vendor
    "broken_functional": 4,   # the failing path is an API/JS module, not a picture
    "broken_volume": 1,       # per failure beyond the first, capped
    "heavy_requests": 2,      # > 300 requests on the homepage
    "mixed_content": 2,       # http:// subresources on an https:// page
    "trackers_no_consent": 1, # measurement only, careful wording, low weight
}

BROKEN_CAP = 6

# Console errors are deliberately NOT scored.
#
# Reading the actual samples across the sweep, the most common entries are
# "Failed to load resource: the server responded with a status of 404" and
# "...403". Those are the same failures brokenReal already counts, arriving a
# second time through a different channel. Scoring both double-counts one
# problem and inflates every site that has it. The rest are third-party ad and
# analytics scripts throwing inside their own code, which the operator cannot
# fix and did not write. ERR_NAME_NOT_RESOLVED is worse than useless: it can be
# our own DNS.
#
# Console errors are still collected and still shown in the verify document as
# supporting context. They just do not move a casino up the list.

# A 4xx on these is a broken feature, not a missing decoration. Weighted far
# higher because "your bonus API returns 400" is a finding an operator acts on
# today, while "a sports icon 404s" is one they file and forget.
FUNCTIONAL_HINT = (
    "/api/", "/rpc/", "graphql", ".json", "/auth", "/user", "/session",
    "/wallet", "/payment", "/deposit", "/cashier", "/game", "/launch",
    "remoteentry.js", ".js?", "/bonus", "/promo", "/socket",
)
ASSET_EXT = (".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".woff", ".woff2", ".ttf", ".ico", ".css")


def classify_broken(url: str) -> str:
    low = url.lower()
    if any(h in low for h in FUNCTIONAL_HINT) and not low.endswith(ASSET_EXT):
        return "functional"
    if low.endswith(ASSET_EXT):
        return "asset"
    return "other"


def score(rec: dict) -> tuple[int, list[dict]]:
    """Return (score, findings). A finding carries everything needed to check it."""
    pts = 0
    found = []

    # brokenReal excludes 401/403/429/451 and bot-check hosts — refusals aimed
    # at our crawler, not the casino's breakage. Never score brokenRequests.
    broken = rec.get("brokenReal", 0) or 0
    own = rec.get("brokenOwnHost", 0) or 0
    third = rec.get("brokenThirdParty", 0) or 0
    samples = rec.get("brokenReal20") or rec.get("brokenSample", []) or []
    if broken:
        kinds = Counter()
        for s in samples:
            # sample entries are "STATUS URL"
            parts = s.split(" ", 1)
            if len(parts) == 2:
                kinds[classify_broken(parts[1])] += 1
        pts += WEIGHTS["broken_own_host"] if own else WEIGHTS["broken_third_party"]
        if kinds["functional"]:
            pts += WEIGHTS["broken_functional"]
        pts += min(broken - 1, BROKEN_CAP) * WEIGHTS["broken_volume"]

        where = (
            f"{own} on their own domain, {third} on a third-party host"
            if own and third else
            "all on their own domain" if own else
            "all on a third-party host — the fix belongs to their platform vendor"
        )
        found.append({
            "area": "broken",
            "headline": f"{broken} genuine request failure(s) on the homepage ({where})",
            "detail": " | ".join(samples[:3]),
            "kinds": dict(kinds),
            "refused": rec.get("brokenRefused", 0) or 0,
            "verify": f"curl -sI '{samples[0].split(' ', 1)[1]}' | head -1" if samples else "",
            "verify_ui": f"Open https://{rec['domain']} → F12 → Network → reload → sort by Status",
        })

    reqs = rec.get("requestCount", 0) or 0
    if reqs > 300:
        pts += WEIGHTS["heavy_requests"]
        found.append({
            "area": "weight",
            "headline": f"{reqs} requests and {rec.get('transferKB', 0)}KB to load the homepage",
            "detail": f"{rec.get('thirdPartyHosts', 0)} distinct third-party hosts",
            "kinds": {},
            "verify": "",
            "verify_ui": f"Open https://{rec['domain']} → F12 → Network → reload → request count in the status bar",
        })

    mixed = rec.get("mixedContent", 0) or 0
    if mixed:
        pts += WEIGHTS["mixed_content"]
        found.append({
            "area": "mixed",
            "headline": f"{mixed} subresource(s) requested over plain http:// on an https:// page",
            "detail": "Browsers block or warn on these",
            "kinds": {},
            "verify": "",
            "verify_ui": f"Open https://{rec['domain']} → F12 → Console → look for mixed-content warnings",
        })

    trackers = rec.get("trackersBeforeConsent", []) or []
    if trackers and not rec.get("hasConsentUI"):
        pts += WEIGHTS["trackers_no_consent"]
        found.append({
            "area": "consent",
            "headline": f"{len(trackers)} tracking host(s) contacted before any consent interaction",
            "detail": ", ".join(trackers[:5]),
            "kinds": {},
            "verify": "",
            "verify_ui": f"Open https://{rec['domain']} in a fresh profile → F12 → Network → filter '{trackers[0]}' → it fires with no banner clicked",
        })

    return pts, found


def main() -> None:
    if not SWEEP.exists():
        raise SystemExit(f"sweep not found: {SWEEP}\nRun crawler/audit-probe.mjs first.")

    sweep = {r["domain"]: r for r in json.loads(SWEEP.read_text(encoding="utf8"))}
    master = list(csv.DictReader(MASTER.open(encoding="utf8")))
    by_domain = {r["domain"].strip().lower(): r for r in master if r["domain"].strip()}

    # Records measured before the refusal fix landed carry brokenRequests but no
    # brokenReal. Scoring them would read that missing field as zero and quietly
    # drop every broken-request finding they have — the exact silent-corruption
    # shape this project keeps being bitten by. Name them instead, and write the
    # list out so they can be re-measured.
    stale = [d for d, r in sweep.items()
             if r.get("ok") and r.get("brokenRequests", 0) and "brokenReal" not in r]
    if stale:
        path = ROOT / "research" / "remeasure-targets.txt"
        path.write_text("\n".join(sorted(stale)) + "\n", encoding="utf8")

    rows = []
    for domain, rec in sweep.items():
        m = by_domain.get(domain, {})
        if "DO NOT EMAIL" in (m.get("flag") or ""):
            continue
        if not rec.get("ok"):
            continue
        if rec.get("brokenRequests", 0) and "brokenReal" not in rec:
            continue  # measured before the refusal fix; excluded until re-measured
        pts, findings = score(rec)
        if not pts:
            continue
        rows.append({
            "domain": domain,
            "score": pts,
            "findings": findings,
            "brand": m.get("brand", ""),
            "operator": m.get("operator", ""),
            "email": m.get("email", ""),
            "licence": m.get("licence", ""),
            "licence_status": m.get("licence_status", ""),
            "source": m.get("source", ""),
        })

    rows.sort(key=lambda r: (-r["score"], r["domain"]))

    # One company, one email. Curacao B2C licences cover a whole brand roster, so
    # the same operator legitimately appears under many domains. Contacting ten
    # of its brands separately reads as a mail-merge, which is the one thing this
    # outreach cannot look like.
    seen_op: dict[str, int] = defaultdict(int)
    for r in rows:
        op = (r["operator"] or "").strip().lower()
        r["operator_rank"] = seen_op[op] + 1 if op else 1
        if op:
            seen_op[op] += 1

    with OUT_CSV.open("w", encoding="utf8", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["rank", "domain", "score", "areas", "n_findings", "headline",
                    "brand", "operator", "operator_rank", "email", "has_email",
                    "licence", "licence_status", "source"])
        for i, r in enumerate(rows, 1):
            w.writerow([
                i, r["domain"], r["score"],
                "+".join(sorted({f["area"] for f in r["findings"]})),
                len(r["findings"]),
                r["findings"][0]["headline"] if r["findings"] else "",
                r["brand"], r["operator"], r["operator_rank"],
                r["email"], "yes" if r["email"].strip() else "no",
                r["licence"], r["licence_status"], r["source"],
            ])

    # --- the hand-check document ------------------------------------------
    first_wave = [r for r in rows if r["operator_rank"] == 1][:TOP_N]
    lines = [
        "# First-wave outreach — verify before sending",
        "",
        f"Ranked from {len(sweep)} audited domains; {len(rows)} produced at least one finding.",
        f"Showing the top {len(first_wave)} after keeping only one domain per operator.",
        "",
        "**Check these by hand.** Every line below is a measurement this project has",
        "been wrong about before. The `curl` command and the dev-tools path reproduce",
        "each finding directly — if one does not reproduce, the tool is wrong and the",
        "row must come off the list.",
        "",
        "A note on direction: the sweep runs six pages at once behind one IP, so a",
        "page that did not settle inside 6 seconds is counted LOW. Numbers here are a",
        "floor. Finding more by hand confirms the tool; finding fewer does not.",
        "",
    ]
    for i, r in enumerate(first_wave, 1):
        mail = r["email"].strip() or "**no address harvested**"
        lines += [
            f"## {i}. {r['domain']}  — score {r['score']}",
            "",
            f"- brand: {r['brand'] or '—'}   operator: {r['operator'] or '—'}",
            f"- contact: {mail}",
            f"- licence: {r['licence'] or '—'} ({r['licence_status'] or '—'}), source: {r['source']}",
            "",
        ]
        for f in r["findings"]:
            lines.append(f"**{f['area']}** — {f['headline']}")
            if f["detail"]:
                lines.append(f"  - detail: `{f['detail']}`")
            if f["kinds"]:
                lines.append(f"  - classified: {f['kinds']}")
            lines.append(f"  - check in browser: {f['verify_ui']}")
            if f["verify"]:
                lines.append(f"  - check from shell: `{f['verify']}`")
            lines.append("")
        lines.append("")

    OUT_MD.write_text("\n".join(lines), encoding="utf8")

    # --- console summary ---------------------------------------------------
    readable = sum(1 for r in sweep.values() if r.get("ok"))
    print(f"=== {len(sweep)} domains in the sweep, {readable} readable ===")
    if stale:
        print(f"!! {len(stale)} measured before the refusal fix and EXCLUDED.")
        print(f"   Re-measure them, then run this again:")
        print(f"   node crawler/audit-probe.mjs --from=research/remeasure-targets.txt --conc=6 --out=audit-sweep-battlefield.json")
        print()
    print(f"{len(rows)} have at least one finding")
    print(f"{sum(1 for r in rows if r['email'].strip())} of those have a contact address")
    print(f"{len([r for r in rows if r['operator_rank'] == 1])} remain after one-per-operator")
    print()
    area_freq = Counter(f["area"] for r in rows for f in r["findings"])
    print("findings by area:")
    for a, n in area_freq.most_common():
        print(f"  {a:<10} {n}")
    print()
    print(f"wrote {OUT_CSV.relative_to(ROOT)}")
    print(f"wrote {OUT_MD.relative_to(ROOT)}  <-- hand-check this before sending")


if __name__ == "__main__":
    main()
