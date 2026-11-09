import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { page, main } from './helpers.mjs'

const MAIL = 'hello@felroz.com'

describe('contact page', () => {
  const routes = {
    '/contact': {
      lead: 'Une question, une idée, un projet ? Écrivez-moi.',
      languages: 'Je réponds en espagnol, en français ou en anglais.',
    },
    '/en/contact': {
      lead: 'A question, an idea, a project? Write to me.',
      languages: 'I answer in Spanish, French or English.',
    },
  }
  for (const [route, copy] of Object.entries(routes)) {
    const html = page(route)
    const m = main(html)

    test(`${route}: ghost title`, () => {
      assert.match(m, /<h1[^>]*>[\s\S]*Contact/)
    })
    test(`${route}: the email is the one signal`, () => {
      const hits = m.match(/(?:text|bg)-signal/g) ?? []
      assert.equal(hits.length, 1)
      assert.match(m, new RegExp(`<a[^>]*href="mailto:${MAIL}"[^>]*>[^]*?text-signal`))
      assert.match(m, new RegExp(`<a[^>]*text-signal[^>]*href="mailto:${MAIL}"|<a[^>]*href="mailto:${MAIL}"[^>]*text-signal|<a[^>]*href="mailto:${MAIL}"[^>]*>\\s*<span[^>]*text-signal`))
    })
    test(`${route}: socials`, () => {
      assert.ok(m.includes('https://www.linkedin.com/in/isfelroz'))
      assert.ok(m.includes('https://github.com/isfelroz'))
    })
    test(`${route}: no Annecy`, () => {
      assert.ok(!m.includes('Annecy'))
    })
    test(`${route}: copy button is hidden until JS enables it`, () => {
      assert.match(m, new RegExp(`<button[^>]*data-copy="${MAIL}"[^>]*hidden`))
      assert.match(m, /aria-live="polite"/)
    })
    test(`${route}: copy`, () => {
      assert.ok(m.includes(copy.lead))
      assert.ok(m.includes(copy.languages))
    })
  }
})

describe('projects page', () => {
  const routes = {
    '/projets': {
      crm: ['CRM de vols', "Il remplace l'app de 2022 : API et front séparés."],
      intranet: ['Intranet de groupe', 'Elle remplace un Drupal pour plus de 100 collaborateurs.'],
      title: /CAMO[\s\S]*mécaniciens/,
    },
    '/en/projects': {
      crm: ['Flight CRM', 'It replaces the 2022 app: separate API and front end.'],
      intranet: ['Group intranet', 'It replaces a Drupal site for more than 100 colleagues.'],
      title: /CAMO[\s\S]*mechanics/,
    },
  }
  const stacks = { crm: ['Nuxt', 'Laravel', 'Docker'], intranet: ['Nuxt', 'PostgreSQL', 'MS Graph'] }
  const years = { crm: '2026', intranet: '2025' }
  for (const [route, copy] of Object.entries(routes)) {
    const m = main(page(route))
    const articles = [...m.matchAll(/<article[^>]*data-project="(\w+)"[^>]*>([\s\S]*?)<\/article>/g)]
    const byId = Object.fromEntries(articles.map((a) => [a[1], a[2]]))

    test(`${route}: cards follow the data`, () => {
      assert.deepEqual(articles.map((a) => a[1]), ['crm', 'intranet'])
    })
    test(`${route}: no links in cards`, () => {
      for (const a of articles) assert.ok(!/<a[\s>]/.test(a[2]))
    })
    test(`${route}: three chips each`, () => {
      for (const [id, stack] of Object.entries(stacks)) {
        const chips = [...byId[id].matchAll(/<li[^>]*>([^<]*)<\/li>/g)].map((c) => c[1].trim())
        assert.deepEqual(chips, stack)
      }
    })
    test(`${route}: crm drawing is named`, () => {
      assert.match(byId.crm, /<svg[^>]*role="img"[\s\S]*?<title[^>]*>[^<]*CAMO[^<]*<\/title>/)
      assert.match(byId.crm.match(/<title[^>]*>([^<]*)<\/title>/)[1], copy.title)
    })
    test(`${route}: copy and years`, () => {
      for (const id of ['crm', 'intranet']) {
        for (const text of copy[id]) assert.ok(byId[id].includes(text.replace("'", "&#39;")) || byId[id].includes(text), text)
        assert.ok(byId[id].includes(years[id]))
      }
    })
    test(`${route}: no lead, no felroz project`, () => {
      assert.ok(!m.includes('felroz.com'))
      const between = m.slice(m.indexOf('</h1>'), m.indexOf('<article'))
      assert.equal(between.replace(/<[^>]*>/g, '').trim(), '')
    })
    test(`${route}: signal`, () => {
      assert.ok((m.match(/(?:text|bg)-signal/g) ?? []).length <= 1)
    })
  }
})

