import { motion } from 'motion/react'

export default function GridItem({ size = 'small', children }) {
  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.8 },
  }

  let colsize = 'col-span-2  md:col-span-1 h-[300px]'
  if (size === 'medium') colsize = 'col-span-2 h-auto md:h-[300px]'

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{
        type: 'spring',
        stiffness: 100,
        velocity: 0.1,
      }}
      className={colsize}
    >
      {children}
    </motion.div>
  )
}
