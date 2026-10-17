// Single source of truth for site-wide metadata.
// Change these values to make the site yours — no need to touch any component.

export const SITE = {
  /** Used in <title>, header, RSS and sitemap */
  title: 'Untagged',
  /** Shown next to the title in the footer / meta description */
  description:
    'Personal notes on networking, WiFi, Linux and AI — plus everything that refuses to be tagged.',
  /** Your name, used for bylines and the about page */
  author: 'Simon',
  /** Shown as the big heading on the home page */
  tagline: 'Notes without tags',
  /** Base language of the site */
  locale: 'en',
  /** Optional links shown in the footer. Remove or extend freely. */
  social: {
    github: 'https://github.com/yourname',
    email: 'mailto:hello@example.com',
  },
};

/** Number of posts shown on the home page before the "all posts" link takes over */
export const POSTS_ON_HOME = 5;
