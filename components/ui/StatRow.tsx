'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface StatItem {
  label: string
  value: string
  sub: string
  progress: number
}

const stats: StatItem[] = [
  { label: 'TRL Level', value: '4', sub: 'Validated MVP', progress: 44 },
  { label: 'Target SOM', value: '500K', sub: 'Climate-conscious UAE users', progress: 28 },
  { label: 'Utility Reach', value: '1.8M', sub: 'DEWA + ADDC customers', progress: 16 },
]

export default function StatRow() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="overflow-hidden rounded-[10px] border border-dim">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`bg-dim-bg p-[14px] pb-3 ${index < stats.length - 1 ? 'md:border-r md:border-dim' : ''} ${index < stats.length - 1 ? 'border-b border-dim md:border-b-0' : ''}`}
          >
            <p className="type-caption mb-1">{stat.label}</p>
            <p
              className="mb-1 font-display text-2xl font-extrabold text-cream"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {stat.value}
            </p>
            <p className="type-body mb-3 text-[11px]">{stat.sub}</p>
            <div className="h-[2px] w-full bg-[var(--color-cream-subtle)]">
              <motion.div
                className="h-full bg-cream"
                style={{ opacity: 0.4 }}
                initial={{ width: reduceMotion ? `${stat.progress}%` : '0%' }}
                whileInView={{ width: `${stat.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 1.2, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
