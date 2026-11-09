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
