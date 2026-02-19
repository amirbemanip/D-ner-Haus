"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Ticket, Gift, Plus, Check, RefreshCw, X, Fingerprint, Lock, Camera, CameraOff } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Html5Qrcode } from 'html5-qrcode';

export default function SellerPage() {
  const [code, setCode] = useState('');
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const qrCodeRef = useRef<Html5Qrcode | null>(null);

  const handleSearchWithCode = React.useCallback(async (searchCode: string) => {
    if (!searchCode) return;
    setLoading(true);
    setError('');
    setMessage('');
    setCustomer(null);

    try {
      const res = await fetch(`/api/customer/${searchCode}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCustomer(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const onScanSuccess = React.useCallback((decodedText: string) => {
    setCode(decodedText);
    setIsScanning(false);
    // Trigger search with the scanned code
    handleSearchWithCode(decodedText);
  }, [handleSearchWithCode]);

  const onScanFailure = React.useCallback((error: any) => {
    // console.warn(`Code scan error = ${error}`);
  }, []);

  useEffect(() => {
    if (isScanning) {
      const html5QrCode = new Html5Qrcode("reader");
      qrCodeRef.current = html5QrCode;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };

      // Start the camera automatically
      html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          onScanSuccess(decodedText);
        },
        (errorMessage) => {
          // ignore failures
        }
      ).catch(err => {
        console.error("Unable to start scanning", err);
        setError("Kamera konnte nicht gestartet werden. Bitte Berechtigung prüfen.");
        setIsScanning(false);
      });

      return () => {
        if (qrCodeRef.current && qrCodeRef.current.isScanning) {
          qrCodeRef.current.stop().then(() => {
            qrCodeRef.current?.clear();
          }).catch(err => console.error("Failed to stop scanner", err));
        }
      };
    }
  }, [isScanning, onScanSuccess]);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    handleSearchWithCode(code);
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

      if (action === 'add_purchase') setMessage('STAMP ADDED');
      if (action === 'redeem_doner') setMessage('REWARD REDEEMED');
      if (action === 'redeem_fries') setMessage('GIFT REDEEMED');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-base pt-20 md:pt-32 pb-10 md:pb-20 px-4 md:px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-6 md:pb-8 gap-4">
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-[0.4em] mb-2">Terminal 01 / Online</div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tighter uppercase">Member <span className="text-gold">Lookup</span></h1>
          </div>
          <button onClick={() => window.location.href = '/login'} className="text-[10px] text-gray-600 hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-2">
            <Lock className="w-3 h-3" /> Secure Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          {/* Sidebar / Search */}
          <div className="lg:col-span-4 space-y-4 md:space-y-6">
            <Card className="p-6 md:p-8">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Database Query</h3>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                  <Input
                    placeholder="CODE / PHONE"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="pl-12"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <Button type="submit" disabled={loading} variant="primary" size="md" className="w-full">
                    {loading ? '...' : 'SEARCH'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsScanning(!isScanning)}
                    variant="outline"
                    size="md"
                    className={`w-full ${isScanning ? 'border-gold text-gold' : ''}`}
                  >
                    {isScanning ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
                    <span className="ml-2">{isScanning ? 'STOP' : 'SCAN'}</span>
                  </Button>
                </div>
              </form>

              {isScanning && (
                <div className="mt-6 rounded-xl overflow-hidden border border-white/10 bg-black">
                  <div id="reader" className="w-full"></div>
                </div>
              )}
            </Card>

            <Card className="p-4 md:p-6 hidden md:block">
              <div className="text-[9px] text-gray-600 font-mono space-y-1">
                <p>STATUS: OPERATIONAL</p>
                <p>LATENCY: 14MS</p>
                <p>ENCRYPTION: AES-256</p>
              </div>
            </Card>
          </div>

          {/* Main Display */}
          <div className="lg:col-span-8 relative">
            <Card className="p-6 md:p-10 min-h-[400px] md:min-h-[500px] flex flex-col">
              <AnimatePresence mode="wait">
                {customer ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/5 pb-6 md:pb-8 mb-6 md:mb-8 gap-4">
                      <div>
                        <div className="text-[10px] text-gold uppercase tracking-widest mb-2">Customer Profile</div>
                        <h2 className="text-2xl md:text-4xl font-display font-bold text-white uppercase">{customer.name}</h2>
                        <p className="text-sm font-mono text-gray-500 mt-1 uppercase tracking-widest">{customer.phone}</p>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Membership Code</div>
                        <div className="bg-white/5 px-4 py-2 rounded border border-white/10 font-mono text-lg md:text-xl text-gold inline-block md:block">{customer.membershipCode}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Loyalty Progress</div>
                        <div className="flex items-end gap-2 mb-4">
                          <span className="text-4xl md:text-6xl font-display font-bold text-white leading-none">{customer.coupons}</span>
                          <span className="text-lg md:text-xl text-gray-600 mb-1 font-mono">/ 10</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((customer.coupons % 10) * 10, 100)}%` }}
                            className="h-full bg-gold shadow-[0_0_15px_rgba(255,107,0,0.5)]"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center gap-3 md:gap-4">
                        {!customer.receivedFirstGift && (
                          <div className="bg-gold/10 border border-gold/30 p-3 md:p-4 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2 md:gap-3">
                              <Gift className="w-4 h-4 text-gold" />
                              <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-widest">Welcome Gift</span>
                            </div>
                            <button onClick={() => handleAction('redeem_fries')} className="px-3 py-1.5 md:px-4 md:py-2 bg-gold text-black text-[9px] font-bold uppercase rounded hover:bg-white transition-colors">Redeem</button>
                          </div>
                        )}
                        {customer.coupons >= 10 && (
                          <div className="bg-green-500/10 border border-green-500/30 p-3 md:p-4 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2 md:gap-3">
                              <Ticket className="w-4 h-4 text-green-500" />
                              <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-widest">Free Döner</span>
                            </div>
                            <button onClick={() => handleAction('redeem_doner')} className="px-3 py-1.5 md:px-4 md:py-2 bg-green-500 text-black text-[9px] font-bold uppercase rounded hover:bg-white transition-colors">Redeem</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <Button onClick={() => handleAction('add_purchase')} variant="primary" size="lg" className="w-full h-16 md:h-20">
                        <Plus className="w-5 h-5" /> Add Stamp
                      </Button>
                      <Button onClick={() => {setCustomer(null); setCode('');}} variant="outline" size="lg" className="w-full h-16 md:h-20">
                        Clear Session
                      </Button>
                    </div>

                    {message && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-green-500/10 border border-green-500/20 text-green-500 text-center text-[10px] font-bold uppercase tracking-[0.3em]">
                        {message}
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    className="flex-1 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6"
                  >
                    <User className="w-16 h-16 md:w-24 md:h-24 stroke-[1]" />
                    <p className="text-lg md:text-xl font-display uppercase tracking-[0.5em]">Waiting for Input</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
