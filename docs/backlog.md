# Backlog (nicht umgesetzt – nur Erinnerung)

Vereinbart am 2026-10-17; umsetzen erst auf expliziten Wunsch.

## Blog-Automatisierung
1. **Post-Scaffolding:** `npm run new-post "Titel"` → legt `src/content/blog/<slug>.md` mit Frontmatter an (draft: true).
2. **Geplante Veröffentlichung:** Collection-Filter um `pubDate <= heute` erweitern (Posts mit Zukunfts-Datum erscheinen erst zum Datum).
3. **Push = Deploy:** CI (GitHub Actions o.ä.) – build + deploy bei jedem Push, nächtlicher Cron-Build für Punkt 2.
4. Renovate Bot für Dependency-Updates (wöchentlich).
5. Link-Rot-Check (lychee) monatlich.
6. Git-Mirror als Backup auf zweites privates Remote.

## Hosting (Empfehlung ausgesprochen, Setup offen)
- Cloudflare Pages (über GitHub-Repo), siehe Hosting-Diskussion.
- Vor Deploy: `site:` in astro.config.mjs auf Produktions-URL setzen.

## Admin-GUI (aktuell abgelehnt, falls Interesse wieder aufkommt)
- Keystatic (Local-Mode) – GUI im Dev-Server, schreibt in dieselben Markdown-Files.
