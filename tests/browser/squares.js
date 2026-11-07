// Run in the page (agent-browser eval). Returns JSON { ok, bad: [...] }.
// Desktop (>=1101px): 1x1 tiles and the 2x2 hero are square, 2x1 tiles are one row tall (±1px).
// Every width: no card face overflows vertically or outgrows its tile, no horizontal page scroll.
;(() => {
  const bad = []
  const desktop = innerWidth >= 1101
  const gap = parseFloat(getComputedStyle(document.querySelector('.bento')).rowGap)
  for (const tile of document.querySelectorAll('.tile')) {
    const area = tile.style.gridArea.split('/')[0].trim()
    const size = tile.dataset.size
    const { width: w, height: h } = tile.getBoundingClientRect()
    if (desktop && (size === '1x1' || size === '2x2') && Math.abs(w - h) > 1)
      bad.push({ area, size, w: Math.round(w), h: Math.round(h), why: 'not square' })
    if (desktop && size === '2x1' && Math.abs((w - gap) / 2 - h) > 1)
      bad.push({ area, size, w: Math.round(w), h: Math.round(h), why: 'not one row tall' })
    for (const face of tile.querySelectorAll('[data-card-face]')) {
      if (face.scrollHeight > face.clientHeight + 1)
        bad.push({ area, size, scrollHeight: face.scrollHeight, clientHeight: face.clientHeight, why: 'overflow' })
      const fh = face.offsetHeight
      if (fh > h + 1) bad.push({ area, size, face: fh, tile: Math.round(h), why: 'face taller than tile' })
    }
  }
  const sw = document.documentElement.scrollWidth
  if (sw > innerWidth) bad.push({ why: 'horizontal scroll', scrollWidth: sw, innerWidth })
  return JSON.stringify(bad.length ? { ok: false, bad } : { ok: true })
})()
