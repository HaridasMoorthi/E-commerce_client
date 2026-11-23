import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';

interface StylistPick {
  id: string;
  headline: string;
  subcaption: string;
  image: string;
  category: string;
}

const STYLISTS_PICKS: StylistPick[] = [
  {
    id: 'spk-1',
    headline: 'DOUBLE BREASTED ERA',
    subcaption: 'Savile Row sharp suiting with roped shoulders',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
    category: 'Suits & Tuxedos'
  },
  {
    id: 'spk-2',
    headline: 'CASHMERE LAYERING',
    subcaption: 'Loro Piana cable knits & spread-collar polos',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80',
    category: 'Knitwear & Sweaters'
  },
  {
    id: 'spk-3',
    headline: 'PENNY LOAFERS',
    subcaption: 'Goodyear welted leather with hand-burnished patina',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    category: 'Shoes & Accessories'
  },
  {
    id: 'spk-4',
    headline: 'VELVET DINNER SUITS',
    subcaption: 'Midnight Italian velvet and silk grosgrain lapels',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    category: 'Suits & Tuxedos'
  },
  {
    id: 'spk-5',
    headline: 'GURKHA TAILORING',
    subcaption: 'High-waisted forward pleats in British flannel',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80',
    category: 'Trousers & Chinos'
  }
];

export const StylistsPicks: React.FC = () => {
  const { openCategory } = useECommerce();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-white border-b border-gray-100 relative group/stylists">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 tracking-tight">
          Stylists' Picks
        </h2>

        {/* Editorial Trends Grid / Carousel (Matches Screenshot 4) */}
        <div
          ref={scrollRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto pb-2 no-scrollbar"
        >
          {STYLISTS_PICKS.map((item) => (
            <div
              key={item.id}
              onClick={() => openCategory(item.category)}
              className="group relative aspect-[3/4] rounded-sm overflow-hidden bg-gray-900 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300"
            >
              {/* Full-Bleed Photography */}
              <img
                src={item.image}
                alt={item.headline}
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-4 text-center" />

              {/* Bold White Editorial Typography (Matches Screenshot 4) */}
              <div className="absolute inset-x-0 bottom-0 p-4 text-center z-10 space-y-1">
                <h3 className="text-lg sm:text-xl font-sans font-black text-white tracking-wide uppercase drop-shadow-md leading-tight group-hover:text-amber-200 transition-colors">
                  {item.headline}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/90 font-light leading-snug drop-shadow line-clamp-2">
                  {item.subcaption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Arrows */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-2 top-1/2 -translate-y-4 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:text-black items-center justify-center z-10 opacity-0 group-hover/stylists:opacity-100 transition-opacity cursor-pointer"
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
