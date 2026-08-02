"""Summarise the audit sweep into the numbers a report would actually quote.

Every figure here is a share of sites we could *read*, never of sites attempted.
Folding unreachable sites into a denominator is how the seal census produced a
market estimate that was wrong by a factor of two.
"""
import json, pathlib, statistics as st

ROOT = pathlib.Path(__file__).resolve().parents[2]
d = json.loads((ROOT / "research/audit-report.json").read_text(encoding="utf8"))
ok = [r for r in d if r.get("ok")]
n = len(ok)


def pct(k):
    return f"{k} ({k / n * 100:.0f}%)"


print(f"attempted {len(d)} | readable {n} | unreadable {len(d) - n}\n")

# --- consent -------------------------------------------------------------
no_gate = [r for r in ok if not r.get("hasConsentUI")]
fired = [r for r in ok if r.get("trackersBeforeConsent")]
# The finding is the intersection: a tracker fired AND there was no gate to
# have passed. Either alone is not a claim worth making.
both = [r for r in ok if not r.get("hasConsentUI") and r.get("trackersBeforeConsent")]
print("CONSENT")
print("  no consent gate found     :", pct(len(no_gate)))
print("  fired a tracker first     :", pct(len(fired)))
print("  BOTH — the finding        :", pct(len(both)))
counts = [len(r["trackersBeforeConsent"]) for r in fired]
if counts:
    print(f"  trackers when present     : median {st.median(counts):.0f}, max {max(counts)}")

# --- responsible gambling ------------------------------------------------
rg = lambda r: r.get("responsibleGambling") or {}
print("\nRESPONSIBLE GAMBLING")
print("  no marker of any kind     :", pct(sum(1 for r in ok if not any(rg(r).values()))))
for k in ("ageNotice", "selfExclusion", "depositLimit", "helpOrg", "rgPage"):
    print(f"    missing {k:<14}: {pct(sum(1 for r in ok if not rg(r).get(k)))}")

# --- legal pages ---------------------------------------------------------
lp = lambda r: r.get("legalPages") or {}
print("\nLEGAL PAGES MISSING")
for k in ("terms", "privacy", "aml", "bonusTerms"):
    print(f"  {k:<12}: {pct(sum(1 for r in ok if not lp(r).get(k)))}")

# --- weight --------------------------------------------------------------
req = sorted(r.get("requestCount", 0) for r in ok)
kb = sorted(r.get("transferKB", 0) for r in ok)
p90 = lambda xs: xs[int(len(xs) * 0.9)]
print("\nPAGE WEIGHT")
print(f"  requests  median {st.median(req):.0f} | p90 {p90(req)} | max {max(req)}")
print(f"  KB        median {st.median(kb):.0f} | p90 {p90(kb)} | max {max(kb)}")
print("  over 300 requests         :", pct(sum(1 for r in ok if r.get("requestCount", 0) > 300)))

# --- breakage ------------------------------------------------------------
brk = [r for r in ok if r.get("brokenRequests", 0) > 0]
print("\nBREAKAGE")
print("  any failed request        :", pct(len(brk)))
print("  five or more              :", pct(sum(1 for r in ok if r.get("brokenRequests", 0) >= 5)))
print("  any console error         :", pct(sum(1 for r in ok if r.get("consoleErrors", 0) > 0)))
print("\n  worst:")
for r in sorted(brk, key=lambda x: -x["brokenRequests"])[:8]:
    sample = " | ".join(r.get("brokenSample", [])[:2])[:66]
    print(f"    {r['domain']:<26} {r['brokenRequests']:>3} failed   {sample}")

# --- security ------------------------------------------------------------
sh = lambda r: r.get("securityHeaders") or {}
print("\nSECURITY HEADERS MISSING")
for k in ("strict-transport-security", "content-security-policy", "x-frame-options"):
    print(f"  {k:<28}: {pct(sum(1 for r in ok if not sh(r).get(k)))}")

# --- how many sites get at least one finding worth sending ---------------
def has_finding(r):
    return bool(
        (not r.get("hasConsentUI") and r.get("trackersBeforeConsent"))
        or not any(rg(r).values())
        or r.get("requestCount", 0) > 300
        or r.get("brokenRequests", 0) >= 5
    )

print("\nSITES WITH AT LEAST ONE FINDING WORTH SENDING:", pct(sum(1 for r in ok if has_finding(r))))
