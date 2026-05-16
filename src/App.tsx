import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SkeletonLoader } from './components/SkeletonLoader';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Contact from './pages/Contact';
import PartnerForm from './pages/PartnerForm';

const CMS_API_URL = import.meta.env.VITE_CMS_API_LINK;
const CMS_POSTS_URL = import.meta.env.VITE_CMS_API_POSTS_LINK;
const CMS_API_KEY = import.meta.env.VITE_CMS_API_KEY;

const AnimatedRoutes = ({ cmsPages, cmsPosts, waNumber, isLoading }: any) => {
  const location = useLocation();

  const getPageData = (slug: string) => {
    const page = cmsPages.find((p: any) => p.slug === slug);
    return page;
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore - React Router v6 Routes accepts key for AnimatePresence */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <Home pageData={getPageData('beranda')} />
          </motion.div>
        } />
        <Route path="/profil" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <Profile pageData={getPageData('profil')} />
          </motion.div>
        } />
        <Route path="/galeri" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <Gallery pageData={getPageData('galeri')} />
          </motion.div>
        } />
        <Route path="/berita" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <News pageData={getPageData('berita')} cmsPosts={cmsPosts} />
          </motion.div>
        } />
        <Route path="/hubungi-kami" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <Contact pageData={getPageData('hubungi-kami')} waNumber={waNumber} />
          </motion.div>
        } />
        <Route path="/gabung-mitra" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <PartnerForm pageData={getPageData('gabung-mitra')} waNumber={waNumber} />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const [cmsPages, setCmsPages] = useState<any[]>([]);
  const [cmsPosts, setCmsPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('[CMS] Environment check:', {
      pagesUrl: CMS_API_URL,
      postsUrl: CMS_POSTS_URL,
      hasKey: !!CMS_API_KEY,
    });

    if (!CMS_API_URL || !CMS_API_KEY) {
      console.error('[CMS] Missing environment variables! Check .env file.');
      setIsLoading(false);
      return;
    }

    const headers: HeadersInit = { 'x-api-key': CMS_API_KEY };

    const fetchPages = fetch(CMS_API_URL, { headers })
      .then(res => {
        console.log('[CMS] Pages status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('[CMS] Pages received:', Array.isArray(data) ? data.length + ' pages' : typeof data);
        if (Array.isArray(data)) setCmsPages(data);
      })
      .catch(err => console.error('[CMS] Pages error:', err));

    const fetchPosts = fetch(CMS_POSTS_URL, { headers })
      .then(res => {
        console.log('[CMS] Posts status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('[CMS] Posts received:', Array.isArray(data) ? data.length + ' posts' : typeof data);
        if (Array.isArray(data)) setCmsPosts(data);
      })
      .catch(err => console.error('[CMS] Posts error:', err));

    Promise.allSettled([fetchPages, fetchPosts]).then(() => {
      console.log('[CMS] All fetches completed.');
      setIsLoading(false);
    });
  }, []);

  // Extract WhatsApp number from kontak page
  const kontakData = cmsPages.find(p => p.slug === 'kontak')?.content?.find((c: any) => c.type === 'contacts')?.data;
  const rawPhone = kontakData?.phone_numbers?.[0] || '082123456789';
  const cleanNumber = rawPhone.replace(/\D/g, '');
  const waNumber = cleanNumber.startsWith('0') ? '62' + cleanNumber.slice(1) : cleanNumber;

  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-sorgum-light text-neutral-800 font-sans selection:bg-sorgum-accent selection:text-white">
      <Navbar />
      <main className="pt-20">
        <AnimatedRoutes 
          cmsPages={cmsPages} 
          cmsPosts={cmsPosts} 
          waNumber={waNumber} 
          isLoading={isLoading} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
