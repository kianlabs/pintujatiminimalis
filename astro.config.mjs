import { defineConfig } from 'astro/config'
import tailwind from '@tailwindcss/vite'
import react from '@astrojs/react'

export default defineConfig({
  site: 'https://pintujatiminimalis.my.id',
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
  },
})
