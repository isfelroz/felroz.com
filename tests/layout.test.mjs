import test from 'node:test'
import assert from 'node:assert/strict'
import { page } from './helpers.mjs'

for (const r of ['/', '/en', '/projets', '/parcours', '/a-propos', '/contact'])
  test(`dot field on ${r}`, () => assert.match(page(r), /<canvas[^>]*data-dot-field[^>]*aria-hidden="true"/))
