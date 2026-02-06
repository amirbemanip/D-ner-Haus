"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Ticket, Gift, Copy, Check } from 'lucide-react';
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
          // If already registered, we can show their code
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
    <div className="min-h-screen flex items-center justify-center py-24 px-6 relative overflow-hidden bg-brand-black">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {!membershipCode ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Card className="p-10 md:p-14 border-brand-gray/30 bg-brand-charcoal/50 backdrop-blur-2xl shadow-2xl rounded-[32px]">
                <div className="text-center space-y-4 mb-12">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange">Exclusive Membership</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Join the Club</h1>
                  <p className="text-brand-white/40 text-sm font-medium">Register now to unlock premium rewards and exclusive benefits.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Full Name"
                    placeholder="E.g. Max Mustermann"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    label="Mobile Number"
                    placeholder="+49 123 4567890"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-[13px] font-bold text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/10"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button type="submit" size="lg" className="w-full h-16 text-[15px] uppercase tracking-[0.2em] font-black rounded-2xl shadow-2xl shadow-brand-orange/20" disabled={loading}>
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : 'Register & Generate Code'}
                  </Button>
                </form>

                <div className="mt-14 pt-10 border-t border-brand-gray/10 grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-1">Loyalty</p>
                      <p className="text-[12px] font-bold text-brand-white/70 leading-tight">10th Döner for Free</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                      <Gift className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-1">Welcome</p>
                      <p className="text-[12px] font-bold text-brand-white/70 leading-tight">Free Fries on 1st Order</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            >
              <Card className="p-10 md:p-14 border-brand-orange/20 bg-brand-charcoal overflow-hidden relative shadow-[0_0_100px_rgba(230,126,34,0.15)] rounded-[40px] text-center">
                <div className="absolute -top-10 -right-10 opacity-[0.03]">
                  <CheckCircle2 className="w-64 h-64 text-brand-orange" />
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="w-24 h-24 bg-brand-orange/10 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-brand-orange/20 rotate-12">
                    <CheckCircle2 className="w-12 h-12 text-brand-orange -rotate-12" />
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">You're in!</h2>
                    <p className="text-brand-white/40 text-sm font-medium">Show this code at the counter to claim your rewards.</p>
                  </div>

                  <div className="group relative py-10 px-8 bg-brand-black rounded-[32px] border-4 border-dashed border-brand-orange/20 inline-block w-full transition-colors hover:border-brand-orange/40">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-orange/60 mb-4">Your Membership Code</p>
                    <p className="text-6xl md:text-8xl font-black tracking-[0.2em] text-brand-white select-all mb-6">{membershipCode}</p>

                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 mx-auto bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3" /> Copied to Clipboard
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Code
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <Button variant="outline" className="h-14 rounded-2xl font-bold uppercase tracking-widest text-[11px]" onClick={() => window.print()}>
                      Save / Print Code
                    </Button>
                    <Link href="/" className="block">
                      <Button variant="secondary" className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-[11px]">
                        Return Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
