import React, { useState } from 'react';
import { X, Trash2, Heart, Plus, Minus, Tag, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';
import { CouponModal } from './CouponModal';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    moveToWishlist,
    appliedCoupon,
    removeCoupon,
    cartTotals,
    setIsCheckoutOpen
  } = useECommerce();

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gray-900" />
              <h2 className="font-bold text-base text-gray-900">
                Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gamified Free Delivery Progress Bar */}
          <div className="bg-amber-50/60 p-3.5 border-b border-amber-100/70 text-xs">
            {cartTotals.amountNeededForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-700 font-medium">
                  <span>Add items worth <span className="font-bold text-gray-900">₹{cartTotals.amountNeededForFreeShipping}</span> for FREE delivery</span>
                  <span>₹{cartTotals.freeShippingThreshold}</span>
                </div>
                <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gray-900 h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${Math.min(100, ((cartTotals.freeShippingThreshold - cartTotals.amountNeededForFreeShipping) / cartTotals.freeShippingThreshold) * 100)}%`
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Complimentary Express Delivery Unlocked!</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-gray-900">Your bag is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore our curated gowns, dresses & fine tailoring.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-gray-900 text-white text-xs font-bold px-6 py-2.5 rounded hover:bg-black transition-colors uppercase tracking-wider"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-3.5 pb-4 border-b border-gray-100"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 aspect-[3/4] object-cover rounded bg-gray-100 flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-900">
                          {item.product.brand}
                        </span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-gray-400 hover:text-red-500"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="text-xs text-gray-700 line-clamp-1 mt-0.5">
                        {item.product.title}
                      </h4>
                      <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-2">
                        <span>Size: <strong className="text-gray-800">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-gray-800">{item.selectedColor}</strong></span>
                      </div>
                    </div>

                    {/* Price and Quantity Controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-gray-900">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.product.mrp > item.product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{(item.product.mrp * item.quantity).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => moveToWishlist(index)}
                          className="text-[11px] font-semibold text-gray-500 hover:text-black flex items-center gap-1"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>

                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Bill Breakdown (Only when cart has items) */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-4 sm:p-5 bg-gray-50/80 space-y-4">
              
              {/* Coupon Bar */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-700" />
                  {appliedCoupon ? (
                    <div>
                      <span className="text-xs font-bold text-gray-900">{appliedCoupon.code}</span>
                      <span className="text-[10px] text-emerald-600 font-bold block">Applied (-₹{cartTotals.couponDiscount})</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-600 font-medium">Apply Exclusive Privileges & Codes</span>
                  )}
                </div>
                {appliedCoupon ? (
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => setIsCouponModalOpen(true)}
                    className="text-xs font-bold text-gray-900 hover:text-amber-800 hover:underline uppercase tracking-wider"
                  >
                    SELECT
                  </button>
                )}
              </div>

              {/* Bill Details */}
              <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span>Bag Total (MRP)</span>
                  <span>₹{cartTotals.totalMrp.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Bag Discount</span>
                  <span>-₹{cartTotals.productDiscount.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Privilege Savings</span>
                    <span>-₹{cartTotals.couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{cartTotals.shippingFee === 0 ? <strong className="text-emerald-600 uppercase">COMPLIMENTARY</strong> : `₹${cartTotals.shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Payable</span>
                  <span>₹{cartTotals.finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-gray-900 hover:bg-black text-white font-bold text-sm uppercase tracking-widest py-3.5 px-4 rounded-md shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>

      {/* Coupon Selector Modal */}
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
      />
    </div>
  );
};
