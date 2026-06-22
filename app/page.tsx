'use client'

import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import WhyUs from '@/components/WhyUs'
import Faq from '@/components/Faq'
import Footer from '@/components/Footer'

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('sz-theme') as 'light' | 'dark' | null
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('data-motion', 'balanced')
    document.documentElement.setAttribute('data-backdrop', 'soft')
    localStorage.setItem('sz-theme', theme)
  }, [theme])

  return (
    <>
      <Nav theme={theme} setTheme={setTheme} />
      <Hero />
      <Services />
      <About />
      <WhyUs />
      <Faq />
      <Footer />
    </>
  )
}
