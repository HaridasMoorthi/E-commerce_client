import React from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { SpotlightSection } from '../components/home/SpotlightSection';
import { StylesToCelebrate } from '../components/home/StylesToCelebrate';
import { StylistsPicks } from '../components/home/StylistsPicks';
import { LuxeEditSection } from '../components/home/LuxeEditSection';
import { FlashDeals } from '../components/home/FlashDeals';
import { BrandsCarousel } from '../components/home/BrandsCarousel';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Campaign Banner (Screenshot 1) */}
      <HeroSlider />

      {/* 2. Horizontal Category Strip (Screenshot 1) */}
      <CategoryShowcase />

      {/* 3. In the Spotlight Brand Cards (Screenshot 2) */}
      <SpotlightSection />

      {/* 4. Styles To Celebrate In - Polaroid Scrapbook Cards (Screenshot 3) */}
      <StylesToCelebrate />

      {/* 5. Stylists' Picks Editorial Cards (Screenshot 4) */}
      <StylistsPicks />

      {/* 6. Luxe Edit - Deep Wine Luxury Section (Screenshot 5) */}
      <LuxeEditSection />

      {/* 7. Live Shopping Vault & Flash Deals (Product Cards with Quick Add) */}
      <FlashDeals />

      {/* 8. Official Brand Partners */}
      <BrandsCarousel />
    </div>
  );
};
