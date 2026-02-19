"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Lock } from 'lucide-react'
import Image from 'next/image'

export const Navbar = () => {
  const pathname = usePathname()

  // Hide navbar on focus routes
  const hiddenRoutes = ['/connect', '/seller', '/admin', '/login']
  if (hiddenRoutes.some(route => pathname.startsWith(route))) return null

  return (
    <nav className="fixed top-0 w-full z-50 py-4 md:py-6 bg-obsidian-base/80 backdrop-blur-lg border-b border-white/5 md:bg-transparent md:backdrop-blur-none md:border-none md:mix-blend-difference text-white transition-all">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 md:gap-4 group cursor-hover">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center overflow-hidden group-hover:border-gold transition-colors shrink-0">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={48}
              height={48}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="leading-tight relative group/brand">
            <span className="block font-display font-bold text-sm md:text-lg tracking-widest uppercase">Dönerhaus</span>
            <span className="block text-[7px] md:text-[9px] font-sans tracking-[0.4em] uppercase text-gray-400 group-hover:text-gold transition-colors">Nürnberg</span>
            {/* Liquid Glass Bar */}
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-white/10 rounded-full overflow-hidden blur-[0.5px]">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/club/register" className="text-[9px] md:text-[10px] font-bold font-display tracking-[0.2em] md:tracking-[0.3em] hover:text-gold transition-colors uppercase">Loyalty</Link>
          <Link
            href="/login"
            className="w-8 h-8 md:w-10 md:h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-hover"
          >
            <Lock className="w-2.5 h-2.5 md:w-3 h-3" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
