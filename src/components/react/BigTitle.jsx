import { motion } from 'motion/react'
export default function BigTitle({ children }) {
  return (
    <div className="overflow-hidden">
      <motion.h1
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="xl:text-12xl lg:text-9xl text-7xl font-bold text-center drop-shadow-sm py-4 opacity-10"
      >
        {children}
      </motion.h1>
    </div>
  )
}
