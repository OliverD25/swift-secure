"""Guard what the built site claims, in every language.

WHY THIS EXISTS. This is a verification service, so the product is being
believed. One published sentence about a check we have not run destroys more
than any headline creates, and the failure is silent: the page renders, the
build is green, and nobody finds out until a competitor or a regulator reads it.

Copy is also the easiest thing in the repo to change carelessly. It lives in
plain strings, nineteen locales fall back to English per key, and Russian and
Ukrainian are hand-written and free to depart from the English wording — so a
claim can enter in one language and not the others.

Three checks, all against dist/ rather than the source, because what ships is
what matters:

  1. Phrases that are false in any context. "originality of the game code",
     "we guarantee", "provably fair" and their Ukrainian and Russian forms.
  2. The honesty that must not quietly disappear. The scope section and its five
     items have to survive on the methodology page of every hand-written locale.
  3. Figures, against the data they describe. The stat tiles are read out of the
     built home page and compared to src/data/casinos.ts.

A fourth check used to live here. It required "test games", "check payouts" and
their Ukrainian and Russian forms to carry a negation, because the service could
not do any of it. Game provenance and payouts are now checked by hand, by a
person with an account, so asserting them is no longer a lie and the check was
removed on 10 August 2026. What survives in FORBIDDEN is narrower and still
true: nothing here guarantees anything, and "provably fair" remains a claim no
manual check establishes.

Usage: python3 scripts/test-site-claims.py   (after npm run build)
"""
import pathlib
import re
import sys
from html import unescape

ROOT = pathlib.Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
CASINOS = ROOT / "src" / "data" / "casinos.ts"
EN = ROOT / "src" / "i18n" / "locales" / "en.ts"

# Locales written by hand. Everything else derives from English per key, so a
# claim cannot enter them without entering en.ts first.
HAND_WRITTEN = ("", "uk", "ru")

# Never legitimate, in any sentence. These are the exact claims that were
# proposed and rejected, plus the words that turn a measurement into a promise.
#
# "гарантуємо" and "гарантируем" were on this list until 10 August 2026. The
# owner then wrote both, deliberately, into criteria[4].desc — the Ukrainian and
# Russian copy about game servers guarantees the spin runs on the provider's own
# server. Removed so his wording ships. The English forms stay, because the
# English of that same string says "to ensure" and nothing here should turn into
# a guarantee by accident.
FORBIDDEN = [
    "originality of the game code",
    "absence of third-party manipulation",
    "registration standards",
    "provably fair",
    "we guarantee",
    "guaranteeing",
    "оригінальність ігрового коду",
    "маніпуляцій із софтом",
    "гарантуючи",
    "оригинальность игрового кода",
    "манипуляций с софтом",
    "гарантируя",
]

# Must survive on the methodology page of every hand-written locale. The point
# is not these exact words — it is that the boundary section never quietly
# disappears from one language while staying in another. Re-pointed at the
# wording of 10 August 2026; re-point it again when the copy moves, never delete
# it.
REQUIRED = {
    "": ["Audit boundaries & limitations",
         "Game RTP & Random Number Generators (RNG)",
         "Guaranteed Withdrawal Security"],
    "uk": ["Обсяг та межі аудиту",
           "Математичний RTP та генератор випадкових чисел (ГВЧ)",
           "Гарантія виплати виграшів"],
    "ru": ["Объём и границы аудита",
           "Математический RTP и генератор случайных чисел (ГСЧ)",
           "Гарантия выплаты выигрышей"],
}

checks = 0
failures = []


def check(label, ok, detail=""):
    global checks
    checks += 1
    if not ok:
        failures.append(f"{label}\n      {detail}" if detail else label)


def visible_text(html: str) -> str:
    """Drop script, style and tag noise so a class name cannot trip a phrase.

    Entities are decoded afterwards. Without that, any copy containing "&", "<"
    or a quote is unsearchable: "Audit boundaries & limitations" ships as
    "Audit boundaries &amp; limitations", and a check for it silently fails
    while the phrase is right there on the page.
    """
    html = re.sub(r"<(script|style)\b.*?</\1>", " ", html, flags=re.S | re.I)
    return unescape(re.sub(r"<[^>]+>", " ", html))


def main() -> None:
    if not DIST.exists():
        raise SystemExit("no dist/ — run `npm run build` first")

    pages = sorted(DIST.rglob("index.html"))
    check("the build produced pages to scan", len(pages) > 100, f"found {len(pages)}")

    forbidden_hits = []
    for page in pages:
        text = visible_text(page.read_text(encoding="utf8", errors="replace"))
        low = text.lower()
        rel = page.relative_to(DIST)
        for phrase in FORBIDDEN:
            if phrase.lower() in low:
                forbidden_hits.append(f"{rel}: {phrase}")

    check("no forbidden claim appears anywhere in the build", not forbidden_hits,
          "\n      ".join(forbidden_hits[:6]))

    for loc, needles in REQUIRED.items():
        path = DIST / loc / "methodology" / "index.html" if loc else DIST / "methodology" / "index.html"
        if not path.exists():
            check(f"/{loc}/methodology/ exists", False, str(path))
            continue
        text = visible_text(path.read_text(encoding="utf8", errors="replace"))
        for needle in needles:
            check(f"/{loc or 'en'}/methodology/ still states '{needle}'", needle in text)

    # A hand-written locale must not quietly fall back to English.
    #
    # The fallback is per key and silent by design: delete a heading from uk.ts
    # and the page still builds, still renders and still reads perfectly — in
    # English, to a Ukrainian visitor arriving from a Ukrainian nav. Nothing
    # else in this repo would notice.
    CYRILLIC = re.compile(r"[Ѐ-ӿ]")
    for loc in ("uk", "ru"):
        for page in ("", "methodology", "how-it-works", "about",
                     "casinos", "verify", "apply", "faq", "pricing", "badge"):
            path = DIST / loc / page / "index.html" if page else DIST / loc / "index.html"
            if not path.exists():
                check(f"/{loc}/{page} exists", False, str(path))
                continue
            html = path.read_text(encoding="utf8", errors="replace")
            m = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.S)
            heading = re.sub(r"<[^>]+>", "", m.group(1)).strip() if m else ""
            check(f"/{loc}/{page or 'home'} has a translated heading",
                  bool(heading) and bool(CYRILLIC.search(heading)),
                  f"heading is '{heading[:60]}' — English fallback")

    # Figures, against the data they claim to describe.
    src = CASINOS.read_text(encoding="utf8")
    truth = {
        "total": len(re.findall(r"\n    domain:", src)),
        "anjouan": len(re.findall(r'jurisdiction:\s*"Anjouan"', src)),
        "certified": len(re.findall(r'status:\s*"certified"', src)),
    }
    en = EN.read_text(encoding="utf8")

    # Read the tiles off the built page rather than out of en.ts. They stopped
    # being literals on 10 August 2026 — StatRow counts them out of casinos.ts
    # while the site builds — so there is no longer a number in the source to
    # compare against. Reading dist/ tests one step further along anyway: that
    # the count actually reaches the page, not merely that someone typed it
    # correctly.
    # A tile counting zero is not rendered at all — StatRow drops it, because
    # "Displaying verified seal today: 0" told every visitor that nobody uses
    # the service. So the expected list is the same three figures in the same
    # order with the zeros removed, not a fixed list of three.
    #
    # This still fails on a wrong number, which is the point of the check. It
    # also fails if a zero ever reappears on the page, and it starts requiring
    # the badge tile again by itself on the day the first badge is issued.
    home = (DIST / "index.html").read_text(encoding="utf8", errors="replace")
    tiles = re.findall(r'<div class="text-\[32px\][^"]*">([\d,]+)</div>', home)
    published = [t.replace(",", "") for t in tiles]
    expected = [str(n) for n in (truth["total"], truth["anjouan"], truth["certified"]) if n > 0]
    check("the stat tiles match src/data/casinos.ts, with zero-count tiles hidden",
          published == expected,
          f"page says {published}, data says {expected} "
          f"(raw counts {[truth['total'], truth['anjouan'], truth['certified']]})")

    # The middle tile no longer names Anjouan either; {regulator} is filled from
    # whichever jurisdiction is most common in the index. If the mix ever moves,
    # a stale regulator on the home page would be a claim about our own data
    # that our own data contradicts.
    # Matched on the tile itself rather than on a phrase, so rewording the label
    # cannot silently switch this check off: find the tile whose number is the
    # dominant count, and require its label to name that jurisdiction.
    jurisdictions = re.findall(r'jurisdiction:\s*"([^"]+)"', src)
    dominant = max(set(jurisdictions), key=jurisdictions.count) if jurisdictions else ""
    pairs = re.findall(
        r'<div class="text-\[32px\][^"]*">([\d,]+)</div>\s*<div class="[^"]*">([^<]*)</div>', home)
    middle = [lbl for val, lbl in pairs if val.replace(",", "") == str(truth["anjouan"])]
    check("the tile showing the Anjouan count names Anjouan",
          bool(middle) and dominant in middle[0],
          f"data says {truth['anjouan']} under {dominant}; tiles read {pairs}")

    sentence = re.search(r"(\d{3}) of (?:the )?(\d{3})", en)
    check("the Anjouan sentence matches the data",
          bool(sentence) and sentence.groups() == (str(truth["anjouan"]), str(truth["total"])),
          f"sentence says {sentence.groups() if sentence else None}, data says "
          f"{(truth['anjouan'], truth['total'])}")

    print(f"{checks} checks run over {len(pages)} pages")
    if failures:
        print(f"\n{len(failures)} FAILED:")
        for f in failures:
            print(f"  - {f}")
        raise SystemExit(1)
    print("all passed — the site claims nothing it cannot defend")


if __name__ == "__main__":
    main()
