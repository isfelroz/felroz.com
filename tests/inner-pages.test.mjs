import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { page, main, reducedMotionBlocks } from './helpers.mjs'

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


describe('journey page', () => {
  const data = JSON.parse(readFileSync(new URL('../src/data/global.json', import.meta.url), 'utf8'))
  const ids = data.journey.map((j) => j.id)
  const decode = (s) => s.replace(/&#39;|&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"')
  const routes = {
    '/parcours': {
      chip: 'RNCP niveau 7',
      signal: 'pipeline de déploiement',
      projects: '/projets',
      copy: [
        'Alicia Giraldo, confection pour de grandes marques.',
        "J'arrive à Annecy.",
        "Sur GoFAST, l'alternative open source à Microsoft 365.",
        'MBA Développeur Full Stack & management de projets',
      ],
    },
    '/en/journey': {
      chip: 'RNCP level 7',
      signal: 'deployment pipeline',
      projects: '/en/projects',
      copy: ['I arrive in Annecy.', 'See the projects'],
    },
  }
  for (const [route, copy] of Object.entries(routes)) {
    const m = main(page(route))
    const chapters = [...m.matchAll(/<article([^>]*\sdata-stage="([\w-]+)"[^>]*)>([\s\S]*?)<\/article>/g)]
    const byId = Object.fromEntries(chapters.map((c) => [c[2], { attrs: c[1], body: c[3] }]))
    const nodeTag = (id) => m.match(new RegExp(`<[^>]*\\sdata-node="${id}"[^>]*>`))?.[0]

    test(`${route}: stages in order, one node each`, () => {
      assert.deepEqual(chapters.map((c) => c[2]), ids)
      for (const id of ids) assert.ok(nodeTag(id), `no node for ${id}`)
    })
    test(`${route}: readable without JS`, () => {
      for (const c of chapters) {
        assert.doesNotMatch(c[1], /\shidden[\s=>]|\shidden$|aria-hidden="true"|opacity:\s*0/, c[2])
      }
      assert.doesNotMatch(m, /\sdata-active[\s=>]/)
    })
    test(`${route}: MBA weight`, () => {
      assert.match(byId.mba.attrs, /data-kind="diploma"/)
      assert.ok(byId.mba.body.includes('Bac+5'))
      assert.ok(byId.mba.body.includes(copy.chip))
      assert.match(nodeTag('mba'), /data-ring="double"/)
    })
    test(`${route}: one signal on the pipeline`, () => {
      const hits = m.match(/(?:text|bg)-signal/g) ?? []
      assert.equal(hits.length, 1)
      assert.match(m, new RegExp(`class="[^"]*text-signal[^"]*"[^>]*>${copy.signal}</`))
    })
    test(`${route}: HBG links to projects`, () => {
      assert.ok(byId.hbg.body.includes(`<a href="${copy.projects}"`))
    })
    test(`${route}: copy`, () => {
      const text = decode(m)
      for (const s of copy.copy) assert.ok(text.includes(s), s)
    })
  }

  test('reduced motion CSS', () => {
    const dir = new URL('../dist/_astro/', import.meta.url)
    const css = [
      ...readdirSync(dir).filter((f) => f.endsWith('.css')).map((f) => readFileSync(new URL(f, dir), 'utf8')),
      ...[...page('/parcours').matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((s) => s[1]),
    ].join('\n')
    assert.ok(reducedMotionBlocks(css).some((b) => /\[data-stage|\.route-panel/.test(b)))
  })
})

describe('about page', () => {
  const decode = (s) => s.replace(/&#39;|&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"')
  const routes = {
    '/a-propos': {
      title: 'À propos',
      signal: 'je passe au code',
      tools: ['Microsoft Graph / SharePoint, Entra ID', 'Développement agentique (Claude Code), MCP'],
      stations: [
        'La spec avant le code.',
        'Des issues, pas des post-it.',
        'Une revue avant chaque merge.',
        'Des agents IA, sous contrôle.',
      ],
      offcode: ['Photographie', 'Culture urbaine', 'Pizza au pepperoni'],
    },
    '/en/about': {
      title: 'About me',
      signal: 'switch to code',
      tools: ['Microsoft Graph / SharePoint, Entra ID', 'Agentic development (Claude Code), MCP'],
      stations: [
        'Spec before code.',
        'Issues, not sticky notes.',
        'A review before every merge.',
        'AI agents, kept in check.',
      ],
      offcode: ['Photography', 'Street culture', 'Pepperoni pizza'],
    },
  }
  const section = (m, id) => m.match(new RegExp(`<section[^>]*\\sid="${id}"[^>]*>([\\s\\S]*?)</section>`))?.[1] ?? ''

  for (const [route, copy] of Object.entries(routes)) {
    const m = main(page(route))

    test(`${route}: ghost title`, () => {
      assert.match(m, new RegExp(`<h1[^>]*>[\\s\\S]*${copy.title}`))
    })
    test(`${route}: sections in order`, () => {
      const ids = ['story', 'toolbox', 'method', 'offcode'].map((id) => m.indexOf(`id="${id}"`))
      for (const i of ids) assert.ok(i > -1)
      assert.deepEqual([...ids].sort((a, b) => a - b), ids)
    })
    test(`${route}: one signal on "${copy.signal}"`, () => {
      assert.equal((m.match(/(?:text|bg)-signal/g) ?? []).length, 1)
      assert.match(m, new RegExp(`class="[^"]*text-signal[^"]*"[^>]*>${copy.signal}</`))
    })
    test(`${route}: toolbox groups`, () => {
      const box = section(m, 'toolbox')
      const groups = [...box.matchAll(/data-group="([\w-]+)"/g)].map((g) => g[1])
      assert.deepEqual(groups, ['front', 'back', 'mobile', 'prod', 'integrations', 'ia'])
      const text = decode(box)
      for (const s of copy.tools) assert.ok(text.includes(s), s)
      assert.match(box, /<svg[^>]*class="[^"]*star-map[^"]*"[^>]*aria-hidden="true"|<svg[^>]*aria-hidden="true"[^>]*class="[^"]*star-map/)
    })
    test(`${route}: method stations`, () => {
      const titles = [...section(m, 'method').matchAll(/<h3[^>]*>([^<]*)<\/h3>/g)].map((h) => decode(h[1]).trim())
      assert.deepEqual(titles, copy.stations)
    })
    test(`${route}: badge`, () => {
      const img = section(m, 'story').match(/<img[^>]*>/)?.[0] ?? ''
      assert.match(img, /src="\/_astro\/me[^"]*"/)
      assert.match(img, /alt="[^"]+"/)
    })
    test(`${route}: off code`, () => {
      const text = decode(section(m, 'offcode'))
      for (const s of copy.offcode) assert.ok(text.includes(s), s)
    })
  }

  test('reduced motion CSS', () => {
    const dir = new URL('../dist/_astro/', import.meta.url)
    const css = [
      ...readdirSync(dir).filter((f) => f.endsWith('.css')).map((f) => readFileSync(new URL(f, dir), 'utf8')),
      ...[...page('/a-propos').matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((s) => s[1]),
    ].join('\n')
    assert.ok(reducedMotionBlocks(css).some((b) => /\.about-badge|\.offcode/.test(b)))
  })

  test('TitlePage gone', () => {
    assert.equal(existsSync(new URL('../src/views/TitlePage.astro', import.meta.url)), false)
  })
})
