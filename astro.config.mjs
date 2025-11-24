// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://prestonspeakingclub.co.uk',

  // Enable server mode for API endpoints
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),

  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow webhooks from tunnel services (pinggy, ngrok, etc.)
      allowedHosts: ['.pinggy.link', '.ngrok.app', '.loca.lt']
    }
  },

  integrations: [react(), sitemap()]
});