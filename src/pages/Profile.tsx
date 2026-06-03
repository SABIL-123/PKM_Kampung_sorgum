import React, { useState, useEffect } from 'react';
import { Target, Sprout } from 'lucide-react';

const Profile = ({ pageData }: { pageData?: any }) => {
  const [stats, setStats] = useState<{desaMitra: string, petaniTerdaftar: string, varianProduk: string, produksiTahunan: string} | null>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) setStats(data.data);
      })
      .catch(err => {
        console.error('Failed to fetch stats:', err);
        setStats({ desaMitra: '15+', petaniTerdaftar: '500+', varianProduk: '20+', produksiTahunan: '100t+' });
      });
  }, []);


  const heroData = pageData?.content?.find((c: any) => c.type === 'hero')?.data;
  const visiData = pageData?.content?.find((c: any) => c.type === 'features' && c.data.title?.toLowerCase().includes('visi'))?.data;
  const misiData = pageData?.content?.find((c: any) => c.type === 'features' && c.data.title?.toLowerCase().includes('misi'))?.data;
  const richTextData = pageData?.content?.find((c: any) => c.type === 'rich-text')?.data;
  const galleryData = pageData?.content?.find((c: any) => c.type === 'gallery')?.data;

  // Remove HTML tags for simple rendering if needed, or use dangerouslySetInnerHTML
  const cleanRichText = richTextData?.content?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');

  return (
    <section className="pt-10 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-4 block">Profil Kami</span>
          <h2 className="font-serif text-5xl text-sorgum-primary italic">{heroData?.headline || "Misi Di Balik Setiap Bulir"}</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
          <div className="space-y-8">
            <h3 className="font-serif text-4xl text-sorgum-primary">{heroData?.sub_headline || "Sejarah & Visi"}</h3>
            <p className="text-neutral-500 leading-relaxed font-light">
              {cleanRichText || "Berawal dari kepedulian terhadap lahan marginal di pesisir dan wilayah kering, Kampung Sorgum lahir sebagai jembatan antara teknologi pertanian modern dengan kearifan lokal petani Nusantara."}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-sorgum-light rounded-3xl border border-sorgum-primary/5">
                <Target className="text-sorgum-accent mb-4" />
                <h4 className="font-bold text-xs uppercase mb-2">{visiData?.title || "Visi"}</h4>
                <p className="text-xs text-neutral-500 text-justify">{visiData?.subtitle || "Menjadi pusat inovasi sorghum terkemuka di Asia Tenggara."}</p>
              </div>
              <div className="p-6 bg-sorgum-light rounded-3xl border border-sorgum-primary/5">
                <Sprout className="text-sorgum-accent mb-4" />
                <h4 className="font-bold text-xs uppercase mb-2">{misiData?.title || "Misi"}</h4>
                <p className="text-xs text-neutral-500 text-justify">{misiData?.subtitle || "Memberdayakan petani melalui edukasi dan akses pasar."}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={galleryData?.images?.[0]?.url || "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2670&auto=format&fit=crop"} referrerPolicy="no-referrer" className="rounded-3xl h-64 w-full object-cover shadow-lg" alt="Team" />
            <img src={galleryData?.images?.[1]?.url || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2670&auto=format&fit=crop"} referrerPolicy="no-referrer" className="translate-y-12 rounded-3xl h-64 w-full object-cover shadow-lg" alt="Field" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Desa Mitra', value: stats?.desaMitra || '-' },
            { label: 'Petani Terdaftar', value: stats?.petaniTerdaftar || '-' },
            { label: 'Varian Produk', value: stats?.varianProduk || '-' },
            { label: 'Produksi Tahunan', value: stats?.produksiTahunan || '-' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-serif text-5xl text-sorgum-accent mb-2">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
