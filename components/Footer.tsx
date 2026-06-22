'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  InstagramLogo, FacebookLogo, WhatsappLogo, LinkedinLogo, ArrowUpRight
} from '@phosphor-icons/react'
import Wordmark from './Wordmark'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const COLS = [
  { h: 'Services', links: ['Web design', 'SEO setup', 'Social media', 'Maintenance'] },
  { h: 'Studio',   links: ['Why us', 'Our work', 'Pricing', 'Get a quote'] },
  {
    h: 'Connect',
    links: [
      { label: 'Instagram', href: '#'                         },
      { label: 'Facebook',  href: '#'                         },
      { label: 'WhatsApp',  href: 'https://wa.me/27648052749' },
      { label: 'Email',     href: 'mailto:st8tionzero@gmail.com' },
    ],
  },
]

type LinkObj = { label: string; href: string }
const isObj = (l: string | LinkObj): l is LinkObj => typeof l === 'object'

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // CTA band entrance
    gsap.fromTo('.cta-band-inner',
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.cta-band-inner', start: 'top 88%', once: true },
      }
    )

    // Footer columns stagger
    gsap.fromTo('.foot-col',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: '.foot-grid', start: 'top 88%', once: true },
      }
    )

    // Mega wordmark reveal
    gsap.fromTo('.foot-mega',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: '.foot-mega', start: 'top 95%', once: true },
      }
    )
  }, { scope: footerRef })

  return (
    <div ref={footerRef}>
      {/* CTA band */}
      <section id="contact" style={{ padding: 'clamp(3.75rem,8vw,6.875rem) 0' }}>
        <div className="wrap">
          <div
            className="cta-band-inner"
            style={{
              position: 'relative', overflow: 'hidden',
              borderRadius: '1.75rem',
              padding: 'clamp(2.5rem,6vw,5.25rem)',
              textAlign: 'center',
              background: 'var(--mesh)',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(255,255,255,.2), rgba(255,255,255,.55))',
            }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{
                fontWeight: 300, letterSpacing: 'var(--tr-display)',
                fontSize: 'var(--fs-h1)', lineHeight: 'var(--lh-display)',
                margin: 0, color: 'var(--ink)',
              }}>
                Ready to launch <span className="hero-zero">from&nbsp;zero?</span>
              </h2>
              <p style={{
                color: 'var(--ink-secondary)', fontSize: 'var(--fs-lead)',
                lineHeight: 'var(--lh-snug)', margin: '1.25rem auto 0',
                maxWidth: '27.5rem',
              }}>
                Tell us about your business. You&apos;ll hear back from the person who will build your site — usually the same day.
              </p>
              <div
                className="cta-btns"
                style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', marginTop: '1.875rem', flexWrap: 'wrap' }}
              >
                <a
                  className="btn btn-primary"
                  href="mailto:st8tionzero@gmail.com?subject=Quote%20request%20%E2%80%94%20St8tionZero&body=Hi%20St8tionZero%2C%0A%0AHere%27s%20a%20bit%20about%20my%20business%3A%0A%0A-%20Business%20name%3A%0A-%20What%20I%20need%20(website%20%2F%20SEO%20%2F%20socials)%3A%0A-%20Website%20or%20socials%20(if%20any)%3A%0A%0AThanks%21"
                  style={{ fontSize: 'var(--fs-body-lg)', padding: '.9375rem 1.75rem' }}
                >
                  Get my quote <ArrowUpRight weight="bold" className="arrow" />
                </a>
                <a
                  className="btn btn-dark"
                  href="https://wa.me/27648052749?text=Hi%20St8tionZero%2C%20I%27d%20like%20to%20chat%20about%20getting%20my%20business%20online."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 'var(--fs-body-lg)', padding: '.9375rem 1.75rem' }}
                >
                  WhatsApp us <WhatsappLogo weight="fill" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark footer */}
      <footer className="foot">
        <div className="wrap" style={{ paddingTop: '4rem', paddingBottom: '2.25rem' }}>
          <div
            className="foot-grid"
            style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '2.5rem' }}
          >
            {/* Brand col */}
            <div className="foot-col">
              <Wordmark size={1.375} light />
              <p style={{
                color: 'rgba(255,255,255,.6)', fontSize: 'var(--fs-sm)',
                lineHeight: 'var(--lh-body)', marginTop: '1.125rem', maxWidth: '17.5rem',
              }}>
                The digital basics every SA business needs to actually compete out here.
              </p>
              <div style={{ display: 'flex', gap: '.875rem', marginTop: '1.25rem', color: 'rgba(255,255,255,.7)', fontSize: '1.375rem' }}>
                <InstagramLogo weight="fill" className="foot-soc" />
                <FacebookLogo  weight="fill" className="foot-soc" />
                <a href="https://wa.me/27648052749" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <WhatsappLogo weight="fill" className="foot-soc" />
                </a>
                <LinkedinLogo  weight="fill" className="foot-soc" />
              </div>
            </div>

            {/* Link cols */}
            {COLS.map((c) => (
              <div key={c.h} className="foot-col">
                <div style={{
                  fontSize: 'var(--fs-eyebrow)', letterSpacing: '.12em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,.45)',
                  marginBottom: '1rem',
                }}>
                  {c.h}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.6875rem' }}>
                  {c.links.map((l) =>
                    isObj(l) ? (
                      <li key={l.label}>
                        <a
                          className="foot-link"
                          href={l.href}
                          target={l.href.startsWith('http') ? '_blank' : undefined}
                          rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          style={{ color: 'rgba(255,255,255,.78)', textDecoration: 'none', fontSize: 'var(--fs-sm)' }}
                        >
                          {l.label}
                        </a>
                      </li>
                    ) : (
                      <li key={l}>
                        <a className="foot-link" href="#" style={{ color: 'rgba(255,255,255,.78)', textDecoration: 'none', fontSize: 'var(--fs-sm)' }}>
                          {l}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* Giant wordmark */}
          <div style={{ marginTop: '3.5rem', overflow: 'hidden' }}>
            <div className="foot-mega">st8tionzero</div>
          </div>

          {/* Legal */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,.12)',
            marginTop: '1.5rem', paddingTop: '1.375rem',
            color: 'rgba(255,255,255,.5)', fontSize: 'var(--fs-caption)',
            flexWrap: 'wrap', gap: '.75rem',
          }}>
            <span>© 2026 St8tionZero. Made in South Africa.</span>
            <span style={{ display: 'flex', gap: '1.5rem' }}>
              <a className="foot-link" href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
              <a className="foot-link" href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
