'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Eyebrow from '@/components/ui/Eyebrow'

const painCards = [
  {
    icon: '🔍',
    title: 'No visibility',
    text: 'Your DEWA bill tells you what you owe. Not what it costs the planet.',
  },
  {
    icon: '🗺️',
    title: 'No guidance',
    text: "Generic eco-tips don't account for UAE summers, ADDC bills, or daily habits here.",
  },
  {
    icon: '🎯',
    title: 'No reward',
    text: 'Good intentions fade without something real to show for them.',
  },
]

export default function Problem() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="problem"
      className="textured bg-bg"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="section-inner">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>THE PROBLEM</Eyebrow>
          <h2 className="type-h2 mb-8">
            PEOPLE IN THE UAE
            <br />
            ARE ADDICTED
            <br />
            <span className="text-accent">TO CARBON.</span>
          </h2>

          <div className="mb-4 flex flex-col gap-4 rounded-[14px] border border-dim bg-bg-dark p-[22px_24px] sm:flex-row sm:items-center sm:gap-8">
            <span
              className="shrink-0 font-display text-[52px] font-extrabold leading-none text-accent"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              5×
            </span>
            <p className="font-body text-[13px] text-cream">
              The UAE&apos;s per capita carbon emissions are almost 5× the global average
              — 21.6 metric tons of CO₂ per person annually.
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-4 rounded-[var(--card-radius)] border border-dim bg-dim-bg p-[22px_24px] sm:flex-row sm:items-center sm:gap-8">
            <span
              className="shrink-0 font-display text-[44px] font-extrabold leading-none text-cream"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              4/5
            </span>
            <p className="type-body">
              People want to contribute to sustainability but simply don&apos;t know how.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {painCards.map((card, index) => (
              <motion.article
                key={card.title}
                className="card-bordered p-[var(--card-padding)]"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
              >
                <p className="mb-2 font-grotesk text-sm font-bold text-cream">
                  {card.icon} {card.title}
                </p>
                <p className="type-body">{card.text}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
