import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, 
  Users, 
  Image as ImageIcon, 
  Newspaper, 
  Mail, 
  Menu, 
  X, 
  ArrowRight,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  ChevronRight,
  Leaf,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

// --- Components ---

const Navbar = ({ activeSection, setActiveSection, setCurrentPage }: { activeSection: string, setActiveSection: (s: string) => void, setCurrentPage: (p: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'berita', label: 'Berita' },
    { id: 'kontak', label: 'Hubungi Kami' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-sorgum-light/90 backdrop-blur-md py-3 border-b border-sorgum-primary/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => { setCurrentPage('main'); setActiveSection('beranda'); }}
        >
          <div className="w-10 h-10 bg-sorgum-primary rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
            <Sprout size={20} />
          </div>
          <span className="font-serif text-2xl font-bold text-sorgum-primary tracking-tight">Kampung Sorgum</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setCurrentPage('main'); setActiveSection(item.id); }}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${
                activeSection === item.id ? 'text-sorgum-primary' : 'text-sorgum-primary/50 hover:text-sorgum-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage('partner')}
            className="bg-sorgum-primary text-white px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold hover:scale-105 transition-all shadow-lg shadow-sorgum-primary/20 cursor-pointer"
          >
            Gabung Mitra
          </button>
        </div>

        <button className="md:hidden text-sorgum-primary" onClick={() => setIsMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-sorgum-primary z-50 p-10 flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-10 right-10 text-white" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage('main'); setActiveSection(item.id); setIsMenuOpen(false); }}
                className="text-white text-4xl font-serif italic hover:translate-x-4 transition-transform"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => { setCurrentPage('partner'); setIsMenuOpen(false); }}
              className="mt-4 bg-white text-sorgum-primary px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-all shadow-xl"
            >
              Gabung Mitra
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Sections ---

const SectionHome = ({ setActiveSection }: { setActiveSection: (s: string) => void }) => (
  <section className="min-h-screen flex items-center pt-20">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-6 block">Kedaulatan Pangan Lokal</span>
        <h1 className="font-serif text-7xl md:text-8xl text-sorgum-primary leading-[0.9] mb-8 tracking-tighter">
          Menanam Masa <br /> <span className="italic">Depan</span> Desa.
        </h1>
        <p className="text-lg text-neutral-600 mb-10 max-w-lg leading-relaxed font-light">
          Kampung Sorgum adalah inisiatif revolusioner untuk mengembalikan kejayaan sorghum sebagai sumber pangan sehat, tahan iklim, dan berdaya ekonomi tinggi bagi masyarakat pedesaan Indonesia.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveSection('profil')}
            className="bg-sorgum-primary text-white px-8 py-4 rounded-full flex items-center gap-3 font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
          >
            Lihat Profil Kami <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="aspect-square bg-neutral-200 rounded-[60px] overflow-hidden relative shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=2672&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Sorghum"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sorgum-primary/40 to-transparent"></div>
        </motion.div>
      </div>
    </div>
  </section>
);

const SectionProfile = () => {
  const [stats, setStats] = useState<{desaMitra: string, petaniTerdaftar: string, varianProduk: string, produksiTahunan: string} | null>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) setStats(data.data);
      })
      .catch(err => {
        console.error('Failed to fetch stats:', err);
        // Fallback data
        setStats({ desaMitra: '15+', petaniTerdaftar: '500+', varianProduk: '20+', produksiTahunan: '100t+' });
      });
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-4 block">Profil Kami</span>
          <h2 className="font-serif text-5xl text-sorgum-primary italic">Misi Di Balik Setiap Bulir</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
          <div className="space-y-8">
            <h3 className="font-serif text-4xl text-sorgum-primary">Sejarah & Visi</h3>
            <p className="text-neutral-500 leading-relaxed font-light">
              Berawal dari kepedulian terhadap lahan marginal di pesisir dan wilayah kering, Kampung Sorgum lahir sebagai jembatan antara teknologi pertanian modern dengan kearifan lokal petani Nusantara.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-sorgum-light rounded-3xl border border-sorgum-primary/5">
                <Target className="text-sorgum-accent mb-4" />
                <h4 className="font-bold text-xs uppercase mb-2">Visi</h4>
                <p className="text-xs text-neutral-500">Menjadi pusat inovasi sorghum terkemuka di Asia Tenggara.</p>
              </div>
              <div className="p-6 bg-sorgum-light rounded-3xl border border-sorgum-primary/5">
                <Sprout className="text-sorgum-accent mb-4" />
                <h4 className="font-bold text-xs uppercase mb-2">Misi</h4>
                <p className="text-xs text-neutral-500">Memberdayakan petani melalui edukasi dan akses pasar.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2670&auto=format&fit=crop" className="rounded-3xl h-64 w-full object-cover shadow-lg" alt="Team" />
            <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2670&auto=format&fit=crop" className="translate-y-12 rounded-3xl h-64 w-full object-cover shadow-lg" alt="Field" />
          </div>
        </div>

        <div className="bg-sorgum-primary rounded-[50px] p-12 text-white flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-5xl font-serif">{stats?.desaMitra || '...'}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">Desa Mitra</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-5xl font-serif">{stats?.petaniTerdaftar || '...'}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">Petani Terdaftar</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-5xl font-serif">{stats?.varianProduk || '...'}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">Varian Produk</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-5xl font-serif">{stats?.produksiTahunan || '...'}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">Produksi Tahunan</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionGallery = ({ setActiveSection }: { setActiveSection: (s: string) => void }) => {
  const [images, setImages] = useState<{id: number, url: string, alt: string}[]>([]);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.success) setImages(data.data);
      })
      .catch(err => {
        console.error('Failed to fetch gallery:', err);
        // Fallback
        setImages([
          { id: 1, url: "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=2574&auto=format&fit=crop", alt: "Gallery" },
          { id: 2, url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2574&auto=format&fit=crop", alt: "Gallery" },
          { id: 3, url: "https://images.unsplash.com/photo-1563212891-b3b0d2685609?q=80&w=2574&auto=format&fit=crop", alt: "Gallery" },
        ]);
      });
  }, []);

  return (
    <section className="py-24 bg-sorgum-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-4 block">Momen Lapangan</span>
            <h2 className="font-serif text-5xl text-sorgum-primary">Galeri Kehidupan Desa</h2>
          </div>
          <button 
            onClick={() => setActiveSection('galeri')}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-sorgum-primary/50 hover:text-sorgum-primary transition-colors cursor-pointer"
          >
            Lihat Full Galeri <ChevronRight size={14} />
          </button>
        </div>
        
        {images.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-sorgum-primary" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                whileHover={{ scale: 0.98 }}
                className={`relative rounded-[40px] overflow-hidden bg-neutral-300 shadow-xl ${i % 3 === 1 ? 'md:translate-y-12' : ''}`}
              >
                <img src={img.url} className="w-full h-full object-cover aspect-[4/5] hover:scale-110 transition-transform duration-700" alt={img.alt} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const SectionNews = () => {
  const [news, setNews] = useState<{id: number, date: string, category: string, title: string, desc: string, img: string}[]>([]);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (data.success) setNews(data.data);
      })
      .catch(err => {
        console.error('Failed to fetch news:', err);
        // Fallback
        setNews([
          { id: 1, date: "12 Mei 2026", category: "Pemberdayaan", title: "Panen Raya Sorgum", desc: "Kolaborasi petani lokal berhasil.", img: "https://images.unsplash.com/photo-1615810757271-92fd5896a25b?q=80&w=2574&auto=format&fit=crop" },
        ]);
      });
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-4 block">Kabar Terbaru</span>
          <h2 className="font-serif text-5xl text-sorgum-primary italic">Berita Sorgum Indonesia</h2>
        </div>

        {news.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-sorgum-primary" size={32} />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-video bg-neutral-100 rounded-[30px] overflow-hidden mb-6">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="News" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-sorgum-accent">{item.category}</span>
                  <span className="w-1 h-1 bg-neutral-200 rounded-full"></span>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400">{item.date}</span>
                </div>
                <h3 className="font-serif text-2xl text-sorgum-primary mb-3 group-hover:text-sorgum-accent transition-colors leading-tight">{item.title}</h3>
                <p className="text-sm text-neutral-500 font-light line-clamp-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const SectionContact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setStatusMessage(data.message);
        setFormData({ name: '', email: '', message: '' });
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setStatusMessage(data.message);
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      setStatus('error');
      setStatusMessage('Gagal mengirim pesan. Periksa koneksi Anda.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="py-24 bg-sorgum-primary text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-sorgum-accent mb-6 block font-bold">Terhubung</span>
            <h2 className="font-serif text-6xl mb-10 italic">Mari Berkolaborasi Untuk Desa</h2>
            <p className="text-white/60 mb-12 max-w-md font-light leading-relaxed">
              Apakah Anda seorang petani yang ingin bergabung, investor yang tertarik pada dampak sosial, atau konsumen yang peduli kesehatan? Ruang ini terbuka lebar.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><MapPin size={18} /></div>
                <span className="text-sm text-white/80">Kabupaten Bantul, Yogyakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><Phone size={18} /></div>
                <span className="text-sm text-white/80">+62 821-2345-6789</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><Mail size={18} /></div>
                <span className="text-sm text-white/80">halo@kampungsorgum.com</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[50px] shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-neutral-800 text-sm focus:ring-2 focus:ring-sorgum-accent" 
                    placeholder="Masukkan nama Anda"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-2">Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-neutral-800 text-sm focus:ring-2 focus:ring-sorgum-accent" 
                    placeholder="email@contoh.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-2">Pesan Anda</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-neutral-800 text-sm focus:ring-2 focus:ring-sorgum-accent" 
                  placeholder="Tuliskan pesan Anda..."
                  required
                />
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl"
                  >
                    <CheckCircle size={20} className="text-green-600 shrink-0" />
                    <span className="text-sm text-green-800">{statusMessage}</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl"
                  >
                    <AlertCircle size={20} className="text-red-600 shrink-0" />
                    <span className="text-sm text-red-800">{statusMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-sorgum-primary text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-neutral-800 transition-colors shadow-lg shadow-sorgum-primary/10 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  'Kirim Pesan Sekarang'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionPartnerForm = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({ name: '', business: '', type: 'Petani', location: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', business: '', type: 'Petani', location: '', message: '' });
    }, 2000);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pt-32 pb-20 bg-white"
    >
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sorgum-primary/50 hover:text-sorgum-primary mb-12 transition-colors group"
        >
          <ArrowRight className="rotate-180 group-hover:-translate-x-2 transition-transform" size={18} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Kembali ke Beranda</span>
        </button>

        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-4 block">Formulir Kemitraan</span>
          <h2 className="font-serif text-6xl text-sorgum-primary italic mb-6">Wujudkan Kedaulatan Pangan Bersama Kami</h2>
          <p className="text-neutral-500 font-light max-w-2xl leading-relaxed">
            Bergabunglah dalam ekosistem Kampung Sorgum untuk menciptakan dampak ekonomi dan sosial yang berkelanjutan bagi masyarakat pedesaan Indonesia.
          </p>
        </div>

        <div className="bg-sorgum-light/50 p-12 rounded-[50px] border border-sorgum-primary/5 shadow-sm">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-sorgum-accent" 
                  placeholder="Nama Penanggung Jawab"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-2">Nama Bisnis / Instansi</label>
                <input 
                  type="text" 
                  value={formData.business}
                  onChange={(e) => setFormData(p => ({ ...p, business: e.target.value }))}
                  className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-sorgum-accent" 
                  placeholder="KWT Melati / CV / PT / Kelompok Tani"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-2">Jenis Kemitraan</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData(p => ({ ...p, type: e.target.value }))}
                  className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-sorgum-accent appearance-none"
                >
                  <option>Petani / Kelompok Tani</option>
                  <option>Investor / Pendanaan</option>
                  <option>Distributor / Retail</option>
                  <option>Edukasi / Riset</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-2">Lokasi Operasional</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))}
                  className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-sorgum-accent" 
                  placeholder="Kota / Kabupaten"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-2">Visi / Rencana Kemitraan</label>
              <textarea 
                rows={4} 
                value={formData.message}
                onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-sorgum-accent" 
                placeholder="Ceritakan singkat bagaimana Anda ingin berkolaborasi..."
                required
              />
            </div>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-green-50 text-green-700 rounded-2xl text-sm flex items-center gap-3">
                  <CheckCircle size={18} /> Permohonan berhasil dikirim. Tim kami akan segera menghubungi Anda.
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-sorgum-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-neutral-800 transition-all shadow-xl shadow-sorgum-primary/10 disabled:opacity-50"
            >
              {status === 'loading' ? 'Memproses...' : 'Kirim Permohonan Kemitraan'}
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [currentPage, setCurrentPage] = useState('main'); // 'main' or 'partner'

  // Scroll to section logic
  useEffect(() => {
    const element = document.getElementById(activeSection);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-sorgum-light text-neutral-800 font-sans selection:bg-sorgum-accent selection:text-white">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} setCurrentPage={setCurrentPage} />
      
      <main>
        {currentPage === 'main' ? (
          <>
            <div id="beranda"><SectionHome setActiveSection={setActiveSection} /></div>
            <div id="profil"><SectionProfile /></div>
            <div id="galeri"><SectionGallery setActiveSection={setActiveSection} /></div>
            <div id="berita"><SectionNews /></div>
            <div id="kontak"><SectionContact /></div>
          </>
        ) : (
          <SectionPartnerForm onBack={() => setCurrentPage('main')} />
        )}
      </main>

      <footer className="py-12 bg-sorgum-light border-t border-sorgum-primary/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Sprout className="text-sorgum-primary" size={24} />
            <span className="font-serif text-xl font-bold text-sorgum-primary">Kampung Sorgum</span>
          </div>
          <div className="flex gap-8">
            <Instagram size={20} className="text-sorgum-primary/40 hover:text-sorgum-primary transition-colors cursor-pointer" onClick={() => window.open('https://instagram.com', '_blank')} />
            <Facebook size={20} className="text-sorgum-primary/40 hover:text-sorgum-primary transition-colors cursor-pointer" onClick={() => window.open('https://facebook.com', '_blank')} />
            <Mail size={20} className="text-sorgum-primary/40 hover:text-sorgum-primary transition-colors cursor-pointer" onClick={() => setActiveSection('kontak')} />
          </div>
          <p className="text-[9px] uppercase font-bold tracking-widest text-neutral-400">
            © 2026 Inisiatif Kampung Sorgum • Bagian Dari Kolabfit Indonesia
          </p>
        </div>
      </footer>
    </div>
  );
}
