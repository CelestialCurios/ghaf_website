'use client'

import { useState } from 'react'

type PhoneScreenProps = {
  images: string[]
  alt?: string
  className?: string
}

export default function PhoneScreen({ images, alt = 'App screenshot', className = '' }: PhoneScreenProps) {
  const [index, setIndex] = useState(0)
  const multi = images.length > 1

  const goNext = () => {
    if (!multi) return
    setIndex((i) => (i + 1) % images.length)
  }

  return (
    <button
      type="button"
      onClick={goNext}
      aria-label={multi ? 'Show next app screen' : alt}
      className={`relative block h-full w-full overflow-hidden bg-slate-950 text-left ${multi ? 'cursor-pointer' : 'cursor-default'} ${className}`}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${alt} ${i + 1}`}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          draggable={false}
          loading="lazy"
        />
      ))}

      {multi ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      ) : null}
    </button>
  )
}
