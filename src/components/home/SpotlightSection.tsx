import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';

interface SpotlightBrand {
  id: string;
  brandName: string;
  logoText: string;
  image: string;
  discount: string;
  subtitle: string;
  category: string;
}

const SPOTLIGHT_BRANDS: SpotlightBrand[] = [
  {
    id: 'sp-1',
    brandName: 'Savile Row Bespoke',
    logoText: 'SAVILE ROW',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=700&auto=format&fit=crop&q=85',
    discount: 'Up to 50% off',
    subtitle: 'British Bespoke Suiting & Dinner Tuxedos',
    category: 'Suits & Tuxedos'
  },
  {
    id: 'sp-2',
    brandName: 'Brioni Milano',
    logoText: 'BRIONI MILANO',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&auto=format&fit=crop&q=85',
    discount: 'Up to 50% off',
    subtitle: 'Italian Sartorial Excellence & Giza Shirts',
    category: 'Suits & Tuxedos'
  },
  {
    id: 'sp-3',
    brandName: 'Ralph Lauren',
    logoText: 'PURPLE LABEL',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=700&auto=format&fit=crop&q=85',
    discount: 'Min 40% off',
    subtitle: 'High-Waisted Wool Flannel Gurkhas',
    category: 'Trousers & Chinos'
  },
  {
    id: 'sp-4',
    brandName: 'Tom Ford',
    logoText: 'TOM FORD',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&auto=format&fit=crop&q=85',
    discount: 'Min 45% off',
    subtitle: 'Silk Velvet Peak Lapel Dinner Jackets',
    category: 'Suits & Tuxedos'
  },
  {
    id: 'sp-5',
    brandName: 'Loro Piana',
    logoText: 'LORO PIANA',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&auto=format&fit=crop&q=85',
    discount: 'Up to 40% off',
    subtitle: 'Finest Grade-A Mongolian Cashmere',
    category: 'Knitwear & Sweaters'
  }
];

export const SpotlightSection: React.FC = () => {
  const { openCategory, storeContent } = useECommerce();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-white border-b border-gray-100 relative group/spotlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {storeContent.spotlightTitle || 'In the Spotlight'}
          </h2>
          {storeContent.spotlightSubtitle && (
            <p className="text-xs text-gray-500 mt-1">{storeContent.spotlightSubtitle}</p>
          )}
        </div>

        {/* Brand Spotlight Grid / Scroll (Matches Screenshot 2) */}
        <div
          ref={scrollRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto pb-2 no-scrollbar"
        >
          {SPOTLIGHT_BRANDS.map((item) => (
            <div
              key={item.id}
              onClick={() => openCategory(item.category)}
              className="flex flex-col group cursor-pointer"
            >
              {/* Media Card */}
              <div className="relative aspect-[4/5] rounded overflow-hidden bg-gray-100 border border-gray-200/60 shadow-2xs group-hover:shadow-lg transition-all duration-300">
                <img
                  src={item.image}
                  alt={item.brandName}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Bottom Gradient Overlay for Logo */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
                  <div className="text-white">
                    {item.brandName === 'Libas' ? (
                      <span className="font-serif italic font-bold text-2xl tracking-wide drop-shadow-md">
                        {item.logoText}
                      </span>
                    ) : item.brandName === 'adidas' ? (
                      <span className="font-sans font-black text-xl tracking-tighter lowercase drop-shadow-md">
                        {item.logoText}
                      </span>
                    ) : (
                      <span className="font-sans font-extrabold text-lg tracking-widest uppercase drop-shadow-md">
                        {item.logoText}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Text Below Card (Matches Screenshot 2) */}
              <div className="pt-2 text-left">
                <span className="block text-sm font-bold text-gray-900 group-hover:text-[#fc2779] transition-colors leading-tight">
                  {item.discount}
                </span>
                <span className="block text-xs text-gray-500 mt-0.5 font-normal truncate">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Arrows */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-2 top-1/2 -translate-y-4 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:text-black items-center justify-center z-10 opacity-0 group-hover/spotlight:opacity-100 transition-opacity cursor-pointer"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-2 top-1/2 -translate-y-4 w-10 h-10 rounded-full bg-white shadow-xl border border-gray-200 text-gray-700 hover:text-[#fc2779] items-center justify-center z-10 cursor-pointer"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
