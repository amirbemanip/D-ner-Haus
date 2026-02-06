'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Users, ArrowRight } from 'lucide-react'

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center p-6">
      {/* Background Decor - Reduced blur for Safari performance */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#E67E22]/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#E67E22]/5 blur-[80px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[340px] md:max-w-md relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8 md:mb-12 shadow-2xl">
          <Image
            src="/logo.jpg"
            alt="Dönerhaus Logo"
            fill
            className="object-cover rounded-full border-2 border-white/10"
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-[#F2F2F2] mb-2 uppercase tracking-tighter">Dönerhaus</h1>
        <p className="text-[#E67E22] text-sm font-bold uppercase tracking-[0.3em] mb-12">Nürnberg</p>

        <div className="w-full space-y-6">
          {/* Option 1: Customer Club */}
          <Link href="/club/register" className="block group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#141414] border border-white/5 p-5 md:p-6 rounded-2xl flex items-center gap-4 md:gap-6 hover:border-[#E67E22]/30 transition-all shadow-xl"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#E67E22]/10 rounded-xl flex items-center justify-center group-hover:bg-[#E67E22] transition-colors shrink-0">
                <Users className="w-6 h-6 md:w-7 md:h-7 text-[#E67E22] group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h2 className="text-base md:text-lg font-bold text-white mb-1 leading-tight">Döner Elite Club</h2>
                <p className="text-white/40 text-[10px] md:text-xs">Join for rewards & free Döner</p>
              </div>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white/20 group-hover:text-[#E67E22] transition-colors" />
            </motion.div>
          </Link>

          {/* Option 2: Google Review */}
          <Link
            href="https://search.google.com/local/writereview?placeid=ChIJf0mCBPlXn0cR8p77p3120sA"
            target="_blank"
            className="block group"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#141414] border border-white/5 p-5 md:p-6 rounded-2xl flex items-center gap-4 md:gap-6 hover:border-[#E67E22]/30 transition-all shadow-xl"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#E67E22]/10 rounded-xl flex items-center justify-center group-hover:bg-[#E67E22] transition-colors shrink-0">
                <Star className="w-6 h-6 md:w-7 md:h-7 text-[#E67E22] group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h2 className="text-base md:text-lg font-bold text-white mb-1 uppercase tracking-tight leading-tight">Feedback</h2>
                <p className="text-white/40 text-[10px] md:text-xs italic">Share your experience! ⭐</p>
              </div>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white/20 group-hover:text-[#E67E22] transition-colors" />
            </motion.div>
          </Link>
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">Follow the fire</p>
          <div className="flex gap-4 justify-center">
             <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-[#E67E22] hover:border-[#E67E22] transition-all cursor-pointer">
                <span className="text-xs font-bold">IG</span>
             </div>
             <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-[#E67E22] hover:border-[#E67E22] transition-all cursor-pointer">
                <span className="text-xs font-bold">FB</span>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
