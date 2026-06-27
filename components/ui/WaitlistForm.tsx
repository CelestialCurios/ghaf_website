'use client'

import { FormEvent, useState } from 'react'
import Button from './Button'

interface WaitlistFormProps {
  variant: 'hero' | 'footer'
}

export default function WaitlistForm({ variant }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="font-grotesk text-sm text-cream" role="status">
        ✓ You&apos;re on the list.
      </p>
    )
  }

  const isFooter = variant === 'footer'

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full gap-2 ${isFooter ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row sm:max-w-md'}`}
    >
      <label htmlFor={`waitlist-email-${variant}`} className="sr-only">
        Email address
      </label>
      <input
        id={`waitlist-email-${variant}`}
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="flex-1 rounded-[var(--btn-radius)] border border-dim bg-[var(--color-input-bg)] px-4 py-3 font-body text-sm text-cream placeholder:text-muted focus:outline-none"
      />
      <Button variant="primary" submit className={isFooter ? 'sm:shrink-0' : ''}>
        Join waitlist →
      </Button>
    </form>
  )
}
