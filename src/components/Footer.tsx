"use client"
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Badge } from './ui/Badge';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  const pathname = usePathname();

  // Hide Footer on specific routes
  const hideOn = ['/connect', '/seller', '/admin'];
  if (hideOn.some(path => pathname?.startsWith(path))) return null;

  return (
    <footer className="bg-brand-black border-t border-brand-white/5 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-32">
          <div className="md:col-span-5 space-y-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brand-orange/50">
                <Image src="/logo.jpg" alt="Dönerhaus Logo" fill className="object-cover" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter uppercase">Dönerhaus</span>
                <span className="text-[10px] text-brand-orange font-bold tracking-[0.3em] uppercase">Nürnberg</span>
              </div>
            </Link>
            <p className="text-brand-white/40 text-lg font-medium leading-relaxed max-w-sm">
              Der Maßstab für Premium-Street-Food in Nürnberg. Perfektes Döner-Erlebnis seit 2024.
            </p>
            <div className="flex gap-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <Link key={i} href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center text-brand-white/40 hover:text-brand-orange hover:border-brand-orange transition-all">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Navigation</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-brand-white/60">
              <li><Link href="/" className="hover:text-brand-white transition-colors">Startseite</Link></li>
              <li><Link href="#menu" className="hover:text-brand-white transition-colors">Menü</Link></li>
              <li><Link href="#about" className="hover:text-brand-white transition-colors">Über uns</Link></li>
              <li><Link href="/club/register" className="hover:text-brand-white transition-colors">Club</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Rechtliches</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-brand-white/60">
              <li><Link href="#" className="hover:text-brand-white transition-colors">Datenschutz</Link></li>
              <li><Link href="#" className="hover:text-brand-white transition-colors">Impressum</Link></li>
              <li><Link href="#" className="hover:text-brand-white transition-colors">Nutzungsbedingungen</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Standort</h4>
            <div className="space-y-4">
              <Link
                href="https://maps.app.goo.gl/WDt9y5Q3akE63pgR6"
                target="_blank"
                className="block text-sm font-bold uppercase tracking-widest text-brand-white/60 hover:text-brand-orange transition-colors leading-loose"
              >
                Königstraße 12 <br/>
                90402 Nürnberg <br/>
                Deutschland
              </Link>
              <Badge variant="outline">Täglich bis 22:00 Uhr geöffnet</Badge>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-brand-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.5em] text-brand-white/10">
          <p>© 2026 Dönerhaus Nürnberg. Alle Rechte vorbehalten.</p>
          <div className="flex gap-12">
            <span>Erstellt von Jules</span>
            <Link href="/admin" className="hover:text-brand-orange transition-colors">Admin-Portal</Link>
            <Link href="/seller" className="hover:text-brand-orange transition-colors">Verkäufer-Kasse</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
