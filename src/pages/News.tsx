import React from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

const News = ({ pageData, cmsPosts }: { pageData?: any, cmsPosts?: any[] }) => {

  const heroData = pageData?.content?.find((c: any) => c.type === 'hero')?.data;
  const feedData = pageData?.content?.find((c: any) => c.type === 'dynamic-post-feed')?.data;
  
  // Filter posts based on selected IDs from CMS, or fallback to all posts if empty
  let selectedPosts = cmsPosts || [];
  if (feedData?.selected_post_ids && feedData.selected_post_ids.length > 0) {
    selectedPosts = selectedPosts.filter((post: any) => feedData.selected_post_ids.includes(post.id));
  }

  const news = selectedPosts.map((post: any) => ({
    id: post.id,
    date: new Date(post.created_at || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    category: post.category || "Berita",
    title: post.title || "Berita Sorgum",
    desc: post.content?.[0]?.body_content?.replace(/<[^>]+>/g, '')?.replace(/&nbsp;/g, ' ') || "",
    img: post.content?.[0]?.featured_image || "https://images.unsplash.com/photo-1615810757271-92fd5896a25b?q=80&w=2574&auto=format&fit=crop"
  }));

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sorgum-accent mb-4 block">Kabar Terbaru</span>
          <h2 className="font-serif text-5xl text-sorgum-primary italic">{heroData?.headline || "Berita Sorgum Indonesia"}</h2>
        </div>

        {news.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-sorgum-primary" size={32} />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item: any, i: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-video bg-neutral-100 rounded-[30px] overflow-hidden mb-6">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="News" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-sorgum-accent">{item.category}</span>
                  <span className="w-1 h-1 bg-neutral-200 rounded-full"></span>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400">{item.date}</span>
                </div>
                <h3 className="font-serif text-2xl text-sorgum-primary mb-3 group-hover:text-sorgum-accent transition-colors leading-tight">{item.title}</h3>
                <p className="text-sm text-neutral-500 font-light line-clamp-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
