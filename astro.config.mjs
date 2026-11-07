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
    '/resume': '/cv',
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
})
