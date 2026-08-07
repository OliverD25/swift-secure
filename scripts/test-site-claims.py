"""Guard what the built site claims, in every language.

WHY THIS EXISTS. This is a verification service, so the product is being
believed. One published sentence about a check we have not run destroys more
than any headline creates, and the failure is silent: the page renders, the
build is green, and nobody finds out until a competitor or a regulator reads it.

Copy is also the easiest thing in the repo to change carelessly. It lives in
plain strings, nineteen locales fall back to English per key, and Russian and
Ukrainian are hand-written and free to depart from the English wording — so a
claim can enter in one language and not the others.

Four checks, all against dist/ rather than the source, because what ships is
what matters:

  1. Phrases that are false in any context. "originality of the game code",
     "we guarantee", "provably fair" and their Ukrainian and Russian forms.
  2. Phrases that are only false when asserted. "test withdrawals" is fine in
     "we do not test withdrawals" and forbidden on its own, so every occurrence
     is checked for a negation in front of it.
  3. The honesty that must not quietly disappear. The scope section and its five
     items have to survive on the methodology page of every hand-written locale.
  4. Figures that go stale. en.ts publishes 223 listed, 215 under Anjouan and 0
     certified as literals, with a comment saying they will go stale the moment
     the index changes. This compares them to src/data/casinos.ts.

Usage: python3 scripts/test-site-claims.py   (after npm run build)
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
CASINOS = ROOT / "src" / "data" / "casinos.ts"
EN = ROOT / "src" / "i18n" / "locales" / "en.ts"

# Locales written by hand. Everything else derives from English per key, so a
# claim cannot enter them without entering en.ts first.
HAND_WRITTEN = ("", "uk", "ru")

# Never legitimate, in any sentence. These are the exact claims that were
# proposed and rejected, plus the words that turn a measurement into a promise.
FORBIDDEN = [
    "originality of the game code",
    "absence of third-party manipulation",
    "registration standards",
    "provably fair",
    "we guarantee",
    "guaranteeing",
    "оригінальність ігрового коду",
    "маніпуляцій із софтом",
    "гарантуємо",
    "гарантуючи",
    "оригинальность игрового кода",
    "манипуляций с софтом",
    "гарантируем",
    "гарантируя",
]

# Legitimate only when negated. "We do not test withdrawals" is a feature of
# this site; "we test withdrawals" would be a lie.
RISKY = [
    "test games",
    "test the games",
    "check the games",
    "verify the games",
    "test withdrawals",
    "check payouts",
    "games are fair",
    "перевіряємо ігри",
    "тестуємо ігри",
    "перевіряємо виплати",
    "тестуємо виведення",
    "проверяем игры",
    "тестируем игры",
    "проверяем выплаты",
    "тестируем вывод",
]

NEGATION = re.compile(
    r"\b(not|never|no|cannot|can't|without|nothing|neither|nor)\b"
    r"|\bне\b|\bніколи\b|\bжодн|\bніщо\b|\bникогда\b|\bничего\b|\bни\b",
    re.I,
)

# Must survive on the methodology page of every hand-written locale.
REQUIRED = {
    "": ["Scope of the audit", "Whether the games are fair", "Whether a big win gets paid"],
    "uk": ["Обсяг аудиту", "Чи чесні ігри", "Чи виплатять великий виграш"],
    "ru": ["Объём аудита", "Честны ли игры", "Выплатят ли крупный выигрыш"],
}

checks = 0
failures = []


def check(label, ok, detail=""):
    global checks
    checks += 1
    if not ok:
        failures.append(f"{label}\n      {detail}" if detail else label)


def visible_text(html: str) -> str:
    """Drop script, style and tag noise so a class name cannot trip a phrase."""
    html = re.sub(r"<(script|style)\b.*?</\1>", " ", html, flags=re.S | re.I)
    return re.sub(r"<[^>]+>", " ", html)


def main() -> None:
    if not DIST.exists():
        raise SystemExit("no dist/ — run `npm run build` first")

    pages = sorted(DIST.rglob("index.html"))
    check("the build produced pages to scan", len(pages) > 100, f"found {len(pages)}")

    forbidden_hits, risky_hits = [], []
    for page in pages:
        text = visible_text(page.read_text(encoding="utf8", errors="replace"))
        low = text.lower()
        rel = page.relative_to(DIST)
        for phrase in FORBIDDEN:
            if phrase.lower() in low:
                forbidden_hits.append(f"{rel}: {phrase}")
        for phrase in RISKY:
            for m in re.finditer(re.escape(phrase.lower()), low):
                before = low[max(0, m.start() - 60):m.start()]
                if not NEGATION.search(before):
                    risky_hits.append(f"{rel}: '{phrase}' with no negation before it")

    check("no forbidden claim appears anywhere in the build", not forbidden_hits,
          "\n      ".join(forbidden_hits[:6]))
    check("no risky phrase is asserted rather than denied", not risky_hits,
          "\n      ".join(risky_hits[:6]))

    for loc, needles in REQUIRED.items():
        path = DIST / loc / "methodology" / "index.html" if loc else DIST / "methodology" / "index.html"
        if not path.exists():
            check(f"/{loc}/methodology/ exists", False, str(path))
            continue
        text = visible_text(path.read_text(encoding="utf8", errors="replace"))
        for needle in needles:
            check(f"/{loc or 'en'}/methodology/ still states '{needle}'", needle in text)

    # Figures published as literals, against the data they claim to describe.
    src = CASINOS.read_text(encoding="utf8")
    truth = {
        "total": len(re.findall(r"\n    domain:", src)),
        "anjouan": len(re.findall(r'jurisdiction:\s*"Anjouan"', src)),
        "certified": len(re.findall(r'status:\s*"certified"', src)),
    }
    en = EN.read_text(encoding="utf8")
    stats = re.search(r"\n  stats: \[(.*?)\n  \],\n", en, re.S)
    published = re.findall(r'value:\s*"([^"]+)"', stats.group(1)) if stats else []
    check("the stat tiles match src/data/casinos.ts",
          published == [str(truth["total"]), str(truth["anjouan"]), str(truth["certified"])],
          f"page says {published}, data says "
          f"{[truth['total'], truth['anjouan'], truth['certified']]}")

    sentence = re.search(r"(\d{3}) of the (\d{3}) casinos", en)
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
