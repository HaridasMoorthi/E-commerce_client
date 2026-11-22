import React from 'react';
import { CURATED_MOODBOARDS } from '../../data/banners';
import { useECommerce } from '../../context/ECommerceContext';
import { ArrowRight } from 'lucide-react';

export const CuratedEdits: React.FC = () => {
  const { openCategory } = useECommerce();

  return (
    <section className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#fc2779] bg-pink-50 px-3 py-1 rounded-full border border-pink-200 mb-2">
            STYLE EDITORIAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-gray-900 mt-1">
            Shop By Concept & Occasion
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Stylist-approved moodboards crafted to answer your “what do I wear” dilemma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CURATED_MOODBOARDS.map((board) => (
            <div
              key={board.id}
              onClick={() => openCategory(board.category)}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] cursor-pointer shadow-md"
            >
              <img
                src={board.image}
                alt={board.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
                <h3 className="text-xl font-serif font-bold leading-tight group-hover:text-amber-200 transition-colors">
                  {board.title}
                </h3>
                <p className="text-xs text-gray-200 line-clamp-2 font-light">
                  {board.description}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-amber-300 transition-colors">
                  <span>DISCOVER THE EDIT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
