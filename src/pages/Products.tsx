import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, MessageSquare, Info, Shield, Check } from 'lucide-react';

interface ProductsProps {
  pageData?: any;
  waNumber?: string;
}

export default function Products({ pageData, waNumber = '628112428868' }: ProductsProps) {
  // Try to find product items from the CMS if available (usually gallery or a features block that is not the 'Mengapa Memilih' info block)
  const cmsProductsBlock = pageData?.content?.find((c: any) => 
    (c.type === 'gallery' || c.type === 'features') && 
    !(c.data.title?.toLowerCase()?.includes('mengapa memilih') || c.data.title?.toLowerCase()?.includes('why choose'))
  ) || pageData?.content?.find((c: any) => c.type === 'gallery' || c.type === 'features');
  
  const cmsProducts = cmsProductsBlock?.data?.items || cmsProductsBlock?.data?.images;

  // Try to find the "Mengapa Memilih Produk/Health info" block from the CMS
  const cmsInfoBlock = pageData?.content?.find((c: any) => 
    c.type === 'features' && (
      c.data.title?.toLowerCase()?.includes('mengapa memilih') || 
      c.data.title?.toLowerCase()?.includes('why choose') ||
      c.data.title?.toLowerCase()?.includes('produk sorgum kami') ||
      c.data.subtitle?.toLowerCase()?.includes('organik') ||
      c.data.subtitle?.toLowerCase()?.includes('gluten')
    )
  ) || pageData?.content?.find((c: any) => c.type === 'features' && c.id !== cmsProductsBlock?.id);

  const defaultProducts = [
    {
      title: "Beras Sorgum Pilihan",
      description: "Butiran sorgum kupas utuh premium kaya serat pangan, fosfor, dan zat besi. Sangat baik untuk penderita diabetes karena memiliki indeks glikemik yang sangat rendah.",
      price: "Rp 20.000 / 500g",
      tag: "Serat Tinggi & Rendah Indeks Glikemik",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
      benefits: ["Kaya antioksidan polifenol", "Menjaga gula darah tetap stabil", "100% Organik & Alami"]
    },
    {
      title: "Tepung Sorgum Premium",
      description: "Tepung sorgum halus bebas gluten (gluten-free) kualitas ekspor. Alternatif sehat terbaik pengganti tepung terigu untuk membuat roti, kukis, muffin, dan olahan kue lainnya.",
      price: "Rp 25.000 / 500g",
      tag: "100% Bebas Gluten (Gluten-Free)",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop",
      benefits: ["Aman untuk penderita celiac", "Tekstur halus & lembut", "Kaya protein nabati"]
    },
    {
      title: "Nektar Gula Sorgum",
      description: "Sirup gula cair alami yang diekstrak dari perasan batang sorgum manis pilihan. Memiliki cita rasa karamel manis yang legit, dengan kandungan kalori yang jauh lebih rendah dari gula tebu.",
      price: "Rp 35.000 / 250ml",
      tag: "Pemanis Alami Rendah Kalori",
      image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=800&auto=format&fit=crop",
      benefits: ["Kalori lebih rendah dari gula pasir", "Rasa karamel yang khas", "Tanpa bahan pengawet tambahan"]
    },
    {
      title: "Kukis Sorgum Sehat",
      description: "Camilan kukis renyah super lezat yang dipanggang menggunakan tepung sorgum pilihan dan nektar sorgum manis. Bebas gluten, bebas susu, dan ramah bagi pelaku diet vegetarian.",
      price: "Rp 15.000 / 150g",
      tag: "Camilan Sehat & Bebas Gluten",
      image: "https://images.unsplash.com/photo-1558961309-db626db8222c?q=80&w=800&auto=format&fit=crop",
      benefits: ["Bebas lemak trans", "Camilan berenergi tinggi", "Aman dikonsumsi anak-anak"]
    }
  ];

  const productsList = cmsProducts && cmsProducts.length > 0 
    ? cmsProducts.map((item: any) => {
        const rawTitle = item.image_title || item.title || item.category || "Produk Sorgum";
        const title = rawTitle.replace(/^\/+/, '').trim();
        
        // Split description by newlines to extract benefits list
        const descLines = (item.description || "")
          .split('\n')
          .map((line: string) => line.replace(/^[•\-\*\s]+/, '').trim())
          .filter((line: string) => line.length > 0);
          
        const benefits = descLines.length > 0
          ? descLines.filter((line: string) => !line.toLowerCase().includes('keunggulan')).map(b => b.replace(/^\/+/, '').trim())
          : ["Bebas Gluten", "Nutrisi Tinggi", "100% Organik"];

        // Tag: Kategori (category) if distinct from title, otherwise Caption, otherwise default
        const rawTag = (item.category && item.category !== title)
          ? item.category
          : item.caption || "Produk Pilihan";
        const tag = rawTag.replace(/^\/+/, '').trim();

        // Description: Use caption (e.g. "Pemanis Alami Rendah Kalori") or first description line
        const rawDescription = item.caption || (descLines.length > 0 ? descLines[0] : "Produk olahan sorgum pilihan berkualitas tinggi.");
        const description = rawDescription.replace(/^\/+/, '').trim();

        // Price: mapped to Alt Text input (item.alt_text) or item.price
        const rawPrice = item.alt_text || item.price || "Hubungi Kami";
        const price = rawPrice.replace(/^\/+/, '').trim();

        return {
          title,
          description,
          price,
          tag,
          image: item.url || item.icon_url || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop",
          benefits
        };
      })
    : defaultProducts;

  const handleOrder = (productName: string) => {
    const message = `Halo Kampung Sorgum, saya ingin bertanya dan memesan produk *${productName}*. Mohon informasi ketersediaan stock dan tata cara pengirimannya. Terima kasih!`;
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen pt-10 pb-24 bg-sorgum-light dark:bg-sorgum-light">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-4 block">Katalog Resmi</span>
          <h1 className="font-serif text-5xl md:text-6xl text-sorgum-primary dark:text-sorgum-primary leading-tight mb-6">
            {pageData?.title || "Produk Sorgum Kami"}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-500 text-base max-w-2xl mx-auto font-light leading-relaxed">
            {pageData?.subtitle || "Temukan berbagai produk olahan sorgum pilihan berkualitas tinggi yang ditanam langsung oleh petani lokal, bebas gluten, kaya serat, dan ramah lingkungan."}
          </p>
        </motion.div>
      </section>

      {/* Product Catalog Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {productsList.map((product: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-white rounded-[32px] overflow-hidden shadow-xl shadow-sorgum-primary/5 dark:shadow-sorgum-primary/5 border border-sorgum-primary/5 dark:border-sorgum-primary/5 flex flex-col group hover:shadow-2xl hover:shadow-sorgum-primary/10 transition-all duration-500"
            >
              {/* Product Image & Tag Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-100">
                <img 
                  src={product.image} 
                  referrerPolicy="no-referrer"
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                
                {/* Product Badge Tag */}
                <div className="absolute top-6 left-6 bg-sorgum-light/95 dark:bg-sorgum-light/95 backdrop-blur-md border border-sorgum-primary/10 dark:border-sorgum-primary/10 px-4 py-1.5 rounded-full shadow-md">
                  <span className="text-[10px] font-bold text-sorgum-primary dark:text-sorgum-primary uppercase tracking-widest">
                    {product.tag}
                  </span>
                </div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-6 right-6 bg-sorgum-accent text-[#121E26] px-5 py-2 rounded-full font-bold shadow-lg text-sm">
                  {product.price}
                </div>
              </div>

              {/* Product Card Details */}
              <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-3xl font-bold text-sorgum-primary dark:text-sorgum-primary group-hover:text-sorgum-accent transition-colors mb-4">
                    {product.title}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-500 text-sm font-light leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Dynamic Benefits Checklist */}
                  <div className="space-y-2 mb-8 bg-[#FBF9F4] dark:bg-[#FBF9F4] p-5 rounded-2xl border border-sorgum-accent/10 dark:border-sorgum-accent/10">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-sorgum-primary/60 dark:text-sorgum-primary/60 block mb-3">Keunggulan Utama:</span>
                    {product.benefits.map((benefit: string, bIdx: number) => (
                      <div key={bIdx} className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-600 font-light">
                        <div className="w-5 h-5 rounded-full bg-sorgum-accent/20 flex items-center justify-center text-sorgum-primary shrink-0">
                          <Check size={11} className="stroke-[3]" />
                        </div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <button
                  onClick={() => handleOrder(product.title)}
                  className="w-full bg-sorgum-primary hover:bg-sorgum-accent text-white hover:text-[#121E26] py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-sorgum-primary/10 dark:shadow-sorgum-primary/10 group-hover:scale-[1.02] cursor-pointer"
                >
                  <MessageSquare size={16} />
                  Pesan Sekarang via WA
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Health Info Section */}
      <section className="max-w-4xl mx-auto px-6 mt-24">
        <div className="bg-gradient-to-br from-[#FBF9F4] to-white dark:from-[#172530] dark:to-[#121E26] p-8 md:p-12 rounded-[40px] relative overflow-hidden border border-sorgum-accent/15 dark:border-white/5 shadow-xl shadow-sorgum-primary/5">
          {/* Subtle absolute wheat graphic background */}
          <div className="absolute top-0 right-0 w-48 h-48 text-sorgum-accent/10 dark:text-white/5 pointer-events-none transform translate-x-12 -translate-y-12">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <path d="M20 80 C 40 70, 60 40, 80 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M35 63 C 33 60, 31 52, 36 49 C 41 46, 42 56, 38 60 Z" fill="currentColor" />
              <path d="M43 65 C 47 62, 53 58, 52 52 C 51 46, 44 49, 40 56 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 rounded-full bg-sorgum-primary text-white dark:bg-sorgum-accent dark:text-[#121E26] flex items-center justify-center shrink-0">
              <Shield size={32} />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-sorgum-primary dark:text-sorgum-accent mb-3">
                {cmsInfoBlock?.data?.title || "Mengapa Memilih Produk Sorgum Kami?"}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed font-light">
                {cmsInfoBlock?.data?.subtitle || "Seluruh produk olahan kami bersertifikat organik, diproses secara higienis, dan 100% bebas gluten alami. Dengan membeli produk Kampung Sorgum, Anda juga turut serta mendukung kemakmuran petani kecil di pedesaan Indonesia serta mendorong gerakan ketahanan pangan nasional yang ramah iklim."}
              </p>

              {/* Optional sub-features list if configured in CMS */}
              {((cmsInfoBlock?.data?.feature_items || cmsInfoBlock?.data?.items) && 
                (cmsInfoBlock.data.feature_items || cmsInfoBlock.data.items).length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-sorgum-accent/10 dark:border-white/5">
                  {(cmsInfoBlock.data.feature_items || cmsInfoBlock.data.items).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-sorgum-accent/20 flex items-center justify-center text-sorgum-primary dark:text-sorgum-accent shrink-0 mt-0.5">
                        <Check size={11} className="stroke-[3]" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-sorgum-primary dark:text-sorgum-accent">{item.title}</h4>
                        {item.description && (
                          <p className="text-neutral-500 dark:text-neutral-400 text-xs font-light mt-1">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
