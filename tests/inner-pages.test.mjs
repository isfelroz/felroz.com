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
