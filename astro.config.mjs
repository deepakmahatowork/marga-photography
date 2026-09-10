// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import node from '@astrojs/node';

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

  redirects: {
    '/tours/nepal-photography': '/expeditions',
    '/tours/mustang-tiji-photography': '/expeditions/tiji-festival-upper-mustang',
    '/tours/everest-gokyo-photo': '/expeditions/gokyo-everest-high-himalaya',
    '/tours/wildlife-photography-nepal': '/expeditions/bardia-chitwan-wildlife-expedition',
    '/gallery': '/explore/people',
  },

  adapter: node({
    mode: 'standalone'
  })
});