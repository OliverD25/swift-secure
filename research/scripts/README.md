# Prospect pipeline

Four steps, run in order. Each writes a CSV into `../` and reads the previous
one's output. Run from the repo root:

```bash
python research/scripts/1-build-prospects.py
python research/scripts/2-check-live.py 900
python research/scripts/3-harvest-contacts.py
python research/scripts/4-group-by-operator.py
```

| Step | Writes | Does |
| :--- | :--- | :--- |
| 1 | `prospects.csv` | Pulls the Anjouan register via the crawler, one row per domain on a valid B2C licence |
| 2 | `prospects-live.csv` | Fetches each domain; keeps only those returning a real page. Takes an optional row limit (default 900) |
| 3 | `prospects-live.csv` | Reads contact/support pages for a published address |
| 4 | `prospects-by-operator.csv` | Groups brands by owning company — **the list to actually work** |

Step 1 needs `crawler/` installed (`cd crawler && npm install`), because it
reuses the register loader rather than keeping a second copy of that parsing.

## Re-running is safe but destructive to your notes

These scripts **overwrite** their output files. The `status`, `contacted_on`
and `notes` columns are meant to be edited by hand as you work the list — those
edits will be lost on a re-run. Copy the file, or track outreach state
somewhere else, before regenerating.

## Worth knowing before you trust the numbers

- Liveness is judged **from wherever you run this**. 290 domains returned
  403/401/451 on the first pass, which is geo-blocking a home IP rather than
  evidence the site is down. Running step 2 through the residential proxies
  should recover most of them.
- Step 3 only reads addresses operators publish on their own contact pages.
  It found one for 13% of live sites, which is the real shape of this market,
  not a bug — casinos route contact through live chat by design.
- Step 2 rewrites `brand` from the page `<title>`, so names are what the
  operator calls itself rather than a guess from the domain.
