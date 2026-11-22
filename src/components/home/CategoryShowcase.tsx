import React from 'react';
import { QUICK_CATEGORIES } from '../../data/categories';
import { useECommerce } from '../../context/ECommerceContext';

export const CategoryShowcase: React.FC = () => {
  const { openCategory } = useECommerce();

  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
              Explore by Category
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Curated collections across Indian wear, Western wear, footwear & designer edits
            </p>
          </div>
          <button
            onClick={() => openCategory('Indianwear')}
            className="text-xs font-bold text-gray-900 hover:text-amber-800 hover:underline uppercase tracking-wider"
          >
            View All Categories
          </button>
        </div>

        {/* Circular Category Row */}
        <div className="flex items-center gap-6 overflow-x-auto pb-4 no-scrollbar">
          {QUICK_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => openCategory(cat.category)}
              className="flex flex-col items-center flex-shrink-0 group focus:outline-none"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border-2 border-transparent group-hover:border-gray-900 transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 shadow-inner">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-800 group-hover:text-black mt-2 text-center max-w-[90px] leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
