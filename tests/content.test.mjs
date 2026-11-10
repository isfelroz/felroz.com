import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { page, pages, main, forbiddenWords } from './helpers.mjs'

const data = JSON.parse(readFileSync(new URL('../src/data/global.json', import.meta.url), 'utf8'))

test('global.json email', () => {
  assert.equal(data.email, 'hello@felroz.com')
})

test('projects data', () => {
  assert.deepEqual(data.projects.map((p) => p.id), ['crm', 'intranet'])
  for (const p of data.projects) assert.equal(p.stack.length, 3)
})

test('journey data', () => {
  assert.deepEqual(
    data.journey.map((j) => j.id),
    ['start', 'factory', 'annecy', 'bachelor', 'ios', 'ceovision', 'walt', 'mba', 'hbg'],
  )
  const diplomas = data.journey.filter((j) => j.kind === 'diploma')
  assert.equal(diplomas.length, 1)
  assert.equal(diplomas[0].id, 'mba')
  assert.equal(diplomas[0].label, 'Bac+5')
})

const INNER = ['/projets', '/parcours', '/a-propos', '/contact', '/en/projects', '/en/journey', '/en/about', '/en/contact']

test('pages() finds the built routes', () => {
  const all = pages()
  assert.ok(all.length >= 2)
  assert.ok(all.includes('/') && all.includes('/en'))
})

test('no forbidden strings in dist', () => {
  for (const route of pages()) {
    const html = page(route)
    assert.deepEqual(forbiddenWords(html), [], `${route} contains forbidden words`)
    const raw = html.replace(/<style[\s\S]*?<\/style>/gi, '')
    const emails = (raw.match(/[\w.+-]+@[\w-]+\.[a-z]{2,}/gi) ?? []).filter(
      (m) => !/@\d+x\./i.test(m),
    )
    for (const m of emails) assert.equal(m, 'hello@felroz.com', `${route} shows ${m}`)
    for (const m of raw.match(/mailto:[^"'\s>?]+/gi) ?? []) {
      assert.equal(m, 'mailto:hello@felroz.com', `${route} has ${m}`)
    }
  }
})

test('no commit counts', () => {
  for (const route of ['/', '/en', ...INNER]) {
    assert.ok(main(page(route)).length > 0, `${route} has no <main>`)
  }
  for (const route of pages()) {
    assert.doesNotMatch(main(page(route)), /\bcommits?\b/i, route)
  }
})

test('forbiddenWords flags a planted word and ignores clean text', () => {
  const planted = ['Carre', 'four'].join('')
  assert.deepEqual(forbiddenWords(`<p>Clients like ${planted}, others</p>`), [planted.toLowerCase()])
  assert.deepEqual(forbiddenWords('<p>Nothing to see here, plain text.</p>'), [])
})
