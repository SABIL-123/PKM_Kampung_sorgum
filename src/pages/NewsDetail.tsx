import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag, Clock, ArrowRight } from 'lucide-react';

const NewsDetail = ({ cmsPosts = [] }: { cmsPosts?: any[] }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = useMemo(() => {
    return cmsPosts?.find((p: any) => p.slug === slug && p.status === 'published');
  }, [cmsPosts, slug]);

  // Extract related posts dynamically
  const relatedPosts = useMemo(() => {
    if (!post || !cmsPosts) return [];
    
    const activeCategory = post.category || "Berita";
    
    // Filter out the active article
    const otherPosts = cmsPosts.filter((p: any) => p.id !== post.id && p.status === 'published');
    
    // Sort so other posts with matching categories are listed first, then take up to 3 recommendations
    const matching = otherPosts.filter((p: any) => (p.category || "Berita") === activeCategory);
    const nonMatching = otherPosts.filter((p: any) => (p.category || "Berita") !== activeCategory);
    
    return [...matching, ...nonMatching].slice(0, 3).map((p: any) => {
      const rawDesc = p.content?.[0]?.body_content?.replace(/<[^>]+>/g, '')?.replace(/&nbsp;/g, ' ') || "";
      const truncatedDesc = rawDesc.length > 90 ? rawDesc.slice(0, 90) + '...' : rawDesc;

      return {
        id: p.id,
        slug: p.slug,
        title: p.title || "Berita Sorgum",
        desc: truncatedDesc,
        category: p.category || "Berita",
        date: new Date(p.created_at || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
        img: p.content?.[0]?.featured_image || "https://images.unsplash.com/photo-1615810757271-92fd5896a25b?q=80&w=2574&auto=format&fit=crop"
      };
    });
  }, [cmsPosts, post]);

  // Calculate dynamic reading time based on text contents
  const readTime = useMemo(() => {
    if (!post) return 1;
    const bodyText = post.content?.[0]?.body_content?.replace(/<[^>]+>/g, '') || "";
    const wordsCount = bodyText.trim().split(/\s+/).length || 0;
    return Math.max(1, Math.round(wordsCount / 225)); // Average adult reading speed: 225 words per minute
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-serif text-sorgum-primary italic mb-4">Berita Tidak Ditemukan</h2>
        <p className="text-neutral-500 mb-8">Berita yang Anda cari tidak tersedia atau sudah dihapus.</p>
        <button 
          onClick={() => navigate('/berita')}
          className="bg-sorgum-primary text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-all shadow-xl"
        >
          Kembali ke Berita
        </button>
      </div>
    );
  }

  const date = new Date(post.created_at || Date.now()).toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  
  const category = post.category || "Berita";
  const title = post.title || "Berita Sorgum";
  const bodyContent = post.content?.[0]?.body_content || "";
  const featuredImage = post.content?.[0]?.featured_image || "https://images.unsplash.com/photo-1615810757271-92fd5896a25b?q=80&w=2574&auto=format&fit=crop";

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="py-24 bg-sorgum-light"
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/berita')}
          className="flex items-center gap-2 text-sorgum-primary/50 hover:text-sorgum-primary mb-12 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="group-hover:-translate-x-2 transition-transform duration-300" size={18} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Kembali</span>
        </button>

        {/* Page Container */}
        <div className="bg-white rounded-[45px] p-8 md:p-14 border border-sorgum-primary/5 shadow-xl">
          
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6">
            <div className="flex items-center gap-2 text-sorgum-accent font-bold uppercase tracking-widest text-[10px]">
              <Tag size={13} />
              <span>{category}</span>
            </div>
            <span className="w-1.5 h-1.5 bg-neutral-200 rounded-full"></span>
            
            <div className="flex items-center gap-2 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
              <Calendar size={13} />
              <span>{date}</span>
            </div>
            <span className="w-1.5 h-1.5 bg-neutral-200 rounded-full"></span>

            {/* Read Time indicator */}
            <div className="flex items-center gap-2 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
              <Clock size={13} className="text-neutral-400" />
              <span>{readTime} Menit Baca</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-sorgum-primary leading-tight font-semibold mb-8">
            {title}
          </h1>

          {/* Featured Image Frame */}
          <div className="aspect-video w-full rounded-[35px] overflow-hidden mb-12 shadow-xl border border-sorgum-primary/5">
            <img 
              src={featuredImage} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-700" 
              alt={title} 
            />
          </div>

          {/* Dynamic Article HTML Body Content */}
          <div 
            className="news-body text-neutral-700 font-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: bodyContent }}
          />

        </div>

        {/* RELATED ARTICLES SECTION */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 border-t border-sorgum-primary/10 pt-16">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-2.5 block">Warta Pilihan</span>
                <h3 className="font-serif text-3xl md:text-4xl text-sorgum-primary font-semibold italic">
                  Rekomendasi Lainnya
                </h3>
              </div>
              <Link 
                to="/berita"
                className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-sorgum-primary/50 hover:text-sorgum-primary transition-colors cursor-pointer"
              >
                <span>Lihat Semua Berita</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((item: any) => (
                <Link
                  key={item.id}
                  to={`/berita/${item.slug}`}
                  className="bg-white rounded-[35px] overflow-hidden border border-sorgum-primary/5 hover:border-sorgum-accent/40 shadow-md hover:shadow-xl transition-all duration-300 block flex flex-col h-full group"
                >
                  {/* Related Image */}
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={item.img} 
                      referrerPolicy="no-referrer" 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                      alt={item.title} 
                    />
                  </div>

                  {/* Body text snippet */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-sorgum-primary/5 text-[8px] uppercase font-bold tracking-widest text-sorgum-primary">
                          {item.category}
                        </span>
                      </div>
                      
                      <h4 className="font-serif text-lg font-semibold text-sorgum-primary group-hover:text-sorgum-accent transition-colors leading-snug line-clamp-2 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] uppercase font-bold tracking-widest text-sorgum-primary group-hover:text-sorgum-accent transition-colors pt-3 mt-4 border-t border-sorgum-primary/5 self-start">
                      <span>Baca</span>
                      <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.article>
  );
};

export default NewsDetail;
