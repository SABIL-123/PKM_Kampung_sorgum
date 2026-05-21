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
import NewsDetail from './pages/NewsDetail';
import Contact from './pages/Contact';
import PartnerForm from './pages/PartnerForm';

const CMS_API_URL = import.meta.env.VITE_CMS_API_LINK;
const CMS_POSTS_URL = import.meta.env.VITE_CMS_API_POSTS_LINK;
const CMS_API_KEY = import.meta.env.VITE_CMS_API_KEY;

const AnimatedRoutes = ({ cmsPages, cmsPosts, waNumber, isLoading }: any) => {
  const location = useLocation();

  const getPageData = (slug: string) => {
    const page = cmsPages.find((p: any) => p.slug === slug && p.status === 'published');
    return page;
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore - React Router v6 Routes accepts key for AnimatePresence */}
      <Routes location={location} key={location.pathname}>
        {getPageData('beranda') && (
          <Route path="/" element={
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <Home pageData={getPageData('beranda')} />
            </motion.div>
          } />
        )}
        {getPageData('profil') && (
          <Route path="/profil" element={
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <Profile pageData={getPageData('profil')} />
            </motion.div>
          } />
        )}
        {getPageData('galeri') && (
          <Route path="/galeri" element={
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <Gallery pageData={getPageData('galeri')} />
            </motion.div>
          } />
        )}
        {getPageData('berita') && (
          <>
            <Route path="/berita" element={
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <News pageData={getPageData('berita')} cmsPosts={cmsPosts} />
              </motion.div>
            } />
            <Route path="/berita/:slug" element={
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <NewsDetail cmsPosts={cmsPosts} />
              </motion.div>
            } />
          </>
        )}
        {getPageData('hubungi-kami') && (
          <Route path="/hubungi-kami" element={
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <Contact pageData={getPageData('hubungi-kami')} waNumber={waNumber} />
            </motion.div>
          } />
        )}
        {getPageData('gabung-mitra') && (
          <Route path="/gabung-mitra" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <PartnerForm pageData={getPageData('gabung-mitra')} waNumber={waNumber} />
            </motion.div>
          } />
        )}
        <Route path="*" element={
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-4xl font-serif text-sorgum-primary italic mb-4">Halaman Tidak Ditemukan</h2>
            <p className="text-neutral-500">Halaman yang Anda cari mungkin telah dinonaktifkan atau dihapus.</p>
          </div>
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
      <Navbar cmsPages={cmsPages} isLoading={isLoading} />
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
