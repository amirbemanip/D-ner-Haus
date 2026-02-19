"use client"
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      })
    }

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 4,
        backgroundColor: 'white',
        border: 'none',
        mixBlendMode: 'difference',
        duration: 0.3
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        mixBlendMode: 'exclusion',
        duration: 0.3
      })
    }

    window.addEventListener('mousemove', moveCursor)

    const hoverElements = document.querySelectorAll('a, button, input, .cursor-hover, .btn-magnetic')
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <div
      id="cursor"
      className="fixed top-0 left-0 w-5 h-5 border border-white/30 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-exclusion hidden lg:block"
    />
  )
}
