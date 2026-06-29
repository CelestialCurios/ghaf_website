'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import CursorCloud from './CursorCloud'

interface CloudRevealProps {
  revealSrc: string
  darkSrc: string
}

interface Blob {
  x: number
  y: number
  r: number
  rx: number
  ry: number
  rot: number
  age: number
  maxAge: number
}

const DARK_FILL = '#0a0a0a'
const MAX_TRAIL = 28

export default function CloudReveal({ revealSrc, darkSrc }: CloudRevealProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<Blob[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const reducedMotionRef = useRef(false)

  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const hero = heroRef.current
    const canvas = canvasRef.current
    if (!hero || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    reducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const resize = () => {
      canvas.width = hero.offsetWidth
      canvas.height = hero.offsetHeight
      if (reducedMotionRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(hero)
    resize()

    const pushBlob = (x: number, y: number, touch = false) => {
      if (reducedMotionRef.current) return

      const blob: Blob = {
        x,
        y,
        r: touch ? 55 + Math.random() * 25 : 48 + Math.random() * 28,
        rx: 0.8 + Math.random() * 0.4,
        ry: 0.8 + Math.random() * 0.4,
        rot: Math.random() * Math.PI * 2,
        age: 0,
        maxAge: touch ? 50 : 60 + Math.floor(Math.random() * 30),
      }

      trailRef.current.push(blob)
      if (trailRef.current.length > MAX_TRAIL) {
        trailRef.current.shift()
      }
    }

    const tick = () => {
      if (reducedMotionRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const trail = trailRef.current
      const { x: mouseX, y: mouseY } = mouseRef.current

      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age++
        if (trail[i].age >= trail[i].maxAge) {
          trail.splice(i, 1)
        }
      }

      canvas.width = canvas.width

      ctx.fillStyle = DARK_FILL
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.globalCompositeOperation = 'destination-out'

      const count = trail.length
      trail.forEach((blob, index) => {
        const progress = count > 1 ? index / (count - 1) : 1
        const alpha = progress * 0.95

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.translate(blob.x, blob.y)
        ctx.rotate(blob.rot)
        ctx.scale(blob.rx, blob.ry)
        ctx.beginPath()
        ctx.arc(0, 0, blob.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      ctx.globalAlpha = 1
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, 55, 0, Math.PI * 2)
      ctx.fill()

      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1

      rafRef.current = requestAnimationFrame(tick)
    }

    const handlePointer = (clientX: number, clientY: number, touch = false) => {
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      mouseRef.current = { x, y }
      setCursor({ x: clientX, y: clientY, visible: true })
      pushBlob(x, y, touch)
    }

    const onMouseMove = (event: MouseEvent) => {
      handlePointer(event.clientX, event.clientY)
    }

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault()
      const touch = event.touches[0]
      if (touch) {
        handlePointer(touch.clientX, touch.clientY, true)
      }
    }

    const onMouseLeave = () => {
      setCursor((prev) => ({ ...prev, visible: false }))
    }

    const onMouseEnter = (event: MouseEvent) => {
      handlePointer(event.clientX, event.clientY)
    }

    hero.addEventListener('mousemove', onMouseMove)
    hero.addEventListener('mouseenter', onMouseEnter)
    hero.addEventListener('mouseleave', onMouseLeave)
    hero.addEventListener('touchmove', onTouchMove, { passive: false })

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
      hero.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseenter', onMouseEnter)
      hero.removeEventListener('mouseleave', onMouseLeave)
      hero.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <>
      <div
        ref={heroRef}
        className="hero-reveal-section textured relative h-screen w-full overflow-hidden bg-[var(--color-hero-dark-bg)]"
      >
        <div
          className="textured absolute inset-0 z-[1] bg-bg"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          <div className="absolute inset-0 z-[3]">
            <p className="hero-side-text hero-side-text-left">
              YOUR CARBON DETOX IS COMING
            </p>

            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={revealSrc}
                alt="Ghaf app"
                width={220}
                height={460}
                className="block h-auto w-[220px]"
                priority
              />
            </div>

            <div className="hero-side-text hero-side-text-right">
              <p className="hero-side-text-vertical">JOIN THE WAITLIST NOW</p>
              <Button
                variant="accent"
                onClick={() => {
                  document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  cursor: 'pointer',
                }}
              >
                Join waitlist →
              </Button>
            </div>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-[4] h-full w-full"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
          <Image
            src={darkSrc}
            alt=""
            width={220}
            height={460}
            className="hero-phone-silhouette h-auto w-[220px]"
            aria-hidden
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[5]">
          <p className="hero-side-text hero-side-text-left hero-side-text-dark">
            YOUR CARBON DETOX IS COMING
          </p>
          <div className="hero-side-text hero-side-text-right">
            <p className="hero-side-text-vertical hero-side-text-dark">
              JOIN THE WAITLIST NOW
            </p>
          </div>
        </div>
      </div>

      <CursorCloud x={cursor.x} y={cursor.y} visible={cursor.visible} />
    </>
  )
}
