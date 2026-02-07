"use client"
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ChevronRight, Star, Clock, MapPin, Sparkles, ArrowDownRight } from 'lucide-react';
import { menuItems } from '@/data/menu';

const container: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnim: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-black pt-20">
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1633383718081-22ac93e3dbf1?q=80&w=2000&auto=format&fit=crop"
              alt="Premium Döner"
              fill
              className="object-cover grayscale-[0.2] contrast-125"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/20 to-transparent" />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Badge variant="primary" className="mb-6">Seit 2024 • Nürnberg</Badge>
              <h1 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter leading-[0.8] mb-8">
                Die Kunst <br/> des <span className="text-brand-orange">Döners</span>
              </h1>

              <div className="flex items-start gap-8 mb-12">
                <div className="w-[1px] h-24 bg-brand-orange/30 mt-2" />
                <p className="text-lg md:text-xl text-brand-white/60 font-medium max-w-lg leading-relaxed italic">
                  "Neudefinition der deutsch-türkischen Street-Food-Kultur durch Leidenschaft für Qualität und modernes kulinarisches Handwerk."
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button size="xl" className="w-full sm:w-auto group">
                  Speisekarte <ArrowDownRight className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform" />
                </Button>
                <Link href="/club/register" className="w-full sm:w-auto">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Tritt dem Club bei
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-brand-white/20"
        >
          <span className="w-12 h-[1px] bg-brand-white/10" />
          Scrollen zum Entdecken
        </motion.div>
      </section>

      {/* Stats / Proof Section */}
      <section className="py-12 md:py-24 border-y border-brand-white/5 bg-brand-charcoal/50 backdrop-blur-xl relative overflow-hidden">
        {/* Subtly animated gradient background */}
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-brand-orange/5 via-transparent to-brand-orange/5"
        />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
          {[
            { icon: Star, label: "4.9 Bewertung", sub: "Google Bewertungen" },
            { icon: Clock, label: "Täglich", sub: "11:00 - 22:00" },
            { icon: MapPin, label: "Nürnberg", sub: "Stadtzentrum" },
            { icon: Sparkles, label: "Premium", sub: "Lokaler Bezug" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mb-2 border-brand-orange/10 group-hover:border-brand-orange transition-colors">
                <item.icon className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <span className="block text-xs font-black uppercase tracking-widest mb-1">{item.label}</span>
                <span className="block text-[10px] font-bold text-brand-white/30 uppercase tracking-[0.2em]">{item.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="py-20 bg-brand-black border-b border-brand-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 justify-between">
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-4">
                <span className="w-12 h-[1px] bg-brand-orange" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-orange">Anerkennung</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                Einer der <span className="text-brand-orange italic">Besten</span> in Nürnberg.
              </h2>
              <p className="text-brand-white/40 font-medium max-w-xl leading-relaxed">
                Wir sind stolz darauf, von <span className="text-brand-white">DeinNaimberch</span> offiziell als einer der 6 besten Dönerläden Nürnbergs ausgezeichnet worden zu sein. Diese Anerkennung bestärkt uns in unserem Anspruch an höchste Qualität.
              </p>
              <a
                href="https://deinnaemberch.de/die-6-besten-doener-in-nuernberg/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full glass border border-brand-white/10 flex items-center justify-center group-hover:border-brand-orange transition-colors">
                  <ArrowDownRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest group-hover:text-brand-orange transition-colors">Artikel lesen</span>
              </a>
            </div>

            <div className="flex-1 relative">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-4 bg-brand-orange/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glass border border-brand-white/10 rounded-[40px] p-10 md:p-16 flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 glass-orange rounded-3xl flex items-center justify-center mb-4">
                    <Star className="w-10 h-10 text-brand-orange fill-brand-orange" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-white/40">Top Ranking 2024</p>
                    <p className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">Die Top 6 Elite</p>
                  </div>
                  <p className="text-xs font-bold text-brand-white/20 uppercase tracking-[0.3em]">Nürnbergs Döner-Kultur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="menu" className="py-20 md:py-40 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
            <div className="space-y-6">
              <Badge variant="outline">Kuration</Badge>
              <h2 className="text-5xl md:text-7xl lg:text-[100px] font-black uppercase tracking-tighter leading-none">
                Signature <br/> <span className="text-outline">Kollektion</span>
              </h2>
            </div>
            <p className="text-brand-white/40 max-w-sm font-medium leading-relaxed">
              Jedes Gericht in unserer Signature-Kollektion ist das Ergebnis monatelanger Experimente mit Aromen und Texturen.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {menuItems.slice(0, 3).map((item, i) => (
              <motion.div key={item.id} variants={itemAnim}>
                <Card className="group p-0 overflow-hidden bg-brand-charcoal/40" animate={false}>
                  <div className="relative h-[450px] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-8 left-8">
                      <Badge variant="primary" className="bg-brand-orange text-brand-black font-black text-xs px-4 py-2">
                        {item.price}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-10 space-y-4">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">{item.title}</h3>
                    <p className="text-brand-white/40 text-sm leading-relaxed font-medium min-h-[60px]">{item.description}</p>
                    <Button variant="outline" className="w-full mt-4 h-14 group">
                      Jetzt bestellen <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section - Editorial Layout */}
      <section id="about" className="py-20 md:py-40 bg-brand-charcoal relative overflow-hidden">
        {/* Background text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-brand-white/[0.02] uppercase tracking-tighter pointer-events-none select-none whitespace-nowrap">
          Nürnberger Exzellenz
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative h-[700px] rounded-brand-xl overflow-hidden shadow-2xl"
            >
               <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
                alt="Restaurant Atmosphere"
                fill
                className="object-cover contrast-110"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-orange rounded-2xl flex flex-col items-center justify-center p-8 text-brand-black hidden md:flex">
              <span className="text-6xl font-black leading-none">100%</span>
              <span className="text-xs font-black uppercase tracking-widest mt-2 text-center">Nur Premium-Zutaten</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-10 relative z-10">
            <Badge variant="primary">Unsere Philosophie</Badge>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
              Getrieben von <br/> <span className="text-brand-orange">Leidenschaft.</span>
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-brand-white/70 leading-relaxed font-medium">
                Wir haben nicht einfach nur einen weiteren Dönerladen gebaut. Wir haben ein Heiligtum für Geschmack geschaffen.
              </p>
              <p className="text-lg text-brand-white/40 leading-relaxed font-medium">
                Jeder Spieß ist ein Meisterwerk der Marinierung. Jede Sauce ist ein unter Verschluss gehaltenes Geheimnis. Wir glauben, dass Street Food den gleichen Respekt verdient wie Fine Dining.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-10 border-t border-brand-white/5">
              <div>
                <h4 className="text-sm font-black uppercase tracking-[0.3em] text-brand-orange mb-4">Täglich</h4>
                <p className="text-2xl font-black">Frisches Brot</p>
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-[0.3em] text-brand-orange mb-4">Original</h4>
                <p className="text-2xl font-black">Familiensauce</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards CTA - Extra Bold */}
      <section className="py-20 md:py-40 bg-brand-orange relative overflow-hidden group">
        <div className="absolute inset-0 bg-brand-black opacity-0 group-hover:opacity-5 transition-opacity duration-700" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20">
          <div className="text-brand-black space-y-10 max-w-3xl">
            <h2 className="text-6xl md:text-[140px] font-black uppercase tracking-tighter leading-[0.75]">
              Elite <br/> <span className="text-brand-white">Club.</span>
            </h2>
            <p className="text-2xl lg:text-3xl font-black leading-tight max-w-xl">
              LOYALITÄT ZAHLT SICH AUS. DER 10. DÖNER GEHT AUF UNS.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Kostenlose Willkommens-Pommes", "Prioritäts-Zugang", "Exklusive Events"].map((f, i) => (
                <div key={i} className="px-5 py-2 rounded-full border border-brand-black/20 text-[10px] font-black uppercase tracking-widest bg-brand-black/5">
                  {f}
                </div>
              ))}
            </div>
          </div>

          <Link href="/club/register" className="w-full lg:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="xl" variant="secondary" className="bg-brand-black text-brand-orange hover:bg-brand-charcoal px-20 py-12 text-4xl rounded-full w-full lg:w-auto shadow-2xl shadow-brand-black/40">
                Jetzt beitreten
              </Button>
            </motion.div>
          </Link>
        </div>
      </section>
    </div>
  );
}
