import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = ({ pageData }: { pageData?: any }) => {
  const navigate = useNavigate();


  const heroData = pageData?.content?.find((c: any) => c.type === 'hero')?.data;

  return (
    <section className="min-h-screen flex items-center pt-20">
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
    </section>
  );
};

export default Home;
