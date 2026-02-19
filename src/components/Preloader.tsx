"use client"
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export const Preloader = () => {
  useEffect(() => {
    const bar = document.getElementById('loader-bar')
    if (bar) {
      bar.style.width = "100%"
    }

    const timer = setTimeout(() => {
      gsap.to('#loader', {
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
          const loader = document.getElementById('loader')
          if (loader) loader.style.display = 'none'
        }
      })
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      id="loader"
      className="fixed inset-0 z-[99999] bg-[#030303] flex items-center justify-center"
    >
      <div className="text-center">
        <h1 className="font-display font-bold text-6xl md:text-8xl tracking-widest text-transparent text-outline animate-pulse">
          DÖNERHAUS
        </h1>
        <div
          id="loader-bar"
          className="h-1 w-0 bg-gold mx-auto mt-6 transition-all duration-[1.5s] ease-out shadow-[0_0_15px_rgba(255,107,0,0.5)]"
        />
      </div>
    </div>
  )
}
