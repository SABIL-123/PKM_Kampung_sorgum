import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-white flex flex-col items-center justify-center animate-pulse px-6">
      <div className="w-48 h-4 bg-neutral-200 rounded-full mb-8"></div>
      <div className="w-full max-w-3xl h-16 bg-neutral-200 rounded-2xl mb-6"></div>
      <div className="w-full max-w-2xl h-16 bg-neutral-200 rounded-2xl mb-16"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="aspect-[4/5] bg-neutral-200 rounded-[40px] w-full"></div>
        ))}
      </div>
    </div>
  );
};
