import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-brand-charcoal border-t border-brand-gray/50 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4 col-span-1 md:col-span-2">
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tighter uppercase">Dönerhaus</span>
            <span className="text-xs text-brand-orange font-bold tracking-[0.2em] uppercase">Nürnberg</span>
          </div>
          <p className="text-brand-white/50 max-w-sm text-sm leading-relaxed">
            Premium German-Turkish street food culture. Crafted with passion in the heart of Nürnberg. Fresh ingredients, traditional recipes, and a modern dining experience.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-orange">Quick Links</h4>
          <ul className="space-y-3 text-[13px] font-medium text-brand-white/40">
            <li><Link href="/" className="hover:text-brand-white transition-colors">Home</Link></li>
            <li><Link href="#menu" className="hover:text-brand-white transition-colors">Our Menu</Link></li>
            <li><Link href="/club/register" className="hover:text-brand-white transition-colors">Customer Club</Link></li>
            <li><Link href="/admin" className="hover:text-brand-white transition-colors">Admin Dashboard</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-orange">Contact Us</h4>
          <ul className="space-y-3 text-[13px] font-medium text-brand-white/40">
            <li>Nürnberg, Germany</li>
            <li>+49 911 123 4567</li>
            <li>hello@donerhaus-nbg.de</li>
            <li className="pt-2 text-brand-white/60">Mon - Sat: 11:00 - 22:00<br/>Sun: 12:00 - 20:00</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-brand-gray/10 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-brand-white/10">
        &copy; {new Date().getFullYear()} Dönerhaus Nürnberg. Premium Street Food.
      </div>
    </footer>
  );
};
