import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../consts';

/** Format an instant as YYYY-MM-DD in the configured site timezone. */
function calendarDay(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * A post is publicly visible when it is not a draft AND its publish
 * calendar date has arrived in SITE.timezone. This powers "scheduled
 * publishing" without hiding a post written shortly after local midnight
 * (when UTC is still on the previous day).
 */
export function isPublished(
  post: CollectionEntry<'blog'>,
  now: Date = new Date(),
): boolean {
  if (post.data.draft) return false;
  const pubDay = post.data.pubDate.toISOString().slice(0, 10);
  return pubDay <= calendarDay(now, SITE.timezone);
}

/** All visible posts, newest first. */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  return (await getCollection('blog', (post) => isPublished(post))).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}
