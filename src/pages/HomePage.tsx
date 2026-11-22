import React from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { FlashDeals } from '../components/home/FlashDeals';
import { CuratedEdits } from '../components/home/CuratedEdits';
import { LuxeSection } from '../components/home/LuxeSection';
import { BrandsCarousel } from '../components/home/BrandsCarousel';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSlider />
      <CategoryShowcase />
      <FlashDeals />
      <CuratedEdits />
      <LuxeSection />
      <BrandsCarousel />
    </>
  );
};
