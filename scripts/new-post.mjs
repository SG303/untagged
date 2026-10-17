#!/usr/bin/env node
// Scaffolds a new blog post: `npm run new-post -- "My Title"` (add --date 2026-12-01 to schedule it)
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const title = args.find((arg, i) => !arg.startsWith('--') && !(i > 0 && args[i - 1] === '--date'));
const dateFlagIdx = args.indexOf('--date');
const date = dateFlagIdx !== -1 ? args[dateFlagIdx + 1] : new Date().toISOString().slice(0, 10);

if (!title) {
  console.error('Usage: npm run new-post -- "My Title" [--date YYYY-MM-DD]');
  process.exit(1);
}
if (/^\d{4}-\d{2}-\d{2}$/.test(date) === false) {
  console.error(`Invalid date "${date}" — expected YYYY-MM-DD`);
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFKD')
  // combining accents are THU after NFKD ("ü" -> "u" + U+0308); drop them cleanly
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 64);

const path = join('src/content/blog', `${slug}.md`);
if (existsSync(path)) {
  console.error(`Already exists: ${path}`);
  process.exit(1);
}

const frontmatter = [
  '---',
  `title: '${title.replace(/'/g, "\\'")}'`,
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
console.log(`(a future pubDate needs a rebuild that day — handled by the nightly rebuild)`);
