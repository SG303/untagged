---
title: 'Shipping a Minimal Blog in an Afternoon'
description: 'Notes on the stack and the decisions behind this site — and why keeping it boring was the point.'
pubDate: 2026-10-05
tags: ['meta', 'web']
---

Every personal site project dies the same death: a framework evaluation spreadsheet, three half-finished rewrites, and a domain that forwards to nothing. This time the rule was simple — boring technology, done in an afternoon.

## The stack

- **Astro** for static generation. Components where convenient, zero client-side framework by default.
- **Markdown + content collections** for posts, with a schema so typos in frontmatter fail the build instead of the page.
- **One CSS file** for the design system. Custom properties for color, spacing and type. No preprocessor, no utility framework.
- **System fonts.** They load instantly and nobody has ever complained about them.

## What I deliberately skipped

Analytics, comments, a newsletter, and a dark mode with five interpolation steps between themes. All of those can be added later — the point was to remove every excuse not to publish the first post.

```ts
// The entire content pipeline
const posts = (await getCollection('blog'))
  .filter((post) => !post.data.draft)
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
```

If you are stuck in the same loop: pick the boring stack, ship one page, and write the second post before redesigning anything.
