"use client"
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, Ticket, Gift, TrendingUp, Search, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/Input';

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
    <div className="max-w-7xl mx-auto py-32 px-6 space-y-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <Badge variant="primary">Management Suite</Badge>
          <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">Club Overview</h1>
          <p className="text-brand-white/40 font-medium">Monitoring loyalty performance and member activity in real-time.</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchData}
            className="p-3 rounded-xl border border-brand-gray/50 hover:bg-brand-gray/20 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/20 w-4 h-4" />
            <Input
              placeholder="Filter members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12 w-64 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Members", val: customers.length, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Total Stamps Earned", val: totalCoupons, icon: Ticket, color: "text-brand-orange", bg: "bg-brand-orange/10" },
          { label: "Welcome Gifts Issued", val: totalGifts, icon: Gift, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Growth Rate", val: "+12.5%", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" }
        ].map((stat, i) => (
          <Card key={i} className="flex flex-col justify-between p-8 border-brand-gray/20 bg-brand-charcoal/30">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-6`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-white/20 mb-1">{stat.label}</p>
              <p className="text-4xl font-black tracking-tight">{stat.val}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-black uppercase tracking-tight">Registered Members</h2>

        <div className="overflow-x-auto rounded-[24px] border border-brand-gray/20 shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-brand-charcoal/50 text-[10px] font-black uppercase tracking-[0.2em] text-brand-white/30">
              <tr>
                <th className="px-8 py-6">Customer Profile</th>
                <th className="px-8 py-6">Membership ID</th>
                <th className="px-8 py-6 text-center">Stamp Count</th>
                <th className="px-8 py-6">Welcome Reward</th>
                <th className="px-8 py-6">Registration Date</th>
              </tr>
            </thead>
            <tbody className="bg-brand-black/20 divide-y divide-brand-gray/10">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-brand-white/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-brand-white group-hover:text-brand-orange transition-colors">{c.name}</span>
                      <span className="text-xs font-mono text-brand-white/30 mt-1">{c.phone}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-brand-black rounded-lg border border-brand-gray/50 font-mono text-sm tracking-widest text-brand-orange">
                      {c.membershipCode}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-black text-xl">{c.coupons}</span>
                      <div className="w-24 h-1 bg-brand-gray/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-orange shadow-[0_0_10px_rgba(230,126,34,0.5)] transition-all duration-1000"
                          style={{ width: `${Math.min((c.coupons % 10) * 10, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge variant={c.receivedFirstGift ? 'success' : 'outline'}>
                      {c.receivedFirstGift ? 'Redeemed' : 'Available'}
                    </Badge>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-brand-white/30">
                      {new Date(c.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center opacity-20 space-y-4">
                      <Users className="w-16 h-16" />
                      <p className="font-bold uppercase tracking-widest text-sm">No members found in database</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
