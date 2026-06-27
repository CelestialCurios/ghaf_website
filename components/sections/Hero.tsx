'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'

const headlineLines = [
  { text: 'YOUR CARBON', accent: false },
  { text: 'DETOX STARTS', accent: false },
  { text: 'HERE.', accent: true },
]

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="hero"
      className="textured bg-bg text-center"
      style={{
        backgroundColor: 'var(--color-bg)',
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 0,
      }}
    >
      <div className="section-inner !pb-0">
        <motion.p
          className="mb-6 inline-block border-b border-dim pb-[9px] font-grotesk text-[10px] uppercase tracking-[0.3em] text-muted"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Your companion in a carbon-free life
        </motion.p>

        <h1 className="type-h1 mb-8">
          {headlineLines.map((line, index) => (
            <motion.span
              key={line.text}
              className={`block ${line.accent ? 'text-accent' : 'text-cream'}`}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: reduceMotion ? 0 : index * 0.1,
              }}
            >
              {line.text}
            </motion.span>
          ))}
        </h1>

        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="primary" href="#footer" className="!px-[30px] !py-[14px]">
            Join the waitlist →
          </Button>
          <Button variant="ghost" href="#features">
            See how it works ↓
          </Button>
        </div>

        <img
          src="/mockup.png"
          alt="Ghaf app — Carbon Tracker screen"
          width={340}
          className="mx-auto block max-w-[340px] w-full"
          style={{ display: 'block', margin: '0 auto' }}
        />
      </div>
    </section>
  )
}
