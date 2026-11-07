import {
  SiDocker,
  SiGithub,
  SiLaravel,
  SiNuxt,
  SiPostgresql,
  SiPython,
  SiTypescript,
} from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { LuAppWindow, LuBraces, LuRocket, LuSmartphone, LuSparkles, LuWorkflow } from 'react-icons/lu'
import { BsArrowUpRightCircle } from 'react-icons/bs'

const icons = {
  typescript: SiTypescript,
  python: SiPython,
  laravel: SiLaravel,
  nuxt: SiNuxt,
  docker: SiDocker,
  postgresql: SiPostgresql,
  github: SiGithub,
  linkedin: FaLinkedin,
  // Neutral line glyphs for Savoir-faire (spec §6 call 5: no brand logos there)
  api: LuBraces,
  web: LuAppWindow,
  mobile: LuSmartphone,
  automation: LuWorkflow,
  deploy: LuRocket,
  agents: LuSparkles,
}

const hoverFill = {
  github: 'hover:fill-github',
  linkedin: 'hover:fill-linkedin',
}

export default function Icon({ type, size, hover = false }) {
  if (type === 'arrow')
    return (
      <BsArrowUpRightCircle
        size="30px"
        aria-hidden="true"
        className="fill-label-dark rotate-45 transition-all group-hover:fill-corail group-hover:rotate-0 group-focus-visible:fill-corail group-focus-visible:rotate-0"
      />
    )

  const Component = icons[type]
  if (!Component) return null

  return (
    <Component
      size={size}
      aria-hidden="true"
      className={hover ? `${hoverFill[type] ?? ''} transition-colors` : ''}
    />
  )
}
