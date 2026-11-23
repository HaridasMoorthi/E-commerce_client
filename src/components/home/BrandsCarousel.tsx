import React from 'react';
import { Crown, ArrowRight, Sparkles } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';

interface FeaturedAtelier {
  id: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  category: string;
}

const FEATURED_ATELIERS: FeaturedAtelier[] = [
  {
    id: 'at-1',
    name: 'Savile Row Bespoke',
    tag: 'BRITISH BESPOKE TAILORING',
    description: 'Double-breasted Super 150s wool tuxedos & peak-lapel evening suits',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=700&auto=format&fit=crop&q=85',
    category: 'Suits & Tuxedos'
  },
  {
    id: 'at-2',
    name: 'Brioni Milano',
    tag: 'ITALIAN SARTORIAL EXCELLENCE',
    description: 'Handcrafted Egyptian cotton dress shirts & velvet dinner jackets',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&auto=format&fit=crop&q=85',
    category: 'Suits & Tuxedos'
  },
  {
    id: 'at-3',
    name: 'Ralph Lauren Purple Label',
    tag: 'HERITAGE GENTLEMAN',
    description: 'Pure cashmere cable-knits & high-waisted pleated Gurkha flannels',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=700&auto=format&fit=crop&q=85',
    category: 'Trousers & Chinos'
  },
  {
    id: 'at-4',
    name: 'Tom Ford Tailoring',
    tag: 'MODERN BLACK-TIE',
    description: 'Architectural silk satin peak lapels & midnight velvet eveningwear',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&auto=format&fit=crop&q=85',
    category: 'Suits & Tuxedos'
  },
  {
    id: 'at-5',
    name: 'Loro Piana Atelier',
    tag: 'QUIET LUXURY CASHMERE',
    description: 'Mongolian two-ply cashmere overcoats, polo knits & travel layers',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&auto=format&fit=crop&q=85',
    category: 'Knitwear & Sweaters'
  }
];

const ALL_PARTNER_BRANDS = [
  'SAVILE ROW BESPOKE',
  'BRIONI MILANO',
  'RALPH LAUREN PURPLE LABEL',
  'TOM FORD TAILORING',
  'LORO PIANA',
  'ZEGNA SARTORIA',
  'CANALI 1934',
  'HACKETT LONDON',
  'CHURCHS SHOEMAKERS',
  'PATEK & HOROLOGY'
];

export const BrandsCarousel: React.FC = () => {
  const { openCategory } = useECommerce();

  return (
    <section className="py-16 bg-[#faf9f6] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 mb-2">
              <Crown className="w-3.5 h-3.5 text-amber-700" />
              <span>COUTURE HOUSES & MASTER DESIGNERS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">
              The Designer Atelier Showcase
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Direct from the ateliers of India’s most celebrated couturiers and contemporary global fashion houses.
            </p>
          </div>

          <button
            onClick={() => openCategory('Indianwear')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-amber-800 uppercase tracking-widest transition-colors cursor-pointer group"
          >
            <span>VIEW ALL ATELIERS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Elite Editorial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-12">
          {FEATURED_ATELIERS.map((atelier) => (
            <div
              key={atelier.id}
              onClick={() => openCategory(atelier.category)}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-stone-900 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-stone-200/60 hover:border-amber-400"
            >
              {/* Full-bleed Editorial Photography */}
              <img
                src={atelier.image}
                alt={atelier.name}
                className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white space-y-1.5 z-10">
                <span className="text-[9px] font-bold uppercase tracking-widest text-amber-300 font-serif">
                  {atelier.tag}
                </span>
                
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors leading-tight">
                  {atelier.name}
                </h3>
                
                <p className="text-[11px] text-stone-300 font-light leading-snug line-clamp-2">
                  {atelier.description}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-300 group-hover:text-white transition-colors">
                  <span className="border-b border-amber-400/40 pb-0.5">DISCOVER ATELIER</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Luxury Brand Marquee Bar */}
        <div className="bg-white rounded-lg p-5 border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between gap-6 overflow-x-auto no-scrollbar py-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 flex-shrink-0 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>OFFICIAL PARTNERS:</span>
            </span>
            <div className="flex items-center gap-6 sm:gap-8 flex-nowrap whitespace-nowrap">
              {ALL_PARTNER_BRANDS.map((brandName, idx) => (
                <button
                  key={idx}
                  onClick={() => openCategory('Indianwear')}
                  className="text-xs sm:text-[13px] font-serif font-bold tracking-widest text-stone-700 hover:text-stone-950 hover:underline uppercase transition-colors cursor-pointer"
                >
                  {brandName}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
