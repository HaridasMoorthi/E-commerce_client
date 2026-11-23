import React, { useState } from 'react';
import { Heart, Star, Crown } from 'lucide-react';
import { Product } from '../../types';
import { useECommerce } from '../../context/ECommerceContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProduct, toggleWishlist, isInWishlist, addToCart } = useECommerce();
  const [isHovered, setIsHovered] = useState(false);
  const isSaved = isInWishlist(product.id);

  const displayImage = isHovered && product.images.length > 1
    ? product.images[1]
    : product.images[0];

  return (
    <div
      className="group relative bg-white border border-stone-200/80 rounded-lg overflow-hidden hover:border-amber-400/70 hover:shadow-2xl transition-all duration-500 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Image Container (Signature 3:4 portrait ratio) */}
      <div
        onClick={() => openProduct(product)}
        className="relative w-full aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer"
      >
        <img
          src={displayImage}
          alt={product.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-106"
          loading="lazy"
        />

        {/* Subtle Bottom Shadow Gradient for depth */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isLuxe && (
            <span className="inline-flex items-center gap-1 bg-stone-950/90 backdrop-blur-md text-amber-300 font-serif font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm border border-amber-400/40 shadow-md">
              <Crown className="w-2.5 h-2.5 text-amber-400" />
              <span>LUXE</span>
            </span>
          )}
          {product.isBestseller && !product.isLuxe && (
            <span className="bg-stone-900/90 backdrop-blur-md text-stone-100 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-md border border-stone-700/50">
              BESTSELLER
            </span>
          )}
          {product.isDealOfTheDay && (
            <span className="bg-amber-900/90 backdrop-blur-md text-amber-100 border border-amber-700/50 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-md">
              PRIVATE EDIT %
            </span>
          )}
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md z-10 cursor-pointer backdrop-blur-md ${
            isSaved
              ? 'bg-[#881337] text-white scale-110 shadow-rose-950/30'
              : 'bg-white/85 text-stone-700 hover:text-[#881337] hover:bg-white border border-white/60'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white stroke-white' : ''}`} />
        </button>

        {/* Quick Add Size Strip on Desktop Hover */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-stone-950/92 backdrop-blur-md p-2.5 transition-all duration-300 z-10 border-t border-amber-500/20 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-[9px] font-semibold tracking-widest text-amber-300/90 text-center uppercase mb-1.5">
            Quick Add Size
          </div>
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {product.sizes.map((size) => {
              const inStock = (product.stockPerSize[size] ?? 1) > 0;
              return (
                <button
                  key={size}
                  disabled={!inStock}
                  onClick={() => addToCart(product, size, product.colors[0]?.name || 'Standard')}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded border transition-all cursor-pointer ${
                    inStock
                      ? 'border-stone-700 text-stone-200 hover:border-amber-400 hover:bg-amber-400 hover:text-stone-950'
                      : 'border-stone-800 text-stone-600 line-through cursor-not-allowed bg-stone-900/50'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Brand & Rating Row */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-stone-500 truncate">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 bg-amber-50/80 border border-amber-200/70 px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-950">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
              <span className="text-stone-400">({product.ratingCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openProduct(product)}
            className="text-xs sm:text-[13px] text-stone-900 font-serif font-semibold line-clamp-1 hover:text-amber-800 cursor-pointer transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        {/* Pricing Block */}
        <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-serif font-black text-stone-950">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-stone-400 line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          {product.mrp > product.price && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Subtle Gold Hover Accent Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};
