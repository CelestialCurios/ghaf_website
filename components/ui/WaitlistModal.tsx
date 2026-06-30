'use client'

import { useState } from 'react'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  if (!isOpen) return null

  const handleSubmit = async () => {
    if (!email) return
    setStatus('loading')
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    setStatus(data.success ? 'success' : 'error')
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-[#1b2920] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {status === 'success' ? (
          <div className="text-center">
            <div className="mb-4 text-4xl">🌿</div>
            <h3 className="mb-2 text-xl font-black text-white">You&apos;re on the list.</h3>
            <p className="text-sm text-emerald-100/60">
              We&apos;ll reach out when Ghaf launches in the UAE.
            </p>
          </div>
        ) : (
          <>
            <h3 className="mb-2 text-2xl font-black text-white">Join the waitlist</h3>
            <p className="mb-6 text-sm text-emerald-100/60">
              Be among the first to start your carbon detox.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-lime-400/50"
            />
            {status === 'error' && (
              <p className="mb-3 text-xs text-rose-400">Something went wrong. Try again.</p>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="w-full rounded-xl bg-lime-400 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-lime-300 disabled:opacity-50"
            >
              {status === 'loading' ? 'Joining...' : 'Join waitlist →'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
