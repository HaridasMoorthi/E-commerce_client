import React from 'react';
import { useECommerce } from '../../context/ECommerceContext';
import { ArrowUpDown } from 'lucide-react';

export const SortDropdown: React.FC = () => {
  const { filters, setFilters } = useECommerce();

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-500 font-medium hidden sm:inline flex items-center gap-1">
        <ArrowUpDown className="w-3.5 h-3.5" />
        Sort By:
      </span>
      <select
        value={filters.sortBy}
        onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
        className="bg-white border border-gray-300 rounded px-3 py-1.5 font-semibold text-gray-800 focus:outline-none focus:border-gray-900 cursor-pointer"
      >
        <option value="relevance">Popularity / Relevance</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="discount">Highest Discount</option>
        <option value="rating">Customer Rating</option>
      </select>
    </div>
  );
};
