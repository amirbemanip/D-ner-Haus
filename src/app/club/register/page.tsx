"use client"
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Ticket, Gift, Copy, Check, Sparkles, Download, Printer, ArrowLeft, Wifi, Zap } from 'lucide-react';
import Link from 'next/link';
import { toPng } from 'html-to-image';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [membershipCode, setMembershipCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `donerhaus-vip-card-${membershipCode}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('oops, something went wrong!', err);
    }
  };

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
    <div className="min-h-screen bg-obsidian-base pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 uppercase text-[10px] font-bold tracking-widest">
          <ArrowLeft className="w-3 h-3" /> Back to Home
        </Link>

        <AnimatePresence mode="wait">
          {!membershipCode ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="grid lg:grid-cols-2 gap-20 items-center"
            >
              <div>
                <span className="text-gold tracking-[0.4em] text-[10px] font-bold uppercase block mb-6">Prestige Membership</span>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-tight uppercase">
                  Join the <br /> <span className="text-outline">Elite</span>
                </h1>
                <p className="text-gray-400 text-lg mb-12 font-light leading-relaxed">
                  Unlock exclusive privileges. Collect stamps, enjoy rewards. <br />
                  <span className="text-gold">10 Stamps = 1 Free Döner Kebab.</span>
                </p>

                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                      <Ticket className="w-5 h-5 text-gold" />
                    </div>
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-tight">10. Döner goes on us.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                      <Gift className="w-5 h-5 text-gold" />
                    </div>
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-tight">Free fries on 1st order.</p>
                  </div>
                </div>
              </div>

              <Card className="p-10 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                    <Input
                      type="text"
                      placeholder="e.g. Max Mustermann"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="+49 123..."
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  {error && <p className="text-red-500 text-xs font-mono">{error}</p>}

                  <Button type="submit" disabled={loading} variant="primary" size="lg" className="w-full">
                    {loading ? 'REGISTERING...' : 'REGISTER NOW'}
                  </Button>
                </form>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-12"
            >
              <div className="max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/30">
                  <Sparkles className="w-10 h-10 text-gold" />
                </div>
                <h2 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter mb-4">Privilege <span className="text-gold">Activated</span></h2>
                <p className="text-gray-500 text-lg font-light mb-12">Willkommen im Club. Deine Reise zu exzellentem Geschmack beginnt jetzt.</p>
              </div>

              <div className="relative perspective-1000 flex justify-center mb-12">
                <div className={`flip-card w-full max-w-md h-[240px] cursor-pointer ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                  <div className="flip-card-inner">
                    <div ref={cardRef} className="flip-card-front card-bg-front p-8 flex flex-col justify-between text-left">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-display font-bold text-2xl text-white tracking-widest">DÖNERHAUS</div>
                          <div className="text-[8px] uppercase tracking-[0.3em] text-gold mt-1">Elite Member</div>
                        </div>
                        <Wifi className="text-white/20 w-6 h-6 rotate-90" />
                      </div>
                      <div className="flex items-center gap-4">
                        <Zap className="text-white/40 w-4 h-4 fill-white/40" />
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Membership ID</div>
                        <div className="font-mono text-3xl text-white tracking-widest text-glow">{membershipCode}</div>
                        <div className="flex justify-between items-end mt-4">
                          <div className="font-display text-sm text-gray-300 uppercase tracking-wider">{formData.name}</div>
                          <div className="text-[8px] text-gray-600">VALID THRU 12/99</div>
                        </div>
                      </div>
                    </div>
                    <div className="flip-card-back card-bg-back p-8 flex flex-col justify-center items-center text-center">
                      <div className="w-32 h-32 bg-white p-2 rounded mb-4">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${membershipCode}`} className="w-full h-full object-cover" alt="QR" />
                      </div>
                      <div className="text-xs font-bold uppercase tracking-widest text-black/60">Digital Signature</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                <Button onClick={handleCopy} variant="outline" className="rounded-full px-8">
                  {copied ? 'Copied!' : 'Copy Code'}
                </Button>
                <Button onClick={handleDownload} variant="outline" className="rounded-full px-8">
                  Save as Image
                </Button>
                <Button onClick={() => window.print()} variant="outline" className="rounded-full px-8">
                  Print Card
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
