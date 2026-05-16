import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PartnerForm = ({ pageData, waNumber }: { pageData?: any, waNumber?: string }) => {

  const [formData, setFormData] = useState({ name: '', business: '', type: 'Petani', location: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const heroData = pageData?.content?.find((c: any) => c.type === 'hero')?.data;
  const tabsData = pageData?.content?.find((c: any) => c.type === 'profile-tabs')?.data?.tabs || [];

  const getLabel = (index: number, fallback: string) => tabsData[index]?.label || fallback;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = `Halo Kampung Sorgum, saya ingin mendaftar sebagai mitra.\n\n` +
      `*Nama:* ${formData.name}\n` +
      `*Instansi/Bisnis:* ${formData.business}\n` +
      `*Tipe Kemitraan:* ${formData.type}\n` +
      `*Lokasi:* ${formData.location}\n\n` +
      `*Pesan/Rencana:* ${formData.message}`;
      
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', business: '', type: 'Petani', location: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 800);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pt-32 pb-20 bg-white"
    >
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sorgum-primary/50 hover:text-sorgum-primary mb-12 transition-colors group"
        >
          <ArrowRight className="rotate-180 group-hover:-translate-x-2 transition-transform" size={18} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Kembali</span>
        </button>

        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-4 block">Formulir Kemitraan</span>
          <h2 className="font-serif text-6xl text-sorgum-primary italic mb-6">{heroData?.headline || "Wujudkan Kedaulatan Pangan Bersama Kami"}</h2>
          <p className="text-neutral-500 font-light max-w-2xl leading-relaxed">
            {heroData?.sub_headline || "Bergabunglah dalam ekosistem Kampung Sorgum untuk menciptakan dampak ekonomi dan sosial yang berkelanjutan bagi masyarakat pedesaan Indonesia."}
          </p>
        </div>

        <div className="bg-sorgum-light/50 p-12 rounded-[50px] border border-sorgum-primary/5 shadow-sm">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-2">{getLabel(0, "Nama Lengkap")}</label>
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
                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-2">{getLabel(1, "Nama Bisnis / Instansi")}</label>
                <input 
                  type="text" 
                  value={formData.business}
                  onChange={(e) => setFormData(p => ({ ...p, business: e.target.value }))}
                  className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-sorgum-accent" 
                  placeholder="Nama entitas bisnis/kelompok"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-2">{getLabel(2, "Jenis Kemitraan")}</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData(p => ({ ...p, type: e.target.value }))}
                  className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-sorgum-accent"
                >
                  <option>Petani Pembudidaya</option>
                  <option>Distributor/Retailer</option>
                  <option>Investor/CSR</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-2">{getLabel(3, "Lokasi Operasional")}</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))}
                  className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-sorgum-accent" 
                  placeholder="Provinsi, Kota/Kabupaten"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-2">{getLabel(4, "Visi / Rencana Kemitraan")}</label>
              <textarea 
                rows={4} 
                value={formData.message}
                onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                className="w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-sorgum-accent" 
                placeholder="Ceritakan singkat rencana kolaborasi Anda dengan Kampung Sorgum..."
                required
              />
            </div>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-green-50 text-green-700 rounded-2xl text-sm flex items-center gap-3">
                  <CheckCircle size={18} /> Permohonan berhasil dikirim. Mengalihkan ke WhatsApp...
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

export default PartnerForm;
