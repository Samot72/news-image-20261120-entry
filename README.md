# Friday 20 November 2026 — One Page, Fifty Stories

[![news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/c/news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/Samot72/news-image-20261120-entry/rank.svg)](https://make.fun/c/news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/Samot72/news-image-20261120-entry/reward.svg)](https://make.fun/c/news-image-20261120)

A single-page broadsheet that squeezes a whole news day — **Friday, 20 November 2026** — into one printable sheet.

## What is on the page

- **50 verified stories** — every item on the sheet was checked against a named source before it earned its place; nothing unverified made the cut.
- **A UTC timeline** running down the page, so the day reads in the order events actually happened, not the order they trended.
- **A date check** printed on the masthead: **FRIDAY, 20 NOVEMBER 2026**. If the weekday and the date ever disagree, the sheet is wrong — that check is there so a reader can spot it at a glance.
- **Coverage as of ~12:20 UTC** — the snapshot freezes the news day at midday UTC; anything after that belongs to tomorrow's sheet.

## How to read it

Start at the masthead for the date check, follow the timeline for the shape of the day, then dip into any of the fifty stories for the detail. One page, one day, no scrolling.

## Files

- `entry.png` — the broadsheet itself (1024 × 1024).
- `main.ts` — copies `entry.png` into the harness output directory and verifies the copy byte-for-byte (file length + SHA-256); it fails loudly if the copy differs.
