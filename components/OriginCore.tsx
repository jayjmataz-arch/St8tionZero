'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function OriginCore() {
  const svgRef = useRef<SVGSVGElement>(null)

  useGSAP(() => {
    const svg = svgRef.current
    if (!svg) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const textrot = svg.querySelector<SVGGElement>('.oc-textrot')
    const orbit   = svg.querySelector<SVGGElement>('.oc-orbit')
    const r1      = svg.querySelector<SVGCircleElement>('.oc-r1')
    const r2      = svg.querySelector<SVGCircleElement>('.oc-r2')
    const r3      = svg.querySelector<SVGCircleElement>('.oc-r3')
    const core    = svg.querySelector<SVGCircleElement>('.oc-core')

    if (textrot) {
      gsap.to(textrot, {
        rotation: 360,
        svgOrigin: '200 200',
        duration: 60,
        ease: 'none',
        repeat: -1,
      })
    }

    if (orbit) {
      gsap.to(orbit, {
        rotation: 360,
        svgOrigin: '200 200',
        duration: 8,
        ease: 'none',
        repeat: -1,
      })
    }

    const breathe = (el: SVGElement | null, dur: number, delay: number = 0) => {
      if (!el) return
      gsap.to(el, {
        scale: 1.05,
        opacity: 0.35,
        duration: dur / 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay,
      })
    }

    breathe(r1, 2,   0)
    breathe(r2, 3,   0.5)
    breathe(r3, 4,   1)
    breathe(core, 5, 1.5)
  }, { scope: svgRef })

  return (
    <div className="origin-core" aria-hidden="true">
      <svg ref={svgRef} viewBox="0 0 400 400" width="100%" height="100%">
        <defs>
          <path id="oc-textpath" d="M200,50 a150,150 0 1,1 -0.1,0 z" />
          <linearGradient id="oc-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--primary-soft)" />
            <stop offset="0.5" stopColor="var(--magenta)" />
            <stop offset="1" stopColor="var(--ruby)" />
          </linearGradient>
        </defs>

        <circle className="oc-ring oc-r3" cx="200" cy="200" r="178" fill="none" stroke="url(#oc-grad)" strokeWidth="1.4" />
        <circle className="oc-ring oc-r2" cx="200" cy="200" r="140" fill="none" stroke="url(#oc-grad)" strokeWidth="1.4" />
        <circle className="oc-ring oc-r1" cx="200" cy="200" r="104" fill="none" stroke="var(--primary)" strokeWidth="1.2" />

        <g className="oc-textrot">
          <text className="oc-text">
            <textPath href="#oc-textpath" startOffset="0">
              STATION ZERO · LAUNCH FROM ZERO · STATION ZERO · LAUNCH FROM ZERO ·
            </textPath>
          </text>
        </g>

        <g className="oc-orbit">
          <g transform="translate(200,50)">
            <circle r="11" fill="none" stroke="var(--primary)" strokeWidth="2" />
            <path
              d="M0,5 L0,-5 M-4,-1 L0,-6 L4,-1"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>

        <circle className="oc-core" cx="200" cy="200" r="34" fill="none" stroke="var(--primary-soft)" strokeWidth="1" />
        <circle cx="200" cy="200" r="3" fill="var(--primary)" />
      </svg>
    </div>
  )
}
