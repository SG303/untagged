// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Production URL (used for the sitemap + RSS links)
  site: 'https://untagged.dev',
  integrations: [sitemap()],
  markdown: {
    // Both themes ship as CSS variables; global.css picks one per color scheme
    shikiConfig: {
      themes: { light: 'github-light-default', dark: 'github-dark-default' },
      defaultColor: false,
    },
  },
});
