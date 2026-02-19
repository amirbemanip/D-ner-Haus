"use client"
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Users, ArrowRight, Instagram, MapPin } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-obsidian-base flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[360px] relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
        <div className="relative w-28 h-28 mb-12 group">
          <div className="absolute inset-0 bg-gold rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
          <Image
            src="/logo.jpg"
            alt="Dönerhaus Logo"
            fill
            className="object-cover rounded-full border border-white/10 relative z-10"
          />
        </div>

        <h1 className="font-display text-3xl font-bold text-white mb-2 uppercase tracking-widest text-center">Dönerhaus</h1>
        <p className="text-gold text-[10px] font-bold uppercase tracking-[0.5em] mb-16">Nürnberg Elite</p>

        <div className="w-full space-y-4">
          <Link href="/club/register" className="block group">
            <Card className="p-6 flex items-center justify-between hover:bg-white hover:text-black transition-all group cursor-pointer border-white/10">
              <div className="flex items-center gap-4">
                <Users className="w-5 h-5 text-gold group-hover:text-black transition-colors" />
                <span className="font-display text-[10px] font-bold uppercase tracking-widest">Join the Elite Club</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Card>
          </Link>

          <Link href="https://maps.app.goo.gl/ti7Co6ecNBh9XnYB6?g_st=ic" target="_blank" className="block group">
            <Card className="p-6 flex items-center justify-between hover:bg-white hover:text-black transition-all group cursor-pointer border-white/10">
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-gold group-hover:text-black transition-colors" />
                <span className="font-display text-[10px] font-bold uppercase tracking-widest">Find our Location</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Card>
          </Link>

          <Link href="https://search.google.com/local/writereview?placeid=ChIJf0mCBPlXn0cR8p77p3120sA" target="_blank" className="block group">
            <Card className="p-6 flex items-center justify-between hover:bg-white hover:text-black transition-all group cursor-pointer border-white/10">
              <div className="flex items-center gap-4">
                <Star className="w-5 h-5 text-gold group-hover:text-black transition-colors" />
                <span className="font-display text-[10px] font-bold uppercase tracking-widest">Leave a Review</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Card>
          </Link>

          <Link href="https://www.instagram.com/doenerhaus_nuernberg?igsh=eGdybHloajNlM3Fp" target="_blank" className="block group">
            <Card className="p-6 flex items-center justify-between hover:bg-white hover:text-black transition-all group cursor-pointer border-white/10">
              <div className="flex items-center gap-4">
                <Instagram className="w-5 h-5 text-gold group-hover:text-black transition-colors" />
                <span className="font-display text-[10px] font-bold uppercase tracking-widest">Follow us on IG</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Card>
          </Link>
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-600 text-[8px] font-bold uppercase tracking-[0.4em]">Crafted for Perfection</p>
        </div>
      </motion.div>
    </div>
  )
}
