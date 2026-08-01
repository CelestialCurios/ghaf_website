'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ChevronRight,
  ExternalLink,
  Target,
} from 'lucide-react'
import WaitlistModal from '@/components/ui/WaitlistModal'
import PhoneScreen from '@/components/ui/PhoneScreen'

const LOGO_LIGHT_SRC = '/assets/logo_light_png.png'
const LOGO_DARK_SRC = '/assets/logo_dark.png'
const LOGO_CROP_BOX =
  'relative h-9 w-[10.5rem] overflow-hidden md:h-10 md:w-[12rem]'
const LOGO_CROP_IMG =
  'absolute left-1/2 top-1/2 h-[7rem] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 md:h-[7.5rem]'

const appSs = (file: string) =>
  `/assets/app/ghaf%20app%20ss/${encodeURIComponent(file)}`

const PHONE_SCREENS = {
  personalize: [
    appSs('arabic version homepage.png'),
    appSs('homepage.png'),
    appSs('profile.png'),
    appSs('profile-2.png'),
  ],
  connect: [
    appSs('leaderboard.png'),
    appSs('notifcations.png'),
    appSs('events-map.png'),
  ],
  track: [
    appSs('carbon-tracker.png'),
    appSs('carbon-tracker-2.png'),
    appSs('carbon-tracker-3.png'),
    appSs('carbon-tracker-4.png'),
  ],
  scan: [appSs('scanner.png')],
  rewards: [appSs('Ghaf Rewards.png')],
  renew: [appSs('chatbot renew-e.png'), appSs('renew.png')],
  events: [appSs('event-list.png'), appSs('events-map.png')],
} as const

export default function GhafSite() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const waveRafRef = useRef<number>(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [videoMuted, setVideoMuted] = useState(true)
  const [showVideoMute, setShowVideoMute] = useState(false)
  const videoMutedRef = useRef(true)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const syncNavHeight = () => {
      const h = document.getElementById('global-nav')?.offsetHeight ?? 72
      document.documentElement.style.setProperty('--nav-h', `${h}px`)
    }
    syncNavHeight()
    window.addEventListener('resize', syncNavHeight)

    // -------------------------------------------------------------
        // BACKGROUND RIBBON CANVAS CONTROLLER
        // -------------------------------------------------------------
        const canvasEl = canvasRef.current
        if (!canvasEl) return
        function resizeCanvas() {
          const el = canvasRef.current
          if (!el) return
          el.width = window.innerWidth
          el.height = window.innerHeight
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let tick = 0;
        const ribbons = [
            { lines: 18, spacing: 7, speed: 0.0012, color: 'rgba(163, 230, 53, 0.22)', seed: 10 },
            { lines: 12, spacing: 6, speed: 0.0006, color: 'rgba(45, 212, 191, 0.15)', seed: 80 }
        ];

        function animateWaves() {
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
        }
        waveRafRef.current = requestAnimationFrame(animateWaves)

        // -------------------------------------------------------------
        // GSAP PREMIUM MOMENTUM CINEMATIC CORE WORKFLOW
        // -------------------------------------------------------------

        // Core pinned splash panel timeline workflow sequence
        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero-trigger",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });

        heroTl.to({}, { duration: 2 })
              .to("#splash-logo-container", { scale: 0.25, y: -window.innerHeight * 0.42, x: -window.innerWidth * 0.35, opacity: 0, duration: 3 })
              .to("#nav-logo", { opacity: 1, y: 0, duration: 1 }, "-=1")
              .to("#hero-text-content", { opacity: 1, y: 0, duration: 3 }, "-=2")
              .to({}, { duration: 2.5 })
              .to("#hero-phone-wrap", { opacity: 1, y: 0, scale: 1, duration: 4 });

        // -------------------------------------------------------------
        // NEW DEEP STORYTELLING MEET THE TEAM TRIGGER ENGINE
        // -------------------------------------------------------------
        const videoElement = document.getElementById('team-cinematic-video') as HTMLVideoElement | null

        let teamVideoInRange = false
        let playRequestInFlight = false

        const setMuteUi = (muted: boolean) => {
            videoMutedRef.current = muted
            setVideoMuted(muted)
        }

        const pauseTeamVideo = () => {
            if (!videoElement) return
            playRequestInFlight = false
            if (!videoElement.paused) videoElement.pause()
            teamVideoInRange = false
            setShowVideoMute(false)
        }

        const playTeamVideo = () => {
            if (!videoElement) return
            const wantMuted = videoMutedRef.current
            if (!videoElement.paused) {
                videoElement.muted = wantMuted
                if (!wantMuted) videoElement.volume = 1
                return
            }
            if (playRequestInFlight) return
            playRequestInFlight = true
            // Autoplay requires muted unless the user toggled unmute via the button
            videoElement.muted = wantMuted
            void videoElement.play()
                .then(() => {
                    playRequestInFlight = false
                    videoElement.muted = videoMutedRef.current
                    if (!videoMutedRef.current) videoElement.volume = 1
                })
                .catch(() => {
                    playRequestInFlight = false
                    // Fall back to muted autoplay if unmuted play was blocked
                    videoElement.muted = true
                    setMuteUi(true)
                    void videoElement.play().catch(() => {})
                })
        }

        const syncTeamVideoPlayback = (self?: ScrollTrigger) => {
            if (!videoElement) return
            const t = teamTimeline.time()
            const readyAt = Number(teamTimeline.labels.videoReady ?? 0)
            const sectionActive = self ? self.isActive : true

            if (sectionActive && t >= readyAt) {
                teamVideoInRange = true
                setShowVideoMute(true)
                playTeamVideo()
            } else if (!sectionActive || t < readyAt - 0.35) {
                pauseTeamVideo()
            }
        }

        const navHeight = document.getElementById('global-nav')?.offsetHeight ?? 72

        const teamTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#team-sticky-trigger',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                onLeave: pauseTeamVideo,
                onLeaveBack: pauseTeamVideo,
                onUpdate: (self) => syncTeamVideoPlayback(self),
            },
        })

        // Stage 1: Reveal horizontal frame with static team image
        teamTimeline.to('#team-asset-stage', {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2,
            ease: 'power2.out',
        })
        // Stage 2: Linger on horizontal image at native aspect ratio
        .to({}, { duration: 1.5 })
        // Stage 3: Fade image while morphing to portrait and revealing video
        .to('#team-static-img', {
            opacity: 0,
            duration: 2,
            ease: 'power2.out',
        })
        .to('#team-asset-stage', {
            width: () => {
              const maxH = window.innerHeight - navHeight - 8
              return Math.min(maxH * (9 / 16), window.innerWidth * 0.92, 420)
            },
            height: () => window.innerHeight - navHeight - 8,
            aspectRatio: '9 / 16',
            duration: 2.5,
            ease: 'power2.inOut',
        }, '<')
        .to('#team-cinematic-video', {
            opacity: 1,
            duration: 2.5,
        }, '<')
        // Start playback early — once video is partially visible mid-morph
        .addLabel('videoReady', '<+=0.8')
        .to('#team-video-typography', {
            opacity: 1,
            y: 0,
            duration: 1,
        }, '-=0.5')
        // Stage 4: Longer scroll buffer while the settled portrait plays
        .to({}, { duration: 5 })
        .addLabel('videoHoldEnd')

        const teamStage = document.getElementById('team-asset-stage')
        const teamVisibility = new IntersectionObserver(
            ([entry]) => {
                if (!entry || entry.intersectionRatio >= 0.2) return
                pauseTeamVideo()
            },
            { threshold: [0, 0.2, 0.5] }
        )
        if (teamStage) teamVisibility.observe(teamStage)

        const onTeamScrollEnd = () => {
            const st = teamTimeline.scrollTrigger
            syncTeamVideoPlayback(st)
            if (st && !st.isActive) pauseTeamVideo()
        }
        ScrollTrigger.addEventListener('scrollEnd', onTeamScrollEnd)

        // Journey gallery — expand from scattered offsets into final grid slots
        gsap.utils.toArray<Element>('.gallery-card').forEach((card, index) => {
            const fromLeft = index % 2 === 0
            const depth = (index % 4) + 1

            gsap.fromTo(
                card,
                {
                    opacity: 0,
                    x: fromLeft ? -90 - depth * 18 : 90 + depth * 18,
                    y: 120 + depth * 28,
                    scale: 0.82,
                    rotate: fromLeft ? -6 : 6,
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom',
                        end: 'top 55%',
                        scrub: 1.15,
                    },
                }
            )
        })

        // -------------------------------------------------------------
        // BACKGROUND TRANSLATION & ALTERNATING DATA CARDS
        // -------------------------------------------------------------
        // Dynamic theme header tracking context color conversion workflow
        ScrollTrigger.create({
            trigger: "#white-story-track",
            start: "top 80px",
            end: "bottom bottom",
            onEnter: () => {
                gsap.to("#global-nav", { backgroundColor: "rgba(255, 255, 255, 0.9)", borderColor: "rgba(0,0,0,0.06)" });
                gsap.to("#nav-links a", { color: "#334155" });
                gsap.to("#nav-cta", { backgroundColor: "#1b2920", color: "#a3e635" });
                const navLogo = document.getElementById('nav-logo') as HTMLImageElement | null
                if (navLogo) navLogo.src = LOGO_DARK_SRC
            },
            onLeaveBack: () => {
                gsap.to("#global-nav", { backgroundColor: "rgba(33, 50, 39, 0.8)", borderColor: "rgba(255,255,255,0.1)" });
                gsap.to("#nav-links a", { color: "#f4efe2" });
                gsap.to("#nav-cta", { backgroundColor: "#a3e635", color: "#0f172a" });
                const navLogo = document.getElementById('nav-logo') as HTMLImageElement | null
                if (navLogo) navLogo.src = LOGO_LIGHT_SRC
            }
        });

        // Staggered bento system card transitions
        gsap.utils.toArray<Element>(".stat-card").forEach((card) => {
            gsap.to(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
            });
        });

        // Track journey entry title reveal
        gsap.to(".journey-header", {
            opacity: 1,
            y: 0,
            scrollTrigger: { trigger: ".journey-header", start: "top 80%" }
        });

        // Immersive alternating feature row tracking engine loops
        gsap.utils.toArray<Element>(".feature-story-row").forEach((row) => {
            const textBlock = row.querySelector(".text-block");
            const phoneBlock = row.querySelector(".phone-block");

            if (textBlock) {
                gsap.fromTo(textBlock, { opacity: 0, x: -30 }, {
                    opacity: 1, x: 0, duration: 1,
                    scrollTrigger: { trigger: row, start: "top 75%", toggleActions: "play none none reverse" }
                });
            }

            if (phoneBlock) {
                gsap.fromTo(phoneBlock, { opacity: 0, y: 40 }, {
                    opacity: 1, y: 0, duration: 1.2,
                    scrollTrigger: { trigger: row, start: "top 70%", toggleActions: "play none none reverse" }
                });
            }
        });

        // Specific trigger logic for unique mid-track items
        gsap.to(".floating-pill-box", { opacity: 1, y: 0, scrollTrigger: { trigger: "#real-rewards-moment", start: "top 65%" } });
        gsap.to(".centered-phone-box", { opacity: 1, scale: 1, scrollTrigger: { trigger: "#real-rewards-moment", start: "top 50%" } });

        // Event staggered sub-list reveals
        gsap.utils.toArray<Element>(".event-list-item").forEach((item, index) => {
            gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.15,
                scrollTrigger: { trigger: "#event-animated-list", start: "top 80%" }
            });
        });

    return () => {
      cancelAnimationFrame(waveRafRef.current)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('resize', syncNavHeight)
      ScrollTrigger.removeEventListener('scrollEnd', onTeamScrollEnd)
      teamVisibility.disconnect()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
<nav className="fixed top-0 left-0 w-full z-50 bg-[#213227]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center transition-colors duration-500" id="global-nav">
        <div className="flex h-10 items-center md:h-11">
            <div className={LOGO_CROP_BOX}>
                <img id="nav-logo" src={LOGO_LIGHT_SRC} alt="Ghaf Logo" className={`${LOGO_CROP_IMG} opacity-0`} loading="lazy" />
            </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold transition-colors duration-500" id="nav-links">
            <a href="#team" className="hover:text-lime-400 transition-colors">Gov Pitch</a>
            <a href="#impact" className="hover:text-lime-400 transition-colors">Insights</a>
            <a href="#journey" className="hover:text-lime-400 transition-colors">Product Story</a>
        </div>
        <div>
            <button type="button" id="nav-cta" onClick={() => setModalOpen(true)} className="relative inline-flex items-center justify-center px-6 py-2.5 text-xs font-bold tracking-wider uppercase text-slate-900 rounded-full bg-lime-400 hover:bg-lime-300 transition-all duration-300">
                Sign Up
            </button>
        </div>
    </nav>

    <div id="hero-trigger" className="relative w-full min-h-[220vh] bg-[#213227]">
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
            <canvas id="waveCanvas" ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-35" />
            
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,239,226,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,239,226,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-80 z-0"></div>

            <div id="splash-logo-container" className="absolute z-30 flex flex-col items-center text-center">
                <img id="splash-title" src="/assets/logo_light_png.png" alt="Ghaf Logo" className="w-[320px] md:w-[480px] drop-shadow-sm object-contain" loading="lazy" />
                <div id="splash-sub" className="mt-4 flex items-center gap-2 px-3 py-1 bg-lime-400 text-xs font-black tracking-widest text-slate-900 uppercase rounded-md shadow-sm">
                    <span>THE CARBON-FREE REVOLUTION</span>
                </div>
            </div>

            <div id="hero-text-content" className="absolute z-20 flex max-w-3xl translate-y-12 flex-col items-center text-center opacity-0 mt-[-22vh]">
                <span className="mb-6 flex items-center gap-1.5 rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-lime-400 shadow-sm">
                    <span className="h-1.5 w-1.5 animate-ping rounded-full bg-lime-400"></span> UAE Net Zero 2050
                </span>
                <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-7xl">
                    Your carbon footprint,<br /><span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">detonated.</span>
                </h1>
                <p className="mb-8 max-w-xl text-lg font-medium leading-relaxed text-emerald-100/70 md:text-xl">
                    The UAE&apos;s first behavioral-science consumer application transforming vague climate objectives into autonomous habits.
                </p>
            </div>

            <div id="hero-phone-wrap" className="absolute bottom-0 z-20 h-[420px] w-[310px] overflow-hidden opacity-0 translate-y-64 md:h-[480px] md:w-[340px]">
                <img src="/assets/front_mockup_with_app.png" alt="Carbon Tracker Mockup View" className="absolute left-1/2 top-1/2 h-[122%] w-[122%] max-w-none -translate-x-1/2 -translate-y-[46%] object-cover" loading="lazy" />
            </div>
        </div>
    </div>

    <section id="team" className="relative z-30 w-full bg-white pt-12 text-slate-900 md:pt-16">
        <div id="team-intro-text" className="relative z-10 mx-auto mb-10 flex max-w-2xl flex-col items-center px-6 text-center select-none md:mb-14">
            <span className="mb-4 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-600">
                Pitch@Gov
            </span>
            <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-neutral-900 md:text-6xl">
                Meet the Team
            </h2>
            <p className="text-base font-medium leading-relaxed text-neutral-500 md:text-lg">
                Discover the engineering minds, behavioral strategists, and creators behind Renew-e driving the regional sustainability ecosystem.
            </p>
        </div>

        <div id="team-sticky-trigger" className="relative h-[400vh] w-full">
            <div className="sticky top-[var(--nav-h,4.5rem)] flex h-[calc(100svh-var(--nav-h,4.5rem))] w-full items-center justify-center overflow-hidden bg-white px-4">
                
                <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#2e4a36_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] mix-blend-multiply"></div>

                <div id="team-asset-stage" className="relative z-20 w-[min(90vw,56rem)] translate-y-16 overflow-hidden rounded-2xl border border-neutral-200/50 bg-neutral-900 opacity-0 shadow-[0_20px_50px_rgba(0,0,0,0.15)] aspect-[16/9]">
                    
                    <img id="team-static-img" src="/assets/meet-the-team.jpg" alt="Renew-e Core Engineering Team Presentation" className="absolute inset-0 z-10 h-full w-full object-contain object-center transition-transform duration-300" loading="lazy" />
                    
                    <div id="team-video-mask" className="pointer-events-none absolute inset-0 z-20 bg-black/40 opacity-0"></div>

                    <video id="team-cinematic-video" className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover object-center opacity-0" loop muted playsInline preload="auto">
                        <source src="/assets/ghaf_video_mbrif.mp4" type="video/mp4" />
                    </video>

                    <button
                        type="button"
                        id="team-video-mute-btn"
                        onClick={() => {
                            const video = document.getElementById('team-cinematic-video') as HTMLVideoElement | null
                            if (!video) return
                            const nextMuted = !video.muted
                            video.muted = nextMuted
                            if (!nextMuted) video.volume = 1
                            videoMutedRef.current = nextMuted
                            setVideoMuted(nextMuted)
                            if (video.paused) void video.play().catch(() => {})
                        }}
                        className={`absolute right-4 top-4 z-50 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45 transition-opacity duration-300 hover:text-white/70 md:right-5 md:top-5 ${
                            showVideoMute ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                        }`}
                        aria-label={videoMuted ? 'Unmute video' : 'Mute video'}
                    >
                        {videoMuted ? 'unmute' : 'mute'}
                    </button>

                    <div id="team-video-typography" className="pointer-events-none absolute bottom-6 left-6 z-40 translate-y-4 transform opacity-0 md:bottom-10 md:left-10">
                        <span className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-lime-400">// CORES IN ACTION</span>
                        <h4 className="text-xl font-extrabold leading-none tracking-tight text-white md:text-2xl">Live Documented Milestones</h4>
                    </div>
                </div>

            </div>
        </div>

        <div id="journey-gallery-track" className="relative w-full bg-neutral-50 pt-24 pb-28 border-t border-neutral-200/40 md:pt-32 md:pb-36">
            <div className="relative z-10 mx-auto mb-12 max-w-6xl px-6 md:mb-16">
                <span className="mb-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-emerald-700">// Historical Compilations</span>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 leading-tight md:text-5xl">Our Journey In Memories</h3>
                <p className="mt-2 max-w-md text-sm font-medium text-slate-500 md:text-base">A fluid archive of critical milestones, development workshops, and collaborative regional creation frames.</p>
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
                <div className="gallery-card">
                    <div className="-rotate-1 rounded-2xl border border-neutral-200/70 bg-white p-3 shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] md:p-4">
                        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
                            <img src="/assets/first_pitch_gov.jpg" className="h-full w-full object-cover" alt="First Attempt at Pitch@Gov 2024" loading="lazy" />
                        </div>
                        <p className="mt-3 text-center text-[11px] font-bold uppercase tracking-wide text-neutral-400">First Attempt at Pitch@Gov 2024</p>
                    </div>
                </div>

                <div className="gallery-card">
                    <div className="rotate-1 rounded-2xl border border-neutral-200/70 bg-white p-3 shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] md:p-4">
                        <div className="aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100 sm:aspect-[4/5]">
                            <img src="/assets/rahel.jpg" className="h-full w-full object-cover object-top" alt="Rahel describing our features" loading="lazy" />
                        </div>
                        <p className="mt-3 text-center text-[11px] font-bold uppercase tracking-wide text-neutral-400">Rahel describing our features</p>
                    </div>
                </div>

                <div className="gallery-card">
                    <div className="-rotate-1 rounded-2xl border border-neutral-200/70 bg-white p-3 shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] md:p-4">
                        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
                            <img src="/assets/meet-the-team.jpg" className="h-full w-full object-cover" alt="The Ghaf team winning Pitch@Gov" loading="lazy" />
                        </div>
                        <p className="mt-3 text-center text-[11px] font-bold uppercase tracking-wide text-neutral-400">The Ghaf team winning Pitch@Gov</p>
                    </div>
                </div>

                <div className="gallery-card">
                    <div className="rotate-1 rounded-2xl border border-neutral-200/70 bg-white p-3 shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] md:p-4">
                        <div className="aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100 sm:aspect-[4/5]">
                            <img src="/assets/nevan.jpeg" className="h-full w-full object-cover object-top" alt="Nevan concluding our pitch" loading="lazy" />
                        </div>
                        <p className="mt-3 text-center text-[11px] font-bold uppercase tracking-wide text-neutral-400">Nevan concluding our pitch</p>
                    </div>
                </div>

                <div className="gallery-card">
                    <div className="-rotate-1 rounded-2xl border border-neutral-200/70 bg-white p-3 shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] md:p-4">
                        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
                            <img src="/assets/naqiyah.jpeg" className="h-full w-full object-cover object-top" alt="Naqiyah explaining the business plan" loading="lazy" />
                        </div>
                        <p className="mt-3 text-center text-[11px] font-bold uppercase tracking-wide text-neutral-400">Naqiyah explaining the business plan</p>
                    </div>
                </div>

                <div className="gallery-card">
                    <div className="rotate-1 rounded-2xl border border-neutral-200/70 bg-white p-3 shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] md:p-4">
                        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
                            <img src="/assets/president.jpg" className="h-full w-full object-cover" alt="Meeting the Khalifa University President to discuss Ghaf" loading="lazy" />
                        </div>
                        <p className="mt-3 text-center text-[11px] font-bold uppercase tracking-wide text-neutral-400">Meeting the Khalifa University President to discuss Ghaf</p>
                    </div>
                </div>

                <div className="gallery-card sm:col-span-2 lg:col-span-1">
                    <div className="-rotate-1 rounded-2xl border border-neutral-200/70 bg-white p-3 shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] md:p-4">
                        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100 lg:aspect-[3/4]">
                            <img src="/assets/full_team.jpeg" className="h-full w-full object-cover" alt="The team on pitch day" loading="lazy" />
                        </div>
                        <p className="mt-3 text-center text-[11px] font-bold uppercase tracking-wide text-neutral-400">The team on pitch day</p>
                    </div>
                </div>

                <div className="gallery-card sm:col-span-2 lg:col-span-2">
                    <div className="rounded-3xl border border-neutral-200/80 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-transform duration-500 hover:scale-[1.01] md:p-5">
                        <div className="aspect-video overflow-hidden rounded-2xl bg-neutral-100">
                            <img src="/assets/meet-the-team.jpg" className="h-full w-full object-cover" alt="Meet the Winning Team" loading="lazy" />
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-4 px-1">
                            <div>
                                <h5 className="text-sm font-bold tracking-tight text-neutral-800 md:text-base">Meet the Winning Team</h5>
                                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600">Pitch@Gov Award Grand Finale</p>
                            </div>
                            <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-emerald-700 sm:inline-block">1st Place</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div className="bg-white text-slate-900 transition-colors duration-700" id="white-story-track">
        
        <section id="impact" className="relative w-full py-32 max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mb-20 bento-header">
                <span className="text-xs font-black tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase inline-block mb-4">// Regional Data Metrics</span>
                <h3 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-none">The stats are stacked.</h3>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-slate-50 border border-slate-200/60 rounded-3xl p-8 shadow-sm flex flex-col justify-between stat-card transform opacity-0">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 border border-rose-200 rounded-full text-xs font-bold uppercase mb-6">Critical Level</div>
                        <h4 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4">17.576 Tons</h4>
                        <p className="text-slate-600 font-medium text-base max-w-xl leading-relaxed">
                            The current annual carbon footprint average per resident in the UAE. This ranks at <span className="font-bold text-rose-600">4x higher</span> than the global average threshold.
                        </p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-slate-200/80 text-xs font-bold text-slate-400 uppercase tracking-widest">According to iea.org</div>
                </div>

                <div className="bg-gradient-to-br from-[#1b2920] to-[#243a2c] text-white rounded-3xl p-8 shadow-md flex flex-col justify-between stat-card transform opacity-0">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-lime-400 block mb-6">// Target Source</span>
                        <h4 className="text-5xl font-black text-white tracking-tight mb-2">57%</h4>
                        <p className="text-emerald-100/80 text-sm font-medium leading-relaxed">Of the country&apos;s entire ecological footprint stems entirely from domestic household choices and utility usage parameters.</p>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-lime-400 uppercase tracking-wider">
                        <Target className="w-4 h-4" /> Direct Consumer Power
                    </div>
                </div>
            </div>
        </section>

        <section id="journey" className="w-full py-24 text-center border-t border-slate-100 max-w-4xl mx-auto px-6">
            <div className="journey-header transform opacity-0">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Build Your Habits</span>
                <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 mt-4">Start Your Journey</h2>
                <div className="w-12 h-1 bg-emerald-600 mx-auto mt-6 rounded-full"></div>
            </div>
        </section>

        <div className="w-full space-y-40 pb-40 px-6 max-w-6xl mx-auto overflow-hidden">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center feature-story-row">
                <div className="space-y-4 text-block">
                    <span className="text-xs font-mono font-bold text-emerald-600 tracking-wider">01 // IDENTITY</span>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Personalize</h3>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">Adopt an endangered companion framework tailored directly to mirror your climate decisions dynamically.</p>
                </div>
                <div className="flex justify-center phone-block">
                    <PhoneScreen
                        images={[...PHONE_SCREENS.personalize]}
                        alt="Personalize app screens"
                        frameClassName="w-[280px] h-[540px] bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-950 shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center feature-story-row">
                <div className="flex justify-center phone-block md:order-1 order-2">
                    <PhoneScreen
                        images={[...PHONE_SCREENS.connect]}
                        alt="Connect and grow app screens"
                        frameClassName="w-[280px] h-[540px] bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-950 shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500"
                    />
                </div>
                <div className="space-y-4 text-block md:order-2 order-1">
                    <span className="text-xs font-mono font-bold text-emerald-600 tracking-wider">02 // ECOSYSTEM</span>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Connect & Grow</h3>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">Coordinate lifestyle tracking targets together with private micro-brackets and gamify your sustainability experience.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center feature-story-row">
                <div className="space-y-4 text-block">
                    <span className="text-xs font-mono font-bold text-emerald-600 tracking-wider">03 // ANALYTICS</span>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Track</h3>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">Track your carbon across the board easier than ever before, and gain clear visibility over your historical records without confusing conversion tracking metrics.</p>
                </div>
                <div className="flex justify-center phone-block">
                    <PhoneScreen
                        images={[...PHONE_SCREENS.track]}
                        alt="Carbon tracker app screens"
                        frameClassName="w-[280px] h-[540px] bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-950 shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center feature-story-row">
                <div className="flex justify-center phone-block md:order-1 order-2">
                    <PhoneScreen
                        images={[...PHONE_SCREENS.scan]}
                        alt="Scanner app screen"
                        frameClassName="w-[280px] h-[540px] bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-950 shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500"
                    />
                </div>
                <div className="space-y-4 text-block md:order-2 order-1">
                    <span className="text-xs font-mono font-bold text-emerald-600 tracking-wider">04 // AUTOMATION</span>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Scan & Swap</h3>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">Scan products on the go to get Sustainable alternatives in our flagship AI-powered feature</p>
                </div>
            </div>

            <div id="real-rewards-moment" className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-slate-50 border border-slate-200/60 shadow-inner px-4">
                
                <div className="absolute inset-y-0 left-0 w-full flex items-center justify-center opacity-10 pointer-events-none z-0">
                    <div className="w-full border-y border-slate-900 py-4 overflow-hidden">
                        <div className="animate-marquee whitespace-nowrap flex gap-12 text-3xl font-black uppercase text-slate-950">
                            <span>THE GIVING MOVEMENT • IKEA • AL AIN WATER • GREENBITE • ECOMART • GROFAST</span>
                            <span>THE GIVING MOVEMENT • IKEA • AL AIN WATER • GREENBITE • ECOMART • GROFAST</span>
                        </div>
                    </div>
                </div>

                <div className="z-20 mb-8 floating-pill-box transform opacity-0 translate-y-4">
                    <button type="button" onClick={() => setModalOpen(true)} className="bg-[#1b2920] text-lime-400 font-extrabold text-xs px-6 py-2.5 rounded-full uppercase tracking-widest shadow-md hover:bg-slate-900 transition-all duration-300 flex items-center gap-2">
                        Explore Marketplace <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                </div>

                <div className="z-10 centered-phone-box transform scale-90 opacity-0">
                    <PhoneScreen
                        images={[...PHONE_SCREENS.rewards]}
                        alt="Ghaf Rewards app screen"
                        frameClassName="w-[290px] h-[550px] bg-slate-900 rounded-[2.75rem] border-[6px] border-slate-950 shadow-2xl overflow-hidden relative"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center feature-story-row">
                <div className="space-y-4 text-block">
                    <span className="text-xs font-mono font-bold text-emerald-600 tracking-wider">05 // COGNITIVE AGENT</span>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Renew-e</h3>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">An adaptive AI micro-coach providing context-aware action steps to build sustainable, lifelong ecological habits.</p>
                </div>
                <div className="flex justify-center phone-block">
                    <PhoneScreen
                        images={[...PHONE_SCREENS.renew]}
                        alt="Renew-e app screens"
                        frameClassName="w-[280px] h-[540px] bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-950 shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 border-t border-slate-100 feature-story-row">
                <div className="lg:col-span-5 flex justify-center phone-block">
                    <PhoneScreen
                        images={[...PHONE_SCREENS.events]}
                        alt="Community events app screens"
                        frameClassName="w-[300px] h-[580px] bg-slate-900 rounded-[2.75rem] border-[8px] border-slate-950 shadow-2xl overflow-hidden relative"
                    />
                </div>

                <div className="lg:col-span-7 space-y-6 text-block">
                    <span className="text-xs font-black tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase inline-block">// Active Regional Initiatives</span>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Community Events</h3>
                    <p className="text-slate-600 text-lg font-medium leading-relaxed">
                        Step outside the screen framework. Connect seamlessly with neighborhood-driven climate assemblies, regional swap shops, and pop-up ecological hubs across the emirates.
                    </p>
                    
                    <div className="space-y-3 pt-4" id="event-animated-list">
                        <div className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/60 rounded-2xl event-list-item transform opacity-0 translate-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs uppercase">DXB</div>
                                <div>
                                    <h5 className="font-bold text-slate-900 text-sm">Sustainable Swap Shop Meet</h5>
                                    <p className="text-xs text-slate-400">Jumeirah Hub • 10:00 AM</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/60 rounded-2xl event-list-item transform opacity-0 translate-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-lime-500 text-slate-950 flex items-center justify-center font-bold text-xs uppercase">AUH</div>
                                <div>
                                    <h5 className="font-bold text-slate-900 text-sm">Mangrove Restoration Volunteer Drive</h5>
                                    <p className="text-xs text-slate-400">Eastern Mangroves • 07:30 AM</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <footer className="bg-[#1b2920] border-t border-white/5 py-16 px-6 text-center text-emerald-100/40 text-xs z-30 relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className={`${LOGO_CROP_BOX} shrink-0`}>
                <img src={LOGO_LIGHT_SRC} alt="Ghaf Logo" className={LOGO_CROP_IMG} loading="lazy" />
            </div>
            <p className="font-medium">&copy; 2026 Renew-e Ecosystem. Built for the future of the UAE consumer landscape. All rights reserved.</p>
        </div>
    </footer>
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
