// Run in the page (agent-browser eval). Returns JSON { ok, bad: [...] }.
// Desktop (>=1101px): 1x1 tiles and the 2x2 hero are square, 2x1 tiles are one row tall (±1px).
// Every width: no card face overflows (either axis) or outgrows its tile, no horizontal page scroll.
// Every width: no card face or direct tile child is wider than its tile or ends past its right edge,
// and no tile ends past the .bento container (body's overflow-x: clip hides that from scrollWidth).
;(() => {
  const bad = []
  const desktop = innerWidth >= 1101
  const bento = document.querySelector('.bento')
  const gap = parseFloat(getComputedStyle(bento).rowGap)
  const bentoRight = bento.getBoundingClientRect().right
  for (const tile of document.querySelectorAll('.tile')) {
    const area = tile.style.gridArea.split('/')[0].trim()
    const size = tile.dataset.size
    const { width: w, height: h, right } = tile.getBoundingClientRect()
    if (right > bentoRight + 1)
      bad.push({ area, size, right: Math.round(right), bento: Math.round(bentoRight), why: 'tile past bento' })
    for (const el of new Set([...tile.children, ...tile.querySelectorAll('[data-card-face]')])) {
      const r = el.getBoundingClientRect()
      if (r.width > w + 1 || r.right > right + 1)
        bad.push({ area, size, el: el.tagName.toLowerCase(), width: Math.round(r.width), tile: Math.round(w), right: Math.round(r.right), tileRight: Math.round(right), why: 'wider than tile' })
    }
    if (desktop && (size === '1x1' || size === '2x2') && Math.abs(w - h) > 1)
      bad.push({ area, size, w: Math.round(w), h: Math.round(h), why: 'not square' })
    if (desktop && size === '2x1' && Math.abs((w - gap) / 2 - h) > 1)
      bad.push({ area, size, w: Math.round(w), h: Math.round(h), why: 'not one row tall' })
    for (const face of tile.querySelectorAll('[data-card-face]')) {
      if (face.scrollHeight > face.clientHeight + 1)
        bad.push({ area, size, scrollHeight: face.scrollHeight, clientHeight: face.clientHeight, why: 'overflow' })
      if (face.scrollWidth > face.clientWidth + 1)
        bad.push({ area, size, scrollWidth: face.scrollWidth, clientWidth: face.clientWidth, why: 'horizontal overflow' })
      const fh = face.offsetHeight
      if (fh > h + 1) bad.push({ area, size, face: fh, tile: Math.round(h), why: 'face taller than tile' })
    }
  }
  const sw = document.documentElement.scrollWidth
  if (sw > innerWidth) bad.push({ why: 'horizontal scroll', scrollWidth: sw, innerWidth })
  return JSON.stringify(bad.length ? { ok: false, bad } : { ok: true })
})()
