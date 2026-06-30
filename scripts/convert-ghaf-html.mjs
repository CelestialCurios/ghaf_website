import fs from 'fs'
import path from 'path'

const htmlPath = path.join('Claude_files', 'ghaf_site.html')
const outPath = path.join('components', 'GhafSite.tsx')

const html = fs.readFileSync(htmlPath, 'utf8')

const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
if (!bodyMatch) throw new Error('No body found')

let body = bodyMatch[1]
const scriptMatch = body.match(/<script>([\s\S]*?)<\/script>/i)
const script = scriptMatch ? scriptMatch[1] : ''
body = body.replace(/<script>[\s\S]*?<\/script>/i, '')

const assetMap = [
  ['logo_light_png.png', '/assets/logo_light_png.png'],
  ['front_mockup_with_app.jpg', '/assets/front_mockup_with_app.png'],
  ['ghaf_video_mbrif.mp4', '/assets/ghaf_video_mbrif.mp4'],
  ['meet the team.jpg', '/assets/meet-the-team.jpg'],
  ['PHOTO-2025-09-14-19-22-12 2.jpg', '/assets/PHOTO-2025-09-14-19-22-12-2.jpg'],
  ['PHOTO-2025-09-14-19-22-13 3.jpg', '/assets/PHOTO-2025-09-14-19-22-13-3.jpg'],
  ['PHOTO-2025-09-14-19-22-13 4.jpg', '/assets/PHOTO-2025-09-14-19-22-13-4.jpg'],
  ['PHOTO-2025-09-14-19-22-13 5.jpg', '/assets/PHOTO-2025-09-14-19-22-13-5.jpg'],
  ['PHOTO-2025-09-14-19-22-13.jpg', '/assets/PHOTO-2025-09-14-19-22-13.jpg'],
  ['PHOTO-2025-09-14-19-22-14 2.jpg', '/assets/PHOTO-2025-09-14-19-22-14-2.jpg'],
  ['PHOTO-2025-09-14-19-22-14 3.jpg', '/assets/PHOTO-2025-09-14-19-22-14-3.jpg'],
  ['PHOTO-2025-09-14-20-50-42.jpg', '/assets/PHOTO-2025-09-14-20-50-42.jpg'],
]

for (const [from, to] of assetMap) {
  body = body.split(from).join(to)
}
body = body.replace(/\/assets\/\/assets\//g, '/assets/')

body = body
  .replace(/\sclass=/g, ' className=')
  .replace(/\sfor=/g, ' htmlFor=')
  .replace(/playsinline/g, 'playsInline')
  .replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}')
  .replace(/<br>/g, '<br />')
  .replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 loading="lazy" />')
  .replace(/<source([^>]*?)(?<!\/)>/g, '<source$1 />')
  .replace(
    /style="background-image: url\('([^']+)'\);"/g,
    (_, url) => `style={{ backgroundImage: "url('${url}')" }}`,
  )
  .replace(/UAE's/g, "UAE&apos;s")
  .replace(/country's/g, "country&apos;s")

const lucideMap = {
  target: 'Target',
  user: 'User',
  users: 'Users',
  'bar-chart-3': 'BarChart3',
  'scan-line': 'ScanLine',
  gift: 'Gift',
  bot: 'Bot',
  'external-link': 'ExternalLink',
  'arrow-right': 'ArrowRight',
  'chevron-right': 'ChevronRight',
}

for (const [icon, component] of Object.entries(lucideMap)) {
  const re = new RegExp(
    `<i\\s+data-lucide="${icon}"\\s+class="([^"]*)"\\s*></i>`,
    'g',
  )
  body = body.replace(re, `<${component} className="$1" />`)
  const re2 = new RegExp(
    `<i\\s+data-lucide="${icon}"\\s+className="([^"]*)"\\s*></i>`,
    'g',
  )
  body = body.replace(re2, `<${component} className="$1" />`)
}

body = body.replace(
  '<canvas id="waveCanvas" className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-35"></canvas>',
  '<canvas id="waveCanvas" ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-35" />',
)

body = body.replace(
  '<button id="nav-cta" className="relative inline-flex items-center justify-center px-6 py-2.5 text-xs font-bold tracking-wider uppercase text-slate-900 rounded-full bg-lime-400 hover:bg-lime-300 transition-all duration-300">',
  '<button type="button" id="nav-cta" onClick={() => setModalOpen(true)} className="relative inline-flex items-center justify-center px-6 py-2.5 text-xs font-bold tracking-wider uppercase text-slate-900 rounded-full bg-lime-400 hover:bg-lime-300 transition-all duration-300">',
)

body = body.replace(
  '<button className="bg-[#1b2920] text-lime-400 font-extrabold text-xs px-6 py-2.5 rounded-full uppercase tracking-widest shadow-md hover:bg-slate-900 transition-all duration-300 flex items-center gap-2">',
  '<button type="button" onClick={() => setModalOpen(true)} className="bg-[#1b2920] text-lime-400 font-extrabold text-xs px-6 py-2.5 rounded-full uppercase tracking-widest shadow-md hover:bg-slate-900 transition-all duration-300 flex items-center gap-2">',
)

let js = script
  .replace(/lucide\.createIcons\(\);\s*/g, '')
  .replace(
    /const canvas = document\.getElementById\('waveCanvas'\);\s*const ctx = canvas\.getContext\('2d'\);\s*function resizeCanvas\(\) \{ canvas\.width = window\.innerWidth; canvas\.height = window\.innerHeight; \}\s*window\.addEventListener\('resize', resizeCanvas\);\s*resizeCanvas\(\);/,
    `const canvasEl = canvasRef.current
        if (!canvasEl) return
        function resizeCanvas() {
          const el = canvasRef.current
          if (!el) return
          el.width = window.innerWidth
          el.height = window.innerHeight
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();`,
  )
  .replace(
    /function animateWaves\(\) \{\s*ctx\.clearRect\(0, 0, canvas\.width, canvas\.height\);[\s\S]*?requestAnimationFrame\(animateWaves\);\s*\}/,
    `function animateWaves() {
            const el = canvasRef.current
            if (!el) return
            const context = el.getContext('2d')
            if (!context) return
            context.clearRect(0, 0, el.width, el.height);
            tick++;
            ribbons.forEach((ribbon) => {
                for (let i = 0; i < ribbon.lines; i++) {
                    context.beginPath();
                    context.strokeStyle = ribbon.color;
                    context.lineWidth = i === Math.floor(ribbon.lines / 2) ? 1.5 : 0.8;
                    let offset = i * ribbon.spacing;
                    for (let x = 0; x < el.width; x += 10) {
                        let angle1 = (x * 0.003) + (tick * ribbon.speed) + ribbon.seed;
                        let angle2 = (x * 0.001) - (tick * ribbon.speed * 0.5) + (offset * 0.02);
                        let y = (el.height * 0.5) + Math.sin(angle1) * 140 + Math.cos(angle2) * 100 + (offset - (ribbon.lines * ribbon.spacing) / 2);
                        if (x === 0) context.moveTo(x, y); else context.lineTo(x, y);
                    }
                    context.stroke();
                }
            });
            waveRafRef.current = requestAnimationFrame(animateWaves)
        }`,
  )
  .replace(
    /const videoElement = document\.getElementById\('team-cinematic-video'\);/,
    `const videoElement = document.getElementById('team-cinematic-video') as HTMLVideoElement | null`,
  )
  .replace(
    /onUpdate: \(self\) => \{\s*\/\/ Autoplay fallback/,
    `onUpdate: (self) => {
                    if (!videoElement) return
                    // Autoplay fallback`,
  )
  .replace(/gsap\.utils\.toArray\("\.gallery-card"\)/g, 'gsap.utils.toArray<Element>(".gallery-card")')
  .replace(/gsap\.utils\.toArray\("\.stat-card"\)/g, 'gsap.utils.toArray<Element>(".stat-card")')
  .replace(/gsap\.utils\.toArray\("\.feature-story-row"\)/g, 'gsap.utils.toArray<Element>(".feature-story-row")')
  .replace(/gsap\.utils\.toArray\("\.event-list-item"\)/g, 'gsap.utils.toArray<Element>(".event-list-item")')
  .replace(
    /parseFloat\(card\.getAttribute\("data-parallax-speed"\)\)/g,
    `parseFloat(card.getAttribute("data-parallax-speed") ?? '')`,
  )
  .replace(
    /parseFloat\(card\.getAttribute\("data-drift-x"\)\)/g,
    `parseFloat(card.getAttribute("data-drift-x") ?? '')`,
  )
  .replace(/\s*gsap\.registerPlugin\(ScrollTrigger\);\s*\n\s*\/\/ Core pinned/, '\n        // Core pinned')

const component = `'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  BarChart3,
  Bot,
  ChevronRight,
  ExternalLink,
  Gift,
  ScanLine,
  Target,
  User,
  Users,
} from 'lucide-react'
import WaitlistModal from '@/components/ui/WaitlistModal'

export default function GhafSite() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const waveRafRef = useRef<number>(0)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    ${js.trim()}

    return () => {
      cancelAnimationFrame(waveRafRef.current)
      window.removeEventListener('resize', resizeCanvas)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
${body.trim()}
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
`

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, component)
console.log('Wrote', outPath, component.length, 'chars')
