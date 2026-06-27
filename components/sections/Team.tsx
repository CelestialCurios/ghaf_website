'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import VideoPlayer from '@/components/ui/VideoPlayer'
import StatRow from '@/components/ui/StatRow'
import FounderAvatar from '@/components/ui/FounderAvatar'

const founders = [
  { initials: 'NR', name: 'Naqiyah' },
  { initials: 'RT', name: 'Rahel' },
  { initials: 'NV', name: 'Nanda' },
  { initials: 'HC', name: 'Haya' },
  { initials: 'NT', name: 'Nevan' },
]

export default function Team() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="team"
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
          <Eyebrow>THE TEAM</Eyebrow>
          <h2 className="type-h2 mb-4">
            WE BUILT THIS
            <br />
            BECAUSE WE
            <br />
            <span className="text-dimmed-cream">LIVE IT.</span>
          </h2>
          <p className="type-body mb-8 max-w-xl">
            A team of engineering students from Khalifa University who got tired
            of wanting to be sustainable with no tools that provide the incentive
            to do it.
          </p>

          <div className="mb-8 rounded-[10px] border border-dim bg-dim-bg px-4 py-[10px]">
            <p className="font-grotesk text-sm text-cream">
              🏆 Pitch@Gov Winner · MBRIF Innovation Fund
            </p>
            <p className="type-body text-[11px]">
              Mohammed Bin Rashid Centre for Government Innovation
            </p>
          </div>

          <div className="mb-8">
            <VideoPlayer src="/video/pitch.mp4" />
          </div>

          <div className="mb-8">
            <StatRow />
          </div>

          <p className="mb-8 inline-block rounded-md border border-dim px-[11px] py-[5px] type-caption normal-case tracking-normal">
            Mechanical Engineering · Khalifa University · Abu Dhabi, UAE
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-6 sm:justify-start">
            {founders.map((founder) => (
              <FounderAvatar
                key={founder.initials}
                initials={founder.initials}
                name={founder.name}
              />
            ))}
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button variant="primary" href="mailto:naqiyahmoiz@gmail.com">
              Partner with us →
            </Button>
            <Button variant="ghost" href="#footer">
              or join the waitlist
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
