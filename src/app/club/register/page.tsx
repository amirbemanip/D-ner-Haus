"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Ticket, Gift, Copy, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [membershipCode, setMembershipCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(membershipCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.membershipCode) {
          setMembershipCode(data.membershipCode);
        } else {
          setError(data.error || 'Something went wrong');
        }
      } else {
        setMembershipCode(data.membershipCode);
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-32 px-6 relative overflow-hidden bg-brand-black">
      {/* Editorial Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {!membershipCode ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Card className="p-6 md:p-16" animate={false}>
                <div className="text-center space-y-6 mb-12">
                  <Badge variant="primary">Prestige Membership</Badge>
                  <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                    Join the <br/> <span className="text-brand-orange">Döner Elite</span>
                  </h1>
                  <p className="text-brand-white/40 text-sm font-medium max-w-sm mx-auto">
                    Unlock exclusive culinary privileges and track your journey to free rewards.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-white/30 ml-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="E.g. Max Mustermann"
                        required
                        className="w-full h-16 bg-brand-black border border-brand-white/10 rounded-2xl px-6 font-bold focus:border-brand-orange outline-none transition-all placeholder:text-brand-white/10"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-white/30 ml-1">Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="+49 123 4567890"
                        required
                        className="w-full h-16 bg-brand-black border border-brand-white/10 rounded-2xl px-6 font-bold focus:border-brand-orange outline-none transition-all placeholder:text-brand-white/10"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-[11px] font-bold text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/20 text-center"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button type="submit" size="xl" className="w-full" disabled={loading}>
                    {loading ? 'Processing...' : 'Register Now'}
                  </Button>
                </form>

                <div className="mt-16 pt-10 border-t border-brand-white/5 grid grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-1">Loyalty</p>
                      <p className="text-xs font-bold text-brand-white/50 leading-tight">10th Döner is on the house.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center">
                      <Gift className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-1">Welcome</p>
                      <p className="text-xs font-bold text-brand-white/50 leading-tight">Free Fries on your 1st order.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Card className="p-6 md:p-20 text-center relative overflow-hidden group" animate={false}>
                {/* Shimmer effect */}
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-orange/[0.03] to-transparent skew-x-12"
                />

                <div className="relative z-10 space-y-12">
                  <div className="space-y-6">
                    <div className="w-24 h-24 glass-orange rounded-full flex items-center justify-center mx-auto mb-4 border-brand-orange/30">
                      <Sparkles className="w-10 h-10 text-brand-orange" />
                    </div>
                    <Badge variant="primary">Welcome to the Club</Badge>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                      Privilege <br/> <span className="text-brand-orange">Activated.</span>
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-white/30">Your Personal Membership Code</p>
                    <div className="bg-brand-black/80 border border-brand-white/5 rounded-[40px] p-6 md:p-12 relative group/code overflow-hidden">
                      <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover/code:opacity-[0.02] transition-opacity" />
                      <p className="text-5xl md:text-[100px] font-black tracking-[0.1em] text-brand-white select-all">{membershipCode}</p>
                    </div>

                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-3 mx-auto px-6 py-3 rounded-full glass hover:bg-brand-white/5 transition-all active:scale-95"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" /> <span className="text-[10px] font-black uppercase tracking-widest">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-brand-orange" /> <span className="text-[10px] font-black uppercase tracking-widest">Copy to Clipboard</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-brand-white/5">
                    <Button variant="outline" size="lg" className="h-16" onClick={() => window.print()}>
                      Save Voucher
                    </Button>
                    <Link href="/">
                      <Button variant="secondary" size="lg" className="w-full h-16">
                        Return Home
                      </Button>
                    </Link>
                  </div>

                  <p className="text-[10px] font-bold text-brand-white/20 uppercase tracking-widest italic">
                    *Show this code at the counter to redeem your rewards.
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
