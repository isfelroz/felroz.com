
import { FaHamburger, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

export default function MenuResponsive({ links, pathname }) {
  const [open, isOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <div
        className={`fixed backdrop-blur-xl bg-primary-black/95 radialBackground_alt top-0 h-screen w-[90%] transition-all duration-500 ${
          open ? 'right-0' : '-right-[100%]'
        }`}
      >
        <div className="relative p-10 w-full h-full">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute top-8 right-8 cursor-pointer"
            onClick={() => isOpen(false)}
          >
            <FaTimes size={'25px'} />
          </button>
          {links && links?.length && (
            <ul className="flex flex-col gap-24 h-full justify-center">
              {links.map((link, key) => (
                <li
                  onClick={() => isOpen(false)}
                  key={key}
                  className={`text-white drop-shadow-sm font-bold uppercase text-4xl text-center `}
                >
                  <a
                    className={`border-b-2 ${
                      pathname === link.href
                        ? 'border-primary'
                        : 'border-transparent'
                    }`}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button
        type="button"
        aria-label="Open menu"
        className="lg:hidden cursor-pointer"
        onClick={() => isOpen(true)}
      >
        <FaHamburger size={'25px'} />
      </button>
    </div>
  )
}
