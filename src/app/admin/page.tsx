"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Ticket, Gift, TrendingUp, Search, RefreshCw, Lock, ShieldCheck, Star, MessageSquare, Send, Check, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export default function AdminPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [globalMsg, setGlobalMsg] = useState('');
  const [isSending, setIsSending] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/customers');
      const data = await res.json();
      setCustomers(Array.isArray(data) ? data : []);

      const msgRes = await fetch('/api/admin/message');
      const msgData = await msgRes.json();
      setGlobalMsg(msgData.message || '');
    } catch (err) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSendMessage = async () => {
    setIsSending(true);
    try {
      await fetch('/api/admin/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: globalMsg }),
      });
      alert('Message broadcasted to all active members.');
    } catch (err) {
      alert('Failed to send message.');
    } finally {
      setIsSending(false);
    }
  };

  const handleApproveReview = async (code: string) => {
    try {
      const res = await fetch(`/api/customer/${code}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve_review' }),
      });
      if (res.ok) {
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.membershipCode.includes(search)
  );

  const pendingReviews = customers.filter(c => c.googleReviewPending);
  const totalCoupons = customers.reduce((acc, c) => acc + c.coupons, 0);
  const totalGifts = customers.filter(c => c.receivedFirstGift).length;

  return (
    <div className="min-h-screen bg-obsidian-base pt-20 md:pt-32 pb-10 md:pb-20 px-4 md:px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 border-b border-white/5 pb-8 md:pb-12">
          <div className="space-y-4">
            <div className="text-[10px] text-gold uppercase tracking-[0.4em] mb-2 font-bold">Management Intel</div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter">Club <span className="text-outline">Insights</span></h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5 group-focus-within:text-gold transition-colors" />
              <Input
                placeholder="FILTER MEMBERS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-80 pl-16"
              />
            </div>
            <Button
              onClick={fetchData}
              variant="outline"
              className="w-16 h-16 p-0"
            >
              <RefreshCw className={`w-6 h-6 ${loading ? 'animate-spin text-gold' : 'text-gray-400'}`} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "Elite Members", val: customers.length, icon: Users, color: "text-gold" },
            { label: "Active Stamps", val: totalCoupons, icon: Ticket, color: "text-blue-500" },
            { label: "Gifts Claimed", val: totalGifts, icon: Gift, color: "text-green-500" },
            { label: "Pending Reviews", val: pendingReviews.length, icon: Star, color: "text-yellow-500" }
          ].map((stat, i) => (
            <Card key={i} className="p-6 md:p-8">
              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-2">{stat.label}</p>
                  <p className="text-4xl font-display font-bold text-white tracking-tighter">{stat.val}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Message Broadcast Section */}
        <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
                <Card className="p-8 h-full">
                    <div className="flex items-center gap-3 mb-6">
                        <MessageSquare className="w-5 h-5 text-gold" />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">Broadcast Center</h3>
                    </div>
                    <p className="text-[10px] text-gray-500 mb-6 leading-relaxed uppercase">Send a message to all members. This will appear on their digital card dashboard.</p>
                    <div className="space-y-4">
                        <textarea
                            className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-xs text-white focus:border-gold outline-none resize-none"
                            placeholder="Type your message here..."
                            value={globalMsg}
                            onChange={(e) => setGlobalMsg(e.target.value)}
                        />
                        <Button
                            onClick={handleSendMessage}
                            disabled={isSending}
                            variant="gold"
                            className="w-full"
                        >
                            <Send className="w-4 h-4 mr-2" />
                            {isSending ? 'SENDING...' : 'BROADCAST ALERT'}
                        </Button>
                    </div>
                </Card>
            </div>

            <div className="lg:col-span-8">
                <div className="space-y-8">
                    {pendingReviews.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-display font-bold text-white uppercase">Review Verifications</h2>
                                <Badge variant="gold">{pendingReviews.length} ACTION REQUIRED</Badge>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {pendingReviews.map(c => (
                                    <Card key={c.id} className="p-6 border-gold/30">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-white">{c.name}</h4>
                                                <p className="text-[10px] font-mono text-gray-500">{c.membershipCode}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleApproveReview(c.membershipCode)} className="p-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-colors">
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-display font-bold text-white uppercase">Member Registry</h2>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono">{filtered.length} RECORDS FOUND</span>
                        </div>

                        <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl relative">
                            <div className="scanline opacity-5"></div>
                            <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="bg-white/5">
                                    <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-500">Profile</th>
                                    <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-500">Security Code</th>
                                    <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-500 text-center">Status</th>
                                    <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-500">Gift</th>
                                    <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-500">Date</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                <AnimatePresence>
                                    {filtered.map((c, i) => (
                                    <motion.tr
                                        key={c.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-6 md:px-10 py-4 md:py-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white text-md md:text-lg group-hover:text-gold transition-colors">{c.name}</span>
                                            <span className="text-[10px] font-mono text-gray-600 tracking-widest uppercase">{c.phone}</span>
                                        </div>
                                        </td>
                                        <td className="px-6 md:px-10 py-4 md:py-6">
                                        <span className="px-3 py-1 bg-black rounded-lg border border-white/5 font-mono text-xs tracking-widest text-gold">
                                            {c.membershipCode}
                                        </span>
                                        </td>
                                        <td className="px-6 md:px-10 py-4 md:py-6">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="font-display font-bold text-lg md:text-xl">{c.coupons}</span>
                                            <div className="w-20 md:w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${c.coupons >= 10 ? 'bg-green-500' : 'bg-gold'} shadow-[0_0_8px_rgba(255,107,0,0.3)]`}
                                                style={{ width: `${Math.min((c.coupons % 10) * 10, 100)}%` }}
                                            />
                                            </div>
                                        </div>
                                        </td>
                                        <td className="px-6 md:px-10 py-4 md:py-6">
                                        <Badge variant={c.receivedFirstGift ? 'green' : 'gold'}>
                                            {c.receivedFirstGift ? 'CLAIMED' : 'PENDING'}
                                        </Badge>
                                        </td>
                                        <td className="px-6 md:px-10 py-4 md:py-6 text-gray-600 font-mono text-[10px]">
                                        {new Date(c.createdAt).toLocaleDateString('de-DE')}
                                        </td>
                                    </motion.tr>
                                    ))}
                                </AnimatePresence>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
