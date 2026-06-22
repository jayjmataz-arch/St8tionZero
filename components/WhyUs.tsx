'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Coins, Lightning, Handshake, ArrowUpRight } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PILLARS = [
  {
    n: '01',
    Icon: Coins,
    title: "Pricing that doesn't require a second bond.",
    body: "Your marketing budget shouldn't need life support after paying for a website.\n\nWe keep things affordable, transparent, and sensible.",
  },
  {
    n: '02',
    Icon: Lightning,
    title: 'Designed for the daily grind.',
    body: 'Whether your customers are in traffic, at work, or grabbing lunch, we make sure they can find you online.',
  },
  {
    n: '03',
    Icon: Handshake,
    title: 'You deal with us. Actual us.',
    body: "No call centre. No “your account manager will be in touch.” You talk directly to the person building your site. Questions get answered, things move.",
  },
]

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.fromTo('.why-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.why-header', start: 'top 88%', once: true },
      }
    )

    if (!prefersReduced) {
      gsap.fromTo('.tile',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.14,
          scrollTrigger: { trigger: '.why-grid', start: 'top 82%', once: true },
        }
      )
    }

    gsap.fromTo('.why-closing',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.why-closing', start: 'top 88%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="whyus"
      style={{ padding: 'clamp(4.375rem,9vw,7.5rem) 0' }}
    >
      <div className="wrap">
        <div className="why-header" style={{ maxWidth: '45rem' }}>
          <div className="eyebrow">Why St8tionZero</div>
          <h2 style={{
            fontWeight: 300, letterSpacing: 'var(--tr-tight)',
            fontSize: 'var(--fs-h2)', margin: '1rem 0 0',
            lineHeight: 'var(--lh-tight)',
          }}>
            Built for SA small business.{' '}
            <span style={{ color: 'var(--primary)' }}>No load-shedding of value.</span>
          </h2>
        </div>

        <div
          className="why-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '1.125rem',
            marginTop: '3.125rem',
          }}
        >
          {PILLARS.map((p) => (
            <div key={p.title} className="tile" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                  width: '3.125rem', height: '3.125rem', borderRadius: '.875rem',
                  background: 'var(--bg-soft)', border: '1px solid var(--line)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--primary)', fontSize: '1.5rem',
                }}>
                  <p.Icon weight="thin" />
                </div>
                <span style={{ color: 'var(--fg-mute)', fontSize: '1.125rem', opacity: .5 }}>
                  <ArrowUpRight weight="bold" />
                </span>
              </div>
              <h3 style={{
                fontWeight: 300, fontSize: 'var(--fs-h3)',
                letterSpacing: 'var(--tr-flat)', lineHeight: 'var(--lh-snug)',
                margin: '1.375rem 0 0',
              }}>
                {p.title}
              </h3>
              <p style={{
                color: 'var(--fg-mute)', fontSize: 'var(--fs-sm)',
                lineHeight: 'var(--lh-body)', marginTop: '.75rem',
                whiteSpace: 'pre-line',
              }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <p className="why-closing" style={{
          textAlign: 'center', color: 'var(--fg-soft)',
          fontSize: 'var(--fs-lead)', fontWeight: 300,
          letterSpacing: 'var(--tr-flat)', lineHeight: 'var(--lh-snug)',
          margin: '3.5rem auto 0', maxWidth: '45rem',
        }}>
          Good businesses grow through word of mouth. Great businesses become accessible Online.
        </p>
      </div>
    </section>
  )
}
