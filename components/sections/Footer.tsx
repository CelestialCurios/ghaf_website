'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import WaitlistForm from '@/components/ui/WaitlistForm'

export default function Footer() {
  const reduceMotion = useReducedMotion()

  return (
    <footer
      id="footer"
      className="textured bg-footer-bg"
      style={{ backgroundColor: 'var(--color-footer-bg)' }}
    >
      <div className="section-inner">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>GET INVOLVED</Eyebrow>
          <h2 className="type-h2 mb-4">
            START YOUR
            <br />
            <span className="text-accent">DETOX.</span>
          </h2>
          <p className="type-body mb-8">Launching in the UAE. Be among the first.</p>

          <div className="mb-6 flex w-full flex-col gap-3 sm:max-w-md">
            <Button variant="primary" fullWidth href="mailto:naqiyahmoiz@gmail.com">
              Partner with us →
            </Button>
            <Button
              variant="ghost"
              fullWidth
              href="#footer"
              className="!rounded-[var(--btn-radius)] !border !border-dim !px-4 !py-3 text-center !no-underline"
            >
              Join the waitlist →
            </Button>
          </div>

          <div className="mb-8">
            <WaitlistForm variant="footer" />
          </div>

          <p className="mb-4 font-grotesk text-[10px] text-muted">
            Mechanical Engineering · Khalifa University · Pitch@Gov · MBRIF Innovation Fund
          </p>

          <p className="font-grotesk text-[10px] text-dim">
            <a href="mailto:naqiyahmoiz@gmail.com" className="hover:opacity-80">
              naqiyahmoiz@gmail.com
            </a>
            {' · '}
            <a href="https://ghaf.carrd.co" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              ghaf.carrd.co
            </a>
            {' · © 2025 Ghaf · UAE Net Zero 2050'}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
