import React from 'react';
import { Crown, ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '../card/ProductCard';
import { useECommerce } from '../../context/ECommerceContext';

export const LuxeSection: React.FC = () => {
  const { openCategory, products } = useECommerce();
  
  // Select up to 4 high-end luxury couture ensembles
  const luxeProducts = products
    .filter((p) => p.isLuxe || p.brand === 'House of Masaba' || p.brand === 'Tarun Tahiliani' || p.brand === 'Sabyasachi Heritage')
    .slice(0, 4);

  return (
    <section className="py-16 bg-gradient-to-b from-[#fff5f8] via-[#fff9fb] to-white text-gray-900 overflow-hidden relative border-y border-pink-200/60">
      {/* Soft Ambient Radiance */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Luxury Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-pink-100 pb-8 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-[#fc2779] text-xs font-bold uppercase tracking-widest bg-pink-100/80 border border-pink-200 px-3 py-1 rounded-full mb-3 shadow-xs">
              <Crown className="w-3.5 h-3.5" />
              <span>THE HERITAGE COUTURE VAULT</span>
            </div>
            
            <div className="flex items-center gap-4">
              <img
                src="/old-money-horizontal-dark.png"
                alt="Old Money Luxe"
                className="h-10 w-auto object-contain"
              />
              <div className="h-7 w-[1.5px] bg-pink-200 hidden sm:block" />
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-gray-900 tracking-wider uppercase">
                LUXE <span className="italic font-normal text-[#fc2779]">COLLECTION</span>
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-xl font-normal leading-relaxed">
              Exclusive runway pieces, bespoke raw silks, and heirloom embroideries tailored for modern aristocracy.
            </p>
          </div>

          <button
            onClick={() => openCategory('Luxe', 'luxe')}
            className="inline-flex items-center gap-2 bg-[#fc2779] hover:bg-[#e0206b] text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg transition-all shadow-md shadow-pink-200 hover:shadow-lg cursor-pointer"
          >
            <span>EXPLORE LUXE ATELIER</span>
            <ArrowRight className="w-4 h-4" />
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
