'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

interface WordmarkProps {
  size?: number
  light?: boolean
  onClick?: () => void
}

export default function Wordmark({ size = 1.3125, light = false, onClick }: WordmarkProps) {
  const containerRef = useRef<HTMLAnchorElement>(null)
  const ringSize = size * 1.5 + 'rem'
  const stroke = light ? '#fff' : 'var(--primary)'

  useGSAP(() => {
    const el = containerRef.current
    if (!el) return

    const chev = el.querySelector<SVGGElement>('.chev:not(.ghost)')
    const ghost = el.querySelector<SVGGElement>('.chev.ghost')
    const pulse = el.querySelector<SVGCircleElement>('.pulse')

    if (!chev || !ghost || !pulse) return

    gsap.set(ghost, { opacity: 0, y: 26 })

    const enterTl = gsap.timeline({ paused: true })
    enterTl
      .to(chev, { y: -26, opacity: 0, duration: 0.45, ease: 'power2.out' }, 0)
      .to(ghost, { y: 0, opacity: 1, duration: 0.45, delay: 0.08, ease: 'power2.out' }, 0)
      .fromTo(pulse, { scale: 1, opacity: 0.5 }, { scale: 1.18, opacity: 0, duration: 0.7, ease: 'power2.out' }, 0)

    const leaveTl = gsap.timeline({ paused: true })
    leaveTl
      .to(chev, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0)
      .to(ghost, { opacity: 0, y: 26, duration: 0.25, ease: 'power2.in' }, 0)

    el.addEventListener('mouseenter', () => { leaveTl.pause(); enterTl.restart() })
    el.addEventListener('mouseleave', () => { enterTl.pause(); leaveTl.restart() })
  }, { scope: containerRef })

  return (
    <a
      ref={containerRef}
      className="wm"
      href="#top"
      onClick={onClick}
      aria-label="St8tionZero"
    >
      <svg
        className="wm-ring"
        width={ringSize}
        height={ringSize}
        viewBox="0 0 64 64"
        fill="none"
        style={{ flex: 'none' }}
      >
        <circle className="pulse" cx="32" cy="32" r="20" fill="none" stroke={stroke} strokeWidth="3" />
        <circle cx="32" cy="32" r="20" fill="none" stroke={stroke} strokeWidth="3" />
        <g className="chev">
          <path
            d="M32 42 L32 24 M24 31 L32 22 L40 31"
            stroke={stroke}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g className="chev ghost" style={{ opacity: 0 }}>
          <path
            d="M32 42 L32 24 M24 31 L32 22 L40 31"
            stroke={stroke}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      <span className="wm-text" style={{ fontSize: size + 'rem', color: light ? '#fff' : 'var(--fg)' }}>
        St8tion<span className="z" style={light ? { color: '#b9b9f9' } : undefined}>Zero</span>
      </span>
    </a>
  )
}
