# Untagged

Minimal, content-first personal blog built with Astro, served as static
assets by Cloudflare Workers on the custom domain untagged.dev. Public repo.
Default branch is `master`.

Follows the SG303 baseline v1 (`sgstack/global/AGENTS.md`,
`sgstack/baseline/tools.md`). If you cannot read those: work on a branch,
open a PR, merge only with green checks (squash); never commit secrets or
personal data; English for everything in the repo; talk to me in German.

## Commands

- Setup: `npm ci`
- Dev server: `npm run dev -- --host 0.0.0.0`
- Build: `npm run build` (static output in `dist/`)
- New post: `npm run new-post -- "My title"` (creates a draft)

## Release

No releases. Cloudflare Workers Builds deploys every push to `master`; a
nightly workflow pings the deploy hook so future-dated posts appear on their
day. Pull requests get Cloudflare preview URLs.

## Conventions

- Personal settings (site title, author, links) live in `src/consts.ts` only.
- Posts are Markdown files in `src/content/blog/`; the filename is the URL
  slug. Front matter: `title`, `description`, `pubDate`, `tags`, `draft`.
- Drafts and future-dated posts are hidden on the site and in RSS but stay
  public in the git history. Never commit anything that must stay private.
- Keep JavaScript to the theme toggle; the site works without it.
- `docs/backlog.md` holds open ideas.
- UI work: use the frontend-design skill (vendored in `.claude/skills/`).
- License: MIT for everything, code and posts (`LICENSE`). The vendored
  frontend-design skill keeps its own license file.

## Deviations from baseline

- `tool-canon`: no ESLint or Vitest; the build (`astro build`) is the check.
