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
    <nav className="fixed top-0 w-full z-50 py-6 mix-blend-difference text-white">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 group cursor-hover">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center overflow-hidden group-hover:border-gold transition-colors">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={48}
              height={48}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="leading-tight">
            <span className="block font-display font-bold text-lg tracking-widest uppercase">Dönerhaus</span>
            <span className="block text-[9px] font-sans tracking-[0.4em] uppercase text-gray-400 group-hover:text-gold transition-colors">Nürnberg</span>
          </div>
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/club/register" className="hidden md:block text-[10px] font-bold font-display tracking-[0.3em] hover:text-gold transition-colors uppercase">Loyalty</Link>
          <Link
            href="/login"
            className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-hover"
          >
            <Lock className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
