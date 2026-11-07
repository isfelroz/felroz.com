// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://felroz.com',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  redirects: {
    '/about': '/a-propos',
    '/works': '/projets',
    '/resume': '/parcours',
    '/cv': '/parcours',
    '/en/resume': '/en/journey',
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    // model-viewer + three is one ~1 MB chunk, fetched only by the hero's lazy import()
    build: { chunkSizeWarningLimit: 1100 },
  },
})
