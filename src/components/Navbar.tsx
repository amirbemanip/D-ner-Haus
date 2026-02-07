"use client"
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from './ui/Button';

export const Navbar = () => {
  const pathname = usePathname();

  // Hide Navbar on specific routes
  const hideOn = ['/connect', '/seller', '/admin'];
  if (hideOn.some(path => pathname?.startsWith(path))) return null;

  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-black/80 backdrop-blur-md border-b border-brand-gray/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-orange/50">
             <Image src="/logo.jpg" alt="Dönerhaus Logo" fill className="object-cover" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tighter uppercase">Dönerhaus</span>
            <span className="text-[10px] text-brand-orange font-bold tracking-[0.2em] uppercase">Nürnberg</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-brand-white/60">
          <Link href="/" className="hover:text-brand-orange transition-colors">Startseite</Link>
          <Link href="#menu" className="hover:text-brand-orange transition-colors">Menü</Link>
          <Link href="#about" className="hover:text-brand-orange transition-colors">Über uns</Link>
          <Link href="/seller" className="hover:text-brand-orange transition-colors">Verkäufer-Kasse</Link>
        </div>

        <Link href="/club/register">
          <Button size="sm">Tritt dem Club bei</Button>
        </Link>
      </div>
    </nav>
  );
};
