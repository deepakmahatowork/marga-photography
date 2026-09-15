// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';
import node from '@astrojs/node';

const isNetlify = Boolean(process.env.NETLIFY);

// https://astro.build/config
export default defineConfig({
  site: 'https://margaphotography.com',

  vite: {
    plugins: [tailwindcss()]
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  integrations: [sitemap()],

  adapter: isNetlify ? netlify() : node({ mode: 'standalone' })
});