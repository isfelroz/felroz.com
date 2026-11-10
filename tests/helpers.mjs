import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

/** Returns the built HTML for a route ('/' → dist/index.html). Throws if missing. */
export const page = (route) => {
  const file = join(dist, route === '/' ? '' : route, 'index.html')
  if (!existsSync(file)) throw new Error(`Missing build output: ${file}`)
  return readFileSync(file, 'utf8')
}

/** Every built route that has an index.html, as a route string ('/' , '/en', ...). */
export const pages = () => {
  const out = []
  const walk = (dir, rel) => {
    if (existsSync(join(dir, 'index.html'))) out.push(rel === '' ? '/' : `/${rel}`)
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(join(dir, e.name), rel ? `${rel}/${e.name}` : e.name)
    }
  }
  walk(dist, '')
  return out
}

/** The slice of HTML from <main to </main>. */
export const main = (html) => {
  const start = html.indexOf('<main')
  const end = html.indexOf('</main>')
  return start === -1 || end === -1 ? '' : html.slice(start, end + '</main>'.length)
}

// Words that must never appear in the built site. Stored as sha256 hashes so the repo itself never spells them.
const FORBIDDEN_HASHES = new Set([
  '6b6a48d3cf41831241d7e552ab116e92d71de68b5a4ec4a58f22bc8bcfdfb51c',
  '1a637788c9e469bd4e4ef4bf05507d20d3fa2c37e046f21a43ca06ed650b36a4',
  '5e41133f00a54dde180d32c8b23eeb475efeb807fafc733a13f1861039020a61',
  'f3bc7479b981a071368b816539586e1419524c6fd6d6867f7cdfb6d45f78cc5c',
])

/** Forbidden words found in `text` (any markup): lowercase tokens whose sha256 is on the blocklist. */
export const forbiddenWords = (text) => {
  const hits = new Set()
  for (const word of text.toLowerCase().split(/[^\p{L}\p{N}]+/u)) {
    if (word && FORBIDDEN_HASHES.has(createHash('sha256').update(word).digest('hex'))) hits.add(word)
  }
  return [...hits]
}

/** Bodies of every `@media (prefers-reduced-motion: reduce) { ... }` block in `css`, braces matched. */
export const reducedMotionBlocks = (css) => {
  const blocks = []
  const re = /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{/g
  for (let hit; (hit = re.exec(css)); ) {
    let depth = 1
    let i = re.lastIndex
    while (depth && i < css.length) (depth += css[i] === '{' ? 1 : css[i] === '}' ? -1 : 0), i++
    blocks.push(css.slice(re.lastIndex, i))
  }
  return blocks
}
