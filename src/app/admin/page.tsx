"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, Ticket, Gift, TrendingUp, Search, RefreshCw, ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen bg-brand-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-brand-white/5 pb-16">
          <div className="space-y-6">
            <Badge variant="primary">Management-Intelligence</Badge>
            <h1 className="text-7xl font-black uppercase tracking-tighter leading-none">Club <br/> <span className="text-brand-orange">Statistiken</span></h1>
            <p className="text-brand-white/40 font-medium max-w-md italic">"Echtzeit-Einblick in Ihre treuesten Kunden und das Belohnungssystem."</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-white/20 w-5 h-5 group-focus-within:text-brand-orange transition-colors" />
              <input
                placeholder="Mitglieder filtern..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-80 h-16 bg-brand-charcoal border border-brand-white/5 rounded-2xl pl-16 pr-6 font-bold focus:border-brand-orange/50 outline-none transition-all"
              />
            </div>
            <button
              onClick={fetchData}
              className="w-16 h-16 rounded-2xl glass flex items-center justify-center hover:bg-brand-white/5 transition-all active:scale-95"
            >
              <RefreshCw className={`w-6 h-6 ${loading ? 'animate-spin text-brand-orange' : ''}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Elite-Mitglieder", val: customers.length, icon: Users, color: "text-brand-orange", bg: "glass-orange" },
            { label: "Aktive Stempel", val: totalCoupons, icon: Ticket, color: "text-blue-500", bg: "glass" },
            { label: "Ausgegebene Geschenke", val: totalGifts, icon: Gift, color: "text-green-500", bg: "glass" },
            { label: "Performance", val: "+24%", icon: TrendingUp, color: "text-purple-500", bg: "glass" }
          ].map((stat, i) => (
            <Card key={i} className={`p-10 border-brand-white/5 ${stat.bg === 'glass' ? 'bg-brand-charcoal/30' : ''}`} animate={true}>
              <div className="space-y-8">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg === 'glass' ? 'bg-brand-white/5' : 'bg-brand-orange/10'} flex items-center justify-center border border-brand-white/5`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/20 mb-2">{stat.label}</p>
                  <p className="text-5xl font-black tracking-tighter">{stat.val}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Mitglieder-Datenbank</h2>
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-white/20">{filtered.length} Einträge gefunden</span>
          </div>

          <div className="glass rounded-[40px] border border-brand-white/5 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-white/5">
                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/20">Mitgliederprofil</th>
                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/20">Sicherheitscode</th>
                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/20 text-center">Loyalitätsstatus</th>
                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/20">Willkommensgeschenk</th>
                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/20">Registriert</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-white/5">
                  <AnimatePresence>
                    {filtered.map((c, i) => (
                      <motion.tr
                        key={c.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-brand-white/[0.03] transition-colors group cursor-default"
                      >
                        <td className="px-10 py-8">
                          <div className="flex flex-col">
                            <span className="font-black text-brand-white text-lg group-hover:text-brand-orange transition-colors">{c.name}</span>
                            <span className="text-xs font-mono text-brand-white/30 tracking-widest">{c.phone}</span>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <span className="px-4 py-2 bg-brand-black rounded-xl border border-brand-white/5 font-mono text-sm tracking-[0.3em] text-brand-orange">
                            {c.membershipCode}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex flex-col items-center gap-3">
                            <span className="font-black text-2xl">{c.coupons} <span className="text-[10px] text-brand-white/20 tracking-normal">Stempel</span></span>
                            <div className="w-32 h-1.5 bg-brand-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((c.coupons % 10) * 10, 100)}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${c.coupons >= 10 ? 'bg-green-500' : 'bg-brand-orange'} shadow-[0_0_10px_rgba(230,126,34,0.3)]`}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <Badge variant={c.receivedFirstGift ? 'success' : 'outline'}>
                            {c.receivedFirstGift ? 'Eingelöst' : 'Ausstehend'}
                          </Badge>
                        </td>
                        <td className="px-10 py-8 text-brand-white/30 font-bold text-xs">
                          {new Date(c.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="py-32 flex flex-col items-center justify-center space-y-6 opacity-10">
                  <Users className="w-20 h-20 stroke-[1]" />
                  <p className="text-xl font-black uppercase tracking-[0.3em]">Keine passenden Mitglieder gefunden</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
