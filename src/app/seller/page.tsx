"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, User, Ticket, Gift, Plus, Check, RefreshCw, X } from 'lucide-react';

export default function SellerPage() {
  const [code, setCode] = useState('');
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!code) return;
    setLoading(true);
    setError('');
    setMessage('');
    setCustomer(null);

    try {
      const res = await fetch(`/api/customer/${code}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCustomer(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string) => {
    if (!customer) return;
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(`/api/customer/${customer.membershipCode}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCustomer(data);

      if (action === 'add_purchase') setMessage('Purchase added successfully!');
      if (action === 'redeem_doner') setMessage('Free Döner redeemed!');
      if (action === 'redeem_fries') setMessage('Free Fries redeemed!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-brand-white/5 pb-12">
          <div className="space-y-4">
            <Badge variant="primary">POS Terminal v1.2</Badge>
            <h1 className="text-6xl font-black uppercase tracking-tighter leading-none">Checkout <br/> <span className="text-brand-orange">Control</span></h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/20">Authorized Terminal</p>
            <p className="text-lg font-bold">Nürnberg Center #01</p>
          </div>
        </div>

        <Card className="p-8 bg-brand-charcoal/50" animate={false}>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-white/20 w-6 h-6" />
              <input
                placeholder="6-Digit Code or Phone"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-20 bg-brand-black border border-brand-white/5 rounded-2xl pl-16 pr-6 text-2xl font-black tracking-widest placeholder:tracking-normal placeholder:font-medium outline-none focus:border-brand-orange/50 transition-all"
              />
            </div>
            <Button type="submit" size="xl" disabled={loading} className="md:w-64 h-20">
              {loading ? <RefreshCw className="animate-spin" /> : 'Search Member'}
            </Button>
          </form>
        </Card>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-500 font-bold bg-red-500/5 p-8 rounded-2xl border border-red-500/20 text-center"
            >
              Error: {error}
            </motion.div>
          )}

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-green-500 font-bold bg-green-500/5 p-8 rounded-2xl border border-green-500/20 flex items-center justify-center gap-4"
            >
              <Check className="w-6 h-6" />
              {message}
            </motion.div>
          )}

          {customer ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Card className="p-12 md:p-16 border-brand-orange/20" animate={false}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-7 space-y-12">
                    <div className="flex items-center gap-8">
                      <div className="w-24 h-24 glass-orange rounded-3xl flex items-center justify-center border-brand-orange/30 rotate-3">
                        <User className="w-12 h-12 text-brand-orange -rotate-3" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">{customer.name}</h2>
                        <p className="text-brand-orange font-mono text-lg tracking-[0.2em]">{customer.membershipCode}</p>
                        <Badge variant="outline">{customer.phone}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="glass p-8 rounded-3xl border-brand-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-white/20">Total Stamps</p>
                        <p className="text-6xl font-black">{customer.coupons}</p>
                      </div>
                      <div className="glass p-8 rounded-3xl border-brand-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-white/20">Next Reward</p>
                        <p className="text-6xl font-black text-brand-orange">{10 - (customer.coupons % 10)}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {!customer.receivedFirstGift && (
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="bg-brand-orange p-8 rounded-3xl flex items-center justify-between shadow-[0_20px_50px_rgba(230,126,34,0.2)]"
                        >
                          <div className="flex items-center gap-4 text-brand-black">
                            <Gift className="w-8 h-8" />
                            <div>
                              <p className="font-black uppercase tracking-tighter text-xl leading-none">Welcome Reward</p>
                              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Free Signature Fries</p>
                            </div>
                          </div>
                          <Button variant="secondary" size="sm" onClick={() => handleAction('redeem_fries')} disabled={loading}>
                            Redeem
                          </Button>
                        </motion.div>
                      )}

                      {customer.coupons >= 10 && (
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="bg-green-500 p-8 rounded-3xl flex items-center justify-between shadow-[0_20px_50px_rgba(34,197,94,0.2)]"
                        >
                          <div className="flex items-center gap-4 text-brand-black">
                            <Ticket className="w-8 h-8" />
                            <div>
                              <p className="font-black uppercase tracking-tighter text-xl leading-none">Loyalty Free Döner</p>
                              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{Math.floor(customer.coupons / 10)} Available</p>
                            </div>
                          </div>
                          <Button variant="secondary" size="sm" className="bg-brand-black text-green-500" onClick={() => handleAction('redeem_doner')} disabled={loading}>
                            Redeem
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/20 mb-2">Terminal Actions</h3>

                    <Button
                      variant="primary"
                      className="h-32 text-3xl font-black rounded-[32px]"
                      onClick={() => handleAction('add_purchase')}
                      disabled={loading}
                    >
                      <Plus className="mr-4 w-8 h-8 stroke-[3]" /> Add Stamp
                    </Button>

                    <Button
                      variant="outline"
                      className="h-20 rounded-2xl opacity-50 hover:opacity-100"
                      onClick={() => {setCustomer(null); setCode('');}}
                    >
                      <X className="mr-3 w-5 h-5" /> End Session
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-40 flex flex-col items-center justify-center text-center space-y-8 opacity-10"
            >
              <Ticket className="w-32 h-32 stroke-[1]" />
              <p className="text-2xl font-black uppercase tracking-[0.5em]">Scan Member to Begin</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
