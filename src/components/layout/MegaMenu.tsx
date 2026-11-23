import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { useECommerce } from '../../context/ECommerceContext';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MegaMenuProps {
  categoryId: string;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ categoryId, onClose }) => {
  const { openCategory } = useECommerce();
  const category = CATEGORIES.find((c) => c.id === categoryId);

  if (!category) return null;

  return (
    <div className="absolute top-0 left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-50 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Subcategory Columns (Columns 1 to 8) */}
          <div className="col-span-8 grid grid-cols-3 gap-6">
            {category.subcategories.map((sub) => (
              <div key={sub.id} className="space-y-3">
                <button
                  onClick={() => {
                    openCategory(sub.name, category.gender);
                    onClose();
                  }}
                  className="font-bold text-xs text-gray-900 hover:text-black tracking-widest uppercase block text-left"
                >
                  {sub.name}
                </button>
                <ul className="space-y-2 border-l-2 border-amber-100 pl-3">
                  {sub.items?.map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => {
                          openCategory(item, category.gender);
                          onClose();
                        }}
                        className="text-xs text-gray-600 hover:text-black hover:translate-x-1 transition-transform block text-left font-medium"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Editorial Banner (Columns 9 to 12) */}
          <div className="col-span-4 bg-gradient-to-br from-[#1e1e24] to-[#111317] text-white rounded-xl p-5 border border-gray-800 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-300 bg-amber-950/60 border border-amber-800/40 px-2.5 py-1 rounded-full shadow-sm">
                <Sparkles className="w-3 h-3" />
                HERITAGE CURATION
              </span>
              <h4 className="text-lg font-serif font-bold text-white leading-snug">
                Savile Row & Italian Sartorial Gentlemen Edit
              </h4>
              <p className="text-xs text-gray-400 font-light">
                Hand-tailored wool suits, black-tie tuxedos, pure Mongolian cashmere & Goodyear welted leather.
              </p>
            </div>

            <div className="mt-4 relative rounded-lg overflow-hidden h-40 group cursor-pointer shadow-md">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <button
                  onClick={() => {
                    openCategory(category.name, category.gender);
                    onClose();
                  }}
                  className="w-full bg-white text-gray-900 hover:bg-black hover:text-white text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
                >
                  <span>EXPLORE {category.name.toUpperCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
