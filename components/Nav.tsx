'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Our story', href: '#team' },
  { label: 'Partner', href: '#footer' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToFooter = () => {
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav-hero ${scrolled ? 'nav-hero-scrolled' : ''}`}>
      <Image
        src="/assets/logo_dark.png"
        alt="Ghaf"
        width={80}
        height={28}
        className="block h-7 w-auto"
        priority
      />

      <div className="flex items-center gap-5">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="nav-hero-link hidden sm:inline">
            {link.label}
          </a>
        ))}
        <span
          role="button"
          tabIndex={0}
          className="nav-hero-cta"
          onClick={scrollToFooter}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              scrollToFooter()
            }
          }}
        >
          Join waitlist
        </span>
      </div>
    </nav>
  )
}
