import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, CloudSun, Sparkles, Shield, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = ({ pageData, produkPageData }: { pageData?: any, produkPageData?: any }) => {
  const navigate = useNavigate();

  const heroData = pageData?.content?.find((c: any) => c.type === 'hero')?.data;

  // Dynamic features data for benefits
  const cmsBenefitsBlock = pageData?.content?.find((c: any) => 
    c.type === 'features' && (
      c.data.title?.toLowerCase()?.includes('manfaat') || 
      c.data.title?.toLowerCase()?.includes('keuntungan') ||
      c.data.subtitle?.toLowerCase()?.includes('manfaat') || 
      c.data.subtitle?.toLowerCase()?.includes('keuntungan')
    )
  ) || pageData?.content?.find((c: any) => c.type === 'features');

  const cmsBenefits = cmsBenefitsBlock?.data;
  const cmsBenefitsId = cmsBenefitsBlock?.id;

  // Check if there is another features block that supplies the main section image
  const imageSupplierBlock = pageData?.content?.find((c: any) => 
    c.type === 'features' && 
    c.id !== cmsBenefitsId &&
    c.data?.items?.[0]?.icon_url
  );

  // Dynamic partners block
  const cmsPartnersBlock = pageData?.content?.find((c: any) => 
    c.type === 'activity-slider' || 
    c.type === 'activity_slider' ||
    (c.type === 'gallery' || c.type === 'features') && (
      c.data.title?.toLowerCase()?.includes('mitra') ||
      c.data.title?.toLowerCase()?.includes('partner') ||
      c.data.subtitle?.toLowerCase()?.includes('mitra') ||
      c.data.subtitle?.toLowerCase()?.includes('partner')
    )
  );

  const defaultBenefits = [
    {
      title: "Tahan Kondisi Kering",
      description: "Sorgum adalah tanaman yang tahan terhadap kekeringan, sehingga cocok untuk ditanam di daerah dengan curah hujan yang rendah. Ini membuatnya menjadi alternatif yang baik untuk tanaman lain seperti jagung yang membutuhkan lebih banyak air.",
      icon: "CloudSun"
    },
    {
      title: "Kaya Nutrisi",
      description: "Sorgum merupakan sumber karbohidrat, serat, dan protein yang baik. Selain itu, sorgum juga mengandung vitamin B, magnesium, kalium, dan antioksidan yang bermanfaat bagi kesehatan, termasuk menjaga kesehatan pencernaan dan mengurangi risiko penyakit kronis.",
      icon: "Sparkles"
    },
    {
      title: "Bebas Gluten",
      description: "Sorgum dapat menjadi sumber karbohidrat yang bebas gluten, sehingga menjadi alternatif yang aman dan sehat untuk orang yang memiliki sensitivitas atau intoleransi terhadap gluten, seperti penderita penyakit celiac.",
      icon: "Shield"
    },
    {
      title: "Diversifikasi Pertanian & Sumber Energi",
      description: "Sorgum dapat digunakan untuk berbagai tujuan, baik sebagai bahan pangan, pakan ternak, atau bahan baku bioenergi (biofuel). Hal ini menjadikannya tanaman yang fleksibel and bermanfaat untuk diversifikasi pertanian serta mendukung produksi energi terbarukan.",
      icon: "Leaf"
    }
  ];

  const benefitsList = (cmsBenefits?.feature_items && cmsBenefits.feature_items.length > 0)
    ? cmsBenefits.feature_items
    : (cmsBenefits?.items && cmsBenefits.items.length > 0)
      ? cmsBenefits.items
      : defaultBenefits;

  const benefitsImage = imageSupplierBlock?.data?.items?.[0]?.icon_url 
    || cmsBenefits?.background_image 
    || cmsBenefits?.image 
    || cmsBenefits?.media 
    || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2672&auto=format&fit=crop";

  const getBenefitIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'cloudsun':
      case 'tahan kondisi kering':
        return <CloudSun className="w-6 h-6 text-sorgum-accent" />;
      case 'sparkles':
      case 'kaya nutrisi':
        return <Sparkles className="w-6 h-6 text-sorgum-accent" />;
      case 'shield':
      case 'bebas gluten':
        return <Shield className="w-6 h-6 text-sorgum-accent" />;
      case 'leaf':
      case 'diversifikasi pertanian & sumber energi':
        return <Leaf className="w-6 h-6 text-sorgum-accent" />;
      default:
        return <Sparkles className="w-6 h-6 text-sorgum-accent" />;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-6 block">Kedaulatan Pangan Lokal</span>
            <h1 className="font-serif text-7xl md:text-8xl text-sorgum-primary leading-[0.9] mb-8 tracking-tighter">
              {heroData?.headline?.split('\n').map((line: string, i: number) => (
                <React.Fragment key={i}>
                  {line} {i === 0 && <br />}
                </React.Fragment>
              )) || <>Menanam Masa <br /> <span className="italic">Depan</span> Desa.</>}
            </h1>
            <p className="text-lg text-neutral-600 mb-10 max-w-lg leading-relaxed font-light">
              {heroData?.sub_headline || "Kampung Sorgum adalah inisiatif revolusioner untuk mengembalikan kejayaan sorghum sebagai sumber pangan sehat, tahan iklim, dan berdaya ekonomi tinggi bagi masyarakat pedesaan Indonesia."}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/profil')}
                className="bg-sorgum-primary text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-all shadow-xl shadow-sorgum-primary/20"
              >
                Mulai Perjalanan
              </button>
              <button 
                onClick={() => navigate('/gabung-mitra')}
                className="flex items-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold text-sorgum-primary hover:bg-sorgum-primary/5 transition-all"
              >
                Gabung Mitra <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-white dark:bg-[#172530] p-4 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-sorgum-primary/5 dark:border-white/5 w-full max-w-xl mx-auto"
          >
            {/* Top Right Wheat Stalk Ornament */}
            <div className="absolute -top-6 -right-6 w-16 h-16 text-sorgum-accent pointer-events-none transform rotate-[25deg] select-none z-20 drop-shadow-sm">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M20 80 C 40 70, 60 40, 80 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M35 63 C 33 60, 31 52, 36 49 C 41 46, 42 56, 38 60 Z" fill="currentColor" />
                <path d="M36 49 C 32 43, 26 38, 25 38" stroke="currentColor" strokeWidth="1.5" />
                <path d="M43 65 C 47 62, 53 58, 52 52 C 51 46, 44 49, 40 56 Z" fill="currentColor" />
                <path d="M52 52 C 58 48, 62 42, 63 42" stroke="currentColor" strokeWidth="1.5" />
                <path d="M47 49 C 44 46, 41 38, 47 36 C 52 34, 53 43, 49 47 Z" fill="currentColor" />
                <path d="M47 36 C 43 30, 37 25, 36 25" stroke="currentColor" strokeWidth="1.5" />
                <path d="M54 51 C 58 48, 63 43, 62 37 C 61 31, 55 35, 51 42 Z" fill="currentColor" />
                <path d="M62 37 C 68 33, 72 27, 73 27" stroke="currentColor" strokeWidth="1.5" />
                <path d="M59 36 C 56 33, 53 25, 59 23 C 64 21, 65 30, 61 34 Z" fill="currentColor" />
                <path d="M59 23 C 55 17, 49 12, 48 12" stroke="currentColor" strokeWidth="1.5" />
                <path d="M65 37 C 69 34, 73 29, 72 23 C 71 17, 65 21, 62 28 Z" fill="currentColor" />
                <path d="M72 23 C 78 19, 82 13, 83 13" stroke="currentColor" strokeWidth="1.5" />
                <path d="M71 23 C 71 19, 69 14, 74 12 C 78 10, 77 17, 74 20 Z" fill="currentColor" />
                <path d="M74 12 C 76 6, 76 2, 76 2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Bottom Left Wheat Stalk Ornament */}
            <div className="absolute -bottom-6 -left-6 w-16 h-16 text-sorgum-accent pointer-events-none transform -rotate-[155deg] select-none z-20 drop-shadow-sm">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M20 80 C 40 70, 60 40, 80 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M35 63 C 33 60, 31 52, 36 49 C 41 46, 42 56, 38 60 Z" fill="currentColor" />
                <path d="M36 49 C 32 43, 26 38, 25 38" stroke="currentColor" strokeWidth="1.5" />
                <path d="M43 65 C 47 62, 53 58, 52 52 C 51 46, 44 49, 40 56 Z" fill="currentColor" />
                <path d="M52 52 C 58 48, 62 42, 63 42" stroke="currentColor" strokeWidth="1.5" />
                <path d="M47 49 C 44 46, 41 38, 47 36 C 52 34, 53 43, 49 47 Z" fill="currentColor" />
                <path d="M47 36 C 43 30, 37 25, 36 25" stroke="currentColor" strokeWidth="1.5" />
                <path d="M54 51 C 58 48, 63 43, 62 37 C 61 31, 55 35, 51 42 Z" fill="currentColor" />
                <path d="M62 37 C 68 33, 72 27, 73 27" stroke="currentColor" strokeWidth="1.5" />
                <path d="M59 36 C 56 33, 53 25, 59 23 C 64 21, 65 30, 61 34 Z" fill="currentColor" />
                <path d="M59 23 C 55 17, 49 12, 48 12" stroke="currentColor" strokeWidth="1.5" />
                <path d="M65 37 C 69 34, 73 29, 72 23 C 71 17, 65 21, 62 28 Z" fill="currentColor" />
                <path d="M72 23 C 78 19, 82 13, 83 13" stroke="currentColor" strokeWidth="1.5" />
                <path d="M71 23 C 71 19, 69 14, 74 12 C 78 10, 77 17, 74 20 Z" fill="currentColor" />
                <path d="M74 12 C 76 6, 76 2, 76 2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Aesthetic minimalist inner border frame */}
            <div className="border border-sorgum-accent/20 p-2 rounded-[32px]">
              <div className="rounded-[24px] overflow-hidden aspect-[4/3] w-full relative bg-neutral-100 dark:bg-[#121E26]">
                <img 
                  src={heroData?.background_image || "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=2672&auto=format&fit=crop"} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover animate-fade-in"
                  alt="Sorghum"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-28 bg-[#FBF9F4] dark:bg-[#FBF9F4] border-t border-sorgum-primary/5 dark:border-sorgum-primary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Benefits Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10 relative"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-4 block">Nilai & Keunggulan</span>
              <h2 className="font-serif text-5xl md:text-6xl text-sorgum-primary dark:text-sorgum-primary leading-tight">
                {cmsBenefits?.title || "Manfaat dan Keuntungan Sorgum:"}
              </h2>
              {cmsBenefits?.subtitle && (
                <div className="text-neutral-600 dark:text-neutral-600 text-sm font-light mt-3 max-w-lg">
                  {cmsBenefits.subtitle}
                </div>
              )}
            </div>

            <div className="space-y-8 pl-1 relative">
              {/* Vertical Connector Line (Mathematically perfect center-to-center) */}
              <div className="absolute left-[1.75rem] top-7 bottom-7 w-[1.5px] bg-sorgum-accent/30 pointer-events-none" />

              {benefitsList.map((item: any, i: number) => (
                <div key={i} className="flex gap-6 items-start relative group">
                  <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-white border border-sorgum-accent/15 dark:border-sorgum-accent/15 text-sorgum-accent shadow-sm group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                    {item.icon_image?.url || item.icon?.url || item.image?.url ? (
                      <img 
                        src={item.icon_image?.url || item.icon?.url || item.image?.url} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover p-3"
                        alt={item.title}
                      />
                    ) : (
                      getBenefitIcon(item.icon || item.title)
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-sorgum-primary dark:text-sorgum-primary group-hover:text-sorgum-accent transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-neutral-600 dark:text-neutral-600 text-sm mt-2 leading-relaxed font-light">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Aesthetic Double-Framed Wheat Harvest Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-white dark:bg-white p-4 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-none border border-sorgum-primary/5 dark:border-sorgum-primary/5 w-full max-w-md mx-auto"
          >
            {/* Top Right Wheat Stalk Ornament */}
            <div className="absolute -top-6 -right-6 w-16 h-16 text-sorgum-accent pointer-events-none transform rotate-[25deg] select-none z-20 drop-shadow-sm">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M20 80 C 40 70, 60 40, 80 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M35 63 C 33 60, 31 52, 36 49 C 41 46, 42 56, 38 60 Z" fill="currentColor" />
                <path d="M36 49 C 32 43, 26 38, 25 38" stroke="currentColor" strokeWidth="1.5" />
                <path d="M43 65 C 47 62, 53 58, 52 52 C 51 46, 44 49, 40 56 Z" fill="currentColor" />
                <path d="M52 52 C 58 48, 62 42, 63 42" stroke="currentColor" strokeWidth="1.5" />
                <path d="M47 49 C 44 46, 41 38, 47 36 C 52 34, 53 43, 49 47 Z" fill="currentColor" />
                <path d="M47 36 C 43 30, 37 25, 36 25" stroke="currentColor" strokeWidth="1.5" />
                <path d="M54 51 C 58 48, 63 43, 62 37 C 61 31, 55 35, 51 42 Z" fill="currentColor" />
                <path d="M62 37 C 68 33, 72 27, 73 27" stroke="currentColor" strokeWidth="1.5" />
                <path d="M59 36 C 56 33, 53 25, 59 23 C 64 21, 65 30, 61 34 Z" fill="currentColor" />
                <path d="M59 23 C 55 17, 49 12, 48 12" stroke="currentColor" strokeWidth="1.5" />
                <path d="M65 37 C 69 34, 73 29, 72 23 C 71 17, 65 21, 62 28 Z" fill="currentColor" />
                <path d="M72 23 C 78 19, 82 13, 83 13" stroke="currentColor" strokeWidth="1.5" />
                <path d="M71 23 C 71 19, 69 14, 74 12 C 78 10, 77 17, 74 20 Z" fill="currentColor" />
                <path d="M74 12 C 76 6, 76 2, 76 2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Bottom Left Wheat Stalk Ornament */}
            <div className="absolute -bottom-6 -left-6 w-16 h-16 text-sorgum-accent pointer-events-none transform -rotate-[155deg] select-none z-20 drop-shadow-sm">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M20 80 C 40 70, 60 40, 80 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M35 63 C 33 60, 31 52, 36 49 C 41 46, 42 56, 38 60 Z" fill="currentColor" />
                <path d="M36 49 C 32 43, 26 38, 25 38" stroke="currentColor" strokeWidth="1.5" />
                <path d="M43 65 C 47 62, 53 58, 52 52 C 51 46, 44 49, 40 56 Z" fill="currentColor" />
                <path d="M52 52 C 58 48, 62 42, 63 42" stroke="currentColor" strokeWidth="1.5" />
                <path d="M47 49 C 44 46, 41 38, 47 36 C 52 34, 53 43, 49 47 Z" fill="currentColor" />
                <path d="M47 36 C 43 30, 37 25, 36 25" stroke="currentColor" strokeWidth="1.5" />
                <path d="M54 51 C 58 48, 63 43, 62 37 C 61 31, 55 35, 51 42 Z" fill="currentColor" />
                <path d="M62 37 C 68 33, 72 27, 73 27" stroke="currentColor" strokeWidth="1.5" />
                <path d="M59 36 C 56 33, 53 25, 59 23 C 64 21, 65 30, 61 34 Z" fill="currentColor" />
                <path d="M59 23 C 55 17, 49 12, 48 12" stroke="currentColor" strokeWidth="1.5" />
                <path d="M65 37 C 69 34, 73 29, 72 23 C 71 17, 65 21, 62 28 Z" fill="currentColor" />
                <path d="M72 23 C 78 19, 82 13, 83 13" stroke="currentColor" strokeWidth="1.5" />
                <path d="M71 23 C 71 19, 69 14, 74 12 C 78 10, 77 17, 74 20 Z" fill="currentColor" />
                <path d="M74 12 C 76 6, 76 2, 76 2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Aesthetic minimalist inner border frame */}
            <div className="border border-sorgum-accent/20 p-2 rounded-[32px]">
              <div className="rounded-[24px] overflow-hidden aspect-[3/4] w-full relative bg-neutral-100 dark:bg-neutral-100">
                <img 
                  src={benefitsImage} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover animate-fade-in"
                  alt="Sorghum Benefits"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-white dark:bg-white relative overflow-hidden border-t border-sorgum-primary/5 dark:border-sorgum-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-4 block">PRODUK TERBARU!</span>
            <h2 className="font-serif text-5xl md:text-6xl text-sorgum-primary dark:text-sorgum-primary leading-tight mb-4">
              Produk Sorgum
            </h2>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm max-w-xl mx-auto font-light leading-relaxed">
              Temukan berbagai produk olahan sorgum yang sehat, lezat, dan ramah lingkungan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {(() => {
              // Try to find product items from the 'produk' page CMS data
              const cmsProductsBlock = produkPageData?.content?.find((c: any) => 
                c.type === 'gallery' || c.type === 'features'
              );
              const cmsProducts = cmsProductsBlock?.data?.items || cmsProductsBlock?.data?.images;
              
              const homeProductsList = cmsProducts && cmsProducts.length > 0 
                ? cmsProducts.slice(0, 3).map((item: any) => {
                    const rawTitle = item.image_title || item.title || item.category || "Produk Sorgum";
                    const title = rawTitle.replace(/^\/+/, '').trim();
                    
                    const descLines = (item.description || "")
                      .split('\n')
                      .map((line: string) => line.replace(/^[•\-\*\s]+/, '').trim())
                      .filter((line: string) => line.length > 0);

                    // Tag: Kategori (category) if distinct from title, otherwise Caption, otherwise default
                    const rawTag = (item.category && item.category !== title)
                      ? item.category
                      : item.caption || "Produk Pilihan";
                    const tag = rawTag.replace(/^\/+/, '').trim();

                    // Description: Use caption (e.g. "Pemanis Alami Rendah Kalori") or first description line
                    const rawDesc = item.caption || (descLines.length > 0 ? descLines[0] : "Produk olahan sorgum pilihan berkualitas tinggi.");
                    const desc = rawDesc.replace(/^\/+/, '').trim();

                    // Price: mapped to Alt Text input (item.alt_text) or item.price
                    const rawPrice = item.alt_text || item.price || "Hubungi Kami";
                    const price = rawPrice.replace(/^\/+/, '').trim();

                    return {
                      title,
                      desc,
                      price,
                      tag,
                      img: item.url || item.icon_url || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop"
                    };
                  })
                : [
                    {
                      title: "Beras Sorgum Pilihan",
                      desc: "Butiran sorgum kupas utuh premium kaya serat pangan, fosfor, and zat besi.",
                      price: "Rp 20.000 / 500g",
                      tag: "Serat Tinggi",
                      img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop"
                    },
                    {
                      title: "Tepung Sorgum Premium",
                      desc: "Tepung sorgum halus bebas gluten (gluten-free) kualitas ekspor serbaguna.",
                      price: "Rp 25.000 / 500g",
                      tag: "Bebas Gluten",
                      img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop"
                    },
                    {
                      title: "Nektar Gula Sorgum",
                      desc: "Sirup pemanis cair alami dari batang sorgum manis pilihan rendah kalori.",
                      price: "Rp 35.000 / 250ml",
                      tag: "Rendah Kalori",
                      img: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=600&auto=format&fit=crop"
                    }
                  ];

              return homeProductsList.map((prod, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-sorgum-light dark:bg-sorgum-light rounded-[28px] overflow-hidden border border-sorgum-primary/5 dark:border-sorgum-primary/5 shadow-md flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-100">
                    <img src={prod.img} referrerPolicy="no-referrer" alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-white/95 dark:bg-white/95 border border-sorgum-primary/10 dark:border-sorgum-primary/10 px-3 py-1 rounded-full text-[9px] font-bold text-sorgum-primary dark:text-sorgum-primary uppercase tracking-widest">
                      {prod.tag}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-sorgum-accent text-[#121E26] px-4 py-1.5 rounded-full font-bold text-xs shadow-md">
                      {prod.price}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-sorgum-primary dark:text-sorgum-primary mb-2">{prod.title}</h3>
                      <p className="text-neutral-500 dark:text-neutral-500 text-xs font-light leading-relaxed mb-4">{prod.desc}</p>
                    </div>
                    <button 
                      onClick={() => navigate('/produk')}
                      className="w-full border border-sorgum-primary/15 dark:border-sorgum-primary/15 hover:border-sorgum-accent hover:bg-sorgum-accent hover:text-[#121E26] py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer text-center text-sorgum-primary dark:text-sorgum-primary"
                    >
                      Detail Produk
                    </button>
                  </div>
                </motion.div>
              ));
            })()}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/produk')}
              className="bg-sorgum-primary hover:bg-sorgum-accent text-white hover:text-[#121E26] px-8 py-3.5 rounded-full text-[10px] uppercase tracking-widest font-bold hover:scale-105 transition-all shadow-lg shadow-sorgum-primary/15 dark:shadow-sorgum-primary/15 cursor-pointer"
            >
              Lihat Seluruh Produk
            </button>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-20 bg-sorgum-light dark:bg-sorgum-light relative overflow-hidden border-t border-sorgum-primary/5 dark:border-sorgum-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-sorgum-primary dark:text-sorgum-primary leading-tight mb-2">
              {cmsPartnersBlock?.data?.title || "Mitra Kami"}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm font-light">
              {cmsPartnersBlock?.data?.subtitle || "Kampung Sorgum didukung oleh:"}
            </p>
          </div>

          {/* Scrolling logo track */}
          <div className="relative w-full overflow-hidden py-4">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex gap-12 w-max items-center"
            >
              {(() => {
                const cmsPartners = cmsPartnersBlock?.data?.activities ||
                                    cmsPartnersBlock?.data?.activity_cards || 
                                    cmsPartnersBlock?.data?.cards || 
                                    cmsPartnersBlock?.data?.items || 
                                    cmsPartnersBlock?.data?.images || 
                                    cmsPartnersBlock?.data?.activityCards;
                
                const defaultPartners = [
                  { name: "Koperasi Tani Desa" },
                  { name: "Institut Pertanian Bogor" },
                  { name: "Dinas Pertanian Daerah" },
                  { name: "Lembaga Pangan Mandiri" }
                ];
                
                const partnersRaw = cmsPartners && cmsPartners.length > 0
                  ? cmsPartners.map((item: any) => ({
                      name: item.title || item.card_title || item.cardTitle || item.image_title || item.caption || "Mitra",
                      img: item.url || item.image_url || item.imageUrl || item.image || item.icon_url
                    }))
                  : defaultPartners;
                  
                const partnersList = [...partnersRaw, ...partnersRaw, ...partnersRaw];

                return partnersList.map((partner, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white dark:bg-white border border-sorgum-primary/5 dark:border-sorgum-primary/5 rounded-2xl flex items-center justify-center w-[200px] h-[120px] shadow-sm hover:shadow-md transition-all group shrink-0 overflow-hidden"
                  >
                    {partner.img ? (
                      <img 
                        src={partner.img} 
                        alt={partner.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="px-6 text-center">
                        <span className="font-serif text-sm font-bold text-sorgum-primary/60 dark:text-sorgum-primary/60 group-hover:text-sorgum-accent transition-colors tracking-wide">
                          {partner.name}
                        </span>
                      </div>
                    )}
                  </div>
                ));
              })()}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
