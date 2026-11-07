import { motion } from 'motion/react'

export default function ProgressCircle({
  percents = 80,
  emptyStroke = '#e2e2e2',
  emptyStrokeOpacity = 0.25,
  duration = 1,
  delay = 0.5,
  size = 100,
  strokeWidth = 13,
}) {
  const radius = 45
  const circumference = Math.ceil(2 * Math.PI * radius)
  const fillPercents = Math.abs(
    Math.ceil((circumference / 100) * (percents - 100))
  )

  const transition = {
    duration: duration,
    delay: delay,
    type: 'spring',
    stiffness: 50,
  }

  const variants = {
    hidden: {
      strokeDashoffset: circumference,
      transition,
    },
    show: {
      strokeDashoffset: fillPercents,
      transition,
    },
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 110 110"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <circle
          cx="55"
          cy="55"
          r={radius}
          className="circle"
          strokeWidth={strokeWidth}
          stroke={emptyStroke}
          strokeOpacity={emptyStrokeOpacity}
          fill="transparent"
        />
      </svg>
      <svg
        viewBox="0 0 110 110"
        width={size}
        height={size}
        style={{
          position: 'absolute',
          transform: 'rotate(-90deg) translate(50%, -50%)',
          overflow: 'visible',
          top: '50%',
          left: '50%',
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9E4B88" />
            <stop offset="50%" stopColor="#CA6678" />
            <stop offset="100%" stopColor="#E98A77" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="55"
          cy="55"
          r={radius}
          strokeWidth={strokeWidth}
          stroke={'url(#gradient)'}
          fill="transparent"
          strokeDashoffset={fillPercents}
          strokeDasharray={circumference}
          variants={variants}
          initial="hidden"
          animate="show"
        />
      </svg>
    </div>
  )
}
