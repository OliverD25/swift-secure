"""Download each casino's own site icon once, so the directory can show it.

    python scripts/fetch-casino-icons.py            # fetch every casino still missing one
    python scripts/fetch-casino-icons.py 10         # only the first 10 missing, for a smoke test
    python scripts/fetch-casino-icons.py --refresh  # re-fetch even ones already on disk
    python scripts/fetch-casino-icons.py --manifest # rebuild the manifest, download nothing

WHY SELF-HOSTED. The obvious shortcut is to point <img> at a favicon service and
let the visitor's browser fetch it. That would tell a third party which casino
directory page every visitor is reading. This site measures other operators for
exactly that - "trackers firing with no consent gate" is a finding in our own
report - so doing it here would be indefensible. The icons are fetched once,
from here, and served from our own origin.

WHY NO og:image. It is a wide preview banner, not a logo, and it looks wrong
cropped into a 44px square. Only real icon declarations are used.

NON-DESTRUCTIVE BY DESIGN. Downloading only ever adds files. The manifest is
rebuilt from whatever is actually on disk rather than from the results of this
run, so an interrupted or limited run cannot remove icons the site is already
using - it simply adds fewer. That is the same lesson as the research sweeps: a
partial run must never be able to destroy a full one.
"""
import pathlib
import re
import socket
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter
from concurrent.futures import ThreadPoolExecutor

ROOT = pathlib.Path(__file__).resolve().parent.parent
CASINOS = ROOT / "src" / "data" / "casinos.ts"
LOGOS = ROOT / "public" / "logos"
MANIFEST = ROOT / "src" / "data" / "casinoIcons.ts"

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

MAX_BYTES = 200_000

# Magic numbers, because plenty of sites answer /favicon.ico with an HTML error
# page and HTTP 200. Writing that to disk gives a broken image on every card.
SIGNATURES = [
    (b"\x89PNG\r\n\x1a\n", ".png"),
    (b"\xff\xd8\xff", ".jpg"),
    (b"GIF87a", ".gif"),
    (b"GIF89a", ".gif"),
    (b"\x00\x00\x01\x00", ".ico"),
]


def sniff(data: bytes) -> str | None:
    for sig, ext in SIGNATURES:
        if data.startswith(sig):
            return ext
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return ".webp"
    head = data[:400].lstrip()
    if head.startswith(b"<") and b"<svg" in data[:2000].lower():
        return ".svg"
    return None


def get(url: str, limit: int = MAX_BYTES) -> bytes | None:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=12, context=ctx) as r:
            return r.read(limit + 1)
    except Exception:
        return None


def candidates(domain: str) -> list[str]:
    """Icon URLs to try, best quality first."""
    base = f"https://{domain}/"
    body = get(base, 150_000)
    urls: list[str] = []
    if body:
        text = body.decode("utf8", "ignore")
        for pattern in (
            r'<link[^>]+rel="[^"]*apple-touch-icon[^"]*"[^>]+href="([^"]+)"',
            r'<link[^>]+href="([^"]+)"[^>]+rel="[^"]*apple-touch-icon[^"]*"',
            r'<link[^>]+rel="[^"]*\bicon\b[^"]*"[^>]+href="([^"]+)"',
            r'<link[^>]+href="([^"]+)"[^>]+rel="[^"]*\bicon\b[^"]*"',
        ):
            for m in re.finditer(pattern, text, re.I):
                urls.append(urllib.parse.urljoin(base, m.group(1).strip()))
    # Conventional locations, tried even when the homepage was unreadable — a
    # bot filter often guards the HTML while serving static files freely.
    # /favicon.png is in this list because casinok.com serves exactly that and
    # 404s on both of the two obvious paths.
    for path in ("/apple-touch-icon.png", "/apple-touch-icon-precomposed.png",
                 "/favicon.png", "/favicon-32x32.png", "/favicon.ico"):
        urls.append(urllib.parse.urljoin(base, path))
    seen, ordered = set(), []
    for u in urls:
        if u not in seen:
            seen.add(u)
            ordered.append(u)
    return ordered


def fetch_one(job: tuple[str, str]) -> tuple[str, str]:
    slug, domain = job
    socket.setdefaulttimeout(10)
    for url in candidates(domain)[:9]:
        data = get(url)
        if not data or len(data) > MAX_BYTES or len(data) < 70:
            continue
        ext = sniff(data)
        if not ext:
            continue
        (LOGOS / f"{slug}{ext}").write_bytes(data)
        return slug, "saved" + ext
    return slug, "no usable icon"


def read_casinos() -> list[tuple[str, str]]:
    src = CASINOS.read_bytes().decode("utf8")
    slugs = re.findall(r'\n    slug: "([^"]+)"', src)
    domains = re.findall(r'\n    domain: "([^"]+)"', src)
    if len(slugs) != len(domains):
        raise SystemExit(f"parse mismatch: {len(slugs)} slugs vs {len(domains)} domains")
    return list(zip(slugs, domains))


def write_manifest(pairs: list[tuple[str, str]]) -> int:
    """Rebuild from the directory, never from this run's results."""
    on_disk = {}
    for p in sorted(LOGOS.glob("*")):
        if p.is_file() and p.suffix.lower() != ".md":
            on_disk[p.stem] = p.name
    known = {slug for slug, _ in pairs}
    rows = [(s, n) for s, n in sorted(on_disk.items()) if s in known]
    body = "\n".join(f'  "{s}": "{n}",' for s, n in rows)
    MANIFEST.write_bytes(
        ('/**\n'
         ' * Which casinos have an icon in public/logos/, written by\n'
         ' * scripts/fetch-casino-icons.py. Generated from the directory listing, so\n'
         ' * it always matches the files that are actually there.\n'
         ' *\n'
         ' * A slug missing from here is not an error. CasinoCard falls back to an\n'
         ' * initials tile, which is why a casino with no fetchable icon still renders\n'
         ' * a uniform card instead of a broken image.\n'
         ' */\n'
         'export const casinoIcons: Record<string, string> = {\n'
         f'{body}\n'
         '};\n').encode("utf8"))
    return len(rows)


def main() -> int:
    args = [a for a in sys.argv[1:]]
    refresh = "--refresh" in args
    manifest_only = "--manifest" in args
    nums = [a for a in args if a.isdigit()]
    limit = int(nums[0]) if nums else 0

    LOGOS.mkdir(parents=True, exist_ok=True)
    pairs = read_casinos()
    print(f"{len(pairs)} casinos in the directory")

    if manifest_only:
        n = write_manifest(pairs)
        print(f"manifest rebuilt: {n} icons on disk")
        return 0

    have = {p.stem for p in LOGOS.glob("*") if p.is_file()}
    todo = pairs if refresh else [(s, d) for s, d in pairs if s not in have]
    if limit:
        todo = todo[:limit]
        print(f"LIMITED RUN: {len(todo)} of them. Downloads only add files, "
              f"so this cannot damage what is already there.")
    if not todo:
        print("nothing to fetch — every casino already has an icon")
    else:
        print(f"fetching icons for {len(todo)}...")
        results = []
        with ThreadPoolExecutor(max_workers=16) as ex:
            for i, r in enumerate(ex.map(fetch_one, todo), 1):
                results.append(r)
                if i % 50 == 0:
                    ok = sum(1 for _, s in results if s.startswith("saved"))
                    print(f"  {i}/{len(todo)}  got: {ok}")
        c = Counter(status for _, status in results)
        print("\nresults:")
        for k, v in c.most_common():
            print(f"  {v:4}  {k}")

    n = write_manifest(pairs)
    print(f"\nmanifest: {n} of {len(pairs)} casinos have an icon "
          f"({len(pairs) - n} will render an initials tile)")
    print(f"wrote -> {MANIFEST.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
