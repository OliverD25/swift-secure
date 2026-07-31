"""Check the directory's indexing and consent behaviour in the built output.

Two things are being defended here. Unchecked entries must stay out of the
index, because thousands of near-identical register-filled templates are the
pattern that suppresses a whole site rather than just the offending pages. And
every operator listed without being asked must have a stated route to object.

Runs against dist/, so it tests what actually ships rather than the source.
"""
import pathlib, re, sys, gzip

ROOT = pathlib.Path("E:/codespace/_claude_code/swift-secured-badge")
DIST = ROOT / "dist"
SRC = (ROOT / "src/data/casinos.ts").read_text(encoding="utf8")

# The rule is about whether a licence was confirmed, not the display status:
# every entry is currently "listed", so keying on status would noindex the
# entire directory and leave nothing in search at all.
# Split into per-entry blocks before matching. A lazy cross-file match walks
# past an entry that omits licenceVerified and captures the next entry's value,
# which reports unverified casinos as verified — it did exactly that here.
blocks_src = re.split(r"\r?\n  \{\r?\n", SRC)[1:]
unverified, verified = set(), set()
for block in blocks_src:
    m = re.search(r'slug: "([^"]+)"', block)
    if not m:
        continue
    (verified if re.search(r'licenceVerified: "', block) else unverified).add(m.group(1))

fails, checks = [], 0


def check(cond, msg):
    global checks
    checks += 1
    if not cond:
        fails.append(msg)


check(len(verified) > 100, f"expected many verified entries, found {len(verified)}")
check(len(unverified) > 0, f"expected some unverified entries, found {len(unverified)}")

NOINDEX = re.compile(r'<meta name="robots" content="noindex, follow"', re.I)
HREFLANG = re.compile(r'rel="alternate" hreflang=', re.I)

# --- unchecked entries: noindex, no hreflang, removal route ---------------
sample_unverified = sorted(unverified)[:40]
for slug in sample_unverified:
    p = DIST / "casinos" / slug / "index.html"
    check(p.exists(), f"{slug}: page not built")
    if not p.exists():
        continue
    html = p.read_text(encoding="utf8", errors="ignore")
    check(bool(NOINDEX.search(html)), f"{slug}: unverified entry is missing noindex")
    check(not HREFLANG.search(html),
          f"{slug}: noindexed page still nominates itself via hreflang")
    check("want it corrected or removed" in html,
          f"{slug}: no correction/removal route on an unconsented listing")
    check("public register" in html or "public sources" in html,
          f"{slug}: does not say where the data came from")
    # jurisdiction doubles as a free-text note, so pasting it into a sentence
    # produced "compiled from the Not published public register".
    check("Not published public register" not in html and "no gaming regulator public register" not in html,
          f"{slug}: a placeholder jurisdiction leaked into the provenance sentence")

# --- checked entries stay indexable --------------------------------------
for slug in sorted(verified)[:20]:
    p = DIST / "casinos" / slug / "index.html"
    if not p.exists():
        continue
    html = p.read_text(encoding="utf8", errors="ignore")
    check(not NOINDEX.search(html), f"{slug}: a verified entry was wrongly noindexed in English")
    check(bool(HREFLANG.search(html)), f"{slug}: verified entry lost its hreflang cluster")

# --- translated copies of a verified entry must not compete with it -------
# Only the surrounding labels translate; the licence number, operator and dates
# are identical, so an indexed copy per locale is 18 duplicates per casino.
for slug in sorted(verified)[:10]:
    for loc in ("de", "fr", "ru", "ja"):
        p = DIST / loc / "casinos" / slug / "index.html"
        if not p.exists():
            continue
        html = p.read_text(encoding="utf8", errors="ignore")
        check(bool(NOINDEX.search(html)), f"{loc}/{slug}: translated copy is competing for the index")

# --- ordinary pages are untouched ----------------------------------------
for page in ["index.html", "about/index.html", "casinos/index.html", "apply/index.html"]:
    p = DIST / page
    if not p.exists():
        continue
    html = p.read_text(encoding="utf8", errors="ignore")
    check(not NOINDEX.search(html), f"{page}: ordinary page was wrongly noindexed")
    check(bool(HREFLANG.search(html)), f"{page}: ordinary page lost hreflang")

# --- sitemap must not advertise pages we ask not to be indexed -----------
sitemap_urls = []
for f in sorted(DIST.glob("sitemap*.xml")) + sorted(DIST.glob("sitemap*.xml.gz")):
    raw = gzip.decompress(f.read_bytes()) if f.suffix == ".gz" else f.read_bytes()
    sitemap_urls += re.findall(r"<loc>([^<]+)</loc>", raw.decode("utf8", "ignore"))

check(len(sitemap_urls) > 0, "no sitemap URLs found")
leaked = [u for u in sitemap_urls if any(f"/casinos/{s}/" in u for s in sample_unverified)]
check(not leaked, f"sitemap lists {len(leaked)} noindexed pages, e.g. {leaked[:2]}")

for slug in sorted(verified)[:5]:
    check(any(f"/casinos/{slug}/" in u for u in sitemap_urls),
          f"{slug}: a verified entry is missing from the sitemap")
check(any(u.rstrip("/").endswith("/settings") for u in sitemap_urls) is False,
      "settings page leaked into the sitemap")

localised_casino = [u for u in sitemap_urls
                    if re.search(r"/(ar|da|de|es|fr|fr-ca|it|nl|pl|pt|pt-br|sv|tr|hi|ko|zh|ja|ru)/casinos/[^/]+/", u)]
check(not localised_casino,
      f"sitemap submits {len(localised_casino)} translated casino pages, e.g. {localised_casino[:2]}")

# The nine real pages are genuinely translated content and must keep all locales.
localised_real = [u for u in sitemap_urls if re.search(r"/(de|fr|ru)/(about|faq|pricing)/", u)]
check(len(localised_real) >= 3,
      "translated copies of the main pages were removed from the sitemap by mistake")

print(f"{checks} checks run   ({len(verified)} verified, {len(unverified)} unverified, {len(sitemap_urls)} sitemap URLs)")
if fails:
    print(f"\n{len(fails)} FAILED:")
    for f in fails[:20]:
        print("  -", f)
    sys.exit(1)
print("all passed — unchecked entries are out of the index and have a removal route")
