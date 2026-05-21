import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

const NewsDetail = ({ cmsPosts }: { cmsPosts?: any[] }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = cmsPosts?.find((p: any) => p.slug === slug && p.status === 'published');

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
      className="py-24 bg-white"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/berita')}
          className="flex items-center gap-2 text-sorgum-primary/50 hover:text-sorgum-primary mb-12 transition-colors group"
        >
          <ArrowLeft className="group-hover:-translate-x-2 transition-transform" size={18} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Kembali</span>
        </button>

        {/* Header Metadata */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2 text-sorgum-accent font-bold uppercase tracking-widest text-[10px]">
            <Tag size={12} />
            <span>{category}</span>
          </div>
          <span className="w-1.5 h-1.5 bg-neutral-200 rounded-full"></span>
          <div className="flex items-center gap-2 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
            <Calendar size={12} />
            <span>{date}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-serif text-5xl md:text-6xl text-sorgum-primary italic leading-tight mb-8">
          {title}
        </h1>

        {/* Featured Image */}
        <div className="aspect-video w-full rounded-[40px] overflow-hidden mb-12 shadow-2xl">
          <img 
            src={featuredImage} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
            alt={title} 
          />
        </div>

        {/* Rich Text Body Content */}
        <div 
          className="news-body text-neutral-700 font-light"
          dangerouslySetInnerHTML={{ __html: bodyContent }}
        />
      </div>
    </motion.article>
  );
};

export default NewsDetail;
