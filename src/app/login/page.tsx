"use client"
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { supabase } from '@/lib/supabase'

function LoginContent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/seller'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Direct staff table check (Client-side simple auth)
      const { data, error: sbError } = await supabase
        .from('staff')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single()

      if (data && !sbError) {
        // Store session in localStorage for client-side persistence
        localStorage.setItem('donerhaus_session', JSON.stringify({
          id: data.id,
          username: data.username,
          role: data.role,
          expiry: Date.now() + (1000 * 60 * 60 * 24) // 24h
        }))
        router.push(from)
      } else {
        setError('ACCESS DENIED')
      }
    } catch (err) {
      setError('SYSTEM ERROR')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/30">
        <ShieldCheck className="w-10 h-10 text-gold" />
      </div>

      <h1 className="font-display text-2xl font-bold text-white mb-2 text-center uppercase tracking-widest">System Access</h1>
      <p className="text-gray-500 text-[10px] mb-8 text-center uppercase tracking-[0.3em]">Authorized Access Only</p>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="relative">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="USERNAME"
            className="pl-6"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold w-4 h-4 opacity-50" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="ACCESS KEY"
            className="pl-12"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-[10px] mt-2 text-center font-mono animate-pulse uppercase tracking-widest">{error}</p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {isLoading ? 'AUTHENTICATING...' : 'ENTER'}
        </Button>
      </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-obsidian-base flex items-center justify-center p-6 relative overflow-hidden">
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-10 shadow-2xl">
          <Suspense fallback={<div className="flex justify-center p-12"><div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" /></div>}>
            <LoginContent />
          </Suspense>
        </Card>
      </motion.div>
    </div>
  )
}
