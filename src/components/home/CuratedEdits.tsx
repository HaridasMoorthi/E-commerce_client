import React from 'react';
import { CURATED_MOODBOARDS } from '../../data/banners';
import { useECommerce } from '../../context/ECommerceContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CuratedEdits: React.FC = () => {
  const { openCategory } = useECommerce();

  return (
    <section className="py-16 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-50 text-amber-800 border border-amber-200 mb-2">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>EDITORIAL MOODBOARDS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">
            Shop By Concept & Occasion
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 font-normal leading-relaxed">
            Stylist-curated editorials blending old-world aristocratic heritage with effortless contemporary chic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CURATED_MOODBOARDS.map((board) => (
            <div
              key={board.id}
              onClick={() => openCategory(board.category)}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] cursor-pointer shadow-lg border border-stone-200/80 hover:border-amber-400/90 transition-all duration-500"
            >
              <img
                src={board.image}
                alt={board.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

              <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end text-white space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 font-serif">
                  CURATED SILHOUETTE
                </span>
                <h3 className="text-2xl font-serif font-black leading-tight group-hover:text-amber-200 transition-colors">
                  {board.title}
                </h3>
                <p className="text-xs text-stone-200 line-clamp-2 font-light leading-relaxed">
                  {board.description}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 group-hover:text-amber-100 transition-colors">
                  <span className="border-b border-amber-400/50 pb-0.5">DISCOVER THE EDIT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
