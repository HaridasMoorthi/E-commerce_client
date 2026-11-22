import React, { useState } from 'react';
import { Search, X, Sparkles, TrendingUp } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';
import { PRODUCTS } from '../../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, performSearch } = useECommerce();
  const [localQuery, setLocalQuery] = useState('');

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Kurta Sets',
    'Anarkali',
    'Midi Dresses',
    'Sarees',
    'Heels',
    'Tote Bags',
    'Men Kurtas',
    'Biba',
    'RSVP'
  ];

  const suggestedProducts = localQuery
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(localQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(localQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(localQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      performSearch(localQuery.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 p-4 sm:p-6 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200">
        
        {/* Search Bar Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-gray-200 p-4">
          <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search for Kurtas, Dresses, Handbags, Designers..."
            className="w-full text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none font-medium"
          />
          {localQuery && (
            <button
              type="button"
              onClick={() => setLocalQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-bold text-gray-500 hover:text-gray-900 uppercase"
          >
            Cancel
          </button>
        </form>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Trending Searches Pills */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              <TrendingUp className="w-4 h-4 text-amber-700" />
              <span>Trending Searches on Old Money</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => performSearch(term)}
                  className="bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-700 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Instant Product Matches */}
          {suggestedProducts.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Suggested Styles
              </span>
              <div className="grid grid-cols-2 gap-3">
                {suggestedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => performSearch(p.title)}
                    className="flex items-center gap-3 p-2 rounded-lg border border-gray-100 hover:border-gray-900 hover:bg-gray-50 cursor-pointer transition-all"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-12 aspect-[3/4] object-cover rounded bg-gray-100"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-gray-400 block truncate">
                        {p.brand}
                      </span>
                      <h5 className="text-xs font-medium text-gray-800 truncate">
                        {p.title}
                      </h5>
                      <span className="text-xs font-bold text-gray-900">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
