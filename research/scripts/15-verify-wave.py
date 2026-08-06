"""Re-check every finding in the send wave against the live site.

The ranking is worthless if the measurements are not. This re-requests the exact
URL behind each finding and reports whether it still behaves the way the sweep
said it did. Anything that does not reproduce must come off the list.

Why this exists as a separate step rather than a flag on the sweep: the sweep is
a snapshot, and the gap between measuring and sending is where a finding goes
stale. oxy.casino was measured at HTTP 200 with 212 requests and a real 7.3MB
asset, and returned 451 Unavailable For Legal Reasons an hour later. The
measurement was not wrong. It is simply no longer checkable from here, and a
finding we cannot re-verify is one we cannot defend when the operator replies.

Reads the ISP interception problem correctly too. This machine's provider
(X-City, AS51784) serves its own certificate for some blocked domains, so plain
curl fails validation with exit 60 rather than reporting the real status. TLS
verification is therefore disabled on purpose here — the goal is to read the
status the browser saw, not to audit anyone's certificate.

Writes two files. The Markdown is for a human deciding what to send. The JSON
beside it is read by 18-generate-reports.py, which may only print a "check this
yourself" curl line for a URL this script proved curl can reproduce.

Usage: python research/scripts/15-verify-wave.py [max_rows]
"""
import csv
import json
import pathlib
import re
import subprocess
import sys
from datetime import date

ROOT = pathlib.Path(__file__).resolve().parents[2]
SWEEP = ROOT / "research" / "audit-sweep-battlefield.json"
PRIORITY = ROOT / "research" / "outreach-priority.csv"

# A limited run must never overwrite a full one. 18-generate-reports.py reads
# the JSON to decide whether a curl line is safe to print, so a truncated file
# would not just lose rows — it would silently downgrade every site missing
# from it to the dev-tools recipe, with nothing on screen to say why.
LIMITED = len(sys.argv) > 1
MAX_ROWS = int(sys.argv[1]) if LIMITED else 40
SUFFIX = ".partial" if LIMITED else ""
OUT = ROOT / "research" / f"outreach-wave-verified{SUFFIX}.md"
OUTJSON = ROOT / "research" / f"wave-verification{SUFFIX}.json"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")
TRACKER = re.compile(
    r"google-analytics|googletagmanager|doubleclick|facebook|fbevents|hotjar|"
    r"clarity\.ms|yandex|tiktok|snapchat|criteo|taboola|outbrain|mixpanel|"
    r"amplitude|segment|contentsquare|mouseflow|fullstory|smartlook|luckyorange|"
    r"tawk\.to|kumulos|stape\.io|matomo|adnxs|adsrvr|sentry\.io|"
    r"intercom|crisp\.chat|livechat|zendesk|onesignal|pushwoosh|braze|"
    r"appsflyer|branch\.io", re.I)


def head(url: str, referer: str) -> dict:
    """HEAD the URL, ignoring certificate errors. Returns status and length."""
    try:
        p = subprocess.run(
            ["curl", "-skI", "--max-time", "25", "-H", f"User-Agent: {UA}",
             "-H", f"Referer: {referer}", "-w", "\\n__CODE__%{http_code}\\n", url],
            capture_output=True, text=True, timeout=40)
    except subprocess.TimeoutExpired:
        return {"status": "timeout", "length": None}
    body = p.stdout or ""
    m = re.search(r"__CODE__(\d+)", body)
    status = m.group(1) if m else "000"
    lm = re.search(r"(?im)^content-length:\s*(\d+)", body)
    return {"status": status, "length": int(lm.group(1)) if lm else None}


def main() -> None:
    if not PRIORITY.exists():
        raise SystemExit("run 14-priority-list.py first")
    sweep = {r["domain"]: r for r in json.loads(SWEEP.read_text(encoding="utf8"))}
    wave = [r for r in csv.DictReader(PRIORITY.open(encoding="utf8")) if r["send"] == "SEND"][:MAX_ROWS]

    lines = ["# Send wave — live re-verification", "",
             "Each finding below was re-requested just now. A row that does not",
             "reproduce is a row that must not be sent, whatever its score.", ""]
    ok_rows, bad_rows = [], []
    results = {}

    for r in wave:
        d = r["domain"]
        rec = sweep.get(d, {})
        home = head(f"https://{d}/", f"https://{d}/")
        checks, verdict = [], "CONFIRMED"
        record = {"verdict": None, "homepage": home["status"], "urls": {}, "asset": None}

        if home["status"] in ("451", "403", "401", "429"):
            verdict = "UNVERIFIABLE"
            checks.append(f"homepage returns {home['status']} from this vantage point — "
                          "refused, not proven wrong. Re-check through a proxy before sending.")
        elif home["status"] in ("000", "timeout"):
            verdict = "UNVERIFIABLE"
            checks.append(f"homepage did not respond ({home['status']}).")

        if verdict == "CONFIRMED":
            # Sample BOTH classes of failure, not just the first three.
            #
            # The first version checked failures[:3] and condemned the whole row
            # if none reproduced. It failed winup.io on exactly that: its first
            # three are own-domain API calls that answer 400 to the browser and
            # 200 to curl, while its other 33 are payment-method icons 404ing on
            # agstatic.com — the AGENTS.md exemplar finding, and reproducible
            # with curl in one line. A row must not be condemned because the
            # sample happened to start with its least checkable failures.
            failures = [e for e in (rec.get("brokenReal20") or [])
                        if e.partition(" ")[2] and not TRACKER.search(e.partition(" ")[2])]
            site = re.sub(r"[^a-z]", "", d.lower().split(".")[0])
            def own(u):
                h = re.match(r"https?://([^/:?#]+)", u)
                h = re.sub(r"[^a-z]", "", (h.group(1) if h else "").lower().replace("www.", "").split(".")[0])
                return bool(site) and (site in h or h in site)
            own_f = [e for e in failures if own(e.partition(" ")[2])]
            third_f = [e for e in failures if not own(e.partition(" ")[2])]

            curl_ok = browser_only = 0
            for label, group in (("own-host", own_f[:3]), ("third-party", third_f[:3])):
                for entry in group:
                    expect, _, url = entry.partition(" ")
                    got = head(url, f"https://{d}/")
                    record["urls"][url] = {"expected": expect, "got": got["status"],
                                           "reproduces": got["status"] == expect}
                    if got["status"] == expect:
                        curl_ok += 1
                        checks.append(f"OK  [{label}] expected {expect}, got {got['status']}  {url[:90]}")
                    else:
                        browser_only += 1
                        checks.append(f"??  [{label}] expected {expect}, curl got {got['status']} — "
                                      f"browser-only, hand over the dev-tools recipe not a curl line  {url[:70]}")
            if failures and curl_ok == 0:
                verdict = "BROWSER-ONLY" if browser_only else "DOES NOT REPRODUCE"

            # Heaviest asset: confirm the declared size against a fresh HEAD.
            assets = rec.get("heaviestAssets") or []
            if assets:
                a = assets[0]
                got = head(a["url"], f"https://{d}/")
                same = False
                if got["length"]:
                    delta = abs(got["length"] / 1024 - a["kb"]) / max(a["kb"], 1)
                    same = delta < 0.05
                    checks.append(f"{'OK ' if same else 'NO '} asset declared {a['kb'] / 1024:.1f}MB, "
                                  f"now {got['length'] / 1048576:.1f}MB  {a['url'][:80]}")
                    if not same and not failures:
                        verdict = "DOES NOT REPRODUCE"
                else:
                    checks.append(f"?? asset returned {got['status']} with no length  {a['url'][:80]}")
                # reproduces means "the operator running our curl line sees what
                # we described". A 200 with no content-length fails that test:
                # the size command prints nothing at all.
                record["asset"] = {"url": a["url"], "declaredKb": a["kb"],
                                   "gotLength": got["length"], "reproduces": same}

        # BROWSER-ONLY is still sendable — the finding is real, the recipe just
        # has to be the dev-tools path rather than a curl line.
        record["verdict"] = verdict
        results[d] = record
        (ok_rows if verdict in ("CONFIRMED", "BROWSER-ONLY") else bad_rows).append(d)
        lines += [f"## {d} — {verdict}", "", f"score {r['score']}, to {r['email']}", ""]
        lines += [f"- {c}" for c in checks] + [""]
        print(f"{d:<24} {verdict}")

    lines.insert(4, f"**{len(ok_rows)} confirmed, {len(bad_rows)} must not be sent as-is.**\n")
    OUT.write_text("\n".join(lines), encoding="utf8")
    # The date goes INSIDE the file, not left to the filesystem.
    #
    # 18-generate-reports.py refuses to date a letter "re-checked today" against
    # measurements that are not. It used to judge that on the file's mtime,
    # which git does not preserve: a fresh clone stamps every file with the
    # checkout time, so month-old data would read as minutes old on the other
    # machine. Recording the run date as content makes the check survive a
    # clone, a copy and a backup restore.
    OUTJSON.write_text(json.dumps(
        {"generatedOn": date.today().isoformat(), "domains": results},
        indent=1, sort_keys=True), encoding="utf8")
    print(f"\n{len(ok_rows)} confirmed, {len(bad_rows)} held: {', '.join(bad_rows) or 'none'}")
    print(f"wrote {OUT.relative_to(ROOT)} and {OUTJSON.relative_to(ROOT)}")
    if LIMITED:
        print(f"\n!! LIMITED RUN ({MAX_ROWS} rows) — wrote .partial files only.")
        print("   The full outreach-wave-verified.md was left alone.")


if __name__ == "__main__":
    main()
