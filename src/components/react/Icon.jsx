import {
  SiJavascript,
  SiThreedotjs,
  SiReact,
  SiTailwindcss,
  SiGithub,
} from 'react-icons/si'
import { TbBrandNextjs } from 'react-icons/tb'
import { DiNpm } from 'react-icons/di'
import { FaTwitter, FaLinkedin } from 'react-icons/fa'
import { BsArrowUpRightCircle } from 'react-icons/bs'

export default function Icon({ type, size, hover = false }) {
  if (type === 'react') return <SiReact size={size} />
  if (type === 'threejs')
    return <SiThreedotjs className="translate-x-1" size={'40px'} />
  if (type === 'nextjs') return <TbBrandNextjs size={size} />
  if (type === 'tailwind') return <SiTailwindcss size={size} />
  if (type === 'javascript') return <SiJavascript size={size} />
  if (type === 'twitter')
    return (
      <FaTwitter
        className={hover ? `hover:fill-twitter transition-all` : ''}
        size={size}
      />
    )
  if (type === 'linkedin')
    return (
      <FaLinkedin
        className={hover ? 'hover:fill-linkedin transition-all' : ''}
        size={size}
      />
    )
  if (type === 'npm')
    return (
      <DiNpm
        className={hover ? 'hover:fill-npm transition-all' : ''}
        size={size}
      />
    )
  if (type === 'github')
    return (
      <SiGithub
        className={hover ? 'hover:fill-github transition-all' : ''}
        size={size}
      />
    )
  if (type === 'arrow')
    return (
      <BsArrowUpRightCircle
        size={'30px'}
        className="fill-gray-400 rotate-45 transition-all group-hover:fill-primary  group-hover:rotate-0"
      />
    )
  return null
}
