import { defineConfig } from 'astro/config'
import tailwind from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://pintujatiminimalis-astro.vercel.app',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwind()],
  },
})
