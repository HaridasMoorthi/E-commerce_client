import React from 'react';
import { useECommerce } from '../../context/ECommerceContext';
import { BRANDS, CATEGORIES } from '../../data/categories';
import { X, RotateCcw } from 'lucide-react';

export const FilterSidebar: React.FC = () => {
  const { filters, setFilters, resetFilters } = useECommerce();

  const handleBrandToggle = (brandName: string) => {
    setFilters((prev) => {
      const exists = prev.brands.includes(brandName);
      return {
        ...prev,
        brands: exists ? prev.brands.filter((b) => b !== brandName) : [...prev.brands, brandName]
      };
    });
  };

  const handleDiscountChange = (discount: number) => {
    setFilters((prev) => ({ ...prev, minDiscount: discount }));
  };

  const handlePriceChange = (max: number) => {
    setFilters((prev) => ({ ...prev, priceRange: [0, max] }));
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-5 space-y-6 self-start sticky top-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900">
          Filters
        </h3>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-black hover:underline"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Category</h4>
        <div className="space-y-1.5 max-h-40 overflow-y-auto text-xs text-gray-600 no-scrollbar">
          {['Indianwear', 'Westernwear', 'Footwear', 'Jewellery & Bags', 'Topwear'].map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() => setFilters((prev) => ({ ...prev, category: cat }))}
                className="accent-gray-900 w-3.5 h-3.5"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Multi-select */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Brand</h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto text-xs text-gray-600">
          {BRANDS.map((brand) => (
            <label key={brand.id} className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand.name)}
                onChange={() => handleBrandToggle(brand.name)}
                className="accent-gray-900 rounded w-3.5 h-3.5"
              />
              <span className="truncate">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Max Price</h4>
          <span className="text-xs font-bold text-gray-900 font-mono">
            ₹{filters.priceRange[1].toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="35000"
          step="500"
          value={filters.priceRange[1]}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full accent-gray-900 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>₹1,000</span>
          <span>₹35,000</span>
        </div>
      </div>

      {/* Discount Filter */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Discount</h4>
        <div className="space-y-1.5 text-xs text-gray-600">
          {[30, 40, 50, 60].map((d) => (
            <label key={d} className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
              <input
                type="radio"
                name="discount"
                checked={filters.minDiscount === d}
                onChange={() => handleDiscountChange(d)}
                className="accent-gray-900 w-3.5 h-3.5"
              />
              <span>{d}% and above</span>
            </label>
          ))}
        </div>
      </div>

      {/* Luxe Toggle */}
      <div className="pt-2 border-t border-gray-100">
        <label className="flex items-center gap-2 cursor-pointer bg-amber-50 p-2.5 rounded-md border border-amber-200">
          <input
            type="checkbox"
            checked={!!filters.isLuxeOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, isLuxeOnly: e.target.checked }))}
            className="accent-amber-600 w-4 h-4"
          />
          <span className="text-xs font-bold text-amber-900 uppercase">
            Nykaa Luxe Only
          </span>
        </label>
      </div>
    </aside>
  );
};
