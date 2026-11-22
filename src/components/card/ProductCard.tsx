import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
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
      className="group relative bg-white border border-gray-100 rounded-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Image Container (Signature 3:4 portrait ratio) */}
      <div
        onClick={() => openProduct(product)}
        className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer"
      >
        <img
          src={displayImage}
          alt={product.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isLuxe && (
            <span className="bg-[#111827] text-amber-300 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow">
              LUXE
            </span>
          )}
          {product.isBestseller && !product.isLuxe && (
            <span className="bg-gray-900 text-white font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow">
              BESTSELLER
            </span>
          )}
          {product.isDealOfTheDay && (
            <span className="bg-amber-600 text-white font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow">
              OFFER %
            </span>
          )}
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md z-10 cursor-pointer ${
            isSaved
              ? 'bg-[#fc2779] text-white scale-110 shadow-pink-300'
              : 'bg-white/90 text-gray-700 hover:text-[#fc2779] hover:bg-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white stroke-white' : ''}`} />
        </button>

        {/* Quick Add Size Strip on Desktop Hover */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm p-2 transition-transform duration-300 z-10 border-t border-gray-100 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-[10px] font-bold text-gray-500 text-center uppercase tracking-wider mb-1">
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
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                    inStock
                      ? 'border-gray-300 text-gray-800 hover:border-[#fc2779] hover:bg-[#fc2779] hover:text-white'
                      : 'border-gray-200 text-gray-300 line-through cursor-not-allowed bg-gray-50'
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
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-900 truncate">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span className="text-gray-400">({product.ratingCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openProduct(product)}
            className="text-xs text-gray-700 font-medium line-clamp-1 hover:text-black cursor-pointer transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        {/* Pricing Block */}
        <div className="mt-2.5 pt-2 border-t border-gray-50 flex items-baseline gap-2">
          <span className="text-sm font-bold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.mrp > product.price && (
            <>
              <span className="text-xs text-gray-400 line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-[#fc2779]">
                ({product.discountPercentage}% OFF)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
