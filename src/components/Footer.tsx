import React from 'react';
import { Sprout, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12 bg-sorgum-light border-t border-sorgum-primary/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <Link 
          to="/"
          className="flex items-center gap-2 cursor-pointer"
        >
          <Sprout className="text-sorgum-primary" size={24} />
          <span className="font-serif text-xl font-bold text-sorgum-primary">Kampung Sorgum</span>
        </Link>
        <div className="flex gap-8">
          <Instagram size={20} className="text-sorgum-primary/40 hover:text-sorgum-primary transition-colors cursor-pointer" onClick={() => window.open('https://instagram.com', '_blank')} />
          <Facebook size={20} className="text-sorgum-primary/40 hover:text-sorgum-primary transition-colors cursor-pointer" onClick={() => window.open('https://facebook.com', '_blank')} />
        </div>
        <p className="text-xs text-sorgum-primary/40 font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Hak Cipta Dilindungi
        </p>
      </div>
    </footer>
  );
};

export default Footer;
