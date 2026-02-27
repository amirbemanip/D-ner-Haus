"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Ticket, Gift, TrendingUp, Search, RefreshCw, Lock, ShieldCheck, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { supabase } from '@/lib/supabase';
import { Plus, Minus, Trash2, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'registry' | 'broadcast' | 'reviews' | 'staff'>('registry');
  const [broadcastForm, setBroadcastForm] = useState({ title: '', content: '', target: 'ALL', targetValue: '' });
  const [staffForm, setStaffForm] = useState({ username: '', password: '', role: 'CASHIER' });
  const [pendingReviews, setPendingReviews] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const sessionStr = localStorage.getItem('donerhaus_session');
    if (!sessionStr) {
      router.push('/login?from=/admin');
      return;
    }
    try {
      const session = JSON.parse(sessionStr);
      if (session.expiry < Date.now() || session.role !== 'ADMIN') {
        localStorage.removeItem('donerhaus_session');
        router.push('/login?from=/admin');
        return;
      }
      setAuthorized(true);
    } catch (e) {
      router.push('/login?from=/admin');
    }
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: custData } = await supabase.from('customers').select('*').order('created_at', { ascending: false });
      const { data: reviewData } = await supabase.from('customers').select('*').eq('google_review_status', 'PENDING');
      const { data: staffData } = await supabase.from('staff').select('*');

      setCustomers(custData || []);
      setPendingReviews(reviewData || []);
      setStaff(staffData || []);
    } catch (err) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const { error } = await supabase.from('broadcasts').insert([{
        title: broadcastForm.title,
        content: broadcastForm.content,
        target: broadcastForm.target,
        target_value: broadcastForm.targetValue
      }]);
      if (error) throw error;
      setBroadcastForm({ title: '', content: '', target: 'ALL', targetValue: '' });
      alert('Broadcast sent!');
    } catch (err) {
      alert('Failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleClearBroadcasts = async () => {
    if (!confirm('Clear all broadcasts?')) return;
    try {
      const { error } = await supabase.from('broadcasts').delete().neq('id', '0');
      if (error) throw error;
      alert('Broadcasts cleared');
    } catch (err) {}
  };

  const handleReviewAction = async (customerId: string, action: 'approve' | 'reject') => {
    setActionLoading(true);
    try {
      if (action === 'approve') {
        const cust = customers.find(c => c.id === customerId);
        await supabase.from('customers').update({
          google_review_status: 'APPROVED',
          coupons: (cust?.coupons || 0) + 1
        }).eq('id', customerId);
      } else {
        await supabase.from('customers').update({
          google_review_status: 'NONE'
        }).eq('id', customerId);
      }
      fetchData();
    } catch (err) {
      alert('Failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAdjustStamps = async (id: string, amount: number) => {
    const cust = customers.find(c => c.id === id);
    if (!cust) return;
    const newCount = Math.max(0, cust.coupons + amount);
    await supabase.from('customers').update({ coupons: newCount }).eq('id', id);
    fetchData();
  };

  const handleStaffCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const { error } = await supabase.from('staff').insert([staffForm]);
      if (error) throw error;
      setStaffForm({ username: '', password: '', role: 'CASHIER' });
      fetchData();
    } catch (err) {
      alert('Failed to create staff');
    } finally {
      setActionLoading(false);
    }
  };

  const handleStaffDelete = async (id: string) => {
    if (!confirm('Delete staff member?')) return;
    await supabase.from('staff').delete().eq('id', id);
    fetchData();
  };

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

        <div className="flex flex-wrap gap-4 border-b border-white/5 pb-4">
          {['registry', 'broadcast', 'reviews', 'staff'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-gold text-black shadow-[0_0_20px_rgba(255,107,0,0.3)]' : 'bg-white/5 text-gray-500 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
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
          {activeTab === 'registry' && (
            <>
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
                    <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-500 text-right">Actions</th>
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
                            {c.membership_code}
                          </span>
                        </td>
                        <td className="px-6 md:px-10 py-4 md:py-6">
                          <div className="flex flex-col items-center gap-2">
                            <span className="font-display font-bold text-lg md:text-xl">{c.coupons}</span>
                            <div className="w-20 md:w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${c.coupons >= 20 ? 'bg-purple-500' : c.coupons >= 12 ? 'bg-green-500' : 'bg-gold'} shadow-[0_0_8px_rgba(255,107,0,0.3)]`}
                                style={{ width: `${Math.min((c.coupons / 20) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 md:px-10 py-4 md:py-6">
                          <Badge variant={c.received_first_gift ? 'green' : 'gold'}>
                            {c.received_first_gift ? 'CLAIMED' : 'PENDING'}
                          </Badge>
                        </td>
                        <td className="px-6 md:px-10 py-4 md:py-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleAdjustStamps(c.id, 1)} className="p-2 bg-white/5 rounded hover:text-gold"><Plus className="w-4 h-4"/></button>
                            <button onClick={() => handleAdjustStamps(c.id, -1)} className="p-2 bg-white/5 rounded hover:text-red-500"><Minus className="w-4 h-4"/></button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
            </>
          )}

          {activeTab === 'broadcast' && (
            <div className="max-w-2xl space-y-8">
               <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Broadcast Center</h2>
               <Card className="p-8">
                  <form onSubmit={handleBroadcast} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Message Title</label>
                      <Input
                        placeholder="e.g. WEEKEND SPECIAL"
                        value={broadcastForm.title}
                        onChange={e => setBroadcastForm({...broadcastForm, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Target Audience</label>
                        <select
                          className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-gold transition-colors appearance-none"
                          value={broadcastForm.target}
                          onChange={e => setBroadcastForm({...broadcastForm, target: e.target.value})}
                        >
                          <option value="ALL">ALL MEMBERS</option>
                          <option value="PHONE">BY PHONE NUMBER</option>
                          <option value="CODE">BY MEMBER CODE</option>
                        </select>
                      </div>
                      {broadcastForm.target !== 'ALL' && (
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Target Value</label>
                          <Input
                            placeholder={broadcastForm.target === 'PHONE' ? '017...' : '6-digit code'}
                            value={broadcastForm.targetValue}
                            onChange={e => setBroadcastForm({...broadcastForm, targetValue: e.target.value})}
                            required
                          />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Content</label>
                      <textarea
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors min-h-[120px]"
                        placeholder="Type your message to members..."
                        value={broadcastForm.content}
                        onChange={e => setBroadcastForm({...broadcastForm, content: e.target.value})}
                        required
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button type="submit" variant="gold" className="flex-1" disabled={actionLoading}>
                        {actionLoading ? 'SENDING...' : 'SEND TO ALL MEMBERS'}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleClearBroadcasts} className="border-red-500/30 text-red-500 hover:bg-red-500/10">
                        CLEAR ALL
                      </Button>
                    </div>
                  </form>
               </Card>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Review Verifications</h2>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-gold animate-pulse">{pendingReviews.length} PENDING APPROVAL</span>
               </div>

               <div className="grid gap-4">
                 {pendingReviews.length === 0 ? (
                   <div className="text-gray-500 text-sm font-mono p-12 glass-panel rounded-2xl text-center uppercase tracking-widest border border-dashed border-white/10">
                     No pending reviews to verify
                   </div>
                 ) : (
                   pendingReviews.map(rev => (
                     <Card key={rev.id} className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                              <Star className="w-6 h-6 text-gold fill-gold" />
                           </div>
                           <div>
                              <h4 className="text-lg font-bold text-white">{rev.name}</h4>
                              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{rev.membershipCode} • {rev.phone}</p>
                           </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                           <Button
                             onClick={() => handleReviewAction(rev.id, 'approve')}
                             variant="gold"
                             className="flex-1 md:flex-none"
                             disabled={actionLoading}
                           >
                             APPROVE (+1 STAMP)
                           </Button>
                           <Button
                             onClick={() => handleReviewAction(rev.id, 'reject')}
                             variant="outline"
                             className="flex-1 md:flex-none border-white/10 text-gray-500"
                             disabled={actionLoading}
                           >
                             REJECT
                           </Button>
                        </div>
                     </Card>
                   ))
                 )}
               </div>

               <div className="mt-12 p-6 glass-panel rounded-2xl border border-gold/20 bg-gold/5">
                  <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-2">Instructions:</p>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    1. Check your Google Business Profile for new reviews from these names.<br/>
                    2. If verified, click Approve to automatically add +1 stamp to their account.<br/>
                    3. If no review is found, click Reject to reset their status.
                  </p>
               </div>
            </div>
          )}

          {activeTab === 'staff' && (
            <div className="max-w-4xl space-y-8">
              <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Staff Management</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-8">
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Create New Account</h3>
                  <form onSubmit={handleStaffCreate} className="space-y-4">
                    <div className="space-y-1">
                       <label className="text-[9px] uppercase tracking-widest text-gray-600 ml-1">Username</label>
                       <Input value={staffForm.username} onChange={e => setStaffForm({...staffForm, username: e.target.value})} required />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] uppercase tracking-widest text-gray-600 ml-1">Initial Password</label>
                       <Input type="password" value={staffForm.password} onChange={e => setStaffForm({...staffForm, password: e.target.value})} required />
                    </div>
                    <Button type="submit" variant="gold" className="w-full" disabled={actionLoading}>
                       <UserPlus className="w-4 h-4 mr-2" /> CREATE STAFF
                    </Button>
                  </form>
                </Card>

                <div className="space-y-4">
                   {staff.map(s => (
                     <Card key={s.id} className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                              <ShieldCheck className="w-5 h-5 text-gold" />
                           </div>
                           <div>
                              <p className="font-bold text-white">{s.username}</p>
                              <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">{s.role}</p>
                           </div>
                        </div>
                        <button onClick={() => handleStaffDelete(s.id)} className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                           <Trash2 className="w-4 h-4" />
                        </button>
                     </Card>
                   ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
