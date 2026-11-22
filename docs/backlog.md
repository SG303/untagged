# Backlog

## Blog automation
1. ~~**Post scaffolding**~~ — DONE 2026-10-17: `npm run new-post -- "Title" [--date YYYY-MM-DD]` (scripts/new-post.mjs).
2. ~~**Scheduled publishing**~~ — DONE 2026-10-17: posts with a future `pubDate` are excluded from pages, listings and RSS (src/utils/posts.ts); they appear automatically on their date with the first rebuild.
3. ~~**Scheduled rebuild**~~ — DONE 2026-10-17: `.github/workflows/scheduled-rebuild.yml` pings the Cloudflare deploy hook nightly at 00:17 UTC (moved off `:05` to reduce GitHub Actions midnight cron delay).
   - Manual step done the same day: repo secret `CLOUDFLARE_DEPLOY_HOOK` set; verified end-to-end (hook returned `status: queued`).
4. ~~**Dependency updates**~~ — DONE 2026-10-17 with Renovate; replaced by Dependabot on 2026-11-08 (Renovate had stopped opening PRs after 2026-10-17). `.github/dependabot.yml`: npm + github-actions weekly on Sunday 22:00 Europe/Zurich, minor/patch grouped into one PR with auto-merge, 7-day cooldown for both ecosystems. Dependabot alerts + security updates enabled in the repo settings.
   - Note: Dependabot does not update `.node-version`; bump it by hand when moving to a new Node LTS.
5. ~~**Link-rot check**~~ — DONE 2026-10-17, HARDENED later the same day: the first version was completely inoperative (invalid `--timeout=20s` aborted lychee at argument parsing; json/markdown output mismatch; missing `issues: write`). Fixed and manually verified.
   - Note: GitHub auto-disables scheduled workflows in public repos after 60 days without repo activity; merging Dependabot's weekly PRs counts as activity, so it stays alive while the bot merges.

## Hosting (implemented)
- Cloudflare Workers static assets (`wrangler.jsonc`), connected to the GitHub repo, domain `untagged.dev` (bought via Cloudflare Registrar; the whole `.dev` TLD is on the browser HSTS preload list — HTTPS only).
- Deploys: every push to `master` builds and deploys automatically; `site:` in astro.config.mjs points at the production URL.

## Cloudflare dashboard items (manual, ~5 min)
- SSL/TLS → Edge Certificates → "Always Use HTTPS" ON (edge 301 instead of relying on browser HSTS preload for non-browser clients).
- DNS → DNSSEC: verify status is "Active" (CF Registrar should handle it; no DS record was visible at launch-time check).
- Optional: `www` DNS record + 301 redirect rule → apex.

## Follow-up hardening (from the two-agent review, 2026-10-17)
- **CSP without `script-src 'unsafe-inline'`**: verified recipe — set `build: { inlineStylesheets: 'never' }` + `vite: { build: { assetsInlineLimit: 0 } }` in astro.config.mjs, externalize the pre-paint script to `public/theme-init.js`, then `script-src 'self'; style-src 'self'; style-src-attr 'unsafe-inline'` (style-src-attr covers Shiki's inline token styles; CSP3 browsers only). Needs a rebuild + pixel comparison against the current rendering before shipping.
- **Drafts are public in git**: `draft: true` / future-dated posts are excluded from the rendered site and RSS, but their content remains public in the git history (public repo by design) — documented in the README.
- **Images**: `_headers` CSP has `img-src 'self'` — externally hosted post images will silently fail; either commit images under `public/` or extend `img-src` when needed.

## Admin GUI (declined for now, keep in mind)
- Keystatic (local mode) — GUI inside the dev server, writes to the same Markdown files.

## Site structure
- 2026-10-24: Home and /blog were merged — the home page carries the full post list, `/blog/` 301-redirects to `/` (`public/_redirects`), post URLs (`/blog/<slug>/`) and RSS are unchanged. If the post count grows large, reintroduce an archive page / pagination.

## Review follow-ups (2026-11-22)
- **Verify Dependabot auto-merge on the first real Dependabot PR**: `.github/workflows/dependabot-auto-merge.yml` uses `on: pull_request` (matches the `sgstack` baseline v2 template and passes `zizmor`); confirm whether GitHub allows `gh pr merge --auto` with `GITHUB_TOKEN` or downgrades it to read-only for `dependabot[bot]`.
- **Article Open Graph metadata**: add `og:type="article"`, `article:published_time`, and `article:modified_time` in `src/layouts/Base.astro` for blog posts.
- **Minor cleanup**: remove unused `.sr-only` in `src/styles/global.css` (unless needed) and deduplicate the topic sentence shared between `src/consts.ts` and `src/pages/about.astro`.
- **Optional CI type-check**: add `astro check` to CI if the codebase grows (currently an accepted `tool-canon` deviation in `AGENTS.md`).

## Feature ideas
- **Local draft preview in dev (`import.meta.env.DEV`)**: show drafts and future-dated posts during `npm run dev` (with a subtle "Draft" indicator in the margin) while keeping them excluded from production builds.
- **Full-content RSS feed**: include rendered post bodies in `src/pages/rss.xml.ts` instead of `description` only.
- **Build-time Open Graph images**: generate simple notebook-margin `og:image` cards per post at build time using the already-installed `sharp` dependency.
- **Post navigation & reading time**: previous/next post links at the bottom of `src/pages/blog/[...slug].astro`, subtle reading time in the margin, and an optional HTML-only `<details>` table of contents for longer posts.
