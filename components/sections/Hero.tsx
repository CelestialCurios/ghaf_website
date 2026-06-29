'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Nav from '@/components/Nav'
import CloudReveal from '@/components/ui/CloudReveal'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const fadeDown = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
}

const fadeInDelayed = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: 1.2 },
  },
}

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="hero" className="hero-reveal-root relative w-full overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
      >
        <motion.div
          className="absolute left-0 right-0 top-0 z-20"
          variants={fadeDown}
        >
          <Nav />
        </motion.div>

        <motion.div variants={fadeIn}>
          <CloudReveal
            revealSrc="/assets/front_mockup_with_app.png"
            darkSrc="/assets/phone_black.png"
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5"
          variants={fadeInDelayed}
        >
          <div className="hero-scroll-line">
            <div className="hero-scroll-line-drop" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
