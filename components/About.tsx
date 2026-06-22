'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const LEAD = "Your website should load whether someone is on fibre in Sandton or standing at a taxi rank with two bars of signal. That's the standard."
const BODY = "St8tionZero builds websites, Google visibility, and social media that work where real South Africans use them. Digital foundations that help South African businesses get found, get trusted, and get chosen. No gimmicks. Just good work."

const TAGS = ['Websites', 'Local SEO', 'Google Business', 'Instagram', 'Facebook', 'Brand basics']

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef    = useRef<HTMLParagraphElement>(null)
  const [lit, setLit] = useState(0)

  const bodyWords = BODY.split(' ')

  useGSAP(() => {
    const el = textRef.current
    if (!el) return

    // Section eyebrow reveal
    gsap.fromTo('.about-eyebrow',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-eyebrow', start: 'top 88%', once: true },
      }
    )

    // Tags reveal
    gsap.fromTo('.about-tags',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-tags', start: 'top 88%', once: true },
      }
    )

    // Word-by-word reveal driven by scroll progress
    ScrollTrigger.create({
      trigger: el,
      start: '85% bottom',
      end:   '35% bottom',
      scrub: true,
      onUpdate: (self) => {
        setLit(Math.round(self.progress * bodyWords.length))
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ padding: 'clamp(5rem,11vw,9.375rem) 0 clamp(3.75rem,8vw,6.25rem)' }}
    >
      <div className="wrap">
        <div className="eyebrow about-eyebrow">About us</div>

        <div style={{ marginTop: '1.75rem' }}>
          <p
            ref={textRef}
            className="reveal-text"
            style={{ fontSize: 'var(--fs-h2-sm)', lineHeight: 1.22, margin: 0 }}
          >
            {/* Lead — always lit */}
            <span className="w lit" style={{ color: 'var(--fg)' }}>{LEAD} </span>
            {/* Body — word-by-word */}
            {bodyWords.map((w, i) => (
              <span key={i} className={`w${i < lit ? ' lit' : ''}`}>{w} </span>
            ))}
          </p>
        </div>

        <div
          className="about-tags"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '.625rem', marginTop: '2.75rem' }}
        >
          {TAGS.map((t) => (
            <span
              key={t}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                border: '1px solid var(--line)', color: 'var(--fg-soft)',
                borderRadius: 999, padding: '.5625rem 1rem',
                fontSize: 'var(--fs-sm)', background: 'var(--card-bg)',
              }}
            >
              <span style={{ width: '.375rem', height: '.375rem', borderRadius: 99, background: 'var(--primary)', flexShrink: 0 }} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
