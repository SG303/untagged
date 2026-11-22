#!/usr/bin/env node
// Scaffolds a new blog post: `npm run new-post -- "My Title"` (add --date 2026-12-01 to schedule it)
import { existsSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parseArgs } from 'node:util';

let parsed;
try {
  parsed = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      date: { type: 'string' },
    },
  });
} catch (err) {
  console.error(err.message);
  console.error('Usage: npm run new-post -- "My Title" [--date YYYY-MM-DD]');
  process.exit(1);
}

const title = parsed.positionals.join(' ').trim();

// Local calendar date (matches SITE.timezone on the author's machine) so writing
// after local midnight produces today's date without being treated as future.
const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
const date = parsed.values.date ?? today;

// Round-trip validation catches impossible dates like 2026-02-31 (which would
// silently roll over to March)
const roundTrip = new Date(`${date}T00:00:00Z`);
if (Number.isNaN(roundTrip.valueOf()) || roundTrip.toISOString().slice(0, 10) !== date) {
  console.error(`Invalid date "${date}" — expected a real date as YYYY-MM-DD`);
  process.exit(1);
}

if (!title) {
  console.error('Usage: npm run new-post -- "My Title" [--date YYYY-MM-DD]');
  process.exit(1);
}

let slug = title
  .toLowerCase()
  .normalize('NFKD')
  // combining accents are dead after NFKD ("ü" -> "u" + U+0308); drop them cleanly
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 64)
  // slicing can reintroduce a trailing dash
  .replace(/-+$/, '');

if (!slug) {
  console.error(
    `Could not build a URL slug from "${title}" (non-latin characters?). Provide one in the filename afterwards.`,
  );
  process.exit(1);
}

const repoRoot = join(import.meta.dirname, '..');
const path = join(repoRoot, 'src/content/blog', `${slug}.md`);
const displayPath = relative(process.cwd(), path) || path;
if (existsSync(path)) {
  console.error(`Already exists: ${displayPath}`);
  process.exit(1);
}

// JSON.stringify produces a double-quoted scalar that is valid YAML — no manual
// escaping pitfalls (apostrophes, backslashes, quotes all round-trip correctly).
const frontmatter = [
  '---',
  `title: ${JSON.stringify(title)}`,
  "description: 'One sentence — shows up in listings and the RSS feed.'",
  `pubDate: ${date}`,
  'tags: []',
  'draft: true',
  '---',
  '',
  'Write your post.',
  '',
].join('\n');

writeFileSync(path, frontmatter);
console.log(`Created: ${displayPath}`);
console.log(`  Title:    ${title}`);
console.log(`  pubDate:  ${date}`);
console.log('When done writing: set draft: false to publish on/after pubDate.');
console.log('(a future pubDate needs a rebuild that day — handled by the nightly rebuild)');
