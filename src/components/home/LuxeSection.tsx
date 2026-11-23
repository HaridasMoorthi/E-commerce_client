import React from 'react';
import { Crown, ArrowRight } from 'lucide-react';
import { ProductCard } from '../card/ProductCard';
import { useECommerce } from '../../context/ECommerceContext';

export const LuxeSection: React.FC = () => {
  const { openCategory, products } = useECommerce();
  
  // Select up to 4 high-end luxury couture ensembles
  const luxeProducts = products
    .filter((p) => p.isLuxe || p.brand === 'House of Masaba' || p.brand === 'Tarun Tahiliani' || p.brand === 'Sabyasachi Heritage')
    .slice(0, 4);

  return (
    <section className="py-18 bg-[#0b0e14] text-white overflow-hidden relative border-y border-amber-500/20">
      {/* Soft Gold & Amber Ambient Radiance */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Luxury Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest bg-amber-950/60 border border-amber-400/30 px-3.5 py-1 rounded-full mb-3 shadow-md">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>THE HERITAGE COUTURE VAULT</span>
            </div>
            
            <div className="flex items-center gap-4">
              <img
                src="/old-money-horizontal-gold.png"
                alt="Old Money Luxe"
                className="h-9 sm:h-10 w-auto object-contain"
              />
              <div className="h-7 w-[1px] bg-amber-500/40 hidden sm:block" />
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-wider uppercase">
                LUXE <span className="italic font-normal text-amber-300 font-serif">COLLECTION</span>
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-xl font-light leading-relaxed">
              Exclusive runway pieces, bespoke raw silks, pure Banarasi gold zari & heirloom jewels tailored for timeless aristocracy.
            </p>
          </div>

          <button
            onClick={() => openCategory('Luxe', 'luxe')}
            className="group/luxe inline-flex items-center gap-3 bg-[#c5a880] hover:bg-[#d8be98] text-stone-950 font-bold text-xs uppercase tracking-widest px-7 py-3.5 rounded-sm transition-all shadow-xl shadow-amber-950/50 hover:shadow-amber-500/20 cursor-pointer"
          >
            <span>EXPLORE LUXE ATELIER</span>
            <ArrowRight className="w-4 h-4 group-hover/luxe:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid - Full 4-Column Balanced Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {luxeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
