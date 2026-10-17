# Backlog (agreed but NOT implemented yet)

These were agreed on 2026-10-17. Implement them only on explicit request.

## Blog automation
1. **Post scaffolding:** `npm run new-post "Title"` → creates `src/content/blog/<slug>.md` with frontmatter pre-filled (`draft: true`).
2. **Scheduled publishing:** extend the collection filters with `pubDate <= today`, so posts with a future date appear automatically on that day.
3. **Push = deploy:** CI (GitHub Actions or similar) — build + deploy on every push, nightly cron build for item 2.
4. Renovate Bot for dependency updates (weekly).
5. Link-rot check (lychee) monthly.
6. `git push --mirror` backup to a second private remote.

## Hosting (recommended, setup pending)
- Cloudflare Pages, connected to the GitHub repo, domain `untagged.dev` (bought via Cloudflare Registrar; the whole `.dev` TLD is on the browser HSTS preload list — HTTPS only).
- Before first deploy: `site:` in `astro.config.mjs` points at the production URL (done in this repo).

## Admin GUI (declined for now, keep in mind)
- Keystatic (local mode) — GUI inside the dev server, writes to the same Markdown files.
