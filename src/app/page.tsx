"use client"
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Star, Leaf, Flame, Wifi, Zap, ArrowDownRight, Download, Printer, Copy, Check } from 'lucide-react';
import { toPng } from 'html-to-image';
import { menuItems } from '@/data/menu';
import { Button } from '@/components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [lookupData, setLookupData] = useState({ name: '', code: '' });
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [error, setError] = useState('');
  const [lookupError, setLookupError] = useState('');
  const [copied, setCopied] = useState(false);
  const [broadcasts, setBroadcasts] = useState<any[]>([]);

  useEffect(() => {
    const fetchBroadcasts = async () => {
      try {
        const query = user ? `?phone=${user.phone}&code=${user.membershipCode}` : '';
        const res = await fetch(`/api/club/broadcasts${query}`);
        const data = await res.json();
        if (res.ok) setBroadcasts(data);
      } catch (err) {}
    };
    fetchBroadcasts();
  }, [user]);

  useEffect(() => {
    // Hero Animations
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-reveal',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 2.2 }
      );

      gsap.fromTo('.scale-logo',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 0.35, duration: 2.5, ease: 'power2.out', delay: 1.5 }
      );

      // Section Reveals
      gsap.utils.toArray('.reveal').forEach((el: any) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            }
          }
        );
      });

      // Card Float
      gsap.to('#visual-card', {
        y: -20, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
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
      if (res.ok) {
        setUser(data);
      } else {
        setError(data.error || 'Ein Fehler ist aufgetreten');
      }
    } catch (err) {
      setError('Verbindung zum Server fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupLoading(true);
    setLookupError('');
    try {
      const res = await fetch('/api/club/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: lookupData.name, membershipCode: lookupData.code }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        document.getElementById('club')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setLookupError(data.error || 'Nicht gefunden');
      }
    } catch (err) {
      setLookupError('Fehler');
    } finally {
      setLookupLoading(false);
    }
  };

  const handleWalletDownload = () => {
    if (!user?.membershipCode) return;
    window.location.href = `/api/wallet?code=${user.membershipCode}&name=${encodeURIComponent(user.name)}`;
  };

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `donerhaus-vip-card-${user?.membershipCode}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('oops, something went wrong!', err);
    }
  };

  const handleCopy = () => {
    if (!user?.membershipCode) return;
    navigator.clipboard.writeText(user.membershipCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReviewSubmit = async () => {
    try {
      await fetch('/api/reviews/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membershipCode: user.membershipCode }),
      });
      // Update local state to show PENDING
      setUser({ ...user, googleReviewStatus: 'PENDING' });
    } catch (err) {}
  };

  return (
    <main className="bg-obsidian-base overflow-x-hidden">

      {/* LOOKUP BAR */}
      <div className="fixed top-20 left-0 w-full z-40 px-4 md:px-0">
        <div className="max-w-4xl mx-auto glass-panel rounded-full py-2 px-4 md:px-8 flex flex-col md:flex-row items-center gap-4 border border-white/5 shadow-2xl backdrop-blur-xl">
           <div className="hidden md:block text-[9px] font-bold text-gold uppercase tracking-[0.3em] whitespace-nowrap">Stempel-Check:</div>
           <form onSubmit={handleLookup} className="flex flex-1 w-full gap-2 md:gap-4">
              <input
                type="text"
                placeholder="NAME"
                required
                value={lookupData.name}
                onChange={(e) => setLookupData({ ...lookupData, name: e.target.value })}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[10px] text-white focus:outline-none focus:border-gold/50 transition-colors uppercase font-bold tracking-widest"
              />
              <input
                type="text"
                placeholder="CODE"
                required
                value={lookupData.code}
                onChange={(e) => setLookupData({ ...lookupData, code: e.target.value })}
                className="w-24 md:w-32 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[10px] text-white focus:outline-none focus:border-gold/50 transition-colors uppercase font-bold tracking-widest"
              />
              <Button type="submit" disabled={lookupLoading} variant="gold" className="rounded-full px-4 py-1.5 h-auto text-[9px] font-bold whitespace-nowrap">
                {lookupLoading ? '...' : 'CHECK'}
              </Button>
           </form>
           {lookupError && <div className="text-[8px] text-red-500 font-bold uppercase animate-pulse">{lookupError}</div>}
        </div>
      </div>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-16 md:pt-20">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[60vw] h-[90vw] md:h-[60vw] bg-gold/20 rounded-full blur-[60px] md:blur-[150px] animate-pulse-slow"></div>
          <div className="relative w-[85vw] md:w-[50vw] aspect-square scale-logo mix-blend-screen">
             <Image src="/logo.jpg" alt="Logo" fill className="object-contain opacity-35" priority />
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-block overflow-hidden mb-4">
            <div className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-gold uppercase hero-reveal">Taste the Excellence</div>
          </div>

          <h1 className="font-display font-bold text-[clamp(2.5rem,15vw,12rem)] leading-[0.85] uppercase mb-6 md:mb-8 mix-blend-overlay">
            <div className="overflow-hidden"><span className="block hero-reveal">Kebab</span></div>
            <div className="overflow-hidden"><span className="block text-outline hero-reveal">Re</span></div>
            <div className="overflow-hidden"><span className="block text-gold text-glow hero-reveal">Defined</span></div>
          </h1>

          <div className="max-w-xl mx-auto mb-12 px-4">
            <p className="text-gray-400 font-sans text-sm md:text-lg leading-relaxed hero-reveal opacity-0">
              Kein Fast Food. Ein Statement. <br />
              Frische Zutaten, exklusive Rezepturen und das Herz von Nürnberg.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 hero-reveal opacity-0">
            <Link href="#club" className="btn-magnetic px-10 py-4 border border-white/20 rounded-full text-xs font-bold tracking-[0.2em] hover:text-black cursor-hover inline-flex items-center justify-center group">
              <span>JOIN THE CLUB</span>
              <ArrowRight className="ml-3 w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
            </Link>
            <a href="https://maps.app.goo.gl/ti7Co6ecNBh9XnYB6?g_st=ic" target="_blank" className="px-10 py-4 text-xs font-bold tracking-[0.2em] text-gray-500 hover:text-white transition-colors cursor-hover flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" /> FIND US
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mix-blend-difference">
          <div className="w-[1px] h-16 bg-white/20 overflow-hidden">
            <div className="w-full h-full bg-white animate-float"></div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-10 border-y border-white/5 bg-obsidian-surface overflow-hidden relative z-20">
        <div className="flex whitespace-nowrap gap-24 animate-marquee items-center">
          {[1, 2].map((idx) => (
            <div key={idx} className="flex items-center gap-24">
              <div className="flex items-center gap-8 opacity-50">
                <span className="text-6xl font-display font-bold text-transparent text-outline">PREMIUM QUALITY</span>
                <Star className="text-gold w-8 h-8 fill-gold" />
              </div>
              <div className="flex items-center gap-8 opacity-50">
                <span className="text-6xl font-display font-bold text-white">100% FRESH MEAT</span>
                <Flame className="text-gold w-8 h-8 fill-gold" />
              </div>
              <div className="flex items-center gap-8 opacity-50">
                <span className="text-6xl font-display font-bold text-transparent text-outline">HANDCRAFTED</span>
                <Leaf className="text-gold w-8 h-8 fill-gold" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LOYALTY SECTION */}
      <section id="club" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="reveal">
              <span className="text-gold tracking-[0.4em] text-[10px] font-bold uppercase block mb-6">Exclusive Access</span>
              <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 md:mb-8 leading-tight">
                BLACK <br /> <span className="text-outline">MEMBER</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12 font-light">
                Werde Teil des inneren Kreises. Sammle Punkte, genieße Vorteile. <br />
                <span className="text-gold">10 Stempel = 1 Gratis Döner.</span>
              </p>

              {!user ? (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold to-orange-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative glass-panel p-8 rounded-xl">
                    <form onSubmit={handleRegister} className="space-y-6">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Dein Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-obsidian-base/50 border border-white/10 rounded-lg p-4 text-white focus:border-gold focus:outline-none transition-colors"
                          placeholder="Name"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Handynummer</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-obsidian-base/50 border border-white/10 rounded-lg p-4 text-white focus:border-gold focus:outline-none transition-colors"
                          placeholder="017..."
                        />
                      </div>
                      {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-4">{error}</p>}
                      <Button type="submit" disabled={loading} variant="gold" size="lg" className="w-full">
                        {loading ? 'PROCESSING...' : 'JOIN NOW & GET FREE FRIES'}
                      </Button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start animate-fade-in w-full">
                  <p className="text-xl text-white mb-6">Willkommen im Club, <span className="text-gold font-bold">{user.name}</span>.</p>

                  {/* BROADCASTS */}
                  {broadcasts.length > 0 && (
                    <div className="w-full space-y-3 mb-8">
                      {broadcasts.map((b, i) => (
                        <div key={i} className="p-4 bg-white/5 border-l-2 border-gold rounded-r-xl">
                          <h4 className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">{b.title}</h4>
                          <p className="text-xs text-gray-400 font-light">{b.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* GOOGLE REVIEW PROMPT */}
                  {user.googleReviewStatus === 'NONE' && (
                    <div className="mb-8 p-6 bg-gold/10 border border-gold/30 rounded-2xl w-full max-w-md group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                          <Star className="text-black w-4 h-4 fill-black" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white uppercase tracking-widest block">+1 Gratis Stempel</span>
                          <span className="text-[8px] text-gold font-bold uppercase tracking-widest">Google Maps Special</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mb-6 font-light leading-relaxed">
                        Bewerte unser Handwerk auf Google Maps und erhalte einen zusätzlichen Stempel als Dankeschön für dein Feedback!
                      </p>
                      <a
                        href="https://maps.app.goo.gl/ti7Co6ecNBh9XnYB6?g_st=ic"
                        target="_blank"
                        onClick={handleReviewSubmit}
                        className="flex items-center justify-center gap-2 w-full bg-gold text-black text-xs font-bold py-4 rounded-xl hover:bg-white transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.2em]"
                      >
                        Jetzt Bewerten <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  {user.googleReviewStatus === 'PENDING' && (
                    <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-xl w-full max-w-md flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Review eingereicht. Admin prüft es in Kürze...</p>
                    </div>
                  )}

                  <p className="text-sm text-gray-500 mb-8 max-w-sm">Das ist dein digitaler Mitgliedsausweis. Zeige diesen Code bei jedem Besuch vor.</p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      size="sm"
                      className="rounded-full border-white/10 text-[10px]"
                    >
                      {copied ? 'Copied!' : 'Copy Code'}
                    </Button>
                    <Button
                      onClick={handleDownload}
                      variant="gold"
                      size="sm"
                      className="rounded-full text-[10px]"
                    >
                      <Download className="w-3 h-3 mr-2" /> Save as Image
                    </Button>
                    <Button
                      onClick={handleWalletDownload}
                      variant="outline"
                      size="sm"
                      className="rounded-full border-white/10 text-[10px]"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.96.95-2.06 1.92-3.72 1.92-1.61 0-2.14-1.01-4.07-1.01-1.93 0-2.52 1-4.02 1.01-1.58.01-2.82-1.12-3.8-2.55C.44 18.23-1.08 15.42.98 11.75c1.02-1.8 2.86-2.95 4.84-2.95 1.5 0 2.92.95 3.83.95.9 0 2.64-1.15 4.45-1.15 1.61 0 3.01.6 4.02 1.81-3.32 1.76-2.77 6.44.82 7.89-.66 1.76-1.55 3.5-2.89 4.98zM13.03 6.94c.94-1.14 1.57-2.72 1.39-4.3-1.4.06-3.11.95-4.11 2.11-1 1.14-1.88 2.82-1.66 4.3 1.56.12 3.16-.86 4.38-2.11z"/></svg>
                      Apple Wallet
                    </Button>
                    <Button
                      onClick={() => window.print()}
                      variant="outline"
                      size="sm"
                      className="rounded-full border-white/10 text-[10px]"
                    >
                      <Printer className="w-3 h-3 mr-2" /> Print
                    </Button>
                  </div>
                  <button onClick={() => setUser(null)} className="text-xs text-gray-600 hover:text-white underline cursor-hover">Neuen Account erstellen</button>
                </div>
              )}
            </div>

            <div className="relative flex justify-center reveal mt-8 lg:mt-0 w-full overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[60px] md:blur-[80px]"></div>
              <div ref={cardRef} id="visual-card" className="w-full max-w-[340px] md:max-w-md aspect-[1.6/1] md:h-[260px] card-bg-front p-5 md:p-8 flex flex-col justify-between text-left relative overflow-hidden shadow-2xl">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full -mr-16 -mt-16"></div>

                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <div className="font-display font-bold text-lg md:text-2xl text-white tracking-widest uppercase leading-tight">DÖNERHAUS</div>
                    <div className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-gold mt-1 font-bold">Elite Member</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white p-1.5 rounded-lg shadow-xl">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user?.membershipCode || 'Donerhaus'}`} className="w-full h-full object-cover" alt="QR" />
                    </div>
                    <Wifi className="text-white/20 w-4 h-4 rotate-90" />
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4 relative z-10">
                  <Zap className="text-white/40 w-3 h-3 md:w-4 md:h-4 fill-white/40" />
                  <div className="px-2 md:px-3 py-1 bg-gold/10 border border-gold/20 rounded-full">
                    <span className="text-[7px] md:text-[8px] font-bold text-gold uppercase tracking-[0.2em]">10 Stamps = 1 Free Döner</span>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="text-[8px] md:text-[9px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Membership ID</div>
                  <div className="font-mono text-xl md:text-3xl text-white tracking-widest text-glow mb-2 md:mb-4">{user?.membershipCode || '---- ----'}</div>
                  <div className="flex justify-between items-end border-t border-white/5 pt-3 md:pt-4">
                    <div>
                      <div className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">Member Name</div>
                      <div className="font-display text-[10px] md:text-sm text-gray-300 uppercase tracking-wider truncate max-w-[120px] md:max-w-none">{user?.name || 'GUEST USER'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">Stamps</div>
                      <div className="text-white font-bold text-md md:text-lg">{user?.coupons || 0}<span className="text-gray-600 text-xs ml-1">/ 10</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU HIGHLIGHTS */}
      <section id="menu" className="py-32 bg-obsidian-surface">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 reveal">
            <div>
              <span className="text-gold tracking-[0.4em] text-[10px] font-bold uppercase block mb-4">Signature Collection</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white uppercase leading-none">
                Masterpiece <br /> <span className="text-outline">Menu</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
              Jedes Gericht ist das Ergebnis monatelanger Experimente mit Aromen und Texturen. Premium-Qualität ohne Kompromisse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuItems.slice(0, 3).map((item, i) => (
              <div key={item.id} className="reveal group">
                <div className="relative h-[400px] overflow-hidden rounded-2xl mb-6 mask-blur">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0 filter-sharp"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <div className="px-4 py-1 bg-gold text-black font-bold text-[10px] tracking-widest uppercase rounded-full">
                      {item.price}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-6 font-medium">{item.description}</p>
                <Link href="/club/register" className="inline-flex items-center gap-2 text-gold text-[10px] font-bold tracking-widest uppercase hover:gap-4 transition-all cursor-hover">
                  Jetzt Probieren <ArrowDownRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-40 bg-obsidian-base relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-display font-bold text-white/[0.02] uppercase tracking-tighter pointer-events-none select-none whitespace-nowrap">
          EXCELLENCE
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal order-2 lg:order-1">
              <span className="text-gold tracking-[0.4em] text-[10px] font-bold uppercase block mb-6">Our Philosophy</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
                Driven by <br /> <span className="text-gold">Passion.</span>
              </h2>
              <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                <p>Wir haben nicht einfach nur einen weiteren Dönerladen gebaut. Wir haben ein Heiligtum für Geschmack geschaffen.</p>
                <p>Jeder Spieß ist ein Meisterwerk der Marinierung. Jede Sauce ist ein unter Verschluss gehaltenes Geheimnis. Wir glauben, dass Street Food den gleichen Respekt verdient wie Fine Dining.</p>
              </div>
              <div className="grid grid-cols-2 gap-10 mt-12 pt-10 border-t border-white/5">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2">Daily</h4>
                  <p className="text-xl font-bold text-white uppercase">Fresh Bread</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2">Original</h4>
                  <p className="text-xl font-bold text-white uppercase">Family Sauce</p>
                </div>
              </div>
            </div>
            <div className="reveal order-1 lg:order-2">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-panel p-4 mask-blur">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/pics/7.webp"
                    alt="Restaurant Storefront"
                    fill
                    className="object-cover filter-sharp"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold rounded-2xl flex items-center justify-center rotate-6 shadow-2xl">
                  <span className="text-black font-display font-bold text-3xl">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: flex;
          width: fit-content;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .filter-sharp {
          filter: contrast(1.15) brightness(1.05) saturate(1.1);
        }
        .mask-blur {
          mask-image: radial-gradient(circle, black 65%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle, black 65%, transparent 100%);
        }
      `}</style>
    </main>
  );
}
