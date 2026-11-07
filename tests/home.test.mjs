import { test } from 'node:test'
import assert from 'node:assert/strict'
import { page } from './helpers.mjs'

const decode = (s) =>
  s.replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')

/** The slice of HTML from the tile with `area` up to the next tile (or the end of the bento). */
const tileSlice = (html, area) => {
  const starts = [...html.matchAll(/<(?:div|section) class="tile[^"]*"[^>]*grid-area:\s*(\w+)/g)]
  const i = starts.findIndex((m) => m[1] === area)
  assert.ok(i >= 0, `tile ${area} not found`)
  const from = starts[i].index
  const to = starts[i + 1]?.index ?? html.indexOf('</main>', from)
  return { from, to, html: html.slice(from, to) }
}

const stackLabels = {
  '/': 'Stack : TypeScript, Nuxt, Laravel, PostgreSQL, Docker, Python. En savoir plus sur moi',
  '/en': 'Stack: TypeScript, Nuxt, Laravel, PostgreSQL, Docker, Python. More about me',
}

const paths = {
  '/': { resume: '/parcours', projects: '/projets', about: '/a-propos' },
  '/en': { resume: '/en/journey', projects: '/en/projects', about: '/en/about' },
}

for (const route of ['/', '/en']) {
  const html = page(route)
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'))

  test(`${route}: eight tiles in order`, () => {
    const areas = [...html.matchAll(/class="tile[^"]*"[^>]*grid-area:\s*(\w+)/g)].map((m) => m[1])
    assert.deepEqual(areas, ['hero', 'now', 'journey', 'skills', 'featured', 'stack', 'me', 'contact'])
  })

  test(`${route}: no nested links`, () => {
    let depth = 0
    for (const m of main.matchAll(/<a[\s>]|<\/a>/g)) {
      depth += m[0] === '</a>' ? -1 : 1
      assert.ok(depth <= 1 && depth >= 0, `link depth ${depth} at ${m.index}`)
    }
    assert.equal(depth, 0)
  })

  test(`${route}: HBG link only on now tile, new tab`, () => {
    const now = tileSlice(html, 'now')
    const hits = [...html.matchAll(/HBG Helicopters/g)]
    assert.ok(hits.length >= 1)
    for (const h of hits) assert.ok(h.index >= now.from && h.index < now.to, `HBG outside now tile at ${h.index}`)
    assert.match(now.html, /<a[^>]*href="https:\/\/www\.hbg-helicopteres\.aero\/"[^>]*target="_blank"[^>]*rel="[^"]*noopener/)
  })

  test(`${route}: no placeholder or forbidden copy`, () => {
    for (const s of ['à compléter', 'TODO', 'Travaillons ensemble', 'INTERNAL_NAME', '%</']) assert.ok(!html.includes(s), s)
  })

  test(`${route}: no client:load islands on home`, () => assert.ok(!/<astro-island[^>]*GridItem/.test(html)))

  test(`${route}: linked tiles point to their pages`, () => {
    const p = paths[route]
    const href = (area) => tileSlice(html, area).html.match(/<a[^>]*href="([^"]+)"/)?.[1]
    assert.equal(href('journey'), p.resume)
    assert.equal(href('featured'), p.projects)
    assert.equal(href('stack'), p.about)
    assert.equal(href('me'), p.about)
    for (const area of ['hero', 'skills']) assert.ok(!/<a[\s>]/.test(tileSlice(html, area).html), `${area} has a link`)
  })

  test(`${route}: stack tile is one link named after the stack`, () => {
    const stack = tileSlice(html, 'stack').html
    assert.equal(stack.match(/<a[\s>]/g).length, 1)
    const label = decode(stack.match(/<a[^>]*aria-label="([^"]+)"/)[1])
    for (const name of ['TypeScript', 'Nuxt', 'Laravel', 'PostgreSQL', 'Docker', 'Python']) assert.ok(label.includes(name), name)
  })

  test(`${route}: skills card lists six items and the toolbelt`, () => {
    const tile = tileSlice(html, 'skills').html
    assert.equal((tile.match(/<li/g) || []).length, 6)
    assert.match(tile, /Laravel · Nuxt · Vue · TypeScript · Docker/)
  })

  test(`${route}: stack card is one link whose name lists the stack`, () => {
    const tile = tileSlice(html, 'stack').html
    assert.equal((tile.match(/<a\b/g) || []).length, 1)
    assert.equal(decode(tile.match(/<a[^>]*aria-label="([^"]+)"/)[1]), stackLabels[route])
    assert.ok(!/tabindex="0"/.test(tile))
  })

  test(`${route}: tiles with a heading are labelled sections, others plain divs`, () => {
    for (const m of html.matchAll(/<(div|section) class="tile[^"]*"[^>]*>/g)) {
      const labelled = /aria-labelledby=/.test(m[0])
      assert.equal(m[1], labelled ? 'section' : 'div', m[0])
    }
  })

  test(`${route}: contact band has social pills and no email`, () => {
    const contact = tileSlice(html, 'contact').html
    for (const url of ['https://github.com/isfelroz', 'https://www.linkedin.com/in/isfelroz'])
      assert.match(contact, new RegExp(`<a[^>]*href="${url}"[^>]*target="_blank"[^>]*rel="me noopener"[^>]*aria-label="[^"]+"`))
    assert.ok(!/mailto:|@felroz\.com/.test(contact))
  })
}
