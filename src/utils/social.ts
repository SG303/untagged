import { SITE } from '../consts';

const LABELS: Record<string, string> = {
  github: 'GitHub',
  gitlab: 'GitLab',
  linkedin: 'LinkedIn',
  mastodon: 'Mastodon',
  bluesky: 'Bluesky',
  twitter: 'Twitter',
  x: 'X',
  email: 'Email',
};

/** SITE.social as display-ready links, in the order they are declared. */
export const socialLinks = Object.entries(SITE.social as Record<string, string>)
  .filter(([, href]) => Boolean(href))
  .map(([key, href]) => ({
    key,
    href,
    label: LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1),
  }));
