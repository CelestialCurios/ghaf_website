'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Eyebrow from '@/components/ui/Eyebrow'

const statPills = [
  '5× global avg emissions',
  '23% reduction with tracking',
  '90% higher goals with AI',
]

const circularNodes = [
  { icon: '👤', label: 'Customers', sub: 'Earn rewards' },
  { icon: '🏢', label: 'Companies', sub: 'CSR partners' },
  { icon: '🌍', label: 'Earth', sub: 'Net Zero 2050' },
]

export default function WhyGhaf() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="why-ghaf"
      className="textured bg-bg-dark"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
    >
      <div className="section-inner">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>WHY GHAF</Eyebrow>
          <h2 className="type-h2 mb-4">
            SUSTAINABILITY
            <br />
            IS CIRCULAR.
            <br />
            <span className="text-accent">SO ARE WE.</span>
          </h2>
          <p className="type-body mb-8 max-w-xl">
            We bridge customers and companies through a self-sustaining loop — rewards,
            partners, and impact that feeds itself.
          </p>

          <div className="relative mb-8 h-[180px] overflow-hidden rounded-[var(--card-radius)] border border-dim bg-[var(--color-overlay-dark)]">
            <div
              className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--color-axis-line)]"
              aria-hidden="true"
            />
            <div
              className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--color-axis-line)]"
              aria-hidden="true"
            />
            <span className="absolute left-2 top-2 font-grotesk text-[8px] text-muted">
              Gamified
            </span>
            <span className="absolute right-2 top-2 font-grotesk text-[8px] text-muted">
              Basic
            </span>
            <span className="absolute bottom-2 left-2 font-grotesk text-[8px] text-muted">
              Manual
            </span>
            <span className="absolute bottom-2 right-2 font-grotesk text-[8px] text-muted">
              AI
            </span>

            <div className="absolute right-[18%] top-[22%] flex flex-col items-center">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-cream bg-cream text-base">
                🐼
              </div>
              <span className="mt-1 font-grotesk text-[9px] font-bold text-accent">
                GHAF
              </span>
            </div>

            <div
              className="absolute left-[22%] top-[28%] h-[9px] w-[9px] rounded-full border border-dim bg-[var(--color-competitor-dot)]"
              title="Commons"
              aria-label="Commons"
            />
            <div
              className="absolute left-[28%] bottom-[30%] h-[9px] w-[9px] rounded-full border border-dim bg-[var(--color-competitor-dot)]"
              title="JouleBug"
              aria-label="JouleBug"
            />
            <div
              className="absolute left-[18%] bottom-[22%] h-[9px] w-[9px] rounded-full border border-dim bg-[var(--color-competitor-dot)]"
              title="Travelperk"
              aria-label="Travelperk"
            />
          </div>

          <div className="mb-10 flex flex-wrap gap-3">
            {statPills.map((pill) => (
              <span
                key={pill}
                className="rounded-[20px] border border-dim bg-dim-bg px-4 py-2 font-grotesk text-[10px] text-cream"
              >
                {pill}
              </span>
            ))}
          </div>

          <Eyebrow>THE CIRCULAR MODEL</Eyebrow>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {circularNodes.map((node, index) => (
              <div key={node.label} className="flex items-center gap-4">
                <div className="card-bordered min-w-[140px] p-4 text-center">
                  <div className="mb-1 text-xl" aria-hidden="true">
                    {node.icon}
                  </div>
                  <p className="type-h3 mb-1">{node.label}</p>
                  <p className="type-body text-[11px]">{node.sub}</p>
                </div>
                {index < circularNodes.length - 1 && (
                  <span className="hidden text-cream sm:inline" style={{ opacity: 0.6 }}>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
