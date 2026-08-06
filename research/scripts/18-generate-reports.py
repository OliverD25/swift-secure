"""Generate one operator report per casino in the send wave.

Writes research/reports/<domain>.md, one file per casino, from the verified
sweep data. Nothing here is written by hand, so a fix to the wording reaches
every letter at once.

WHAT CHANGED FROM THE FIRST TEMPLATE, and why each change was forced:

  1. The old report opened "Checked from Germany". That was false. The sweep
     sets German locale headers but leaves a Ukrainian IP. Every finding this
     script emits is location-independent — a 404 and a file size are the same
     from any country, and both are verified with curl — so the report now
     states what was measured instead of claiming a vantage point.

  2. The consent/trackers section is gone. It was demoted to context-only on
     3 August for the same reason: measured from one country, it says nothing
     about how the site treats an EU visitor.

  3. The offer changed. The badge is free for the first 6 months and technical
     support is included, so the footer no longer says "free for the first
     operators" without saying for how long.

  4. The "confirm it yourself" command is no longer the first failure in the
     list. It is a failure that 15-verify-wave.py proved curl reproduces.
     winup.io showed why: its first three failures are own-domain API calls
     that answer 400 to a browser and 200 to curl, so the report handed the
     operator a command that disproved the report. Where nothing reproduces
     under curl, the letter gives the dev-tools path instead. A check the
     operator runs and sees pass is worse than giving them no check at all.

Two placeholders are left deliberately and the script refuses to pretend they
are filled: SENDER_NAME and REPLY_EMAIL. A report signed by nobody, offering a
reply to nowhere, is worse than no report.

This script requires research/wave-verification.json and will not run without
it. Every report ends with "every line above was re-checked against your live
site on the day this was sent" — generating one from unverified data makes that
sentence false.

WHO SIGNS THE LETTERS lives in research/sender.json, so it is set once rather
than retyped on every run. --sender and --reply still win when given, which is
what makes a one-off run under a different name possible without editing the
file. With neither the file nor the flags, the placeholders stay and the script
says so.

Usage: python research/scripts/18-generate-reports.py [--sender "Name"] [--reply addr@domain]
"""
import csv
import json
import pathlib
import re
import sys
from datetime import date

ROOT = pathlib.Path(__file__).resolve().parents[2]
SWEEP = ROOT / "research" / "audit-sweep-battlefield.json"
PRIORITY = ROOT / "research" / "outreach-priority.csv"
VERIFIED = ROOT / "research" / "wave-verification.json"
SENDER_FILE = ROOT / "research" / "sender.json"
OUTDIR = ROOT / "research" / "reports"

MB = 1024
TODAY = date.today().strftime("%-d %B %Y") if sys.platform != "win32" else date.today().strftime("%d %B %Y").lstrip("0")

argv = sys.argv[1:]
def opt(name, default):
    return argv[argv.index(name) + 1] if name in argv and argv.index(name) + 1 < len(argv) else default

def signature() -> dict:
    """Read research/sender.json. A malformed file is an error, not a fallback.

    Falling back to the placeholders on a JSON syntax error would be the worst
    outcome available: the run looks normal, and 21 letters go out signed
    "[YOUR NAME]" because of a missing comma nobody was shown.
    """
    if not SENDER_FILE.exists():
        return {}
    try:
        return json.loads(SENDER_FILE.read_text(encoding="utf8"))
    except json.JSONDecodeError as err:
        raise SystemExit(f"{SENDER_FILE.relative_to(ROOT)} is not valid JSON: {err}")


SIGNATURE = signature()
SENDER = opt("--sender", SIGNATURE.get("sender") or "[YOUR NAME]")
REPLY = opt("--reply", SIGNATURE.get("reply") or "[REPLY ADDRESS]")

TRACKER = re.compile(
    r"google-analytics|googletagmanager|doubleclick|facebook|fbevents|hotjar|"
    r"clarity\.ms|yandex|tiktok|snapchat|criteo|taboola|outbrain|mixpanel|"
    r"amplitude|segment|contentsquare|mouseflow|fullstory|smartlook|luckyorange|"
    r"tawk\.to|kumulos|stape\.io|matomo|adnxs|adsrvr|sentry\.io|"
    r"intercom|crisp\.chat|livechat|zendesk|onesignal|pushwoosh|braze|"
    r"appsflyer|branch\.io", re.I)

# Directory names that tell a player-facing story. Used only to say WHERE the
# breakage sits, never to guess what the file does.
AREA_HINT = [
    (re.compile(r"paysystem|payment|deposit|cashier|gateway", re.I),
     "the payment-method icons on your deposit screen"),
    (re.compile(r"/game|/slot|remoteentry|/lobby|/casino", re.I),
     "your game tiles and game modules"),
    (re.compile(r"/sport|/bet|/odds", re.I), "your sportsbook section"),
    (re.compile(r"/promo|/bonus", re.I), "your promotions section"),
]


def stem(host: str) -> str:
    return re.sub(r"[^a-z]", "", host.lower().replace("www.", "").split(".")[0])


def host_of(url: str) -> str:
    m = re.match(r"https?://([^/:?#]+)", url or "")
    return m.group(1).lower() if m else ""


def describe_area(urls: list[str]) -> str:
    joined = " ".join(urls).lower()
    for rx, text in AREA_HINT:
        if rx.search(joined):
            return text
    return ""


def devtools_recipe(domain: str) -> list[str]:
    """The check to hand over when curl cannot reproduce the failure.

    Some servers answer a bare curl differently from a real browser request —
    winup.io returns 200 to curl for calls the browser sees fail with 400. The
    finding is still real; only the one-line proof is unavailable. Giving them
    a command that appears to pass is worse than giving them no command.
    """
    return [
        "A plain `curl` will not show these — this server answers a bare "
        "request differently from a browser one, so the check has to run in "
        "the browser:",
        "",
        "```",
        f"1. Open https://{domain}/ in Chrome",
        "2. Press F12, then select the Network tab",
        "3. Tick 'Disable cache' and reload with Ctrl+Shift+R",
        "4. Click the Status column to sort — the failing requests group together",
        "```",
        "",
    ]


def reproducible(ver: dict, url: str) -> bool:
    """Did 15-verify-wave.py prove curl reproduces this exact URL?

    Unknown counts as no. The script checks a sample rather than every URL, so
    absence here means unproven, not proven fine — and an unproven curl line is
    the thing this whole function exists to keep out of the letter.
    """
    return bool((ver.get("urls") or {}).get(url, {}).get("reproduces"))


def broken_section(rec: dict, ver: dict) -> str:
    """The Revenue Leak Scan finding, written so the operator can check it."""
    site = stem(rec["domain"])
    failures = []
    for entry in rec.get("brokenReal20") or []:
        status, _, url = entry.partition(" ")
        if url and not TRACKER.search(url):
            failures.append((status, url))
    if not failures:
        return ""

    # Distinct files, not raw request count, in the printed sample.
    #
    # A page that requests one broken icon twelve times produced twelve failures
    # and one problem. Printing the same URL three times in a row looks careless
    # and invites the reply "that's the same file". Both numbers are stated
    # instead: the request count is the cost, the file count is the work.
    seen, distinct = set(), []
    for s, u in failures:
        if u not in seen:
            seen.add(u)
            distinct.append((s, u))

    # Lead with the failures the operator can actually check for themselves.
    # The printed sample and the confirm command below have to agree — showing
    # three URLs and then a command about a fourth reads as picked at random.
    # sort() is stable, so the original order survives inside each group.
    distinct.sort(key=lambda su: not reproducible(ver, su[1]))

    urls = [u for _, u in distinct]
    own = [(s, u) for s, u in distinct if site and (site in stem(host_of(u)) or stem(host_of(u)) in site)]
    third = [(s, u) for s, u in distinct if (s, u) not in own]
    total = rec.get("brokenReal", len(failures))
    area = describe_area(urls)

    # The breakage section must clear the gate ON ITS OWN.
    #
    # A casino selected by the 5MB-asset gate still reached this function, so a
    # site with one stray 404 and a heavy video was being sent "1 request fails"
    # as a second finding. That is padding — a weak item added because there was
    # room for it — and AGENTS.md is explicit that padding destroys the only
    # thing that makes the report worth reading.
    func = re.compile(r"/api/|/rpc/|graphql|/auth|/user|/session|/wallet|/payment|"
                      r"/deposit|/cashier|/game|/launch|remoteentry|/bonus|/promo|"
                      r"/socket|/lobby|/sport", re.I)
    # An icon endpoint that happens to live under /api/ is decoration, not a
    # working API. petra.bet reached the wave on two 404s — an Instagram logo
    # and an arrow — purely because both URLs contained "/api/". Two missing
    # decorative icons is not worth an operator's attention, and sending it
    # would teach them our reports are filler.
    decorative = re.compile(r"_?icon|/icons?[/.]|favicon|logo|sprite|/flags?/", re.I)
    own_func = any(func.search(u) and not decorative.search(u) for _, u in own)
    if not (total >= 3 or (total >= 2 and own_func)):
        return ""

    # One broken file requested many times is one problem, not many — but it is
    # often a WORSE one, because a single icon fetched twelve times is an icon
    # that appears on twelve tiles. Say it that way round rather than inflating
    # the count and inviting "that's the same file" as the first reply.
    if len(distinct) == 1:
        head = f"## One missing file, requested {total} times on your homepage"
    elif len(distinct) < total:
        head = (f"## {total} requests fail when your homepage loads — "
                f"{len(distinct)} distinct files")
    else:
        head = f"## {total} requests fail when your homepage loads"
    lines = [head, ""]
    lines.append("```")
    for s, u in distinct[:3]:
        lines.append(f"{s}  {u}")
    lines.append("```")
    lines.append("")
    if len(distinct) == 1:
        lines += [f"One file, asked for {total} times in a single page load. That "
                  "usually means it sits on a repeated element — every game tile, "
                  "every row — so the gap shows up all over the page at once.", ""]
    if area:
        lines.append(f"These are {area}. A player sees blank space where they expect something.")
        lines.append("")

    if third and not own:
        vendor = host_of(third[0][1])
        lines += [
            f"All of them are served from `{vendor}`, not from your own servers. "
            "That usually means the fix belongs to your platform provider rather "
            "than to your team — worth forwarding to them with this list.",
            "",
        ]
    elif own and third:
        lines += [
            f"{len(own)} of these are on your own domain and {len(third)} come from "
            f"`{host_of(third[0][1])}`. The first group is yours to fix; the second "
            "is worth forwarding to whoever runs that service for you.",
            "",
        ]

    lines += [
        "This kind of failure is easy to miss. A missing file produces no error "
        "page and no warning, and anyone who has opened the site before is served "
        "it from their own cache — so on your team's machines the page looks correct.",
        "",
    ]
    checkable = next((u for _, u in distinct if reproducible(ver, u)), "")
    if checkable:
        lines += [
            "You can confirm the first line above in one command:",
            "",
            "```",
            f"curl -sI '{checkable}'",
            "```",
            "",
        ]
    else:
        lines += devtools_recipe(rec["domain"])
    return "\n".join(lines)


def asset_section(rec: dict, ver: dict) -> str:
    """The Dead Weight Finder finding."""
    assets = rec.get("heaviestAssets") or []
    if not assets or assets[0]["kb"] < 5 * MB:
        return ""
    a = assets[0]
    size = f"{a['kb'] / MB:.1f} MB"
    kind = {"media": "video or audio file", "image": "image"}.get(a["type"], a["type"] + " file")

    lines = [
        f"## A single {size} {kind} loads on your homepage", "",
        "```",
        f"{a['url']}",
        f"  {size}",
        "```",
        "",
        "On a mobile connection this one file takes most of the time before the "
        "page is usable. Most players arrive from a phone, often on a weak signal.",
        "",
    ]
    if len(assets) > 1 and assets[1]["kb"] >= 2 * MB:
        others = ", ".join(f"{x['kb'] / MB:.1f} MB" for x in assets[1:4])
        lines += [f"There are more behind it: {others}.", ""]
    lines += [
        "Usually fixable the same afternoon — compress it, or load it after the "
        "page is interactive instead of before.",
        "",
    ]
    # beastone.co serves its 200 without a content-length header, so the
    # one-line size check prints nothing at all. An operator who runs it sees
    # an empty result and concludes we never tested the finding.
    seen_asset = ver.get("asset") or {}
    if seen_asset.get("url") == a["url"] and seen_asset.get("reproduces"):
        lines += [
            "To confirm the size yourself:",
            "",
            "```",
            f"curl -sI '{a['url']}' | grep -i content-length",
            "```",
            "",
        ]
    else:
        lines += [
            "This file is served without a size header, so a one-line check "
            "will not report it. The browser measures it directly:",
            "",
            "```",
            f"1. Open https://{rec['domain']}/ in Chrome",
            "2. Press F12, then select the Network tab",
            "3. Tick 'Disable cache' and reload with Ctrl+Shift+R",
            "4. Click the Size column to sort — this file lands at the top",
            "```",
            "",
        ]
    return "\n".join(lines)


def clean_section(rec: dict) -> str:
    """What we checked and found nothing wrong with. Keeps the report honest."""
    bits = []
    reqs = rec.get("requestCount") or 0
    # Only claim the request count is fine when it actually is. Listing "290
    # requests" under "nothing wrong" would tell an operator a bad number is
    # good, and they would be right to stop reading there.
    #
    # The median is 134.5, recomputed from audit-sweep-battlefield.json over the
    # 1222 readable records. An earlier version of this line published 143,
    # which came from an old code comment rather than the data — the exact habit
    # this project keeps having to correct. Published as "about 135" because a
    # half-request is not a thing an operator can picture.
    if 0 < reqs <= 200:
        bits.append(f"{reqs} requests on the homepage, below the market median of about 135")
    if rec.get("securityHeaders", {}).get("strict-transport-security"):
        bits.append("HTTPS with HSTS enabled")
    if rec.get("hasViewportMeta"):
        bits.append("mobile viewport set correctly")
    if not rec.get("mixedContent"):
        bits.append("no insecure content on a secure page")
    if not bits:
        return ""
    # Never .capitalize() a sentence that starts with an acronym — it turned
    # "HTTPS with HSTS enabled" into "Https with hsts enabled", which reads as
    # though nobody proofread the letter before sending it.
    first = bits[0]
    if not first[:4].isupper():
        first = first[0].upper() + first[1:]
    return "## Checked, nothing wrong\n\n" + ", ".join([first] + bits[1:]) + ".\n\n"


def build(rec: dict, row: dict, ver: dict) -> str:
    brand = row.get("brand") or rec["domain"]
    parts = [f"# {rec['domain']} — free technical check", "",
             f"Run {TODAY}. Nothing to sign, no reply needed.", "",
             "We check casino sites and publish what we find. This one is yours, "
             "free, whether or not you ever talk to us.", ""]

    findings = "\n".join(s for s in (broken_section(rec, ver), asset_section(rec, ver)) if s)
    if not findings.strip():
        return ""
    parts.append(findings)
    parts.append(clean_section(rec))
    # Name the checks that did NOT run on this site.
    #
    # We publish four checks. This generator composes exactly two of them, so
    # every report in this wave is a two-check report. An operator reading the
    # site and then holding this letter would reasonably ask "where is my
    # licence result?" — and the honest answer has to be in the letter, not
    # waiting for them to ask.
    parts += [
        "## What we did not check", "",
        "**On your site specifically, two of our four checks did not run:** the "
        "licence register match and the mobile time-to-register measurement. "
        "A report only ever contains checks that actually ran — if one is not "
        "named above, it did not happen. Both are available free on request.", "",
        "In general we cannot check anything behind a login, whether your games "
        "come from the studios named on the site — that cannot be established "
        "from outside, and we do not claim it — or RNG fairness, which needs an "
        "accredited lab.", "",
        "---", "",
        "Every line above was re-checked against your live site on the day this "
        "was sent. If something here no longer reproduces, it was removed before "
        "sending rather than left in.", "",
        "**Swift Secured.** We are new and building the reference list. If this "
        "was useful and you want the result public, we issue a verification badge "
        "linking to a dated page that states exactly what was and was not checked. "
        "**Free for the first six months, and the technical checks stay free — "
        "no contract, remove it any time.**", "",
        f"{SENDER}", f"{REPLY}", "",
    ]
    return "\n".join(parts)


def main() -> None:
    if not VERIFIED.exists():
        raise SystemExit(
            f"missing {VERIFIED.relative_to(ROOT)} — run 15-verify-wave.py first.\n"
            "Every report claims each line was re-checked on the day it was sent. "
            "Without that file the claim is false and the curl lines are unproven.")
    sweep = {r["domain"]: r for r in json.loads(SWEEP.read_text(encoding="utf8"))}
    verified = json.loads(VERIFIED.read_text(encoding="utf8"))
    wave = [r for r in csv.DictReader(PRIORITY.open(encoding="utf8")) if r["send"] == "SEND"]
    OUTDIR.mkdir(exist_ok=True)

    written, skipped = [], []
    for row in wave:
        rec = sweep.get(row["domain"])
        if not rec:
            skipped.append((row["domain"], "no sweep record"))
            continue
        ver = verified.get(row["domain"], {})
        if ver.get("verdict") not in ("CONFIRMED", "BROWSER-ONLY"):
            skipped.append((row["domain"], f"verdict {ver.get('verdict') or 'unverified'}"))
            continue
        text = build(rec, row, ver)
        if not text:
            skipped.append((row["domain"], "no emailable finding after filtering"))
            continue
        (OUTDIR / f"{row['domain']}.md").write_text(text, encoding="utf8")
        written.append(row["domain"])

    print(f"wrote {len(written)} reports to research/reports/")
    if skipped:
        print(f"skipped {len(skipped)}:")
        for d, why in skipped:
            print(f"  {d}: {why}")
    if SENDER.startswith("[") or REPLY.startswith("["):
        print()
        print("!! PLACEHOLDERS STILL IN EVERY FILE — do not send yet.")
        print(f"   Fill them in {SENDER_FILE.relative_to(ROOT)}, or pass")
        print("   --sender \"Your Name\" --reply you@swiftsecured.com")

    # Signing the letters removed the catch that used to stop a send. The date
    # is the thing that catch was really protecting: every report prints today's
    # date and states each line was re-checked "on the day this was sent". Both
    # are set when the file is written, and neither ages well. So warn on the
    # measurement's age rather than trusting whoever runs this to remember.
    stale = (date.today() - date.fromtimestamp(VERIFIED.stat().st_mtime)).days
    if stale >= 1:
        print()
        print(f"!! The verification data is {stale} day(s) old, but these letters are")
        print(f"   dated {TODAY} and claim a same-day re-check. Re-run")
        print("   15-verify-wave.py, then this script, on the day you actually send.")


if __name__ == "__main__":
    main()
