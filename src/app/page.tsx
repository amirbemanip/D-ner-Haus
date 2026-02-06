"use client"
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ChevronRight, Star, Clock, MapPin, Sparkles } from 'lucide-react';
import { menuItems } from '@/data/menu';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1633383718081-22ac93e3dbf1?q=80&w=2000&auto=format&fit=crop"
            alt="Delicious Döner"
            fill
            className="object-cover opacity-40 grayscale-[0.2]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Badge variant="primary" className="mb-8">Authentic & Premium Street Food</Badge>
            <h1 className="text-6xl md:text-[110px] font-black uppercase tracking-tighter leading-[0.85] mb-8">
              The Art of <br/> <span className="text-brand-orange">Döner</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-white/70 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
              Experience the perfect fusion of traditional German-Turkish recipes and modern culinary excellence in the heart of Nürnberg.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="w-full sm:w-auto group h-16 px-10 rounded-full">
                Explore Menu <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/club/register" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 rounded-full">
                  Join Customer Club
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block">
          <div className="w-[1px] h-20 bg-gradient-to-b from-brand-white to-transparent" />
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-16 border-y border-brand-gray/30 bg-brand-charcoal/30 backdrop-blur-sm relative z-20 -mt-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Star, label: "4.9 Rating", sub: "1000+ Reviews" },
            { icon: Clock, label: "Open Daily", sub: "11:00 - 22:00" },
            { icon: MapPin, label: "Find Us", sub: "Nürnberg Center" },
            { icon: Sparkles, label: "Quality", sub: "Fresh Daily" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-1">
                <item.icon className="w-5 h-5 text-brand-orange" />
              </div>
              <span className="text-sm font-black uppercase tracking-widest">{item.label}</span>
              <span className="text-[11px] font-bold text-brand-white/30 uppercase tracking-widest">{item.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="py-32 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div className="space-y-4">
              <Badge variant="outline">Signature Selection</Badge>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Our <br/> Highlights</h2>
            </div>
            <Link href="#" className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs hover:text-brand-orange-light transition-colors border-b-2 border-brand-orange/20 pb-2">
              Explore Full Menu
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {menuItems.slice(0, 3).map((item, i) => (
              <Card key={item.id} className="group p-0 overflow-hidden border-brand-gray/20 bg-brand-charcoal/20">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-6 left-6 bg-brand-black/90 backdrop-blur-md px-4 py-2 rounded-full border border-brand-orange/30">
                    <span className="text-sm font-black text-brand-orange">{item.price}</span>
                  </div>
                </div>
                <div className="p-10 space-y-4">
                  <h3 className="text-2xl font-black uppercase tracking-tight">{item.title}</h3>
                  <p className="text-brand-white/40 text-sm leading-relaxed font-medium">{item.description}</p>
                  <Button variant="secondary" className="w-full mt-6 h-12 font-bold uppercase tracking-widest text-[11px] border border-brand-white/5 hover:border-brand-orange/50">
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Experience / About */}
      <section id="about" className="py-32 bg-brand-charcoal relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative h-[600px] rounded-brand-xl overflow-hidden border border-brand-gray">
             <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
              alt="Restaurant Atmosphere"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-8">
            <Badge variant="primary">The Dönerhaus Story</Badge>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Driven by <br/> <span className="text-brand-orange">Quality.</span></h2>
            <p className="text-lg text-brand-white/60 leading-relaxed font-medium">
              We started Dönerhaus with a simple mission: to elevate the street food experience. Every skewer is prepared fresh, every sauce is crafted in-house, and every bread is baked daily.
            </p>
            <p className="text-lg text-brand-white/60 leading-relaxed font-medium">
              Located in the heart of Nürnberg, we bring a modern twist to the authentic flavours you love. No shortcuts, just premium ingredients and passion.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-black text-brand-orange">100%</h4>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-white/40 mt-1">Fresh Ingredients</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-brand-orange">Handmade</h4>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-white/40 mt-1">Daily Recipes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Club CTA */}
      <section className="py-40 bg-brand-orange relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange-light rounded-full blur-[120px] -mr-48 -mt-48 opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-charcoal rounded-full blur-[120px] -ml-48 -mb-48 opacity-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="text-brand-black space-y-8 max-w-2xl text-center md:text-left">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              Join the <br/> <span className="text-brand-white">Elite</span> Club
            </h2>
            <p className="text-xl md:text-2xl font-bold leading-relaxed opacity-90">
              Reward your loyalty. Get a <span className="underline">Free Döner</span> every 10 purchases and enjoy <span className="underline">Free Fries</span> on your very first visit.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
              {["Exclusive Offers", "Birthday Gifts", "VIP Access"].map((feat, i) => (
                <div key={i} className="flex items-center gap-3 font-black text-[11px] uppercase tracking-widest bg-brand-black/10 px-4 py-2 rounded-full border border-brand-black/10">
                  <Star className="w-3 h-3 fill-brand-black" />
                  {feat}
                </div>
              ))}
            </div>
          </div>
          <Link href="/club/register" className="shrink-0 w-full md:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-brand-black text-brand-orange hover:bg-brand-charcoal shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-16 py-10 text-3xl font-black rounded-full w-full md:w-auto uppercase tracking-tighter h-auto">
                Sign Up Now
              </Button>
            </motion.div>
          </Link>
        </div>
      </section>
    </div>
  );
}
