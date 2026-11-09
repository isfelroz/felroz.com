/**
 * Parcours scrollytelling. Marks the chapter crossing the middle of the viewport, and its node on the
 * route panel, with `data-active`; `data-live` on the root turns on the dimming of the other chapters.
 * Driven only by the visitor's scroll. Runs only at ≥1101 px without reduced motion; otherwise every
 * chapter stays as rendered (full).
 */
const QUERY = '(min-width: 1101px) and (prefers-reduced-motion: no-preference)'

export function initJourney(root) {
  if (!root) return
  const chapters = [...root.querySelectorAll('[data-stage]')]
  const nodes = new Map([...root.querySelectorAll('[data-node]')].map((n) => [n.dataset.node, n]))
  if (!chapters.length) return

  let observer
  let current

  const activate = (chapter) => {
    if (chapter === current) return
    if (current) {
      delete current.dataset.active
      delete nodes.get(current.dataset.stage)?.dataset.active
    }
    current = chapter
    chapter.dataset.active = ''
    const node = nodes.get(chapter.dataset.stage)
    if (node) node.dataset.active = ''
  }

  const start = () => {
    root.dataset.live = ''
    activate(chapters[0])
    // A zero-height band at mid-viewport: the chapter that crosses it is the one being read.
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) activate(entry.target)
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    chapters.forEach((c) => observer.observe(c))
  }

  const stop = () => {
    observer?.disconnect()
    observer = undefined
    delete root.dataset.live
    if (current) {
      delete current.dataset.active
      delete nodes.get(current.dataset.stage)?.dataset.active
    }
    current = undefined
  }

  const media = window.matchMedia(QUERY)
  const sync = () => (media.matches ? start() : stop())
  media.addEventListener('change', () => {
    stop()
    sync()
  })
  sync()
}
