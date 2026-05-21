import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ cmsPages = [], isLoading = false }: { cmsPages?: any[], isLoading?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = cmsPages
    .filter((p: any) => p.status === 'published' && (p.is_in_navbar === 1 || p.is_in_navbar === true) && p.slug !== 'gabung-mitra' && p.slug !== 'kontak')
    .sort((a: any, b: any) => a.priority - b.priority)
    .map((p: any) => ({
      id: p.slug === 'beranda' ? '/' : `/${p.slug}`,
      label: p.title
    }));
    
  const showGabungMitra = cmsPages.some((p: any) => p.slug === 'gabung-mitra' && p.status === 'published' && (p.is_in_navbar === 1 || p.is_in_navbar === true));

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-sorgum-light/90 backdrop-blur-md py-3 border-b border-sorgum-primary/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/"
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-sorgum-primary rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
            <Sprout size={20} />
          </div>
          <span className="font-serif text-2xl font-bold text-sorgum-primary tracking-tight">Kampung Sorgum</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${
                location.pathname === item.id ? 'text-sorgum-primary' : 'text-sorgum-primary/50 hover:text-sorgum-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {showGabungMitra && (
            <Link 
              to="/gabung-mitra"
              className="bg-sorgum-primary text-white px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold hover:scale-105 transition-all shadow-lg shadow-sorgum-primary/20 cursor-pointer"
            >
              Gabung Mitra
            </Link>
          )}
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
            className="fixed inset-0 bg-sorgum-primary z-50 p-10 flex flex-col items-center justify-start overflow-y-auto gap-8 pt-32 pb-12"
          >
            <button className="absolute top-10 right-10 text-white z-10" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-4xl font-serif italic hover:translate-x-4 transition-transform shrink-0"
              >
                {item.label}
              </Link>
            ))}
            {showGabungMitra && (
              <Link 
                to="/gabung-mitra"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 bg-white text-sorgum-primary px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-all shadow-xl shrink-0"
              >
                Gabung Mitra
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
