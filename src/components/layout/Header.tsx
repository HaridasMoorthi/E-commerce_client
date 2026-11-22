import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, ChevronDown, Truck } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';
import { CATEGORIES } from '../../data/categories';
import { MegaMenu } from './MegaMenu';

export const Header: React.FC = () => {
  const {
    goHome,
    openCategory,
    setIsSearchOpen,
    wishlist,
    setIsWishlistOpen,
    cart,
    setIsCartOpen,
    openTracking,
    currentUser,
    openLogin
  } = useECommerce();

  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 lg:gap-6">
          
          {/* Brand Logo - Single Horizontal Lockup (No duplicate text, No collision) */}
          <div className="flex items-center flex-shrink-0 mr-2 lg:mr-4">
            <button
              onClick={goHome}
              className="flex items-center focus:outline-none group py-1"
              aria-label="Old Money Home"
            >
              <img
                src="/old-money-horizontal-dark.png"
                alt="OLD MONEY - Wear Your Legacy."
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              />
            </button>
          </div>

          {/* Desktop Demographic Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-shrink-0">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveMegaCategory(cat.id)}
                className="relative py-7 cursor-pointer"
              >
                <button
                  onClick={() => {
                    openCategory(cat.name, cat.gender);
                    setActiveMegaCategory(null);
                  }}
                  className={`flex items-center gap-1 text-[11px] xl:text-xs font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${
                    cat.gender === 'luxe'
                      ? 'text-amber-800 hover:text-amber-900 font-extrabold'
                      : 'text-gray-800 hover:text-black'
                  }`}
                >
                  <span>{cat.name}</span>
                  {cat.gender === 'luxe' && (
                    <span className="bg-amber-100 text-amber-900 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ml-0.5">
                      VIP
                    </span>
                  )}
                  <ChevronDown className="w-3 h-3 opacity-50 transition-transform group-hover:rotate-180" />
                </button>
              </div>
            ))}
            <button
              onClick={() => openCategory('Indianwear')}
              className="text-[11px] xl:text-xs font-black text-[#fc2779] hover:text-black tracking-widest uppercase whitespace-nowrap"
            >
              SALE %
            </button>
          </nav>

          {/* Search, Wishlist, Bag, and Account */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full px-3.5 py-2 text-xs w-32 sm:w-44 lg:w-52 transition-colors border border-transparent focus:border-gray-900"
            >
              <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="truncate">Search collections...</span>
            </button>

            {/* Track Order Icon button */}
            <button
              onClick={() => openTracking()}
              className="p-2 text-gray-700 hover:text-black transition-colors rounded-full hover:bg-gray-100"
              title="Track Your Order"
            >
              <Truck className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-gray-700 hover:text-black transition-colors rounded-full hover:bg-gray-100"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-black transition-colors rounded-full hover:bg-gray-100"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#fc2779] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Profile Avatar / Account Trigger (Dedicated Enterprise Login Page) */}
            <button
              onClick={openLogin}
              className="flex items-center gap-2 pl-1 sm:pl-2 sm:border-l border-gray-200 text-gray-700 hover:text-black transition-colors group cursor-pointer focus:outline-none"
              title={currentUser ? `Signed in as ${currentUser.name}` : "Account Sign In"}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-gray-100 group-hover:bg-gray-200 text-gray-700">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold leading-tight group-hover:underline">
                  {currentUser ? (currentUser.role === 'admin' ? 'Admin' : currentUser.name.split(' ')[0]) : 'Account'}
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                  {currentUser ? (currentUser.role === 'admin' ? 'Studio Active' : 'My Account') : 'Sign In'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MegaMenu Dropdown */}
      {activeMegaCategory && (
        <div
          onMouseLeave={() => setActiveMegaCategory(null)}
          className="relative"
        >
          <MegaMenu
            categoryId={activeMegaCategory}
            onClose={() => setActiveMegaCategory(null)}
          />
        </div>
      )}
    </header>
  );
};
