'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { DeviceMobile, MagnifyingGlass, InstagramLogo } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SERVICES = [
  {
    Icon: DeviceMobile,
    title: 'Web Design',
    desc: 'Sharp, fast, mobile-first websites — built for a customer on a phone in a taxi, as well as the client seated in a boardroom.',
    bg: 'linear-gradient(160deg,#2a2c6b,#533afd)',
  },
  {
    Icon: MagnifyingGlass,
    title: 'SEO Configuration',
    desc: 'Get found on Google when someone types "best near me" late on a Tuesday night.',
    bg: 'linear-gradient(160deg,#0d253d,#273951)',
  },
  {
    Icon: InstagramLogo,
    title: 'Social Media',
    desc: 'Profiles and a posting strategy that make your brand look legit — not blurry flyers in caps lock.',
    bg: 'linear-gradient(160deg,#ea2261,#f96bee)',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Scroll reveal for header block
    gsap.utils.toArray<Element>('.srv-reveal').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      )
    })

    if (prefersReduced) return

    // Stagger rows on scroll entry
    gsap.fromTo(
      '.srow',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: '.srow', start: 'top 85%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ background: 'var(--bg-soft)', padding: 'clamp(4.375rem,9vw,7.5rem) 0' }}
    >
      <div className="wrap">
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.25rem',
        }}>
          <div className="srv-reveal">
            <div className="eyebrow">What we do</div>
            <h2 style={{
              fontWeight: 300, letterSpacing: 'var(--tr-tight)',
              fontSize: 'var(--fs-h2)', margin: '1rem 0 0',
              lineHeight: 'var(--lh-display)',
            }}>
              Three things,<br />done properly.
            </h2>
          </div>
          <p className="srv-reveal" style={{ color: 'var(--fg-mute)', maxWidth: '20rem', fontSize: 'var(--fs-body)' }}>
            Hover any service to see what it means. No 90-day strategy workshop required.
          </p>
        </div>

        <div style={{ marginTop: '3.125rem' }}>
          {SERVICES.map((s) => (
            <div className="srow" key={s.title}>
              <span className="srow-ico">
                <s.Icon weight="thin" style={{ fontSize: '1.625rem' }} />
              </span>
              <div className="srow-main">
                <span className="srow-title">{s.title}</span>
                <div className="srow-desc-wrap">
                  <div className="srow-desc-inner">
                    <span>{s.desc}</span>
                  </div>
                </div>
              </div>
              <div className="srow-thumb" style={{ background: s.bg }} />
              <div className="srow-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
