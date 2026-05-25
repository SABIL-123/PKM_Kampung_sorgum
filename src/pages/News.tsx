import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Search, Filter, ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

const News = ({ pageData, cmsPosts = [] }: { pageData?: any, cmsPosts?: any[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const heroData = pageData?.content?.find((c: any) => c.type === 'hero')?.data;
  const feedData = pageData?.content?.find((c: any) => c.type === 'dynamic-post-feed')?.data;
  
  // Filter posts based on selected IDs from CMS config (if specified), fallback to all posts
  const basePosts = useMemo(() => {
    let posts = cmsPosts || [];
    if (feedData?.selected_post_ids && feedData.selected_post_ids.length > 0) {
      posts = posts.filter((post: any) => feedData.selected_post_ids.includes(post.id));
    }
    return posts;
  }, [cmsPosts, feedData]);

  // Dynamically compile categories present in active posts
  const categories = useMemo(() => {
    const unique = new Set(basePosts.map((post: any) => post.category || 'Berita'));
    return ['Semua', ...Array.from(unique)];
  }, [basePosts]);

  // Filter posts based on active search query and selected category tab
  const filteredNews = useMemo(() => {
    return basePosts.map((post: any) => {
      const rawDesc = post.content?.[0]?.body_content?.replace(/<[^>]+>/g, '')?.replace(/&nbsp;/g, ' ') || "";
      const truncatedDesc = rawDesc.length > 110 ? rawDesc.slice(0, 110) + '...' : rawDesc;

      return {
        id: post.id,
        slug: post.slug,
        date: new Date(post.created_at || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        category: post.category || "Berita",
        title: post.title || "Berita Sorgum",
        desc: truncatedDesc,
        img: post.content?.[0]?.featured_image || "https://images.unsplash.com/photo-1615810757271-92fd5896a25b?q=80&w=2574&auto=format&fit=crop",
        rawContent: post.title + " " + rawDesc
      };
    }).filter((item: any) => {
      const categoryMatch = selectedCategory === 'Semua' || item.category === selectedCategory;
      const searchMatch = item.rawContent.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [basePosts, searchQuery, selectedCategory]);

  return (
    <section className="pt-10 pb-24 bg-sorgum-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Title & Subtitle */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-4 block">Kabar Terbaru</span>
          <h2 className="font-serif text-5xl md:text-6xl text-sorgum-primary italic font-semibold leading-tight">
            {heroData?.headline || "Berita Sorgum Indonesia"}
          </h2>
          <p className="text-neutral-500 text-sm font-light mt-4 max-w-xl mx-auto leading-relaxed">
            Ikuti warta perkembangan budidaya sorgum, inovasi olahan pangan lokal, serta kisah sukses dari kemitraan Kampung Sorgum Indonesia.
          </p>
        </div>

        {/* Dynamic Controls Segment (Search & Filters) */}
        <div className="bg-white p-6 rounded-[35px] shadow-xl shadow-sorgum-primary/5 mb-12 flex flex-col md:flex-row gap-6 justify-between items-center border border-sorgum-primary/5">
          {/* Real-time Search Input Box */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-sorgum-primary transition-colors" size={18} />
            <input
              type="text"
              placeholder="Cari berita atau warta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-sorgum-light/60 border border-sorgum-primary/10 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sorgum-primary/20 focus:bg-white transition-all font-light"
            />
          </div>

          {/* Dynamic Category Filtering Tabs */}
          <div className="flex flex-wrap gap-2.5 w-full md:w-auto justify-center md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-sorgum-primary text-white shadow-lg shadow-sorgum-primary/20 scale-105'
                    : 'bg-sorgum-light/80 text-sorgum-primary/60 hover:bg-sorgum-primary/5 hover:text-sorgum-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main News Display */}
        {cmsPosts.length === 0 ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="animate-spin text-sorgum-primary" size={32} />
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredNews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 bg-white rounded-[40px] border border-sorgum-primary/5 shadow-inner flex flex-col items-center justify-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-sorgum-primary/5 flex items-center justify-center text-sorgum-primary/40 mb-6">
                  <Newspaper size={28} />
                </div>
                <h3 className="font-serif text-2xl text-sorgum-primary italic mb-2">Warta Tidak Ditemukan</h3>
                <p className="text-neutral-500 font-light text-sm max-w-sm">
                  Tidak ada berita yang cocok dengan kata kunci "{searchQuery}" atau filter kategori "{selectedCategory}". Coba cari kata kunci lainnya.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredNews.map((item: any, i: number) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <Link
                      to={`/berita/${item.slug}`}
                      className="bg-white rounded-[40px] overflow-hidden border border-sorgum-primary/5 hover:border-sorgum-accent/40 shadow-md hover:shadow-2xl transition-all duration-500 block h-full flex flex-col"
                    >
                      {/* Featured Image */}
                      <div className="aspect-video bg-neutral-100 overflow-hidden relative">
                        <img 
                          src={item.img} 
                          referrerPolicy="no-referrer" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                          alt={item.title} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Content Card Body */}
                      <div className="p-8 flex-grow flex flex-col justify-between">
                        <div>
                          {/* Metadata Tags */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-sorgum-primary/5 text-[9px] uppercase font-bold tracking-widest text-sorgum-primary">
                              {item.category}
                            </span>
                            <span className="w-1.5 h-1.5 bg-neutral-200 rounded-full"></span>
                            <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400">
                              {item.date}
                            </span>
                          </div>

                          {/* Title & Teaser Description */}
                          <h3 className="font-serif text-2xl text-sorgum-primary mb-3.5 group-hover:text-sorgum-accent transition-colors leading-tight font-semibold line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-neutral-500 font-light leading-relaxed line-clamp-2 mb-6">
                            {item.desc}
                          </p>
                        </div>

                        {/* Premium "Baca Selengkapnya" CTA Link */}
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-sorgum-primary group-hover:text-sorgum-accent transition-colors pt-4 border-t border-sorgum-primary/5 self-start">
                          <span>Baca Selengkapnya</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default News;
