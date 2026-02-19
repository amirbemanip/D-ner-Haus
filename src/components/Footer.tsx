"use client"
import { usePathname } from 'next/navigation'
import { Instagram, Music } from 'lucide-react'

export const Footer = () => {
  const pathname = usePathname()
  const hiddenRoutes = ['/connect', '/seller', '/admin', '/login']
  if (hiddenRoutes.some(route => pathname.startsWith(route))) return null

  return (
    <footer className="py-12 border-t border-white/5 bg-obsidian-surface relative z-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <div className="font-display font-bold text-xl text-white tracking-widest uppercase">Dönerhaus</div>
          <div className="text-[9px] text-gray-500 mt-2 uppercase tracking-widest">© 2026 Nürnberg. All Rights Reserved.</div>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-500 hover:text-gold transition-colors cursor-hover">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gold transition-colors cursor-hover">
            <Music className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
