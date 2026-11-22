import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';

export const HeroSlider: React.FC = () => {
  const { openCategory, banners } = useECommerce();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[currentSlide] || banners[0];

  return (
    <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] bg-gray-900 overflow-hidden group">
      {/* Background Image with Dark Gradient Overlay */}
      <img
        src={banner.desktopImage}
        alt={banner.title}
        className="w-full h-full object-cover object-center transition-all duration-1000 transform scale-100 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

      {/* Content Container */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <div className="max-w-xl space-y-4 text-white">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg bg-[#fc2779] text-white"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {banner.tag}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black leading-tight text-white drop-shadow-md">
              {banner.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-100 font-light drop-shadow">
              {banner.subtitle}
            </p>
            <div className="pt-2">
              <button
                onClick={() => openCategory(banner.ctaCategory || 'Indianwear')}
                className="bg-[#fc2779] text-white hover:bg-white hover:text-gray-900 px-7 py-3 rounded-lg text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-xl cursor-pointer shadow-pink-900/20"
              >
                {banner.linkText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-gray-900 backdrop-blur-sm flex items-center justify-center transition-all"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-gray-900 backdrop-blur-sm flex items-center justify-center transition-all"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-5 inset-x-0 flex justify-center gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-amber-500' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
