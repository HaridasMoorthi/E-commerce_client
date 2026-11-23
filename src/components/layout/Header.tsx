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
    currentUser,
    openLogin,
    openAdmin,
    openTracking
  } = useECommerce();

  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navCategories = [
    { id: 'c-dresses', name: 'Westernwear & Dresses', label: 'Dresses & Gowns', gender: 'women' },
    { id: 'c-suits', name: 'Suits & Tuxedos', label: 'Suits & Tuxedos', gender: 'men' },
    { id: 'c-shirts', name: 'Shirts & Polos', label: 'Shirts & Polos', gender: 'men' },
    { id: 'c-trousers', name: 'Trousers & Chinos', label: 'Trousers & Chinos', gender: 'men' },
    { id: 'c-knitwear', name: 'Knitwear & Sweaters', label: 'Knitwear & Sweaters', gender: 'men' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-gray-200 w-full font-sans overflow-x-hidden">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4 lg:gap-6">
          
          {/* Brand Logo - OLD MONEY (Anchored, never cropped) */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={goHome}
              className="flex items-center focus:outline-none group py-1 cursor-pointer"
              aria-label="OLD MONEY Home"
            >
              <img
                src="/old-money-horizontal-dark.png"
                alt="OLD MONEY - Wear Your Legacy."
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              />
            </button>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6 flex-shrink">
            {navCategories.map((cat) => (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveMegaCategory(cat.id)}
                className="relative py-5 cursor-pointer"
              >
                <button
                  onClick={() => {
                    openCategory(cat.name, cat.gender);
                    setActiveMegaCategory(null);
                  }}
                  className="flex items-center gap-1 text-xs xl:text-[13px] font-semibold text-gray-800 hover:text-black transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>{cat.label}</span>
                  <ChevronDown className="w-3 h-3 opacity-60 transition-transform group-hover:rotate-180" />
                </button>
              </div>
            ))}
          </nav>

          {/* Search Bar - Fluid Width */}
          <div className="flex-1 max-w-[160px] lg:max-w-xs xl:max-w-sm hidden md:block">
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center gap-2 bg-gray-100/90 hover:bg-gray-100 text-gray-500 rounded-lg px-3 py-2 text-xs transition-colors border border-gray-200/60 focus:border-gray-900 text-left"
              >
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-500 text-xs truncate">
                  Search dresses, suits, styles...
                </span>
              </button>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 flex-shrink-0">
            {/* Search Trigger for Mobile */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-1.5 text-gray-700 hover:text-black transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* LIVE ORDER TRACKING TRIGGER - ONLY VISIBLE AFTER LOGIN (CLIENT OR ADMIN) */}
            {currentUser && (
              <button
                onClick={() => openTracking()}
                className="flex flex-col items-center text-gray-700 hover:text-black transition-colors group cursor-pointer focus:outline-none"
                title="Live Order Tracking"
              >
                <Truck className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
                <span className="text-[11px] font-medium mt-0.5">Track</span>
              </button>
            )}

            {/* Account Sign In / Profile */}
            <button
              onClick={() => {
                if (currentUser?.role === 'admin') {
                  openAdmin();
                } else if (currentUser) {
                  openTracking();
                } else {
                  openLogin();
                }
              }}
              className="flex flex-col items-center text-gray-700 hover:text-black transition-colors group cursor-pointer focus:outline-none"
              title={currentUser ? `Signed in as ${currentUser.name}` : "Sign In to Account"}
            >
              <User className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
              <span className="text-[11px] font-medium mt-0.5">
                {currentUser ? (currentUser.role === 'admin' ? 'Admin' : currentUser.name.split(' ')[0]) : 'Sign In'}
              </span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="flex flex-col items-center text-gray-700 hover:text-black transition-colors group cursor-pointer relative focus:outline-none"
              title="Wishlist"
            >
              <div className="relative">
                <Heart className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium mt-0.5">Wishlist</span>
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center text-gray-700 hover:text-black transition-colors group cursor-pointer relative focus:outline-none"
              title="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {totalCartItems}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium mt-0.5">Bag</span>
            </button>
          </div>

        </div>
      </div>

      {/* MegaMenu Dropdown */}
      {activeMegaCategory && (
        <MegaMenu
          categoryId={activeMegaCategory}
          onClose={() => setActiveMegaCategory(null)}
        />
      )}
    </header>
  );
};
