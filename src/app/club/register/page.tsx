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
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
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

  const handleAppleWallet = async () => {
    setWalletLoading(true);
    try {
      const response = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          membershipCode,
          name: formData.name
        }),
      });

      if (!response.ok) throw new Error('Failed to generate pass');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `donerhaus-${membershipCode}.pkpass`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Wallet error:', err);
      setShowWalletModal(true); // Fallback to instructional modal on error
    } finally {
      setWalletLoading(false);
    }
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
    <div className="min-h-[100dvh] bg-obsidian-base pt-24 md:pt-52 pb-20 px-4 md:px-6 relative overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 md:mb-12 uppercase text-[10px] font-bold tracking-widest">
          <ArrowLeft className="w-3 h-3" /> Back to Home
        </Link>

        <AnimatePresence mode="wait">
          {!membershipCode ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              <div>
                <span className="text-gold tracking-[0.4em] text-[10px] font-bold uppercase block mb-4 md:mb-6">Prestige Membership</span>
                <h1 className="text-3xl md:text-7xl font-display font-bold text-white mb-6 md:mb-8 leading-tight uppercase">
                  Join the <br /> <span className="text-outline">Elite</span>
                </h1>
                <p className="text-gray-400 text-sm md:text-lg mb-8 md:mb-12 font-light leading-relaxed">
                  Unlock exclusive privileges. Collect stamps, enjoy rewards. <br />
                  <span className="text-gold font-bold">10 Stamps = 1 Free Döner Kebab.</span>
                </p>

                <div className="grid grid-cols-2 gap-6 md:gap-10">
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

              <Card className="p-6 md:p-10 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1 font-bold">Full Name</label>
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
              className="text-center space-y-8 md:space-y-12 pt-12 md:pt-8"
            >
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 border border-gold/30">
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-gold" />
                </div>
                <h2 className="text-3xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter mb-4">Privilege <span className="text-gold">Activated</span></h2>
                <p className="text-gray-500 text-sm md:text-lg font-light mb-8 md:mb-12">Willkommen im Club. Deine Reise zu exzellentem Geschmack beginnt jetzt.</p>
              </div>

              <div className="relative flex justify-center mb-12 w-full">
                <div ref={cardRef} className="w-full max-w-[400px] aspect-[1.6/1] card-bg-front p-5 md:p-8 flex flex-col justify-between text-left relative overflow-hidden group shadow-2xl">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full -mr-16 -mt-16"></div>

                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <div className="font-display font-bold text-lg md:text-2xl text-white tracking-widest">DÖNERHAUS</div>
                      <div className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-gold mt-1 font-bold">Elite Member</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white p-1.5 rounded-lg shadow-xl">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${membershipCode}`} className="w-full h-full object-cover" alt="QR" />
                      </div>
                      <Wifi className="text-white/20 w-4 h-4 rotate-90" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 relative z-10">
                    <Zap className="text-white/40 w-4 h-4 fill-white/40" />
                    <div className="px-3 py-1 bg-gold/10 border border-gold/20 rounded-full">
                      <span className="text-[8px] font-bold text-gold uppercase tracking-[0.2em]">10 Stamps = 1 Free Döner</span>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="text-[9px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Membership ID</div>
                    <div className="font-mono text-xl md:text-3xl text-white tracking-widest text-glow mb-3 md:mb-4">{membershipCode}</div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-3 md:pt-4">
                      <div>
                        <div className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">Member Name</div>
                        <div className="font-display text-sm text-gray-300 uppercase tracking-wider">{formData.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">Stamps</div>
                        <div className="text-white font-bold text-lg">0<span className="text-gray-600 text-xs ml-1">/ 10</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={handleCopy} variant="outline" className="rounded-full px-6 py-3 h-auto text-[10px] border-white/10">
                  {copied ? 'Copied!' : 'Copy Code'}
                </Button>
                <Button onClick={handleDownload} variant="gold" className="rounded-full px-6 py-3 h-auto text-[10px]">
                  <Download className="w-3 h-3 mr-2" /> Save as Image
                </Button>
                <Button
                  onClick={handleAppleWallet}
                  disabled={walletLoading}
                  variant="outline"
                  className="rounded-full px-6 py-3 h-auto text-[10px] border-white/10"
                >
                  {walletLoading ? (
                    'Generating...'
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.96.95-2.06 1.92-3.72 1.92-1.61 0-2.14-1.01-4.07-1.01-1.93 0-2.52 1-4.02 1.01-1.58.01-2.82-1.12-3.8-2.55C.44 18.23-1.08 15.42.98 11.75c1.02-1.8 2.86-2.95 4.84-2.95 1.5 0 2.92.95 3.83.95.9 0 2.64-1.15 4.45-1.15 1.61 0 3.01.6 4.02 1.81-3.32 1.76-2.77 6.44.82 7.89-.66 1.76-1.55 3.5-2.89 4.98zM13.03 6.94c.94-1.14 1.57-2.72 1.39-4.3-1.4.06-3.11.95-4.11 2.11-1 1.14-1.88 2.82-1.66 4.3 1.56.12 3.16-.86 4.38-2.11z"/></svg>
                      Apple Wallet
                    </>
                  )}
                </Button>
                <Button onClick={() => window.print()} variant="outline" className="rounded-full px-6 py-3 h-auto text-[10px]">
                  <Printer className="w-3 h-3 mr-2" /> Print
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Apple Wallet Instructions Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWalletModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-obsidian-surface border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.96.95-2.06 1.92-3.72 1.92-1.61 0-2.14-1.01-4.07-1.01-1.93 0-2.52 1-4.02 1.01-1.58.01-2.82-1.12-3.8-2.55C.44 18.23-1.08 15.42.98 11.75c1.02-1.8 2.86-2.95 4.84-2.95 1.5 0 2.92.95 3.83.95.9 0 2.64-1.15 4.45-1.15 1.61 0 3.01.6 4.02 1.81-3.32 1.76-2.77 6.44.82 7.89-.66 1.76-1.55 3.5-2.89 4.98zM13.03 6.94c.94-1.14 1.57-2.72 1.39-4.3-1.4.06-3.11.95-4.11 2.11-1 1.14-1.88 2.82-1.66 4.3 1.56.12 3.16-.86 4.38-2.11z"/></svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase">Apple Wallet</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Um deine Karte zum Apple Wallet hinzuzufügen, speichere sie bitte zuerst als Bild und füge sie manuell hinzu oder nutze einen Wallet-Pass Generator mit deinem Code: <span className="text-gold font-mono font-bold">{membershipCode}</span>.
                </p>
                <div className="space-y-4">
                  <Link
                    href="https://support.apple.com/de-de/guide/iphone/iph8200f898c/ios"
                    target="_blank"
                    className="block w-full"
                  >
                    <Button variant="gold" className="w-full rounded-2xl">
                      Anleitung öffnen
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setShowWalletModal(false)}
                    className="w-full rounded-2xl border-white/5"
                  >
                    Schließen
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
