// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pechgroup.com',
  integrations: [
    sitemap({
      // Emits <xhtml:link rel="alternate" hreflang> for / ↔ /es/
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-MX' },
      },
    }),
  ],
});
