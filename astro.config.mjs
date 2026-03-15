// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';



// https://astro.build/config
export default defineConfig({
  site: 'https://scot.wtf',
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['meowintosh.local'],
      host: true
    }
  },

  integrations: [mdx(), sitemap()]
});