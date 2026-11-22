import React, { useState, useEffect } from 'react';
import { Timer, Zap } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../card/ProductCard';

export const FlashDeals: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deals = PRODUCTS.filter((p) => p.isDealOfTheDay || p.discountPercentage >= 50).slice(0, 4);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-12 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Countdown Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-5 rounded-xl border border-pink-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-50 text-[#fc2779] border border-pink-200 flex items-center justify-center">
              <Zap className="w-5 h-5 fill-[#fc2779]" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-black text-gray-900">
                Curated Flash Offers
              </h2>
              <p className="text-xs text-gray-500">
                Limited-run reductions on heritage pieces & dresses — strictly while stock lasts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-gray-800 bg-pink-50/60 px-4 py-2 rounded-lg border border-pink-200">
            <Timer className="w-4 h-4 text-[#fc2779]" />
            <span className="text-gray-700">OFFER CLOSES IN:</span>
            <div className="flex items-center gap-1 font-mono text-sm">
              <span className="bg-[#fc2779] text-white px-2 py-0.5 rounded font-bold shadow-xs">
                {formatNumber(timeLeft.hours)}h
              </span>
              <span className="text-[#fc2779] font-bold">:</span>
              <span className="bg-[#fc2779] text-white px-2 py-0.5 rounded font-bold shadow-xs">
                {formatNumber(timeLeft.minutes)}m
              </span>
              <span className="text-[#fc2779] font-bold">:</span>
              <span className="bg-[#fc2779] text-white px-2 py-0.5 rounded font-bold shadow-xs">
                {formatNumber(timeLeft.seconds)}s
              </span>
            </div>
          </div>
        </div>

        {/* Deals Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
