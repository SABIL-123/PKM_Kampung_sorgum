import React from 'react';
import { motion } from 'motion/react';

interface PageHeaderBannerProps {
  badge: string;
  title: string;
  description?: string;
}

export default function PageHeaderBanner({ badge, title, description }: PageHeaderBannerProps) {
  return (
    <div className="text-center mb-16 max-w-4xl mx-auto px-4 select-none">
      <div className="relative inline-block mt-4 mb-6">
        {/* Left cylinder roll */}
        <div className="absolute -left-3.5 top-[-4px] bottom-[-4px] w-7 bg-gradient-to-r from-[#875306] via-[#FFE299] to-[#C98B1B] rounded-l-full shadow-[inset_2px_0_4px_rgba(0,0,0,0.4),-6px_6px_12px_rgba(0,0,0,0.15)] border-y-[3px] border-l-[3px] border-[#875306] z-20"></div>
        
        {/* Right cylinder roll */}
        <div className="absolute -right-3.5 top-[-4px] bottom-[-4px] w-7 bg-gradient-to-l from-[#875306] via-[#FFE299] to-[#C98B1B] rounded-r-full shadow-[inset_-2px_0_4px_rgba(0,0,0,0.4),6px_6px_12px_rgba(0,0,0,0.15)] border-y-[3px] border-r-[3px] border-[#875306] z-20"></div>

        {/* Central main banner sheet */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative px-12 sm:px-20 py-7 sm:py-9 bg-gradient-to-r from-[#D48D1D] via-[#FFFCF4] to-[#D48D1D] border-y-[3px] border-[#875306] shadow-[0_12px_30px_rgba(212,141,29,0.15)] z-10"
        >
          {/* Inner elegant gold-brown border line */}
          <div className="absolute inset-1.5 border border-[#B8860B]/30 pointer-events-none rounded-sm"></div>

          {/* Badge (Upper title) */}
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-extrabold text-[#915B06] mb-3 block drop-shadow-sm font-sans">
            {badge}
          </span>
          
          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#4D3100] font-bold leading-tight drop-shadow-sm tracking-wide">
            {title}
          </h1>
        </motion.div>
      </div>

      {/* Description below the banner */}
      {description && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-500 dark:text-neutral-500 text-sm sm:text-base font-light mt-4 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
