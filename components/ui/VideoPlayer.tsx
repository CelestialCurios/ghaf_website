'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoPlayerProps {
  src: string
  poster?: string
}

const VIDEO_AVAILABLE = false

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    if (!VIDEO_AVAILABLE) return

    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          setIsVisible(true)
        }
      },
      { threshold: [0, 0.6, 1] },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!VIDEO_AVAILABLE || !isVisible || !videoRef.current) return

    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false))
  }, [isVisible])

  if (!VIDEO_AVAILABLE) {
    return (
      <div
        className="relative flex h-[168px] w-full items-center justify-center overflow-hidden rounded-[var(--card-radius)] border border-dim bg-[var(--color-overlay-dark)]"
        role="img"
        aria-label="Pitch video poster — video file pending"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, var(--color-scan-line) 0px, var(--color-scan-line) 1px, transparent 1px, transparent 4px)',
          }}
        />
        <div
          className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full border border-dim bg-dim-bg text-cream"
          aria-hidden="true"
        >
          ▶
        </div>
        <span className="sr-only">Video unavailable — pitch.mp4 not yet provided</span>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[168px] w-full overflow-hidden rounded-[var(--card-radius)] border border-dim bg-[var(--color-overlay-dark)]"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, var(--color-scan-line) 0px, var(--color-scan-line) 1px, transparent 1px, transparent 4px)',
        }}
      />
      {!isPlaying && (
        <div className="absolute inset-0 z-[3] flex items-center justify-center">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border border-dim bg-dim-bg text-cream"
            aria-hidden="true"
          >
            ▶
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        className="h-full w-full object-cover"
        controls={showControls && isPlaying}
      />
    </div>
  )
}
