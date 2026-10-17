import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * A post is publicly visible when it is not a draft AND its publish
 * date has arrived. This is what powers "scheduled publishing":
 * set `pubDate` to a future date and the post automatically appears
 * on that day, after the first rebuild (nightly rebuild via CI).
 */
export function isPublished(post: CollectionEntry<'blog'>): boolean {
  return !post.data.draft && post.data.pubDate <= new Date();
}

/** All visible posts, newest first. */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  return (await getCollection('blog', isPublished)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}
