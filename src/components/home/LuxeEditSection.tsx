import React from 'react';
import { ArrowUp, ArrowRight, Sparkles } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';

interface LuxeCategoryCard {
  title: string;
  image: string;
  category: string;
}

const LUXE_CATEGORIES: LuxeCategoryCard[] = [
  {
    title: 'Savile Row Suiting',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
    category: 'Suits & Tuxedos'
  },
  {
    title: 'Black-Tie Dinner Jackets',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    category: 'Suits & Tuxedos'
  },
  {
    title: 'Italian Cashmere Knits',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80',
    category: 'Knitwear & Sweaters'
  },
  {
    title: 'Goodyear Leather Loafers',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    category: 'Shoes & Accessories'
  }
];

export const LuxeEditSection: React.FC = () => {
  const { openCategory, storeContent } = useECommerce();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="luxe-edit-section" className="py-14 bg-[#380718] text-white relative overflow-hidden">
      {/* Subtle Ambient Red Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Luxe Edit Layout Grid (Matches Screenshot 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Large Hero Feature Card */}
          <div
            onClick={() => openCategory('Luxe', 'luxe')}
            className="lg:col-span-6 relative rounded-sm overflow-hidden bg-black/40 cursor-pointer group shadow-2xl min-h-[420px] sm:min-h-[500px] flex flex-col justify-end p-6 sm:p-10"
          >
            {/* Background Model Image with Western Evening Couture */}
            <img
              src={storeContent.luxeBannerImage || "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=85"}
              alt="Luxe Bespoke Runway"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
            
            {/* Rich Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Typography Overlay (Matches Screenshot 5) */}
            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>ATELIER EXCLUSIVE</span>
              </span>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-wide uppercase drop-shadow-lg leading-tight">
                {storeContent.luxeTitle || "LUXE BESPOKE"}
              </h2>
              
              <p className="text-xs sm:text-sm text-gray-200 font-light max-w-md drop-shadow">
                {storeContent.luxeSubtitle || "Immaculate Savile Row tailoring, Italian velvet dinner jackets & pure cashmere"}
              </p>

              <div className="pt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openCategory('Luxe', 'luxe');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-amber-300 transition-colors border-b border-white/50 pb-1"
                >
                  <span>DISCOVER THE COLLECTION</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of Curated Category Cards */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
            {LUXE_CATEGORIES.map((item, idx) => (
              <div
                key={idx}
                onClick={() => openCategory(item.category, 'luxe')}
                className="flex flex-col group cursor-pointer"
              >
                {/* Portrait Card */}
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-stone-900 shadow-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Title Below Image (Matches Screenshot 5) */}
                <span className="text-xs sm:text-sm font-medium text-white/95 group-hover:text-amber-300 mt-2 block transition-colors">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Scroll-to-Top Button (Matches Screenshot 5) */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-11 h-11 bg-white hover:bg-gray-100 text-gray-800 rounded-sm shadow-xl flex items-center justify-center z-40 border border-gray-200 transition-transform hover:-translate-y-1 cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </section>
  );
};
