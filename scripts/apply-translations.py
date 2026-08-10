"""Validate a set of translations and write them into src/i18n/locales/.

    python3 scripts/apply-translations.py translations.json [--dry-run]

The input is {"<locale>": {"<key>": "<string>", ...}, ...}. Every locale is
checked in full before a single file is written: a partial apply would leave
some languages on the new copy and some on the old, which is harder to see and
harder to undo than a clean refusal.

WHAT IT REFUSES, and why each one has bitten before:

  missing keys     a locale array or object is taken whole, and a key left out
                   falls back to English silently — the page still renders, in
                   the wrong language, and nobody notices for weeks
  extra keys       a key the English does not have is dead weight that will
                   never be read, and usually means a hallucinated line
  frozen values    stats[N].count and tiers[N].id are code. "listed" translated
                   to "в індексі" breaks the type and the page
  lost placeholder {regulator} and {email} are substituted at build time. A
                   translated token leaves raw braces on screen
  digits           the step numbers are "1".."4" and must stay that way
  untranslated     if almost every string equals the English, the agent echoed
                   the source instead of translating it
"""
import argparse
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
LOCALES = ROOT / "src" / "i18n" / "locales"

FORBIDDEN = ["we guarantee", "guaranteeing", "provably fair",
             "originality of the game code"]


def flat(o, p="", out=None):
    out = {} if out is None else out
    if isinstance(o, dict):
        for k, v in o.items():
            flat(v, f"{p}.{k}" if p else k, out)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            flat(v, f"{p}[{i}]", out)
    elif isinstance(o, str):
        out[p] = o
    return out


def unflatten(order, values):
    root = {}
    for k in order:
        if k not in values:
            continue
        cur = root
        parsed = [t[0] if t[0] else int(t[1])
                  for t in re.findall(r"([A-Za-z_][\w]*)|\[(\d+)\]", k)]
        for i, tok in enumerate(parsed):
            last = i == len(parsed) - 1
            nxt = parsed[i + 1] if not last else None
            if last:
                if isinstance(cur, list):
                    while len(cur) <= tok:
                        cur.append(None)
                    cur[tok] = values[k]
                else:
                    cur[tok] = values[k]
            else:
                default = [] if isinstance(nxt, int) else {}
                if isinstance(cur, list):
                    while len(cur) <= tok:
                        cur.append(None)
                    if cur[tok] is None:
                        cur[tok] = default
                    cur = cur[tok]
                else:
                    cur = cur.setdefault(tok, default)
    return root


def emit(v, ind):
    pad = "  " * ind
    if isinstance(v, dict):
        return "{\n" + "\n".join(f"{pad}  {k}: {emit(x, ind + 1)},"
                                 for k, x in v.items()) + f"\n{pad}}}"
    if isinstance(v, list):
        return "[\n" + "\n".join(f"{pad}  {emit(x, ind + 1)},"
                                 for x in v) + f"\n{pad}]"
    return json.dumps(v, ensure_ascii=False)


def load_english() -> dict[str, str]:
    src = (LOCALES / "en.ts").read_text(encoding="utf8")
    src = re.sub(r"^import type.*$", "", src, flags=re.M)
    src = re.sub(r"^const (\w+)\s*:\s*[^=]+=", r"const \1 =", src, flags=re.M)
    import subprocess, tempfile, os
    with tempfile.TemporaryDirectory() as d:
        p = os.path.join(d, "en.mjs")
        open(p, "w", encoding="utf8", newline="").write(
            src.replace("export default en;", "console.log(JSON.stringify(en));"))
        out = subprocess.run(["node", p], capture_output=True, text=True, check=True)
    return flat(json.loads(out.stdout))


def validate(code: str, tr: dict, en: dict) -> list[str]:
    bad = []
    frozen = [k for k in en if k.endswith(".count") or k.endswith(".id")]
    numeric = [k for k in en if en[k].isdigit()]

    missing = [k for k in en if k not in tr]
    extra = [k for k in tr if k not in en]
    if missing:
        bad.append(f"{len(missing)} key(s) missing, e.g. {missing[:4]}")
    if extra:
        bad.append(f"{len(extra)} key(s) that do not exist, e.g. {extra[:4]}")

    for k in frozen:
        if tr.get(k) != en[k]:
            bad.append(f"{k} is code and must stay {en[k]!r}, got {tr.get(k)!r}")
    for k in numeric:
        if not str(tr.get(k, "")).strip().isdigit():
            bad.append(f"{k} must stay a digit, got {tr.get(k)!r}")

    for k, token in (("stats[1].label", "{regulator}"), ("apply.successBody", "{email}")):
        if token not in str(tr.get(k, "")):
            bad.append(f"{k} lost its {token} placeholder")

    empty = [k for k, v in tr.items() if not str(v).strip()]
    if empty:
        bad.append(f"{len(empty)} empty string(s), e.g. {empty[:4]}")

    low = " ".join(str(v).lower() for v in tr.values())
    for f in FORBIDDEN:
        if f in low:
            bad.append(f"contains the forbidden phrase {f!r}")

    # An HTML entity in the source text is escaped again on the way out, so
    # "&amp;" reaches the visitor as the five characters &amp; instead of "&".
    # Seen for real: German returned "Lizenz &amp; Slots geprüft".
    entities = {k: v for k, v in tr.items()
                if re.search(r"&(amp|lt|gt|quot|#39|nbsp|apos);", str(v))}
    if entities:
        bad.append(f"{len(entities)} string(s) contain an HTML entity that would "
                   f"show literally, e.g. {list(entities)[:3]}")

    shared = [k for k in en if k in tr]
    same = sum(1 for k in shared if tr[k] == en[k])
    if shared and same / len(shared) > 0.4:
        bad.append(f"{same}/{len(shared)} strings are identical to the English — "
                   "this looks like the source echoed back, not a translation")
    return bad


HEADER = """import type {{ PartialTranslation }} from "../types";

/**
 * {name}. Machine-translated from en.ts on 10 August 2026 and checked
 * mechanically: every key present, placeholders intact, and the values that are
 * code rather than copy — stats[N].count, tiers[N].id — carried across
 * unchanged.
 *
 * Not hand-written. Ukrainian and Russian are, and they are the only two
 * allowed to depart from the English phrasing. This file should not.
 */
const {var}: PartialTranslation = {{"""


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    payload = json.load(open(a.input, encoding="utf8"))
    en = load_english()
    order = list(en)
    print(f"english source: {len(en)} keys\n")

    problems, ok = {}, {}
    for code, tr in payload.items():
        bad = validate(code, tr, en)
        (problems if bad else ok)[code] = bad or tr
        mark = "REFUSED" if bad else "ok"
        print(f"  {code:6} {mark}")
        for b in bad:
            print(f"           - {b}")

    if problems:
        print(f"\n{len(problems)} locale(s) refused, {len(ok)} would be written.")
        print("Nothing has been written. Fix the input and run again.")
        return 1

    if a.dry_run:
        print(f"\n--dry-run: {len(ok)} locale(s) validated, nothing written.")
        return 0

    for code, tr in ok.items():
        var = re.sub(r"[^a-z0-9]", "", code.lower()) if "-" not in code else \
            code.split("-")[0] + code.split("-")[1].upper()
        tree = unflatten(order, tr)
        body = "\n".join(f"  {sec}: {emit(v, 1)}," for sec, v in tree.items())
        head = HEADER.format(name=code, var=var)
        (LOCALES / f"{code}.ts").write_text(
            head + "\n" + body + f"\n}};\n\nexport default {var};\n",
            encoding="utf8", newline="")
        print(f"  wrote {code}.ts  ({len(tr)} keys)")

    print(f"\n{len(ok)} locale(s) written.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
