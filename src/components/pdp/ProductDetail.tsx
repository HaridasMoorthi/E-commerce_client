import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Share2, Tag, ChevronRight, ShieldCheck, Ruler } from 'lucide-react';
import { Product } from '../../types';
import { useECommerce } from '../../context/ECommerceContext';
import { SizeGuideModal } from './SizeGuideModal';
import { PincodeChecker } from './PincodeChecker';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, openCategory, goHome } = useECommerce();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'specifications'>('details');

  const isSaved = isInWishlist(product.id);
  const stockForSelectedSize = product.stockPerSize[selectedSize] ?? 5;

  const handleColorSelect = (colorName: string, imageIndex: number) => {
    setSelectedColor(colorName);
    if (product.images[imageIndex]) {
      setSelectedImageIndex(imageIndex);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 flex-wrap">
        <button onClick={goHome} className="hover:text-gray-900">Home</button>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <button onClick={() => openCategory(product.category, product.gender)} className="hover:text-gray-900">
          {product.category}
        </button>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="hover:text-gray-900">{product.subCategory}</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-semibold truncate max-w-xs">{product.brand}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Gallery (Columns 1 to 7) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          
          {/* Thumbnails list */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[600px] no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-16 sm:w-20 aspect-[3/4] rounded overflow-hidden border-2 flex-shrink-0 transition-all ${
                  selectedImageIndex === idx ? 'border-gray-900 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Large Main Display */}
          <div className="flex-1 relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isLuxe && (
                <span className="bg-[#111827] text-amber-300 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded shadow-lg">
                  OLD MONEY LUXE
                </span>
              )}
              {product.isBestseller && (
                <span className="bg-gray-900 text-white font-bold text-xs uppercase tracking-widest px-3 py-1 rounded shadow-lg">
                  BESTSELLER
                </span>
              )}
            </div>

            {/* Floating Share button */}
            <button
              onClick={() => alert('Link copied to clipboard!')}
              className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-md transition-all"
              title="Share Product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Information & Actions (Columns 8 to 12) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Brand & Title */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-900">
                {product.brand}
              </span>
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-xs font-bold text-gray-800">
                <span>{product.rating}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-gray-400">| {product.ratingCount} Ratings</span>
              </div>
            </div>
            <h1 className="text-lg sm:text-xl font-serif text-gray-800 mt-1 font-semibold leading-relaxed">
              {product.title}
            </h1>
          </div>

          {/* Pricing Block */}
          <div className="p-4 bg-gray-50/70 rounded-lg border border-gray-200/70 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="text-sm sm:text-base text-gray-400 line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-amber-800">
                    ({product.discountPercentage}% OFF)
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-gray-500 font-medium">Inclusive of all duties & luxury taxes</p>
          </div>

          {/* Special Coupon Promo Callout */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 flex items-start gap-3">
            <Tag className="w-4 h-4 text-amber-800 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-gray-900">Privilege Concierge Offer: </span>
              <span className="text-gray-600">Apply code at checkout for extra savings: </span>
              <span className="font-bold text-amber-900 bg-white px-1.5 py-0.5 rounded border border-amber-300">
                LEGACY20
              </span>
            </div>
          </div>

          {/* Color Selector */}
          {product.colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-gray-800">
                  Color: <span className="font-normal text-gray-600">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleColorSelect(c.name, c.imageIndex)}
                    className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                      selectedColor === c.name ? 'border-gray-900 scale-110 shadow' : 'border-gray-200'
                    }`}
                    title={c.name}
                  >
                    <span
                      className="block w-full h-full rounded-full"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-gray-800">
                Select Size
              </span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-1 font-bold text-gray-900 hover:text-amber-800 hover:underline"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {product.sizes.map((size) => {
                const stock = product.stockPerSize[size] ?? 5;
                const isSelected = selectedSize === size;
                const isOutOfStock = stock === 0;

                return (
                  <button
                    key={size}
                    disabled={isOutOfStock}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[46px] h-10 px-3 rounded text-xs font-bold border transition-all ${
                      isSelected
                        ? 'border-gray-900 bg-gray-900 text-white shadow-sm'
                        : isOutOfStock
                        ? 'border-gray-200 text-gray-300 line-through cursor-not-allowed bg-gray-50'
                        : 'border-gray-300 text-gray-800 hover:border-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {/* Stock Urgency Callout */}
            {stockForSelectedSize > 0 && stockForSelectedSize <= 3 && (
              <p className="text-xs font-bold text-amber-800 animate-pulse">
                Exclusivity note: Only {stockForSelectedSize} left in stock for size {selectedSize}.
              </p>
            )}
          </div>

          {/* Dual Action CTA Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => addToCart(product, selectedSize, selectedColor)}
              className="flex-1 bg-gray-900 hover:bg-black text-white font-bold text-sm uppercase tracking-widest py-3.5 px-6 rounded-md shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>ADD TO BAG</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3.5 rounded-md border-2 transition-all flex items-center justify-center ${
                isSaved
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-gray-900 hover:text-black'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Delivery & Pincode Checker */}
          <PincodeChecker />

          {/* Accordion Tabs for Specifications */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-2 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'details' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-2 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'specifications' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('fabric')}
                className={`py-2 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'fabric' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500'
                }`}
              >
                Fabric & Care
              </button>
            </div>

            <div className="text-xs text-gray-600 leading-relaxed min-h-[80px]">
              {activeTab === 'details' && (
                <p>{product.description}</p>
              )}
              {activeTab === 'specifications' && (
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="border-b border-gray-100 pb-1.5">
                      <span className="font-semibold text-gray-500 block">{key}:</span>
                      <span className="text-gray-900 font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'fabric' && (
                <ul className="list-disc pl-5 space-y-1">
                  {product.fabricCare.map((fc, i) => (
                    <li key={i}>{fc}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
};
