import React from 'react';
import { useECommerce } from '../../context/ECommerceContext';
import { ProductCard } from '../card/ProductCard';
import { Filter, Sparkles } from 'lucide-react';
import { SortDropdown } from './SortDropdown';

export const ProductGrid: React.FC = () => {
  const { filteredProducts, filters, resetFilters } = useECommerce();

  return (
    <div className="flex-1">
      {/* Top Bar: Title, Count, Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-gray-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
            {filters.category ? filters.category : 'All Fashion Collections'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Showing <span className="font-bold text-gray-800">{filteredProducts.length}</span> curated items
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SortDropdown />
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center max-w-md mx-auto my-12 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center mx-auto">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No matching garments found</h3>
          <p className="text-xs text-gray-500">
            Try adjusting your price range, clearing brand filters, or exploring broader styles like "Dresses" or "Evening Wear".
          </p>
          <button
            onClick={resetFilters}
            className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-6 py-2.5 rounded uppercase tracking-wider transition-colors"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        /* Responsive Product Grid */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product, idx) => (
            <React.Fragment key={product.id}>
              <ProductCard product={product} />

              {/* Interstitial Promo Tile after every 6th card */}
              {idx === 5 && (
                <div className="col-span-2 bg-gradient-to-r from-[#111827] to-[#1e293b] rounded-md p-6 text-white flex flex-col justify-between shadow-md relative overflow-hidden border border-gray-800">
                  <div className="relative z-10 space-y-2">
                    <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      PRIVILEGE REWARD
                    </span>
                    <h4 className="text-xl font-serif font-bold leading-tight">
                      Enjoy Extra ₹1,000 OFF with Privilege Code LEGACY1000
                    </h4>
                    <p className="text-xs text-gray-300">
                      Valid on bespoke tailoring & luxury orders above ₹3,999. Apply coupon in bag.
                    </p>
                  </div>
                  <div className="relative z-10 pt-4">
                    <span className="bg-amber-100 text-amber-950 text-xs font-bold px-4 py-1.5 rounded inline-block shadow">
                      CODE: LEGACY1000
                    </span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
