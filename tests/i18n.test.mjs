import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const load = (f) => JSON.parse(readFileSync(new URL(`../src/i18n/${f}.json`, import.meta.url), 'utf8'))

const keyPaths = (v, prefix = '') => {
  if (Array.isArray(v)) {
    return [`${prefix}[${v.length}]`, ...v.flatMap((x, i) => keyPaths(x, `${prefix}[${i}]`))]
  }
  if (v && typeof v === 'object') {
    return Object.keys(v).flatMap((k) => [`${prefix}.${k}`, ...keyPaths(v[k], `${prefix}.${k}`)])
  }
  return []
}

test('fr and en have the same keys', () => {
  assert.deepEqual(keyPaths(load('fr')).sort(), keyPaths(load('en')).sort())
})
