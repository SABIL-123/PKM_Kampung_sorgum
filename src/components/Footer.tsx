import React from 'react';
import { Sprout, Phone, Mail, Clock, MapPin, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface FooterProps {
  cmsPages?: any[];
}

const Footer = ({ cmsPages = [] }: FooterProps) => {
  const navigate = useNavigate();

  // Extract contact info from CMS or fall back to high-quality defaults
  const kontakData = cmsPages.find((p: any) => p.slug === 'kontak' || p.slug === 'hubungi-kami')?.content?.find((c: any) => c.type === 'contacts')?.data;
  const phone = kontakData?.phone_numbers?.[0] || '+62 821-2345-6789';
  const email = kontakData?.emails?.[0] || 'halo@kampungsorgum.com';
  const address = kontakData?.addresses?.[0] || 'Kabupaten Bantul, Yogyakarta, Indonesia';

  // Generate WhatsApp link dynamically
  const cleanNumber = phone.replace(/\D/g, '');
  const waNumber = cleanNumber.startsWith('0') ? '62' + cleanNumber.slice(1) : cleanNumber;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent('Halo Kampung Sorgum, saya ingin bertanya...')}`;

  // Sync navigation items with the CMS
  const menuItems = cmsPages
    .filter((p: any) => p.status === 'published' && (p.is_in_navbar === 1 || p.is_in_navbar === true) && p.slug !== 'gabung-mitra' && p.slug !== 'kontak')
    .sort((a: any, b: any) => a.priority - b.priority)
    .map((p: any) => ({
      id: p.slug === 'beranda' ? '/' : `/${p.slug}`,
      label: p.title
    }));

  // Fallback to local default pages if CMS pages are loading
  const navItems = menuItems.length > 0 ? menuItems : [
    { id: '/', label: 'Beranda' },
    { id: '/profil', label: 'Profil' },
    { id: '/galeri', label: 'Galeri' },
    { id: '/berita', label: 'Berita' }
  ];

  return (
    <footer className="bg-[#121E26] text-neutral-300 pt-20 pb-10 border-t border-sorgum-primary/10 relative overflow-hidden font-sans">
      {/* Decorative brand-themed background ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sorgum-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sorgum-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Branding & Emblem */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div 
              onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
              className="w-24 h-24 bg-white rounded-full overflow-hidden shadow-2xl border border-sorgum-primary/10 mb-6 hover:scale-105 hover:rotate-2 transition-all duration-300 select-none cursor-pointer p-1"
            >
              <img 
                src="/logo.jpg" 
                alt="Logo Kampung Sorgum" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            
            <p className="text-neutral-400 text-sm leading-relaxed font-light max-w-sm">
              Kampung Sorgum berkomitmen untuk mengakselerasi ketahanan pangan dan kesejahteraan petani lokal melalui pemberdayaan budidaya sorgum yang terintegrasi, inovatif, dan berkelanjutan.
            </p>
          </div>

          {/* Column 2: Navigasi */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-[17px] tracking-wide mb-6 uppercase border-b border-sorgum-primary/20 pb-2 inline-block">
              Navigasi
            </h4>
            <ul className="space-y-3.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link 
                    to={item.id} 
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sorgum-accent opacity-0 group-hover:opacity-100 transition-all duration-200 -ml-2 group-hover:ml-0 shrink-0"></span>
                    <span className="capitalize">{item.label}</span>
                  </Link>
                </li>
              ))}
              {!navItems.some(i => i.id === '/hubungi-kami') && (
                <li>
                  <Link 
                    to="/hubungi-kami" 
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sorgum-accent opacity-0 group-hover:opacity-100 transition-all duration-200 -ml-2 group-hover:ml-0 shrink-0"></span>
                    <span>Hubungi Kami</span>
                  </Link>
                </li>
              )}
              {!navItems.some(i => i.id === '/gabung-mitra') && (
                <li>
                  <Link 
                    to="/gabung-mitra" 
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sorgum-accent opacity-0 group-hover:opacity-100 transition-all duration-200 -ml-2 group-hover:ml-0 shrink-0"></span>
                    <span>Gabung Mitra</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Hubungi Kami */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-white font-bold text-[17px] tracking-wide mb-2 uppercase border-b border-sorgum-primary/20 pb-2 inline-block self-start">
              Hubungi Kami
            </h4>
            
            {/* WhatsApp */}
            <div 
              className="flex gap-4 items-start cursor-pointer group" 
              onClick={() => window.open(waUrl, '_blank')}
            >
              <div className="mt-1 w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sorgum-accent group-hover:bg-sorgum-accent group-hover:text-[#1C1C14] transition-all duration-300 shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <span className="block text-[10px] tracking-widest font-bold uppercase text-neutral-500">WHATSAPP ADMIN</span>
                <span className="block text-neutral-300 font-bold text-[14px] group-hover:text-sorgum-accent transition-colors mt-0.5">
                  {phone}
                </span>
              </div>
            </div>

            {/* Email */}
            <div 
              className="flex gap-4 items-start cursor-pointer group" 
              onClick={() => window.open(`mailto:${email}`, '_blank')}
            >
              <div className="mt-1 w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sorgum-accent group-hover:bg-sorgum-accent group-hover:text-[#1C1C14] transition-all duration-300 shrink-0">
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] tracking-widest font-bold uppercase text-neutral-500">EMAIL</span>
                <span className="block text-neutral-300 font-bold text-[14px] group-hover:text-sorgum-accent transition-colors mt-0.5 break-all">
                  {email}
                </span>
              </div>
            </div>

            {/* Jam Layanan */}
            <div className="flex gap-4 items-start group">
              <div className="mt-1 w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sorgum-accent shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <span className="block text-[10px] tracking-widest font-bold uppercase text-neutral-500">JAM LAYANAN</span>
                <span className="block text-neutral-300 font-bold text-[14px] mt-0.5">
                  Senin - Jumat: 08.00 - 17.00 WIB
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Lokasi Kami (Google Map Card) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-[17px] tracking-wide mb-6 uppercase border-b border-sorgum-primary/20 pb-2 inline-block">
              Lokasi Kami
            </h4>
            
            <div 
              className="relative w-full h-[180px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank')}
            >
              {/* Elegant warm grayscale Google Map Embed */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126487.69747518428!2d110.25413155820312!3d-7.884589999999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57a1b02b5555%3A0x892a0df91b34f826!2sKabupaten%20Bantul%2C%20Daerah%20Istimewa%20Yogyakarta!5e0!3m2!1sid!2sid!4v1716262400000!5m2!1sid!2sid"
                className="w-full h-full border-0 grayscale invert opacity-50 contrast-125 hover:opacity-75 transition-all duration-700 scale-105 group-hover:scale-100"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Floating "Maps" Badge */}
              <div className="absolute top-4 left-4 bg-white/95 text-slate-800 text-[10px] font-extrabold py-1.5 px-3 rounded-xl shadow-md flex items-center gap-1.5 hover:bg-white transition-colors uppercase tracking-wider">
                <span>Maps</span>
                <ExternalLink size={12} className="text-slate-600" />
              </div>
              
              {/* Floating Address Pill Overlay (matching branding green/gold) */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#223544]/95 backdrop-blur-md text-white text-[11px] py-2.5 px-4 rounded-2xl flex items-center gap-2 border border-white/10 group-hover:bg-[#223544] transition-all duration-300">
                <MapPin size={14} className="text-sorgum-accent shrink-0 animate-bounce" />
                <span className="truncate font-semibold">{address}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-sorgum-primary/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500 font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} Kampung Sorgum. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-neutral-500">
            <span className="hover:text-white transition-colors cursor-pointer">Kebijakan Privasi</span>
            <span className="hover:text-white transition-colors cursor-pointer">Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
