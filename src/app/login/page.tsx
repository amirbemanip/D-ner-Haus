'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Lock, ArrowRight } from 'lucide-react'

function LoginContent() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push(from)
        router.refresh()
      } else {
        setError('Invalid access key. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative z-10 flex flex-col items-center">
      <div className="relative w-24 h-24 mb-8">
        <Image
          src="/logo.jpg"
          alt="Dönerhaus Logo"
          fill
          className="object-cover rounded-full border border-white/10"
        />
      </div>

      <h1 className="text-2xl font-bold text-[#F2F2F2] mb-2 text-center">Protected Access</h1>
      <p className="text-[#F2F2F2]/60 text-sm mb-8 text-center">Enter your terminal access key to continue</p>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E67E22] w-5 h-5" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Access Key"
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-[#F2F2F2] focus:outline-none focus:ring-2 focus:ring-[#E67E22]/50 transition-all placeholder:text-white/20"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#E67E22] hover:bg-[#FF8C1A] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(230,126,34,0.3)]"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Authenticate
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#141414] rounded-2xl border border-white/5 p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E67E22]/10 blur-3xl rounded-full -mr-16 -mt-16" />
        <Suspense fallback={<div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-[#E67E22]/20 border-t-[#E67E22] rounded-full animate-spin" /></div>}>
          <LoginContent />
        </Suspense>
      </motion.div>
    </div>
  )
}
