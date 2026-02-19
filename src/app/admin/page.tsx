"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Ticket, Gift, TrendingUp, Search, RefreshCw, Lock, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export default function AdminPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/customers');
      const data = await res.json();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.membershipCode.includes(search)
  );

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
            { label: "Performance", val: "+24%", icon: TrendingUp, color: "text-purple-500" }
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

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-white uppercase">Member Registry</h2>
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
                    <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-500 text-center">Loyalty Status</th>
                    <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-500">Gift Status</th>
                    <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-500">Registered</th>
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
  );
}
