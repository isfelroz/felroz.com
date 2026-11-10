import fr from './fr.json'
import en from './en.json'

export const defaultLocale = 'fr'
export const locales = ['fr', 'en']

/** Route keys → localized paths. FR is unprefixed, EN lives under /en. */
export const routes = {
  home: { fr: '/', en: '/en' },
  about: { fr: '/a-propos', en: '/en/about' },
  projects: { fr: '/projets', en: '/en/projects' },
  resume: { fr: '/parcours', en: '/en/journey' },
  contact: { fr: '/contact', en: '/en/contact' },
}

export const ogLocales = { fr: 'fr_FR', en: 'en_US' }

const dictionaries = { fr, en }

export const useTranslations = (locale = defaultLocale) =>
  dictionaries[locale] ?? dictionaries[defaultLocale]

export const localizePath = (routeKey, locale = defaultLocale) =>
  routes[routeKey]?.[locale] ?? routes.home[locale]

export const otherLocale = (locale) => (locale === 'fr' ? 'en' : 'fr')
