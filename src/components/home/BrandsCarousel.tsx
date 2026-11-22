import React from 'react';
import { BRANDS } from '../../data/categories';
import { useECommerce } from '../../context/ECommerceContext';

export const BrandsCarousel: React.FC = () => {
  const { openCategory } = useECommerce();

  return (
    <section className="py-14 bg-gray-50/70 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#fc2779] bg-pink-50 px-3 py-1 rounded-full border border-pink-200 mb-2">
            OFFICIAL BRAND PARTNERS
          </span>
          <h2 className="text-2xl font-serif font-black text-gray-900 mt-1">
            Heritage Houses & Designers
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Discover verified collections from India’s foremost ateliers & global houses
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              onClick={() => openCategory('Indianwear')}
              className="bg-white border border-gray-200/80 rounded-lg p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gray-900 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 mb-3 group-hover:scale-105 transition-transform">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-900 group-hover:text-black line-clamp-1">
                {brand.name}
              </span>
              {brand.isLuxe ? (
                <span className="mt-1 text-[9px] uppercase font-bold text-[#fc2779] bg-pink-100 px-2 py-0.5 rounded">
                  Luxe Label
                </span>
              ) : (
                <span className="mt-1 text-[9px] uppercase font-semibold text-gray-400">
                  Up to 60% Off
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
