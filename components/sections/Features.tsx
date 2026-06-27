'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Eyebrow from '@/components/ui/Eyebrow'
import FeatureCard from '@/components/ui/FeatureCard'

const features = [
  {
    icon: '📊',
    title: 'Carbon Tracker',
    description:
      'Upload your DEWA or ADDC bill. AI extracts your footprint and gives you tips to cut it.',
    tag: 'BILL UPLOAD',
  },
  {
    icon: '🔍',
    title: 'Ghaf Lens',
    description:
      'Scan any product for its CO₂ score. Our algorithm suggests greener swaps. Every swap earns you Ghaf Points.',
    tag: 'SCAN & SWAP',
  },
  {
    icon: '🎁',
    title: 'Ghaf Rewards',
    description:
      'Earn Green Points for every sustainable action. Redeem at UAE partner brands. Swap. Redeem. Enjoy.',
    tag: 'LOYALTY POINTS',
  },
  {
    icon: '🤝',
    title: 'Community Events',
    description:
      'Find and host sustainable drives near you. Three gamified leaderboards keep the competition friendly.',
    tag: 'SOCIAL + MAP',
  },
  {
    icon: '🤖',
    title: 'Renew-E · AI Companion',
    description:
      'Your personal sustainability chatbot. Real-time nudges, if-then habit plans, and smart goal setting — in Arabic or English.',
    tag: 'AI CHATBOT · عربي / EN',
    fullWidth: true,
    dark: true,
  },
]

export default function Features() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="features"
      className="textured bg-bg-mid"
      style={{ backgroundColor: 'var(--color-bg-mid)' }}
    >
      <div className="section-inner">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>WHAT GHAF DOES</Eyebrow>
          <h2 className="type-h2 mb-4">
            TRACK. SWAP.
            <br />
            EARN. CONNECT.
            <br />
            <span className="text-accent">REPEAT.</span>
          </h2>
          <p className="type-body mb-8">Five tools. One circular habit loop.</p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={feature.fullWidth ? 'md:col-span-2' : ''}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
