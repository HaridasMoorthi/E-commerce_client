import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';

interface CelebrateCard {
  id: string;
  oneWord: string;
  subtitle: string;
  tag: string;
  badge: string;
  image: string;
  discount: string;
  category: string;
}

const CELEBRATE_ITEMS: CelebrateCard[] = [
  {
    id: 'cel-1',
    oneWord: 'SILK SLIP',
    subtitle: 'Ascot 22-Momme Bias Mulberry Slips',
    tag: 'Haute Soirée',
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=85',
    discount: 'Up to 50% off',
    category: 'Westernwear & Dresses'
  },
  {
    id: 'cel-2',
    oneWord: 'GALA GOWN',
    subtitle: 'Emerald Velvet Backless High-Slit Gowns',
    tag: 'Black Tie Gala',
    badge: 'Tom Ford Couture',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=85',
    discount: 'Min 45% off',
    category: 'Westernwear & Dresses'
  },
  {
    id: 'cel-3',
    oneWord: 'RIVIERA DRESS',
    subtitle: 'Pleated Normandy Linen Summer Silhouettes',
    tag: 'Mediterranean Estate',
    badge: 'New Season',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=85',
    discount: 'Up to 50% off',
    category: 'Westernwear & Dresses'
  },
  {
    id: 'cel-4',
    oneWord: 'TWEED BOUCLÉ',
    subtitle: 'Pearl-Buttoned Double-Breasted Dresses',
    tag: 'Chanel Atelier',
    badge: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=85',
    discount: 'Min 40% off',
    category: 'Westernwear & Dresses'
  },
  {
    id: 'cel-5',
    oneWord: 'TUXEDO',
    subtitle: 'Savile Row Super 150s Dinner Suits',
    tag: 'British Bespoke',
    badge: 'Savile Row',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=85',
    discount: 'Min 40% off',
    category: 'Suits & Tuxedos'
  }
];

export const StylesToCelebrate: React.FC = () => {
  const { openCategory } = useECommerce();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-white border-b border-gray-100 relative group/celebrate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Styles To Celebrate In
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Curated Savile Row suiting, black-tie velvet tuxedos, and bespoke Italian tailoring for gentlemen soirees.
            </p>
          </div>

          <button
            onClick={() => openCategory('Suits & Tuxedos')}
            className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#fc2779] hover:underline cursor-pointer"
          >
            <span>VIEW ALL MENSWEAR</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Professional Full-Bleed Editorial Cards with One-Word Headlines */}
        <div
          ref={scrollRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto pb-2 no-scrollbar"
        >
          {CELEBRATE_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => openCategory(item.category)}
              className="flex flex-col group cursor-pointer"
            >
              {/* Professional Media Card */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden bg-slate-950 shadow-sm group-hover:shadow-xl transition-all duration-500 border border-slate-200/80">
                {/* Full-Bleed Photography */}
                <img
                  src={item.image}
                  alt={item.oneWord}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Luxury Gradient Scrim for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35 group-hover:via-black/35 transition-colors" />

                {/* Top Badge Overlay */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/95 bg-black/45 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                    {item.tag}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-amber-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-400/30 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                    <span>{item.badge}</span>
                  </span>
                </div>

                {/* The ONE WORD Bold Editorial Headline Built Right on Top of the Image */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-center z-10 flex flex-col items-center justify-end">
                  <h3 className="font-serif font-black text-2xl sm:text-3xl tracking-widest text-white uppercase drop-shadow-lg leading-tight group-hover:text-amber-300 group-hover:scale-105 transition-all duration-300">
                    {item.oneWord}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-white/90 font-medium tracking-wide mt-1 drop-shadow-md line-clamp-1">
                    {item.subtitle}
                  </p>

                  {/* Sleek CTA Pill Built on Top of Image */}
                  <div className="mt-2.5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-slate-900 font-bold text-[11px] shadow-md group-hover:bg-[#fc2779] group-hover:text-white transition-all">
                    <span>{item.discount}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Text Below Card */}
              <div className="pt-2 text-center">
                <span className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#fc2779] transition-colors block">
                  {item.discount}
                </span>
                <span className="text-[11px] text-gray-500 font-medium block truncate mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Arrows */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-2 top-1/2 -translate-y-4 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:text-black items-center justify-center z-10 opacity-0 group-hover/celebrate:opacity-100 transition-opacity cursor-pointer"
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
