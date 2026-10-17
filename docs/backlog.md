# Backlog

## Blog automation
1. ~~**Post scaffolding**~~ — DONE 2026-10-17: `npm run new-post -- "Title" [--date YYYY-MM-DD]` (scripts/new-post.mjs).
2. ~~**Scheduled publishing**~~ — DONE 2026-10-17: posts with a future `pubDate` are excluded from pages, listings and RSS (src/utils/posts.ts); they appear automatically on their date with the first rebuild.
3. ~~**Scheduled rebuild**~~ — DONE 2026-10-17: `.github/workflows/scheduled-rebuild.yml` pings the Cloudflare deploy hook nightly at 00:05 UTC.
   - Remaining manual step: repo secret `CLOUDFLARE_DEPLOY_HOOK` (Workers project -> Settings -> Deploy hooks).
4. Renovate Bot for dependency updates (weekly) — needs app install in GitHub UI.
5. ~~**Link-rot check**~~ — DONE 2026-10-17: `.github/workflows/link-check.yml`, monthly lychee run over all posts, opens an issue on failure.

## Hosting (recommended, setup pending)
- Cloudflare Pages, connected to the GitHub repo, domain `untagged.dev` (bought via Cloudflare Registrar; the whole `.dev` TLD is on the browser HSTS preload list — HTTPS only).
- Before first deploy: `site:` in `astro.config.mjs` points at the production URL (done in this repo).

## Admin GUI (declined for now, keep in mind)
- Keystatic (local mode) — GUI inside the dev server, writes to the same Markdown files.
