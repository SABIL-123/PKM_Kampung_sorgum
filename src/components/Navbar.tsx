import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ cmsPages = [], isLoading = false }: { cmsPages?: any[], isLoading?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll threshold listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync theme with HTML document element and local storage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const menuItems = cmsPages
    .filter((p: any) => {
      if (p.status !== 'published') return false;
      if (p.is_in_navbar !== 1 && p.is_in_navbar !== true) return false;
      const slugLower = (p.slug || '').toLowerCase();
      const titleLower = (p.title || '').toLowerCase();
      return (
        slugLower !== 'gabung-mitra' &&
        slugLower !== 'kontak' &&
        slugLower !== 'contact' &&
        titleLower !== 'kontak' &&
        titleLower !== 'contact'
      );
    })
    .sort((a: any, b: any) => a.priority - b.priority)
    .map((p: any) => ({
      id: p.slug === 'beranda' ? '/' : `/${p.slug}`,
      label: p.title
    }));
    
  const showGabungMitra = cmsPages.some((p: any) => p.slug === 'gabung-mitra' && p.status === 'published' && (p.is_in_navbar === 1 || p.is_in_navbar === true));

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-sorgum-light/95 dark:bg-[#121E26]/95 backdrop-blur-md py-3 border-b border-sorgum-primary/10' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Branding Logo */}
        <Link 
          to="/"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src="/logo.jpg" 
            alt="Logo Kampung Sorgum" 
            className="w-10 h-10 rounded-full object-cover shadow-md border border-sorgum-primary/10 group-hover:rotate-6 transition-transform duration-300"
          />
          <span className="font-serif text-2xl font-bold text-sorgum-primary dark:text-white tracking-tight">Kampung Sorgum</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${
                location.pathname === item.id 
                  ? 'text-sorgum-primary dark:text-sorgum-accent' 
                  : 'text-sorgum-primary/50 hover:text-sorgum-primary dark:text-neutral-300 dark:hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Theme Malam (Dark Mode) Toggle Icon */}
          <button 
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-sorgum-primary/5 hover:bg-sorgum-primary/10 dark:bg-white/5 dark:hover:bg-white/10 border border-sorgum-primary/10 dark:border-white/10 flex items-center justify-center text-sorgum-primary dark:text-white hover:scale-105 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon size={17} className="text-sorgum-primary" />
            ) : (
              <Sun size={17} className="text-sorgum-accent" />
            )}
          </button>

          {showGabungMitra && (
            <Link 
              to="/gabung-mitra"
              className="bg-sorgum-primary text-white dark:bg-sorgum-accent dark:text-[#121E26] px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold hover:scale-105 transition-all shadow-lg shadow-sorgum-primary/20 dark:shadow-none cursor-pointer"
            >
              Gabung Mitra
            </Link>
          )}
        </div>

        {/* Mobile menu toggle & Theme control row */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-sorgum-primary/5 dark:bg-white/5 border border-sorgum-primary/10 dark:border-white/10 flex items-center justify-center text-sorgum-primary dark:text-white cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} className="text-sorgum-accent" />}
          </button>
          
          <button className="text-sorgum-primary dark:text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-sorgum-primary dark:bg-[#121E26] z-50 p-10 flex flex-col items-center justify-start overflow-y-auto gap-8 pt-32 pb-12"
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
                className="mt-4 bg-white text-sorgum-primary dark:bg-sorgum-accent dark:text-[#121E26] px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-all shadow-xl shrink-0"
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
