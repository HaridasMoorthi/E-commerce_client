import React, { useState, useEffect } from 'react';
import { Timer, Sparkles } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';
import { ProductCard } from '../card/ProductCard';

export const FlashDeals: React.FC = () => {
  const { products } = useECommerce();
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

  const deals = products.filter((p) => p.isDealOfTheDay || p.discountPercentage >= 50).slice(0, 4);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-14 bg-[#fbfaf8] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Luxury Countdown Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-5 sm:p-6 rounded-xl border border-stone-200/90 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 fill-amber-600 text-amber-600" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-800">
                LIMITED-RUN PRIVILEGE RELEASE
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-stone-900">
                Curated Private Vault Deals
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Exclusive reductions on Savile Row suiting, Italian velvet dinner jackets & pure cashmere — strictly while bespoke allocations remain.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-stone-800 bg-stone-50 px-4 py-2.5 rounded-lg border border-stone-200/80 flex-shrink-0">
            <Timer className="w-4 h-4 text-amber-700" />
            <span className="text-[11px] uppercase tracking-wider text-stone-600">VAULT CLOSES:</span>
            <div className="flex items-center gap-1 font-mono text-xs">
              <span className="bg-stone-900 text-amber-300 px-2 py-1 rounded font-bold shadow-xs border border-amber-400/20">
                {formatNumber(timeLeft.hours)}h
              </span>
              <span className="text-amber-700 font-bold">:</span>
              <span className="bg-stone-900 text-amber-300 px-2 py-1 rounded font-bold shadow-xs border border-amber-400/20">
                {formatNumber(timeLeft.minutes)}m
              </span>
              <span className="text-amber-700 font-bold">:</span>
              <span className="bg-stone-900 text-amber-300 px-2 py-1 rounded font-bold shadow-xs border border-amber-400/20">
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
