// Run in the page (agent-browser eval) at desktop width, right after opening /. Returns JSON
// { loaded, glbBeforePaint, posterAfterError }. Expected: {"loaded":true,"glbBeforePaint":false,"posterAfterError":true}.
// Note: the last step swaps in a missing model, so reload the page before looking at it.
;(async () => {
  const mv = document.querySelector('[data-avatar]')
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

  // loaded: the model's `loaded` property, waiting up to 8s
  for (let t = 0; t < 80 && !mv.loaded; t++) await sleep(100)
  const loaded = mv.loaded === true

  // glbBeforePaint: was the model requested before first contentful paint?
  const glb = performance.getEntriesByName(location.origin + '/models/memoji.glb')[0]
  const fcp = performance.getEntriesByType('paint').find((p) => p.name === 'first-contentful-paint')
  const glbBeforePaint = glb?.startTime < fcp?.startTime

  // posterAfterError: a missing model falls back to a visible poster
  const failed = new Promise((r) => mv.addEventListener('error', r, { once: true }))
  mv.src = '/models/missing.glb'
  await Promise.race([failed, sleep(8000)])
  await sleep(300)
  const poster = mv.querySelector('img[slot="poster"]')
  const posterAfterError = !!poster && poster.offsetHeight > 0 && getComputedStyle(poster).visibility !== 'hidden'

  return JSON.stringify({ loaded, glbBeforePaint, posterAfterError })
})()
