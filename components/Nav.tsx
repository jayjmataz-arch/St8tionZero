'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { MoonStars, Sun, ArrowUpRight } from '@phosphor-icons/react'
import Wordmark from './Wordmark'

gsap.registerPlugin(useGSAP)

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Why us',   href: '#whyus'    },
  { label: 'About',    href: '#about'    },
  { label: 'FAQ',      href: '#faq'      },
]

interface NavProps {
  theme: 'light' | 'dark'
  setTheme: (t: 'light' | 'dark') => void
}

export default function Nav({ theme, setTheme }: NavProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navRef  = useRef<HTMLElement>(null)

  // Lock scroll + close on resize
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onResize = () => { if (window.innerWidth > 820) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // GSAP stagger for mobile menu links
  useGSAP(() => {
    const menu = menuRef.current
    if (!menu) return
    const links = menu.querySelectorAll<HTMLElement>('.nav-menu-link')

    if (open) {
      gsap.fromTo(
        links,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.06,
          delay: 0.1,
        }
      )
    } else {
      gsap.to(links, { opacity: 0, y: 8, duration: 0.2, ease: 'power2.in', stagger: 0.03 })
    }
  }, { scope: navRef, dependencies: [open] })

  return (
    <nav ref={navRef} className={`nav${open ? ' menu-open' : ''}`}>
      <div className="wrap nav-inner">
        <Wordmark size={1.3125} onClick={() => setOpen(false)} />

        <div className="nav-links">
          {LINKS.slice(0, 3).map((l) => (
            <a key={l.label} className="navlink" href={l.href}>
              <span data-t={l.label}>{l.label}</span>
            </a>
          ))}
        </div>

        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '.875rem' }}>
          <a className="navlink nav-cta-faq nav-mobile-hide" href="#faq" style={{ alignSelf: 'center' }}>
            <span data-t="FAQ">FAQ</span>
          </a>
          <a className="btn btn-primary nav-mobile-hide" href="#contact" style={{ padding: '.625rem 1.125rem', fontSize: 'var(--fs-body)' }}>
            Get a quote <ArrowUpRight weight="bold" className="arrow" />
          </a>
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun weight="fill" /> : <MoonStars weight="bold" />}
          </button>
          <button
            className="icon-btn nav-burger"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`burger${open ? ' x' : ''}`}>
              <i /><i /><i />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div ref={menuRef} className={`nav-menu${open ? ' open' : ''}`} id="nav-menu">
        <div className="wrap nav-menu-inner">
          {LINKS.map((l) => (
            <a
              key={l.label}
              className="nav-menu-link"
              href={l.href}
              style={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <span>{l.label}</span>
              <ArrowUpRight weight="bold" />
            </a>
          ))}
          <a className="btn btn-primary nav-menu-cta" href="#contact" onClick={() => setOpen(false)}>
            Get a quote <ArrowUpRight weight="bold" className="arrow" />
          </a>
        </div>
      </div>

      <div className={`nav-scrim${open ? ' show' : ''}`} onClick={() => setOpen(false)} />
    </nav>
  )
}
