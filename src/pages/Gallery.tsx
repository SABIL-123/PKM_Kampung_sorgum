import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Gallery = ({ pageData }: { pageData?: any }) => {

  const heroData = pageData?.content?.find((c: any) => c.type === 'hero')?.data;
  const galleryData = pageData?.content?.find((c: any) => c.type === 'gallery')?.data;
  
  const images = galleryData?.images?.map((img: any, i: number) => ({
    id: i + 1,
    url: img.url,
    alt: img.alt_text || "Gallery"
  })) || [];

  return (
    <section className="py-24 bg-sorgum-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-4 block">Momen Lapangan</span>
            <h2 className="font-serif text-5xl text-sorgum-primary">{heroData?.headline || "Galeri Kehidupan Desa"}</h2>
          </div>
          <Link 
            to="/galeri"
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-sorgum-primary/50 hover:text-sorgum-primary transition-colors cursor-pointer"
          >
            Lihat Full Galeri <ChevronRight size={14} />
          </Link>
        </div>
        
        {images.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-sorgum-primary" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {images.map((img: any, i: number) => (
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

export default Gallery;
