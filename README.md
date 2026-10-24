<img src="assets/icon.svg" width="64" height="64" alt="">

# Untagged

A minimal, content-first personal blog built with [Astro](https://astro.build).

- **Blog-focused**: Markdown posts, clean reading experience, RSS feed
- **Almost zero JavaScript**: only a tiny script for the dark/light theme toggle
- **One config file**: everything personal lives in `src/consts.ts`

## Getting started

```sh
npm install
npm run dev      # local dev server at localhost:4321
npm run build    # static build into ./dist
```

## Writing a post

Run `npm run new-post -- "My title"` (creates a draft) or create a Markdown file in
`src/content/blog/` by hand (filename = URL slug):

```markdown
---
title: 'My new post'
description: 'One-sentence summary used in listings and RSS.'
pubDate: 2026-10-17
tags: ['notes']
draft: false
---

Your content here — regular Markdown.
```

Set `draft: true` to hide a post from listings and the feed while working on it.
Note: on a public repo, drafts and future-dated posts remain *public in the git
history* — they are only hidden from the rendered site and RSS.

## Images in posts

The CSP header allows images only from this site (`img-src 'self'`), so hotlink
external images will not render — always commit images to the repository.

- **Simple (no processing):** put the file in `public/images/<slug>/` and
  reference it with an absolute path: `![Alt text](/images/<slug>/photo.png)`
- **Optimized (recommended for larger images):** put the image next to the
  post file (`src/content/blog/my-photo.png`) and reference it relatively:
  `![Alt text](./my-photo.png)` — Astro automatically resizes, generates
  width/height (no layout shift) and lazy-loads it
- Screenshots are usually largest as PNG/WebP; try to keep files < ~300 KB
  (the git history grows with every KB committed)

## Make it yours

Edit `src/consts.ts` — site title, tagline, author, description and social links.
Update the production URL in `astro.config.mjs` before deploying (used by sitemap & RSS).
The about page is `src/pages/about.astro`.

## Structure

```
src/
├── consts.ts          # site configuration (name, tagline, socials)
├── content.config.ts  # blog collection schema
├── content/blog/      # your posts (Markdown)
├── layouts/           # Base layout (head, nav, footer, theme script)
├── components/        # Header, Footer, ThemeToggle, PostList
├── pages/             # routes: / (post list), /blog/[slug], /about, /rss.xml
└── styles/global.css  # design tokens + shared styles
```

## Deploying

The build output in `dist/` is static and deploys anywhere — Vercel, Netlify,
Cloudflare Pages or GitHub Pages.
