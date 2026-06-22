'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  RocketLaunch,
  Tag,
  HandHeart,
  MagnifyingGlass,
  ArrowDown,
  MouseSimple,
} from '@phosphor-icons/react'
import OriginCore from './OriginCore'

gsap.registerPlugin(useGSAP)

const HERO_CARDS: { rot: number; bg: string; label: string; tag: string; dark?: boolean }[] = [
  { rot: -14, bg: 'linear-gradient(160deg,#2a2c6b,#533afd)', label: 'Local SEO',            tag: 'SEO'    },
  { rot:   0, bg: 'linear-gradient(165deg,#0d253d,#2a2c6b)', label: 'Everyday businesses',  tag: 'WEB'    },
  { rot:  14, bg: 'linear-gradient(160deg,#ea2261,#f96bee)', label: 'Socials kit',           tag: 'SOCIAL' },
]

const BADGES = [
  { icon: RocketLaunch, text: 'Live quickly',                                    style: { top: '.875rem',   left: '16%'  }, alt: false, delay: 0    },
  { icon: Tag,          text: 'Fixed pricing, upfront',                          style: { top: '-.375rem',  right: '17%' }, alt: true,  delay: 0.6  },
  { icon: HandHeart,    text: "No complicated bureaucracy. We'll keep it simple", style: { bottom: '2.375rem', left: '9%' }, alt: true,  delay: 1.1  },
  { icon: MagnifyingGlass, text: 'Found on Google',                             style: { bottom: '.75rem',  right: '10%' }, alt: false, delay: 1.6  },
]

export default function Hero() {
  const heroRef    = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const marqueeAnim = useRef<gsap.core.Tween | null>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // ── Entrance timeline ──────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.hero-eyebrow', { opacity: 0, y: 28, duration: 0.9 }, 0.1)
      .from('.hero-h1-l1',   { opacity: 0, y: 32, duration: 1.0 }, 0.2)
      .from('.hero-h1-l2',   { opacity: 0, y: 32, duration: 1.0 }, 0.32)
      .from('.hero-lead',    { opacity: 0, y: 24, duration: 0.9 }, 0.44)
      .from('.hero-ctas',    { opacity: 0, y: 20, duration: 0.8 }, 0.54)
      .from(
        '.hero-badge',
        { opacity: 0, scale: 0.75, duration: 0.6, stagger: 0.12, ease: 'back.out(1.4)' },
        0.62
      )
      .from(
        '.fan-card',
        { opacity: 0, y: 40, duration: 0.7, stagger: { each: 0.07, from: 'center' }, ease: 'power2.out' },
        0.5
      )
      .from('.hero-scroll-hint', { opacity: 0, duration: 0.6 }, 1.0)

    // ── GSAP Marquee ───────────────────────────────────────────────
    const track = trackRef.current
    if (!track) return
    const trackW = track.scrollWidth / 2

    marqueeAnim.current = gsap.to(track, {
      x: -trackW,
      duration: 28,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (x: string) => `${parseFloat(x) % trackW}px`,
      },
    })

    // Pause on hover
    const marqueeEl = track.parentElement
    if (marqueeEl) {
      marqueeEl.addEventListener('mouseenter', () => marqueeAnim.current?.pause())
      marqueeEl.addEventListener('mouseleave', () => marqueeAnim.current?.play())
    }
  }, { scope: heroRef })

  return (
    <header
      ref={heroRef}
      id="top"
      style={{ position: 'relative', overflow: 'hidden', paddingBottom: '2.5rem' }}
    >
      {/* Mesh wash */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '38.75rem',
        background: 'var(--mesh)',
        opacity: 'calc(var(--mesh-op) * var(--mesh-boost, 0.5))',
      }} />
      {/* Fade to bg */}
      <div style={{
        position: 'absolute', top: '22.5rem', left: 0, right: 0, height: '20rem',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0), var(--bg))',
      }} />

      <OriginCore />

      {/* Ghost text marquee */}
      <div className="marquee" style={{ position: 'absolute', top: '26.875rem', left: 0, right: 0, zIndex: 1 }}>
        <div ref={trackRef} className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center' }}>
              {['WEBSITES', 'SEO', 'SOCIALS', 'BRAND', 'GOOGLE'].map((w) => (
                <span key={w} style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <span className="ghost-word">{w}</span>
                  <span style={{ fontSize: '3.75rem', color: 'var(--fg-ghost)', margin: '0 .1em', fontWeight: 300 }}>*</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 4, paddingTop: '4.375rem', textAlign: 'center' }}>
        <div className="hero-eyebrow eyebrow" style={{ display: 'inline-block' }}>
          South African digital studio
        </div>

        <h1 style={{
          margin: '1.25rem 0 0',
          fontWeight: 300,
          letterSpacing: 'var(--tr-display)',
          lineHeight: 'var(--lh-display)',
          fontSize: 'var(--fs-display)',
        }}>
          <span className="hero-h1-l1" style={{ display: 'block' }}>Launch</span>
          <span className="hero-h1-l2" style={{ display: 'block' }}>
            from <span className="hero-zero">zero<span className="hero-dot">.</span></span>
          </span>
        </h1>

        <p className="hero-lead" style={{
          margin: '1.625rem auto 0',
          maxWidth: '34rem',
          fontSize: 'var(--fs-lead)',
          color: 'var(--fg-soft)',
          lineHeight: 'var(--lh-snug)',
        }}>
          Websites, SEO, social media — done properly, priced fairly. No complicated bureaucracy. We&apos;ll keep it simple.
        </p>

        <div className="hero-ctas" style={{
          display: 'flex', gap: '.75rem', justifyContent: 'center',
          marginTop: '1.875rem', flexWrap: 'wrap',
        }}>
          <a className="btn btn-primary" href="#services">
            See what we do <ArrowDown weight="bold" className="arrow" />
          </a>
          <a className="btn btn-ghost" href="#whyus">Why St8tionZero</a>
        </div>

        {/* Fan + badges */}
        <div className="hero-stage">
          {BADGES.map(({ icon: Icon, text, style, alt, delay }) => (
            <span
              key={text}
              className="badge hero-badge"
              style={{
                ...style,
                animationDelay: delay + 's',
                animationName: alt ? 'floatY2' : 'floatY',
              }}
            >
              <Icon weight="fill" className="bi" />
              {text}
            </span>
          ))}

          <div className="fan">
            {HERO_CARDS.map((c, i) => (
              <div
                key={i}
                className="fan-card"
                style={{
                  transform: `rotate(${c.rot}deg) translateY(${Math.abs(c.rot) * 0.7}px)`,
                  background: c.bg,
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  background: c.dark
                    ? 'linear-gradient(180deg,rgba(0,0,0,0),rgba(13,37,61,.12))'
                    : 'linear-gradient(180deg,rgba(255,255,255,.08),rgba(0,0,0,.18))',
                }} />
                <div style={{
                  position: 'absolute', top: '.75rem', left: '.75rem',
                  display: 'flex', gap: '.3125rem',
                }}>
                  {[0, 1, 2].map((j) => (
                    <span key={j} style={{
                      width: '.4375rem', height: '.4375rem', borderRadius: 99,
                      background: c.dark ? 'rgba(13,37,61,.25)' : 'rgba(255,255,255,.6)',
                    }} />
                  ))}
                </div>
                <div style={{ position: 'absolute', bottom: '.875rem', left: '.875rem', right: '.875rem' }}>
                  <div style={{ fontSize: '0.5625rem', letterSpacing: '.14em', color: c.dark ? 'rgba(13,37,61,.6)' : 'rgba(255,255,255,.7)', fontWeight: 500 }}>{c.tag}</div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 300, color: c.dark ? 'var(--ink)' : '#fff', letterSpacing: '-.02em', marginTop: '.125rem' }}>{c.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-scroll-hint" style={{
          display: 'inline-flex', alignItems: 'center', gap: '.5rem',
          marginTop: '1.875rem',
          color: 'var(--fg-mute)',
          fontSize: 'var(--fs-caption)',
        }}>
          <MouseSimple weight="thin" style={{ fontSize: '1.125rem' }} /> Scroll to explore
        </div>
      </div>
    </header>
  )
}
