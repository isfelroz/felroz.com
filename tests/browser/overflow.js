// Run in the page (agent-browser eval). Returns JSON { ok, bad: [...] }.
// No horizontal page scroll, nothing inside <main> starts before or ends past the viewport,
// and no project card or journey stage is wider inside than its box.
// (body's overflow-x: clip hides overflow from scrollWidth, hence the element scan.)
;(() => {
  const bad = []
  const sw = document.documentElement.scrollWidth
  if (sw > innerWidth) bad.push({ why: 'horizontal scroll', scrollWidth: sw, innerWidth })
  const main = document.querySelector('main')
  if (main)
    for (const el of main.querySelectorAll('*')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 && r.height === 0) continue
      if (r.left < -1)
        bad.push({ el: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(/\s+/)[0] : ''), left: Math.round(r.left), why: 'before viewport' })
      if (r.right > innerWidth + 1)
        bad.push({ el: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(/\s+/)[0] : ''), right: Math.round(r.right), innerWidth, why: 'past viewport' })
    }
  for (const el of document.querySelectorAll('[data-project], [data-stage]'))
    if (el.scrollWidth > el.clientWidth + 1)
      bad.push({ el: el.dataset.project || el.dataset.stage, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth, why: 'horizontal overflow' })
  return JSON.stringify(bad.length ? { ok: false, bad: bad.slice(0, 20) } : { ok: true })
})()
