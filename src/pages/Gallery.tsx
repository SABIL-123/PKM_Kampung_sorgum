import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Loader2, Image as ImageIcon } from 'lucide-react';

const Gallery = ({ pageData }: { pageData?: any }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const heroData = pageData?.content?.find((c: any) => c.type === 'hero')?.data;
  const galleryData = pageData?.content?.find((c: any) => c.type === 'gallery')?.data;
  
  const images = useMemo(() => {
    return galleryData?.images?.map((img: any, i: number) => {
      const captionText = img.caption || img.image_title || img.description || img.alt_text || `Dokumentasi Momen ${i + 1}`;
      return {
        id: i + 1,
        url: img.url,
        alt: captionText
      };
    }) || [];
  }, [galleryData]);

  // Extract the first 5 images for the highlights 3D carousel
  const carouselImages = useMemo(() => {
    return images.slice(0, 5);
  }, [images]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <section className="pt-10 pb-24 bg-sorgum-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-4 block">Momen Lapangan</span>
          <h2 className="font-serif text-5xl md:text-6xl text-sorgum-primary font-semibold leading-tight">
            {heroData?.headline || "Galeri Kehidupan Desa"}
          </h2>
          <p className="text-neutral-500 text-sm font-light mt-4 max-w-xl mx-auto leading-relaxed">
            Menyajikan dokumentasi visual perjalanan Kampung Sorgum dari masa tanam, pemberdayaan kelompok petani tani, panen raya, hingga inovasi produk olahan pangan lokal.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="animate-spin text-sorgum-primary" size={32} />
          </div>
        ) : (
          <>
            {/* SECTION 1: Sorotan Interaktif (3D Card Carousel) */}
            {carouselImages.length > 0 && (
              <div className="mb-24">
                <div className="text-center mb-8">
                  <h3 className="font-serif text-2xl md:text-3xl text-sorgum-primary italic mb-2">Sorotan Utama</h3>
                  <p className="text-xs text-neutral-400 font-light uppercase tracking-widest">
                    Geser atau Klik Kartu untuk Menjelajah Kegiatan Sentral
                  </p>
                </div>

                {/* 3D Carousel Container */}
                <div className="relative h-[280px] sm:h-[350px] md:h-[450px] w-full flex items-center justify-center overflow-hidden py-4">
                  
                  {/* Left / Prev Button */}
                  <button 
                    onClick={handlePrev}
                    className="absolute left-4 md:left-12 z-40 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-sorgum-primary/10 flex items-center justify-center text-sorgum-primary hover:bg-sorgum-primary hover:text-white transition-all shadow-lg hover:scale-110 cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Cards Frame */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {carouselImages.map((img: any, idx: number) => {
                      let offset = idx - activeIndex;
                      
                      // Handle circular offsets
                      if (offset < -2) offset += carouselImages.length;
                      if (offset > 2) offset -= carouselImages.length;

                      const isActive = idx === activeIndex;
                      const isVisible = Math.abs(offset) <= 1 || (carouselImages.length === 5 && Math.abs(offset) <= 2);

                      if (!isVisible) return null;

                      // Styles based on distance from active
                      const scale = isActive ? 1 : Math.max(0.7, 0.9 - Math.abs(offset) * 0.12);
                      const translationX = offset * (window.innerWidth < 768 ? 100 : 220);
                      const zIndex = 30 - Math.abs(offset) * 10;
                      const opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.35);

                      return (
                        <motion.div
                          key={img.id}
                          onClick={() => setActiveIndex(idx)}
                          animate={{
                            x: translationX,
                            scale: scale,
                            zIndex: zIndex,
                            opacity: opacity
                          }}
                          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                          className={`absolute w-[240px] sm:w-[380px] md:w-[540px] aspect-[4/3] rounded-[45px] overflow-hidden shadow-2xl border-4 border-white/95 cursor-pointer origin-center`}
                          style={{
                            filter: isActive ? 'none' : 'brightness(0.4) contrast(0.9)',
                          }}
                        >
                          <img 
                            src={img.url} 
                            referrerPolicy="no-referrer" 
                            className="w-full h-full object-cover" 
                            alt={img.alt} 
                          />
                          
                          {/* Active Slide Text Label Overlay */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div 
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ delay: 0.2 }}
                                className="absolute bottom-6 left-6 right-6 bg-[#121E26]/85 backdrop-blur-md rounded-3xl p-4 text-white border border-white/10"
                              >
                                <p className="text-[9px] uppercase font-bold text-sorgum-accent tracking-widest mb-0.5">Momen Kegiatan</p>
                                <h4 className="font-serif text-sm sm:text-base md:text-lg font-semibold truncate leading-tight">{img.alt}</h4>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Right / Next Button */}
                  <button 
                    onClick={handleNext}
                    className="absolute right-4 md:right-12 z-40 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-sorgum-primary/10 flex items-center justify-center text-sorgum-primary hover:bg-sorgum-primary hover:text-white transition-all shadow-lg hover:scale-110 cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>

                </div>
              </div>
            )}

            {/* SECTION 2: Semua Dokumentasi (Masonry Staggered Grid) */}
            <div className="border-t border-sorgum-primary/10 pt-20">
              <div className="text-center mb-12">
                <h3 className="font-serif text-2xl md:text-3xl text-sorgum-primary italic mb-2">Semua Momen</h3>
                <p className="text-xs text-neutral-400 font-light uppercase tracking-widest">
                  Arsip Visual Perjalanan Kelompok Tani
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {images.map((img: any, i: number) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.1 }}
                    whileHover={{ scale: 0.98 }}
                    className={`relative rounded-[40px] overflow-hidden bg-white p-3 shadow-lg border border-sorgum-primary/5 hover:shadow-2xl hover:border-sorgum-accent/40 transition-all duration-500 cursor-zoom-in ${
                      i % 3 === 1 ? 'md:translate-y-12' : ''
                    }`}
                  >
                    <div className="rounded-[30px] overflow-hidden aspect-[4/5]">
                      <img 
                        src={img.url} 
                        referrerPolicy="no-referrer" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out" 
                        alt={img.alt} 
                      />
                    </div>
                    {/* Caption label below image in grid */}
                    <div className="pt-4 pb-2 px-3 text-center">
                      <p className="font-serif text-sm font-semibold italic text-sorgum-primary truncate">
                        {img.alt}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Empty staggered alignment spacing offset padding */}
            <div className="h-16 hidden md:block" />
          </>
        )}
      </div>
    </section>
  );
};

export default Gallery;
