import React from 'react';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart, openProduct } = useECommerce();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-gray-900 fill-gray-900" />
              <h2 className="font-bold text-base text-gray-900">
                Curated Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist items list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-gray-900">Your wishlist is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Save pieces you admire to revisit at your leisure or monitor price adjustments.
                </p>
              </div>
            ) : (
              wishlist.map(({ product }) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 pb-4 border-b border-gray-100 group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    onClick={() => {
                      openProduct(product);
                      setIsWishlistOpen(false);
                    }}
                    className="w-20 aspect-[3/4] object-cover rounded bg-gray-100 flex-shrink-0 cursor-pointer"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-900">
                          {product.brand}
                        </span>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-gray-400 hover:text-red-500"
                          title="Remove from wishlist"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <h4
                        onClick={() => {
                          openProduct(product);
                          setIsWishlistOpen(false);
                        }}
                        className="text-xs text-gray-700 line-clamp-1 mt-0.5 cursor-pointer hover:text-black font-medium"
                      >
                        {product.title}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-sm font-bold text-gray-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.mrp > product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.mrp.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Standard');
                        toggleWishlist(product);
                      }}
                      className="mt-3 bg-gray-900 hover:bg-black text-white text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>MOVE TO BAG</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
