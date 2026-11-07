import { test } from 'node:test'
import assert from 'node:assert/strict'
import { page } from './helpers.mjs'

test('parcours pages exist', () => {
  assert.match(page('/parcours'), /<title>Parcours · felroz<\/title>/)
  assert.match(page('/en/journey'), /<title>Journey · felroz<\/title>/)
})

test('old resume URLs redirect', () => {
  assert.match(page('/cv'), /url=\/parcours/)
  assert.match(page('/resume'), /url=\/parcours/)
  assert.match(page('/en/resume'), /url=\/en\/journey/)
})

test('language switch and hreflang on journey', () => {
  const en = page('/en/journey')
  assert.match(en, /href="\/parcours"[^>]*hreflang="fr"|hreflang="fr"[^>]*href="\/parcours"/)
  assert.match(page('/parcours'), /hreflang="en"[^>]*href="https:\/\/felroz\.com\/en\/journey"/)
})

test('nav order is Projets · Parcours · À propos', () => {
  const nav = page('/').match(/<nav[\s\S]*?<\/nav>/)[0]
  assert.ok(nav.indexOf('Projets') < nav.indexOf('Parcours') && nav.indexOf('Parcours') < nav.indexOf('À propos'))
})

test('home meta copy', () => {
  assert.match(page('/'), /<title>felroz — Développeur full-stack (&amp;|&#38;|&) ingénieur IA<\/title>/)
  assert.match(page('/en'), /<title>felroz — Full-stack developer (&amp;|&#38;|&) AI engineer<\/title>/)
})
