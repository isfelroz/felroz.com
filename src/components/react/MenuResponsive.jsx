import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function MenuResponsive({ links, pathname, contact, language, labels }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={labels.open}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid size-11 place-items-center rounded-full cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <FaBars size="22px" aria-hidden="true" />
      </button>
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed top-0 right-0 z-20 h-dvh w-[90%] bg-carbone/95 radialBackground_alt transition-[translate,visibility] duration-500 ease-out ${
          open ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <div className="relative flex h-full flex-col p-10">
          <button
            type="button"
            aria-label={labels.close}
            className="absolute top-6 right-6 grid size-11 place-items-center rounded-full cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <FaTimes size="22px" aria-hidden="true" />
          </button>
          <nav aria-label={labels.nav} className="flex grow flex-col justify-center">
            <ul className="flex flex-col items-center gap-16">
              {links.map((link) => {
                const active = pathname === link.href
                return (
                  <li key={link.href}>
                    <a
                      className={`border-b-2 text-4xl font-bold uppercase tracking-[-0.02em] ${
                        active ? 'border-corail' : 'border-transparent'
                      }`}
                      aria-current={active ? 'page' : undefined}
                      href={link.href}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="flex items-center justify-between gap-4">
            <a
              href={language.href}
              hrefLang={language.hreflang}
              lang={language.hreflang}
              aria-label={language.label}
              className="label-mono text-label-dark hover:text-white"
            >
              {language.code}
            </a>
            <a href={contact.href} className="rounded-full bg-signal px-5 py-2.5 font-medium">
              {contact.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
