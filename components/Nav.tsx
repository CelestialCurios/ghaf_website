'use client'

import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Our story', href: '#team' },
  { label: 'Partner', href: '#footer' },
]

export default function Nav() {
  return (
    <header
      className="textured sticky top-0 z-50 bg-bg-dark"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-4">
        <span
          className="font-display text-lg text-cream"
          style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}
        >
          Ghaf
        </span>
        <nav className="flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hidden font-grotesk text-[11px] text-muted sm:inline"
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" href="#footer" className="!px-4 !py-2 text-[11px]">
            Join waitlist
          </Button>
        </nav>
      </div>
    </header>
  )
}
