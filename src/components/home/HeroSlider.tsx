import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';

export const HeroSlider: React.FC = () => {
  const { openCategory, banners } = useECommerce();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[currentSlide] || banners[0];

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] bg-zinc-900 overflow-hidden group">
      {/* Background Hero Banner */}
      <img
        src={banner.desktopImage}
        alt={banner.title}
        className="w-full h-full object-cover object-center transition-all duration-1000 transform scale-100 group-hover:scale-102"
      />

      {/* Semi-transparent gradient for crisp text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/65" />

      {/* Old Money Brand Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-14 lg:px-18 max-w-7xl mx-auto">
        {/* Left Side Subtitle / Tag */}
        <div className="hidden sm:block max-w-md text-white drop-shadow-md space-y-2">
          <span className="inline-block bg-black/85 backdrop-blur-xs text-amber-300 border border-amber-400/30 text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest font-cinzel shadow-sm">
            {banner.tag}
          </span>
          <p className="text-sm lg:text-base font-normal text-white/95 leading-relaxed font-sans">
            {banner.subtitle}
          </p>
        </div>

        {/* Right Side Bold Promotional Headline */}
        <div className="text-right text-white ml-auto drop-shadow-2xl space-y-2">
          <div className="flex items-center justify-end mb-1">
            <img
              src="/old-money-horizontal-light.png"
              alt="OLD MONEY"
              className="h-8 sm:h-10 lg:h-11 w-auto object-contain drop-shadow-2xl"
            />
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight text-white drop-shadow-xl leading-none uppercase">
            {banner.title}
          </h1>

          <div className="pt-2">
            <button
              onClick={() => openCategory(banner.ctaCategory || 'Westernwear')}
              className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-black hover:text-white px-6 py-2.5 sm:px-7 sm:py-3 rounded text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl cursor-pointer font-cinzel"
            >
              <span>{banner.linkText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Nav Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-gray-900 flex items-center justify-center transition-all shadow-md cursor-pointer z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-gray-900 flex items-center justify-center transition-all shadow-md cursor-pointer z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-20">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/50'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
