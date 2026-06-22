'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Plus, ArrowUpRight } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const FAQS = [
  {
    q: 'How can St8tionZero help my business grow?',
    a: 'We get you the digital basics that actually move the needle for a small SA business: a fast website, a Google presence so customers find you, and socials that look the part. No fluff, no 90-day workshops — just the things that bring people through your door.',
  },
  {
    q: 'What does it cost — really?',
    a: 'Fixed packages with the price shown upfront. You see the number before we start. No "investment levels" call, no surprise invoices.',
  },
  {
    q: 'How long until my site is live?',
    a: "We move quickly. Once we have your content and logo, we give you a clear timeline upfront — and stick to it, so you're never left wondering.",
  },
  {
    q: 'Do you work with businesses outside the big cities?',
    a: "Absolutely. The salon in Fourways, the panel beater in Benoni, the coffee spot in Maboneng — and everywhere in between. If you're an SA business with customers, we can help.",
  },
  {
    q: 'Who actually does the work?',
    a: 'Us. The person you talk to is the person building your site. No call centre, no account manager relay race.',
  },
]

export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null)
  const bodyRefs   = useRef<(HTMLDivElement | null)[]>([])
  const [openIdx, setOpenIdx] = useState<number>(0)

  useGSAP(() => {
    gsap.fromTo('.faq-left',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.faq-left', start: 'top 88%', once: true },
      }
    )
    gsap.fromTo('.faq-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: '.faq-item', start: 'top 85%', once: true },
      }
    )
  }, { scope: sectionRef })

  const toggle = (idx: number) => {
    const nextOpen = openIdx === idx ? -1 : idx

    // Close currently open
    if (openIdx >= 0 && bodyRefs.current[openIdx]) {
      gsap.to(bodyRefs.current[openIdx], {
        height: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      })
    }

    // Open next
    if (nextOpen >= 0 && bodyRefs.current[nextOpen]) {
      gsap.fromTo(bodyRefs.current[nextOpen],
        { height: 0 },
        { height: 'auto', duration: 0.5, ease: 'power2.out' }
      )
    }

    setOpenIdx(nextOpen)
  }

  // Set initial open state (index 0)
  useGSAP(() => {
    if (bodyRefs.current[0]) {
      gsap.set(bodyRefs.current[0], { height: 'auto' })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{ padding: 'clamp(4.375rem,9vw,7.5rem) 0' }}
    >
      <div
        className="wrap faq-grid"
        style={{ display: 'grid', gridTemplateColumns: '21.25rem 1fr', gap: '3.75rem' }}
      >
        <div className="faq-left">
          <div className="eyebrow">FAQ</div>
          <h2 style={{
            fontWeight: 300, letterSpacing: 'var(--tr-tight)',
            fontSize: 'var(--fs-h2-sm)', margin: '1rem 0 0',
            lineHeight: 'var(--lh-tight)',
          }}>
            Questions,<br />answered straight.
          </h2>
          <p style={{ color: 'var(--fg-mute)', fontSize: 'var(--fs-body)', marginTop: '1rem' }}>
            Still unsure? Just message us — you&apos;ll get a real reply.
          </p>
          <a className="btn btn-ghost" href="#contact" style={{ marginTop: '1.375rem' }}>
            Ask us anything <ArrowUpRight weight="bold" className="arrow" />
          </a>
        </div>

        <div>
          {FAQS.map((f, i) => (
            <div key={i} className={`faq-item${openIdx === i ? ' open' : ''}`}>
              <div className="faq-q" onClick={() => toggle(i)}>
                <span>{f.q}</span>
                <Plus weight="bold" className="faq-ico" />
              </div>
              <div
                ref={(el) => { bodyRefs.current[i] = el }}
                className="faq-body"
              >
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
