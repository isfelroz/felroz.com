import { test } from 'node:test'
import assert from 'node:assert/strict'
import { illustrationKey, ILLUSTRATIONS } from '../src/lib/projects.js'

test('illustrationKey returns a known illustration', () => {
  assert.deepEqual(ILLUSTRATIONS, ['crm', 'intranet'])
  assert.equal(illustrationKey({ illustration: 'crm' }), 'crm')
  assert.equal(illustrationKey({ illustration: 'intranet' }), 'intranet')
})
test('illustrationKey falls back to default', () => {
  assert.equal(illustrationKey({}), 'default')
  assert.equal(illustrationKey({ illustration: 'nope' }), 'default')
})
