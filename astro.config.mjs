import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL;

export default defineConfig({
  ...(site ? { site, trailingSlash: 'never' } : {}),
  integrations: site ? [sitemap({ filter: (page) => !page.includes('/og/') })] : [],
  vite: {
    plugins: [tailwindcss()],
  },
});
