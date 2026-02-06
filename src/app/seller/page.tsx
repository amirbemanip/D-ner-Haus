"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, User, Ticket, Gift, Plus, Check, RefreshCw } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto py-32 px-6 min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <div className="flex flex-col">
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">POS Terminal</h1>
          <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Dönerhaus Nürnberg</span>
        </div>
        <Badge variant="secondary">Terminal #01</Badge>
      </div>

      <Card className="mb-10 bg-brand-charcoal/30 border-brand-gray/30 p-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/20 w-5 h-5" />
            <Input
              placeholder="Enter Membership Code (e.g. 123456)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="pl-12 text-xl font-bold tracking-[0.3em] placeholder:tracking-normal placeholder:font-medium h-16"
            />
          </div>
          <Button type="submit" size="lg" disabled={loading} className="h-16 px-10">
            {loading ? <RefreshCw className="animate-spin" /> : 'Search Member'}
          </Button>
        </form>
      </Card>

      {error && (
        <div className="text-red-500 font-bold bg-red-500/10 p-6 rounded-2xl border border-red-500/10 mb-8 animate-in fade-in slide-in-from-top-4">
          Error: {error}
        </div>
      )}

      {message && (
        <div className="text-green-500 font-bold bg-green-500/10 p-6 rounded-2xl border border-green-500/10 mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="text-brand-black w-4 h-4 stroke-[3]" />
          </div>
          {message}
        </div>
      )}

      {customer ? (
        <Card className="p-10 border-brand-orange/30 bg-brand-charcoal/50 shadow-2xl rounded-[32px] animate-in fade-in zoom-in-95 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-brand-orange/10 rounded-3xl flex items-center justify-center border border-brand-orange/20 rotate-3">
                  <User className="w-10 h-10 text-brand-orange -rotate-3" />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight leading-none">{customer.name}</h2>
                  <p className="text-brand-white/40 font-mono text-sm mt-2 tracking-widest">{customer.phone}</p>
                  <Badge variant="outline" className="mt-3">Member since {new Date(customer.createdAt).toLocaleDateString()}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-brand-black/50 p-6 rounded-2xl border border-brand-gray/20 text-center space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange/60">Current Stamps</p>
                  <p className="text-5xl font-black">{customer.coupons}</p>
                </div>
                <div className="bg-brand-black/50 p-6 rounded-2xl border border-brand-gray/20 text-center space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange/60">Free Rewards</p>
                  <p className={`text-5xl font-black ${customer.coupons >= 10 ? 'text-green-500' : 'text-brand-white'}`}>
                    {Math.floor(customer.coupons / 10)}
                  </p>
                </div>
              </div>

              {!customer.receivedFirstGift && (
                <div className="bg-brand-orange p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(230,126,34,0.4)] animate-pulse">
                  <div className="flex items-center gap-3">
                    <Gift className="text-brand-black w-7 h-7" />
                    <div className="flex flex-col">
                      <span className="font-black text-brand-black uppercase tracking-tighter text-lg leading-none">Welcome Gift!</span>
                      <span className="text-brand-black/60 text-[10px] font-bold uppercase tracking-widest">Free Fries Available</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-brand-black text-brand-orange hover:bg-brand-charcoal px-6 h-10 rounded-full font-black uppercase tracking-widest text-[10px]" onClick={() => handleAction('redeem_fries')} disabled={loading}>
                    Redeem Now
                  </Button>
                </div>
              )}

              {customer.coupons >= 10 && (
                <div className="bg-green-500 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                  <div className="flex items-center gap-3">
                    <Ticket className="text-brand-black w-7 h-7" />
                    <div className="flex flex-col">
                      <span className="font-black text-brand-black uppercase tracking-tighter text-lg leading-none">Loyalty Reward!</span>
                      <span className="text-brand-black/60 text-[10px] font-bold uppercase tracking-widest">Free Döner Available</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-brand-black text-green-500 hover:bg-brand-charcoal px-6 h-10 rounded-full font-black uppercase tracking-widest text-[10px]" onClick={() => handleAction('redeem_doner')} disabled={loading}>
                    Redeem Now
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-white/20 mb-2">POS Actions</h3>

              <Button
                variant="primary"
                size="lg"
                className="w-full h-24 text-2xl font-black uppercase tracking-tighter rounded-2xl"
                onClick={() => handleAction('add_purchase')}
                disabled={loading}
              >
                <Plus className="mr-3 w-8 h-8" /> Add Purchase
              </Button>

              <div className="grid grid-cols-1 gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-16 rounded-xl font-bold uppercase tracking-widest text-xs"
                  onClick={() => handleAction('redeem_doner')}
                  disabled={loading || customer.coupons < 10}
                >
                  <Ticket className="mr-3 w-5 h-5" /> Redeem Free Döner
                </Button>

                <Button variant="secondary" className="w-full h-14 rounded-xl font-bold uppercase tracking-widest text-[10px] opacity-40 hover:opacity-100" onClick={() => {setCustomer(null); setCode('');}}>
                  Close Customer Session
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 opacity-20">
          <Ticket className="w-32 h-32" />
          <p className="text-xl font-bold uppercase tracking-widest">Awaiting Customer Scan</p>
        </div>
      )}
    </div>
  );
}
