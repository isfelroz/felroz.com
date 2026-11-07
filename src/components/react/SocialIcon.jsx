import { SiGithub } from 'react-icons/si'
import { DiNpm } from 'react-icons/di'
import { FaTwitter, FaLinkedin } from 'react-icons/fa'

export default function SocialIcon({ type, size }) {
  if (type === 'twitter') return <FaTwitter size={size} />
  if (type === 'linkedin') return <FaLinkedin size={size} />
  if (type === 'npm') return <DiNpm size={size} />
  if (type === 'github') return <SiGithub size={size} />
  return null
}
