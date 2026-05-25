import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Contact = ({ pageData, waNumber }: { pageData?: any, waNumber?: string }) => {

  const [formData, setFormData] = useState({ name: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const heroData = pageData?.content?.find((c: any) => c.type === 'hero')?.data;
  const contactsData = pageData?.content?.find((c: any) => c.type === 'contacts')?.data;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = `Halo Kampung Sorgum, saya ${formData.name}.\n\n${formData.message}`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    
    window.open(waUrl, '_blank');
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setStatusMessage('Dialihkan ke WhatsApp...');
      setFormData({ name: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 800);
  };

  return (
    <section className="pt-10 pb-24 bg-sorgum-primary text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-sorgum-accent mb-6 block font-bold">Terhubung</span>
            <h2 className="font-serif text-6xl mb-10 italic">{heroData?.headline || "Mari Berkolaborasi Untuk Desa"}</h2>
            <p className="text-white/60 mb-12 max-w-md font-light leading-relaxed">
              {heroData?.sub_headline || "Apakah Anda seorang petani yang ingin bergabung, investor yang tertarik pada dampak sosial, atau konsumen yang peduli kesehatan? Ruang ini terbuka lebar."}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><MapPin size={18} /></div>
                <span className="text-sm text-white/80">{contactsData?.addresses?.[0] || "Kabupaten Bantul, Yogyakarta, Indonesia"}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><Phone size={18} /></div>
                <span className="text-sm text-white/80">{contactsData?.phone_numbers?.[0] || "+62 821-2345-6789"}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><Mail size={18} /></div>
                <span className="text-sm text-white/80">{contactsData?.emails?.[0] || "halo@kampungsorgum.com"}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[50px] shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-2xl text-sm"
                  >
                    {statusMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-sorgum-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-neutral-800 transition-all shadow-xl shadow-sorgum-primary/10 disabled:opacity-50"
              >
                {status === 'loading' ? 'Memproses...' : 'Kirim Pesan'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
