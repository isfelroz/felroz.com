import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

/** Returns the built HTML for a route ('/' → dist/index.html). Throws if missing. */
export const page = (route) => {
  const file = join(dist, route === '/' ? '' : route, 'index.html')
  if (!existsSync(file)) throw new Error(`Missing build output: ${file}`)
  return readFileSync(file, 'utf8')
}
