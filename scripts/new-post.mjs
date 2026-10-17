#!/usr/bin/env node
// Scaffolds a new blog post: `npm run new-post -- "My Title"` (add --date 2026-12-01 to schedule it)
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const title = args.find((arg, i) => !arg.startsWith('--') && !(i > 0 && args[i - 1] === '--date'));
const dateFlagIdx = args.indexOf('--date');
if (dateFlagIdx !== -1 && !args[dateFlagIdx + 1]) {
  console.error('Missing value for --date — expected YYYY-MM-DD');
  process.exit(1);
}

// Local calendar date (not UTC) so a CET/CEST author writing after local midnight
// gets the date they see on their clock. FormattedDate/builds treat it as UTC midnight.
const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
const date = dateFlagIdx !== -1 ? args[dateFlagIdx + 1] : today;

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

const path = join('src/content/blog', `${slug}.md`);
if (existsSync(path)) {
  console.error(`Already exists: ${path}`);
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
console.log(`Created: ${path}`);
console.log(`  Title:    ${title}`);
console.log(`  pubDate:  ${date}`);
console.log('When done writing: set draft: false to publish on/after pubDate.');
console.log('(a future pubDate needs a rebuild that day — handled by the nightly rebuild)');
