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
  /**
   * Optional links shown in the footer and about page (src/utils/social.ts maps
   * keys to labels; keys with falsy values are hidden). Add a real email back
   * when you want it public: email: 'mailto:you@…'.
   */
  social: {
    github: 'https://github.com/SG303',
    // SimpleLogin alias: real inbox stays private, replies route to it
    email: 'mailto:untagged.ubcrd@simplelogin.com',
  },
};
