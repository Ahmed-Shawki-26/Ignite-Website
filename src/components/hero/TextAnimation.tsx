'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

interface TextAnimationProps {
  text?: string
  className?: string
  isArabic?: boolean
}

const TextAnimation = ({ text, className = '', isArabic = false }: TextAnimationProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const tl2Ref = useRef<gsap.core.Timeline | null>(null)
  const animationRef = useRef<number | null>(null)

  // Throttled mouse move handler
  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    animationRef.current = requestAnimationFrame(() => {
      if (tlRef.current && tl2Ref.current) {
        tlRef.current.pause()
        tl2Ref.current.pause()
        gsap.to([tlRef.current, tl2Ref.current], {
          duration: 2,
          ease: 'power4',
          progress: e.x / window.innerWidth
        })
      }
    })
  }, [])

  useEffect(() => {
    if (!svgRef.current) return

    // Create the first timeline for the skew and scale animation
    tlRef.current = gsap.timeline({
      defaults: {
        duration: 2,
        yoyo: true,
        ease: 'power2.inOut'
      }
    })
    .fromTo('.left, .right', {
      svgOrigin: '640 500',
      skewY: (i: number) => [-30, 15][i],
      scaleX: (i: number) => [0.6, 0.85][i],
      x: 200
    }, {
      skewY: (i: number) => [-15, 30][i],
      scaleX: (i: number) => [0.85, 0.6][i],
      x: -200
    })
    .play(0.5)

    // Create the second timeline for text animation
    tl2Ref.current = gsap.timeline()

    const texts = svgRef.current.querySelectorAll('text')
    texts.forEach((t, i) => {
      tl2Ref.current?.add(
        gsap.fromTo(t, {
          xPercent: -100,
          x: 700
        }, {
          duration: 1,
          xPercent: 0,
          x: 575,
          ease: 'sine.inOut'
        }),
        i % 3 * 0.2
      )
    })

    // Optimized glow animation - reduced frequency
    const igniteTexts = svgRef.current.querySelectorAll('.ignite-glow')
    igniteTexts.forEach((text) => {
      gsap.to(text, {
        filter: 'drop-shadow(0 0 20px #ff0000) drop-shadow(0 0 30px #ff0000)',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'power2.inOut'
      })
    })

    // Add throttled event listener
    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      tlRef.current?.kill()
      tl2Ref.current?.kill()
    }
  }, [text, handlePointerMove])

  return (
    <div className={`w-full h-full ${className}`}>
      <svg 
        ref={svgRef}
        viewBox="0 0 1280 720" 
        className="w-full h-full"
        style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900 }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <mask id="maskLeft">
          <rect x="-50%" width="100%" height="100%" fill="#fff"/>
        </mask>
        <mask id="maskRight">
          <rect x="50%" width="100%" height="100%" fill="#fff"/>
        </mask>
                 <g fontSize={isArabic ? "120" : "150"}>
           <g mask="url(#maskLeft)" fill="#fff" className="left">
             <text y="120">{isArabic ? "أشعل" : "SPARK"}</text>
             <text y="250">{isArabic ? "الأفكار" : "IDEAS"}</text>
             <text y="380" fill="#ff0000" filter="url(#glow)" className="ignite-glow">{isArabic ? "أشعل" : "IGNITE"}</text>
             <text y="510">{isArabic ? "النتائج" : "RESULTS"}</text>
           </g>
           <g mask="url(#maskRight)" fill="#aaa" className="right">
             <text y="120">{isArabic ? "أشعل" : "SPARK"}</text>
             <text y="250">{isArabic ? "الأفكار" : "IDEAS"}</text>
             <text y="380" fill="#ff0000" filter="url(#glow)" className="ignite-glow">{isArabic ? "أشعل" : "IGNITE"}</text>
             <text y="510">{isArabic ? "النتائج" : "RESULTS"}</text>
           </g>
         </g>
      </svg>
    </div>
  )
}

export default TextAnimation 