import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { page, pages, main } from './helpers.mjs'

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

test('no forbidden strings in dist', () => {
  for (const route of pages()) {
    const html = page(route)
    for (const bad of ['INTERNAL_NAME', '@gmail']) {
      assert.ok(!html.includes(bad), `${route} contains ${bad}`)
    }
    const visible = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
    const emails = (visible.match(/[\w.+-]+@[\w-]+\.[a-z]{2,}/gi) ?? []).filter(
      (m) => !/\.(png|jpe?g|webp|svg|js|css|glb)$/i.test(m),
    )
    for (const m of emails) assert.equal(m, 'hello@felroz.com', `${route} shows ${m}`)
  }
})

test('no commit counts', () => {
  for (const route of pages()) {
    assert.doesNotMatch(main(page(route)), /\bcommits?\b/i, route)
  }
})
