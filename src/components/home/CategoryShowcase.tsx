import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';

interface CategoryStripItem {
  name: string;
  image: string;
  category: string;
}

const CATEGORY_STRIP_ITEMS: CategoryStripItem[] = [
  {
    name: 'Silk Slip Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&auto=format&fit=crop&q=80',
    category: 'Westernwear & Dresses'
  },
  {
    name: 'Evening Gowns',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&auto=format&fit=crop&q=80',
    category: 'Westernwear & Dresses'
  },
  {
    name: 'Riviera Dresses',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&auto=format&fit=crop&q=80',
    category: 'Westernwear & Dresses'
  },
  {
    name: 'Tweed Dresses',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&auto=format&fit=crop&q=80',
    category: 'Westernwear & Dresses'
  },
  {
    name: 'Suits & Tuxedos',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&auto=format&fit=crop&q=80',
    category: 'Suits & Tuxedos'
  },
  {
    name: 'Velvet Jackets',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80',
    category: 'Suits & Tuxedos'
  },
  {
    name: 'Dress Shirts',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&auto=format&fit=crop&q=80',
    category: 'Shirts & Polos'
  },
  {
    name: 'Gurkha Trousers',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&auto=format&fit=crop&q=80',
    category: 'Trousers & Chinos'
  },
  {
    name: 'Cashmere Knits',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&auto=format&fit=crop&q=80',
    category: 'Knitwear & Sweaters'
  }
];

export const CategoryShowcase: React.FC = () => {
  const { openCategory } = useECommerce();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 bg-white border-b border-gray-100 relative group/strip overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Horizontal Category Strip (Matches Screenshot 1) */}
        <div
          ref={scrollRef}
          className="flex items-start gap-3 sm:gap-4 overflow-x-auto pb-2 no-scrollbar scroll-smooth"
        >
          {CATEGORY_STRIP_ITEMS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => openCategory(item.category)}
              className="flex flex-col items-center flex-shrink-0 group cursor-pointer focus:outline-none"
            >
              {/* Rectangular Portrait Tile */}
              <div className="w-[100px] sm:w-[115px] aspect-[4/5] rounded overflow-hidden bg-gray-100 border border-gray-200/80 shadow-2xs group-hover:shadow-md transition-all duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Label Centered Below Tile */}
              <span className="text-xs sm:text-[13px] font-medium text-gray-800 group-hover:text-[#fc2779] mt-2 text-center transition-colors">
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {/* Scroll Arrows */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-1 top-1/2 -translate-y-8 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:text-black hover:bg-gray-50 items-center justify-center z-10 opacity-0 group-hover/strip:opacity-100 transition-opacity cursor-pointer"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-1 top-1/2 -translate-y-8 w-10 h-10 rounded-full bg-white shadow-xl border border-gray-200 text-gray-700 hover:text-[#fc2779] items-center justify-center z-10 cursor-pointer"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
