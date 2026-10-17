// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: Set to your production URL before deploying (used for sitemap + RSS)
  site: 'https://example.com',
  integrations: [sitemap()],
  markdown: {
    // Both themes ship as CSS variables; global.css picks one per color scheme
    shikiConfig: {
      themes: { light: 'github-light-default', dark: 'github-dark-default' },
      defaultColor: false,
    },
  },
});
